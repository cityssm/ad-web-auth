import { NodeCache } from '@cacheable/node-cache'
import ActiveDirectoryAuthenticate, {
  type ActiveDirectoryAuthenticateResult,
  type LdapClientOptions
} from '@cityssm/activedirectory-authenticate'
import * as bcrypt from 'bcrypt'
import Debug from 'debug'
import exitHook from 'exit-hook'

import { DEBUG_NAMESPACE } from '../debug.config.js'

import * as configFunctions from './configFunctions.js'

const ldapConfigArray = Array.isArray(configFunctions.getProperty('ldapClient'))
  ? (configFunctions.getProperty('ldapClient') as LdapClientOptions[])
  : [configFunctions.getProperty('ldapClient') as LdapClientOptions]

const authenticateConfig = configFunctions.getProperty(
  'activeDirectoryAuthenticate'
)

const debug = Debug(`${DEBUG_NAMESPACE}:authFunctions`)

const loginCache = new NodeCache<string>({
  maxKeys: configFunctions.getProperty('localCache.maxSize'),
  stdTTL: configFunctions.getProperty('localCache.expirySeconds')
})

const authenticators =
  authenticateConfig === undefined
    ? []
    : Array.from(
        ldapConfigArray,
        (ldapConfigItem) =>
          new ActiveDirectoryAuthenticate(ldapConfigItem, authenticateConfig)
      )

export async function authenticate(
  username: string | null | undefined,
  password: string | null | undefined
): Promise<Partial<ActiveDirectoryAuthenticateResult & { success: boolean }>> {
  if (authenticators.length === 0) {
    return {
      success: false,

      errorType: 'CONFIGURATION_ERROR'
    }
  }

  if (
    username === null ||
    username === undefined ||
    username === '' ||
    password === null ||
    password === undefined ||
    password === ''
  ) {
    return {
      success: false,
      errorType: (username ?? '') === '' ? 'EMPTY_USER_NAME' : 'EMPTY_PASSWORD'
    }
  }

  const cachedPassHash: string | undefined = loginCache.get(username)

  if (cachedPassHash !== undefined) {
    debug('Cached record found')
    try {
      const isPasswordMatched = await bcrypt.compare(password, cachedPassHash)

      if (isPasswordMatched) {
        debug('Password matches cached hash')

        return {
          success: true
        }
      }
    } catch (error) {
      debug(error)

      return {
        success: false,

        bindUserDN: '',
        errorType: 'LOGON_FAILURE'
      }
    }
  }

  const passHash = await bcrypt.hash(password, 10)

  for (const [authenticatorIndex, authenticator] of authenticators.entries()) {
    // eslint-disable-next-line no-await-in-loop
    const result = await authenticator.authenticate(username, password)

    if (result.success) {
      loginCache.set(username, passHash)
    } else if (
      result.errorType === 'LDAP_SEARCH_FAILED' &&
      authenticatorIndex < authenticators.length - 1
    ) {
      continue
    }

    if (!result.success) {
      debug('Authentication failed:', result)
    }

    return result
  }

  return {
    success: false,
    errorType: 'CONFIGURATION_ERROR'
  }
}

// eslint-disable-next-line unicorn/no-top-level-side-effects
exitHook(() => {
  debug('Clearing caches')
  loginCache.flushAll()

  for (const authenticator of authenticators) {
    authenticator.clearCache()
  }
})
