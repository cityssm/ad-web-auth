// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable sonarjs/no-hardcoded-ip, sonarjs/no-hardcoded-passwords */

import type * as configTypes from '../types/configTypes.js'

const config: configTypes.Config = {
  ldapClient: {
    url: 'ldap://dc.example.com'
  },

  activeDirectoryAuthenticate: {
    baseDN: 'dc=example,dc=com',
    bindUserDN: 'CN=service acct,CN=Users,DC=example,DC=com',
    bindUserPassword: 'password123'
  },

  methods: {
    headers: {
      passwordField: 'AD-Password',
      userNameField: 'AD-UserName'
    },
    post: {
      passwordField: 'p',
      userNameField: 'u'
    }
  },

  allowlistIPs: ['192.168.1.234']
}

export default config
