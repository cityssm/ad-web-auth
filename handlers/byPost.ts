import * as authenticate from '../helpers/authFunctions.js'
import * as configFunctions from '../helpers/configFunctions.js'
import type * as configTypes from '../types/configTypes'

const postConfig = configFunctions.getProperty(
  'methods.post'
) as configTypes.MethodConfig

export async function handler(request, response): Promise<void> {
  const userName = request.body[postConfig.userNameField]
  const password = request.body[postConfig.passwordField]

  const auth = await authenticate.authenticate(userName, password)

  response.json(auth)
}

export default handler
