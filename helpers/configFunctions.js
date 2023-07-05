import './polyfills.js';
import config from '../data/config.js';
const configFallbackValues = new Map();
configFallbackValues.set('ports.https', 46466);
configFallbackValues.set('allowlistIPs', []);
configFallbackValues.set('maxQueriesPerMinute', 500);
configFallbackValues.set('localCache.expirySeconds', 60);
configFallbackValues.set('localCache.maxSize', 100);
configFallbackValues.set('methods.get', false);
configFallbackValues.set('methods.headers', false);
configFallbackValues.set('methods.post', false);
export function getProperty(propertyName) {
    const propertyNameSplit = propertyName.split('.');
    let currentObject = config;
    for (const propertyNamePiece of propertyNameSplit) {
        if (Object.hasOwn(currentObject, propertyNamePiece)) {
            currentObject = currentObject[propertyNamePiece];
            continue;
        }
        return configFallbackValues.get(propertyName);
    }
    return currentObject;
}
