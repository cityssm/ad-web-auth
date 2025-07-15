import type { Request, Response } from 'express'

import { authenticate } from '../helpers/authFunctions.js'
import * as configFunctions from '../helpers/configFunctions.js'

const getConfig = configFunctions.getProperty('methods.get')

if (getConfig === undefined) {
  throw new Error("Missing configuration for 'methods.get'")
}

export default async function handler(
  request: Request<unknown, unknown, unknown, Record<string, string>>,
  response: Response
): Promise<void> {
  const userName = request.query[getConfig?.userNameField ?? ''] ?? ''
  const password = request.query[getConfig?.passwordField ?? ''] ?? ''

  const auth = await authenticate(userName, password)

  response.json(request.query.debug === 'true' ? auth : auth.success)
}
