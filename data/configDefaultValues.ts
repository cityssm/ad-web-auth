import { minutesToSeconds } from '@cityssm/to-millis'

import type {
  ActiveDirectoryConfig,
  MethodConfig
} from '../types/configTypes.js'

export const configDefaultValues = {
  'ports.http': undefined as number | undefined,
  'ports.https': 46_466 as number | undefined,

  'methods.get': undefined as MethodConfig | undefined,
  'methods.headers': undefined as MethodConfig | undefined,
  'methods.post': undefined as MethodConfig | undefined,

  activeDirectoryConfig: undefined as ActiveDirectoryConfig | undefined,

  allowlistIPs: [] as string[],
  maxQueriesPerMinute: 500,

  'localCache.expirySeconds': minutesToSeconds(1),
  'localCache.maxSize': 100
}
