import { NodeCache } from '@cacheable/node-cache';
import ActiveDirectoryAuthenticate from '@cityssm/activedirectory-authenticate';
import * as bcrypt from 'bcrypt';
import Debug from 'debug';
import exitHook from 'exit-hook';
import { DEBUG_NAMESPACE } from '../debug.config.js';
import * as configFunctions from './configFunctions.js';
const ldapConfig = configFunctions.getProperty('ldapClient');
const authenticateConfig = configFunctions.getProperty('activeDirectoryAuthenticate');
const debug = Debug(`${DEBUG_NAMESPACE}:authFunctions`);
const loginCache = new NodeCache({
    maxKeys: configFunctions.getProperty('localCache.maxSize'),
    stdTTL: configFunctions.getProperty('localCache.expirySeconds')
});
const authenticator = ldapConfig === undefined || authenticateConfig === undefined
    ? undefined
    : new ActiveDirectoryAuthenticate(ldapConfig, authenticateConfig);
export async function authenticate(userName, password) {
    if (ldapConfig === undefined || authenticateConfig === undefined || authenticator === undefined) {
        return {
            success: false,
            errorType: 'CONFIGURATION_ERROR'
        };
    }
    else if (userName === null ||
        userName === undefined ||
        userName === '' ||
        password === null ||
        password === undefined ||
        password === '') {
        return {
            success: false,
            errorType: (userName ?? '') === '' ? 'EMPTY_USER_NAME' : 'EMPTY_PASSWORD'
        };
    }
    const cachedPassHash = loginCache.get(userName);
    if (cachedPassHash !== undefined) {
        debug('Cached record found');
        try {
            const passwordMatch = await bcrypt.compare(password, cachedPassHash);
            if (passwordMatch) {
                debug('Password matches cached hash');
                return {
                    success: true
                };
            }
        }
        catch (error) {
            debug(error);
            return {
                success: false,
                bindUserDN: '',
                errorType: 'LOGON_FAILURE'
            };
        }
    }
    const passHash = await bcrypt.hash(password, 10);
    const result = await authenticator.authenticate(userName, password);
    if (result.success) {
        loginCache.set(userName, passHash);
    }
    else {
        debug('Authentication failed:', result);
    }
    return result;
}
exitHook(() => {
    debug('Clearing caches');
    loginCache.flushAll();
    authenticator?.clearCache();
});
