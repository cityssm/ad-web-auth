import path from 'node:path'

import type { ServiceConfig } from 'node-windows'

const _dirname = '.'

export const serviceConfig: ServiceConfig = {
  name: 'Active Directory Web Authentication',
  description: 'A web application to authenticate Active Directory users.',
  script: path.join(_dirname, 'bin', 'www.js')
}
