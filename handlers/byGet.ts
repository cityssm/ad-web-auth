import * as configFunctions from "../helpers/configFunctions.js";
import { authenticate } from "../helpers/authFunctions.js";

import type { RequestHandler } from "express";
import type * as configTypes from "../types/configTypes";


const getConfig = configFunctions.getProperty("methods.get") as configTypes.MethodConfig;


export const handler: RequestHandler = async (request, response) => {

  const userName = request.query[getConfig.userNameField] as string;
  const password = request.query[getConfig.passwordField] as string;

  const auth = await authenticate(userName, password);

  return response.json(auth);
};


export default handler;
