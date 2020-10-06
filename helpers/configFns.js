"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperty = void 0;
let config = {};
try {
    config = require("../data/config");
}
catch (e) {
    config = require("../data/config-sample");
    console.error("No \"data/config.js\" found, using \"data/config-sample.js\".");
}
Object.freeze(config);
const configFallbackValues = new Map();
configFallbackValues.set("port.https", 46464);
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
