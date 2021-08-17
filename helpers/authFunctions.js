import * as configFunctions from "./configFunctions.js";
import * as bcrypt from "bcrypt";
import NodeCache from "node-cache";
import ActiveDirectory from "activedirectory2";
const adConfig = configFunctions.getProperty("activeDirectoryConfig");
import debug from "debug";
const debugAuth = debug("ad-web-auth:authFunctions");
const loginCache = new NodeCache({
    maxKeys: configFunctions.getProperty("localCache.maxSize"),
    stdTTL: configFunctions.getProperty("localCache.expirySeconds")
});
export const authenticate = async (userName, password) => {
    if (!userName || userName === "" || !password || password === "") {
        return false;
    }
    const cachedPassHash = loginCache.get(userName);
    if (cachedPassHash) {
        debugAuth("Cached record found");
        return await bcrypt.compare(password, cachedPassHash);
    }
    return new Promise((resolve) => {
        try {
            const ad = new ActiveDirectory(adConfig);
            ad.authenticate(userName, password, async (error, auth) => {
                if (error) {
                    resolve(false);
                }
                if (auth) {
                    const passHash = await bcrypt.hash(password, 10);
                    loginCache.set(userName, passHash);
                }
                resolve(auth);
            });
        }
        catch (_a) {
            resolve(false);
        }
    });
};
