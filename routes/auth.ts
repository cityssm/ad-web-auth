import { Router } from "express";
import * as configFns from "../helpers/configFns";

import { handler as allowlist_handler } from "../handlers/allowlist";

import { handler as byGet_handler } from "../handlers/byGet";
import { handler as byHeaders_handler } from "../handlers/byHeaders";
import { handler as byPost_handler } from "../handlers/byPost";


const router = Router();


if (configFns.getProperty("methods.get")) {
  router.get("/byGet", allowlist_handler, byGet_handler);
}


if (configFns.getProperty("methods.headers")) {
  router.all("/byHeaders", allowlist_handler, byHeaders_handler);
}


if (configFns.getProperty("methods.post")) {
  router.post("/byPost", allowlist_handler, byPost_handler);
}


export = router;
