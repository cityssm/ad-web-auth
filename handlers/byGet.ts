import * as configFns from "../helpers/configFns";
import * as authenticate from "../helpers/authFns";

import type { RequestHandler } from "express";
import type * as configTypes from "../types/configTypes";


const getConfig = configFns.getProperty("methods.get") as configTypes.MethodConfig;


export const handler: RequestHandler = (req, res) => {

  const userName = req.query[getConfig.userNameField] as string;
  const password = req.query[getConfig.passwordField] as string;

  authenticate.authenticate(userName, password, (auth) => {
    return res.json(auth);
  });
};
