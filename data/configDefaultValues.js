import { minutesToSeconds } from '@cityssm/to-millis';
export const configDefaultValues = {
    'ports.http': undefined,
    'ports.https': 46_466,
    'methods.get': undefined,
    'methods.headers': undefined,
    'methods.post': undefined,
    activeDirectoryAuthenticate: undefined,
    ldapClient: undefined,
    allowlistIPs: [],
    maxQueriesPerMinute: 500,
    'localCache.expirySeconds': minutesToSeconds(1),
    'localCache.maxSize': 100
};
