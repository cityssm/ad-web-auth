"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const configFns = require("./configFns");
const map_expire_1 = require("@cityssm/map-expire");
const bcrypt = require("bcrypt");
const ActiveDirectory = require("activedirectory2");
const adConfig = configFns.getProperty("activeDirectoryConfig");
const loginCache = new map_expire_1.Cache(configFns.getProperty("localCache.maxSize"));
const cacheExpirySeconds = configFns.getProperty("localCache.expirySeconds");
exports.authenticate = (userName, password, callbackFn) => {
    const cachedPassHash = loginCache.get(userName);
    if (cachedPassHash) {
        return bcrypt.compareSync(password, cachedPassHash);
    }
    try {
        const ad = new ActiveDirectory(adConfig);
        ad.authenticate(userName, password, (err, auth) => {
            if (err) {
                console.log("ERROR: " + JSON.stringify(err));
                return callbackFn(false);
            }
            if (auth) {
                loginCache.set(userName, bcrypt.hashSync(password, 10), cacheExpirySeconds);
            }
            return callbackFn(auth);
        });
    }
    catch (e) {
        console.log(e);
        callbackFn(false);
    }
};
