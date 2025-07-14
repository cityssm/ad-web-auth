import type {
  ActiveDirectoryAuthenticateConfig,
  LdapClientOptions
} from '@cityssm/activedirectory-authenticate'
import { minutesToSeconds } from '@cityssm/to-millis'

import type { MethodConfig } from '../types/configTypes.js'

export const configDefaultValues = {
  'ports.http': undefined as number | undefined,
  'ports.https': 46_466 as number | undefined,

  'methods.get': undefined as MethodConfig | undefined,
  'methods.headers': undefined as MethodConfig | undefined,
  'methods.post': undefined as MethodConfig | undefined,

  activeDirectoryAuthenticate: undefined as
    | ActiveDirectoryAuthenticateConfig
    | undefined,
  ldapClient: undefined as LdapClientOptions | undefined,

  allowlistIPs: [] as string[],
  maxQueriesPerMinute: 500,

  'localCache.expirySeconds': minutesToSeconds(1),
  'localCache.maxSize': 100
}
