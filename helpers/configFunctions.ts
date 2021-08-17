import type * as configTypes from "../types/configTypes";


/*
 * LOAD CONFIGURATION
 */

// eslint-disable-next-line node/no-unpublished-import
import config from "../data/config.js";


/*
 * SET UP FALLBACK VALUES
 */


const configFallbackValues = new Map<string, unknown>();

configFallbackValues.set("ports.https", 46_466);
configFallbackValues.set("allowlistIPs", []);
configFallbackValues.set("maxQueriesPerMinute", 500);

configFallbackValues.set("localCache.expirySeconds", 60);
configFallbackValues.set("localCache.maxSize", 100);

configFallbackValues.set("methods.get", false);
configFallbackValues.set("methods.headers", false);
configFallbackValues.set("methods.post", false);


export function getProperty(propertyName: "ports.http"): number;
export function getProperty(propertyName: "ports.https"): number;

export function getProperty(propertyName: "activeDirectoryConfig"): configTypes.ActiveDirectoryConfig;

export function getProperty(propertyName: "allowlistIPs"): string[];

export function getProperty(propertyName: "maxQueriesPerMinute"): number;

export function getProperty(propertyName: "localCache.expirySeconds"): number;
export function getProperty(propertyName: "localCache.maxSize"): number;

export function getProperty(propertyName: "methods.get"): boolean | configTypes.MethodConfig;
export function getProperty(propertyName: "methods.headers"): boolean | configTypes.MethodConfig;
export function getProperty(propertyName: "methods.post"): boolean | configTypes.MethodConfig;


export function getProperty(propertyName: string): unknown {

  const propertyNameSplit = propertyName.split(".");

  let currentObject = config;

  for (const element of propertyNameSplit) {

    currentObject = currentObject[element];

    if (!currentObject) {
      return configFallbackValues.get(propertyName);
    }

  }

  return currentObject;
}
