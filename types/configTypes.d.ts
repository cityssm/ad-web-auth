export interface Config {
    ports?: {
        http?: number;
        https?: number;
    };
    methods?: {
        get?: false | MethodConfig;
        headers?: false | MethodConfig;
        post?: false | MethodConfig;
    };
    activeDirectoryConfig?: ActiveDirectoryConfig;
    allowlistIPs?: string[];
    localCache?: {
        expirySeconds?: number;
        maxSize?: number;
    };
    maxQueriesPerMinute?: number;
}
export interface MethodConfig {
    userNameField: string;
    passwordField: string;
}
export interface ActiveDirectoryConfig {
    url: string;
    baseDN: string;
    username: string;
    password: string;
}
