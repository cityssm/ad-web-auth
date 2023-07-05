/* eslint-disable node/no-unpublished-import */

import './polyfills.js'

import config from '../data/config.js'
import type * as configTypes from '../types/configTypes'

/*
 * SET UP FALLBACK VALUES
 */

const configFallbackValues = new Map<string, unknown>()

configFallbackValues.set('ports.https', 46_466)
configFallbackValues.set('allowlistIPs', [])
configFallbackValues.set('maxQueriesPerMinute', 500)

configFallbackValues.set('localCache.expirySeconds', 60)
configFallbackValues.set('localCache.maxSize', 100)

configFallbackValues.set('methods.get', false)
configFallbackValues.set('methods.headers', false)
configFallbackValues.set('methods.post', false)

export function getProperty(propertyName: 'ports.http'): number | undefined
export function getProperty(propertyName: 'ports.https'): number

export function getProperty(
  propertyName: 'activeDirectoryConfig'
): configTypes.ActiveDirectoryConfig

export function getProperty(propertyName: 'allowlistIPs'): string[]

export function getProperty(propertyName: 'maxQueriesPerMinute'): number

export function getProperty(propertyName: 'localCache.expirySeconds'): number
export function getProperty(propertyName: 'localCache.maxSize'): number

export function getProperty(
  propertyName: 'methods.get'
): boolean | configTypes.MethodConfig
export function getProperty(
  propertyName: 'methods.headers'
): boolean | configTypes.MethodConfig
export function getProperty(
  propertyName: 'methods.post'
): boolean | configTypes.MethodConfig

export function getProperty(propertyName: string): unknown {
  const propertyNameSplit = propertyName.split('.')

  let currentObject = config

  for (const propertyNamePiece of propertyNameSplit) {
    if (Object.hasOwn(currentObject, propertyNamePiece)) {
      currentObject = currentObject[propertyNamePiece]
      continue
    }

    return configFallbackValues.get(propertyName)
  }

  return currentObject
}
