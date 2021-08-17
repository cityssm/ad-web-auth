import { Router } from "express";
import * as configFunctions from "../helpers/configFunctions.js";
import byGet_handler from "../handlers/byGet.js";
import byHeaders_handler from "../handlers/byHeaders.js";
import byPost_handler from "../handlers/byPost.js";
export const router = Router();
if (configFunctions.getProperty("methods.get")) {
    router.get("/byGet", byGet_handler);
}
if (configFunctions.getProperty("methods.headers")) {
    router.all("/byHeaders", byHeaders_handler);
}
if (configFunctions.getProperty("methods.post")) {
    router.post("/byPost", byPost_handler);
}
export default router;
