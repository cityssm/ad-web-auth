import type { ActiveDirectoryAuthenticateConfig, LdapClientOptions } from '@cityssm/activedirectory-authenticate';
import type { MethodConfig } from '../types/configTypes.js';
export declare const configDefaultValues: {
    'ports.http': number | undefined;
    'ports.https': number | undefined;
    'methods.get': MethodConfig | undefined;
    'methods.headers': MethodConfig | undefined;
    'methods.post': MethodConfig | undefined;
    activeDirectoryAuthenticate: ActiveDirectoryAuthenticateConfig | undefined;
    ldapClient: LdapClientOptions | undefined;
    allowlistIPs: string[];
    maxQueriesPerMinute: number;
    'localCache.expirySeconds': number;
    'localCache.maxSize': number;
};
