import * as configFunctions from "../helpers/configFunctions.js";
import * as authenticate from "../helpers/authFunctions.js";

import type { RequestHandler } from "express";
import type * as configTypes from "../types/configTypes";


const headersConfig = configFunctions.getProperty("methods.headers") as configTypes.MethodConfig;


export const handler: RequestHandler = async (request, response) => {

  const userName = request.header(headersConfig.userNameField);
  const password = request.header(headersConfig.passwordField);

  const auth = await authenticate.authenticate(userName, password);

  return response.json(auth);
};


export default handler;
