import type { ActiveDirectoryConfig, MethodConfig } from '../types/configTypes.js';
export declare const configDefaultValues: {
    'ports.http': number | undefined;
    'ports.https': number | undefined;
    'methods.get': MethodConfig | undefined;
    'methods.headers': MethodConfig | undefined;
    'methods.post': MethodConfig | undefined;
    activeDirectoryConfig: ActiveDirectoryConfig | undefined;
    allowlistIPs: string[];
    maxQueriesPerMinute: number;
    'localCache.expirySeconds': number;
    'localCache.maxSize': number;
};
