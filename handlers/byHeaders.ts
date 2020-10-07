import * as configFns from "../helpers/configFns";
import * as authenticate from "../helpers/authFns";

import type { RequestHandler } from "express";
import type * as configTypes from "../types/configTypes";


const headersConfig = configFns.getProperty("methods.headers") as configTypes.MethodConfig;


export const handler: RequestHandler = (req, res) => {

  const userName = req.header[headersConfig.userNameField] as string;
  const password = req.header[headersConfig.passwordField] as string;

  authenticate.authenticate(userName, password, (auth) => {
    res.json(auth);
  });
};
