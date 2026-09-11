import { minutesToSeconds } from '@cityssm/to-millis';
export const configDefaultValues = {
    'ports.http': undefined,
    'methods.get': undefined,
    'methods.headers': undefined,
    'methods.post': undefined,
    activeDirectoryAuthenticate: undefined,
    ldapClient: [],
    allowlistIPs: [],
    maxQueriesPerMinute: 500,
    'localCache.expirySeconds': minutesToSeconds(1),
    'localCache.maxSize': 100
};
