import ActiveDirectory from 'activedirectory2'
import * as bcrypt from 'bcrypt'
import debug from 'debug'
import NodeCache from 'node-cache'

import * as configFunctions from './configFunctions.js'

const adConfig = configFunctions.getProperty('activeDirectoryConfig')

const debugAuth = debug('ad-web-auth:authFunctions')

const loginCache = new NodeCache({
  maxKeys: configFunctions.getProperty('localCache.maxSize'),
  stdTTL: configFunctions.getProperty('localCache.expirySeconds')
})

export async function authenticate(
  userName: string | null | undefined,
  password: string | null | undefined
): Promise<boolean> {
  if (
    userName === null ||
    userName === undefined ||
    userName === '' ||
    password === null ||
    password === undefined ||
    password === '' ||
    adConfig === undefined
  ) {
    return false
  }

  const cachedPassHash = loginCache.get(userName)

  if (cachedPassHash !== undefined) {
    debugAuth('Cached record found')
    try {
      return await bcrypt.compare(password, cachedPassHash as string)
    } catch (error) {
      console.log(error)
      return false
    }
  }
  const passHash = await bcrypt.hash(password, 10)

  // eslint-disable-next-line promise/avoid-new
  return await new Promise((resolve) => {
    try {
      const ad = new ActiveDirectory(adConfig)

      ad.authenticate(userName, password, (error, auth) => {
        if (error) {
          resolve(false)
        }

        if (auth) {
          loginCache.set(userName, passHash)
        }

        resolve(auth)
      })
    } catch {
      resolve(false)
    }
  })
}
