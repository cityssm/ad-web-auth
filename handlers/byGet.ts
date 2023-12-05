import type { Request, Response } from 'express'

import { authenticate } from '../helpers/authFunctions.js'
import * as configFunctions from '../helpers/configFunctions.js'
import type * as configTypes from '../types/configTypes'

const getConfig = configFunctions.getProperty(
  'methods.get'
) as configTypes.MethodConfig

export async function handler(
  request: Request,
  response: Response
): Promise<void> {
  const userName = request.query[getConfig.userNameField] as string
  const password = request.query[getConfig.passwordField] as string

  const auth = await authenticate(userName, password)

  response.json(auth)
}

export default handler
