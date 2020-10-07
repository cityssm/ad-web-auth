import * as configFns from "./configFns";
import { Cache } from "@cityssm/map-expire";
import * as bcrypt from "bcrypt";


import ActiveDirectory = require("activedirectory2");


const adConfig = configFns.getProperty("activeDirectoryConfig");


const loginCache = new Cache<string, string>(configFns.getProperty("localCache.maxSize"));
const cacheExpirySeconds = configFns.getProperty("localCache.expirySeconds");

export const authenticate = (userName: string, password: string, callbackFn: (authenticated: boolean) => void) => {

  const cachedPassHash = loginCache.get(userName);

  if (cachedPassHash) {
    return bcrypt.compareSync(password, cachedPassHash);
  }

  try {

    const ad = new ActiveDirectory(adConfig);

    ad.authenticate(userName, password, (err, auth) => {

      if (err) {
        return callbackFn(false);
      }

      if (auth) {
        loginCache.set(userName, bcrypt.hashSync(password, 10), cacheExpirySeconds);
      }

      return callbackFn(auth);
    });

  } catch (e) {
    console.log(e);
    callbackFn(false);
  }
};
