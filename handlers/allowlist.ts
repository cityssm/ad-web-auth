import { isLocal } from '@cityssm/is-private-network-address'
import Debug from 'debug'
import type { RequestHandler } from 'express'

import * as configFunctions from '../helpers/configFunctions.js'

const debug = Debug('ad-web-auth:allowlist')

export const handler: RequestHandler = (request, response, next) => {
  const ipAddress = request.ip.split(':').pop() ?? ''

  debug(`Testing IP: ${ipAddress}`)

  if (
    isLocal(request.ip) ||
    configFunctions.getProperty('allowlistIPs').includes(ipAddress)
  ) {
    next()
    return
  }

  response.status(403)
  response.json(false)
}

export default handler
