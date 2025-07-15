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
    if (userName === null ||
        userName === undefined ||
        userName === '' ||
        password === null ||
        password === undefined ||
        password === '' ||
        ldapConfig === undefined ||
        authenticateConfig === undefined) {
        return false;
    }
    const cachedPassHash = loginCache.get(userName);
    if (cachedPassHash !== undefined) {
        debug('Cached record found');
        try {
            return await bcrypt.compare(password, cachedPassHash);
        }
        catch (error) {
            debug(error);
            return false;
        }
    }
    const passHash = await bcrypt.hash(password, 10);
    const result = await authenticator?.authenticate(userName, password);
    const success = result?.success ?? false;
    if (success) {
        loginCache.set(userName, passHash);
    }
    else {
        debug('Authentication failed:', result);
    }
    return success;
}
exitHook(() => {
    debug('Clearing caches');
    loginCache.flushAll();
    authenticator?.clearCache();
});
