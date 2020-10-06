import type * as configTypes from "../types/configTypes";



/*
 * LOAD CONFIGURATION
 */

let config: configTypes.Config = {};

try {

  config = require("../data/config");

} catch (e) {

  config = require("../data/config-sample");

  console.error("No \"data/config.js\" found, using \"data/config-sample.js\".");

}

Object.freeze(config);


/*
 * SET UP FALLBACK VALUES
 */


const configFallbackValues = new Map<string, any>();

configFallbackValues.set("port.https", 46464);


export function getProperty(propertyName: "port.http"): number;
export function getProperty(propertyName: "port.https"): number;

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
