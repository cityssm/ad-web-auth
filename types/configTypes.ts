import type {
  ActiveDirectoryAuthenticateConfig,
  LdapClientOptions
} from '@cityssm/activedirectory-authenticate'

export interface Config {
  ports?: {
    http?: number
    https?: number
  }

  methods?: {
    get?: false | MethodConfig
    headers?: false | MethodConfig
    post?: false | MethodConfig
  }

  ldapClient?: LdapClientOptions

  activeDirectoryAuthenticate?: ActiveDirectoryAuthenticateConfig

  allowlistIPs?: string[]

  localCache?: {
    expirySeconds?: number
    maxSize?: number
  }

  maxQueriesPerMinute?: number
}

export interface MethodConfig {
  passwordField: string
  userNameField: string
}
