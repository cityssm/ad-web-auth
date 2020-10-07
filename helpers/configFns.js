"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperty = void 0;
const config = require("../data/config");
Object.freeze(config);
const configFallbackValues = new Map();
configFallbackValues.set("port.https", 46464);
configFallbackValues.set("allowlistIPs", []);
configFallbackValues.set("maxQueriesPerMinute", 500);
configFallbackValues.set("localCache.expirySeconds", 60);
configFallbackValues.set("localCache.maxSize", 100);
configFallbackValues.set("methods.get", false);
configFallbackValues.set("methods.headers", false);
configFallbackValues.set("methods.post", false);
function getProperty(propertyName) {
    const propertyNameSplit = propertyName.split(".");
    let currentObj = config;
    for (let index = 0; index < propertyNameSplit.length; index += 1) {
        currentObj = currentObj[propertyNameSplit[index]];
        if (!currentObj) {
            return configFallbackValues.get(propertyName);
        }
    }
    return currentObj;
}
exports.getProperty = getProperty;
