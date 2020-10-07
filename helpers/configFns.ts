import type * as configTypes from "../types/configTypes";


/*
 * LOAD CONFIGURATION
 */

import * as config from "../data/config";

Object.freeze(config);


/*
 * SET UP FALLBACK VALUES
 */


const configFallbackValues = new Map<string, any>();

configFallbackValues.set("port.https", 46464);
configFallbackValues.set("allowlistIPs", []);
configFallbackValues.set("maxQueriesPerMinute", 500);

configFallbackValues.set("localCache.expirySeconds", 60);
configFallbackValues.set("localCache.maxSize", 100);

configFallbackValues.set("methods.get", false);
configFallbackValues.set("methods.headers", false);
configFallbackValues.set("methods.post", false);


export function getProperty(propertyName: "port.http"): number;
export function getProperty(propertyName: "port.https"): number;

export function getProperty(propertyName: "activeDirectoryConfig"): configTypes.ActiveDirectoryConfig;

export function getProperty(propertyName: "allowlistIPs"): string[];

export function getProperty(propertyName: "maxQueriesPerMinute"): number;

export function getProperty(propertyName: "localCache.expirySeconds"): number;
export function getProperty(propertyName: "localCache.maxSize"): number;

export function getProperty(propertyName: "methods.get"): boolean | configTypes.MethodConfig;
export function getProperty(propertyName: "methods.headers"): boolean | configTypes.MethodConfig;
export function getProperty(propertyName: "methods.post"): boolean | configTypes.MethodConfig;


export function getProperty(propertyName: string): any {

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
