// eslint-disable-next-line n/no-unpublished-import
import config from '../data/config.js'
import type {
  ActiveDirectoryConfig,
  MethodConfig
} from '../types/configTypes.js'

/*
 * SET UP FALLBACK VALUES
 */

const configFallbackValues = new Map<string, unknown>()

configFallbackValues.set('ports.https', 46_466)
configFallbackValues.set('allowlistIPs', [])
configFallbackValues.set('maxQueriesPerMinute', 500)

configFallbackValues.set('localCache.expirySeconds', 60)
configFallbackValues.set('localCache.maxSize', 100)

export function getProperty(propertyName: 'ports.http'): number | undefined
export function getProperty(propertyName: 'ports.https'): number

export function getProperty(
  propertyName: 'activeDirectoryConfig'
): ActiveDirectoryConfig

export function getProperty(propertyName: 'allowlistIPs'): string[]

export function getProperty(propertyName: 'maxQueriesPerMinute'): number

export function getProperty(propertyName: 'localCache.expirySeconds'): number
export function getProperty(propertyName: 'localCache.maxSize'): number

export function getProperty(
  propertyName: 'methods.get'
): MethodConfig | undefined
export function getProperty(
  propertyName: 'methods.headers'
): MethodConfig | undefined
export function getProperty(
  propertyName: 'methods.post'
): MethodConfig | undefined

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
