import type { Request, Response } from 'express'

import * as authenticate from '../helpers/authFunctions.js'
import * as configFunctions from '../helpers/configFunctions.js'
import type * as configTypes from '../types/configTypes'

const headersConfig = configFunctions.getProperty(
  'methods.headers'
) as configTypes.MethodConfig

export async function handler(
  request: Request,
  response: Response
): Promise<void> {
  const userName = request.header(headersConfig.userNameField) ?? ''
  const password = request.header(headersConfig.passwordField) ?? ''

  const auth = await authenticate.authenticate(userName, password)

  response.json(auth)
}

export default handler
