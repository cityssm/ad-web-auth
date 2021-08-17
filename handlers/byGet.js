import * as configFunctions from "../helpers/configFunctions.js";
import { authenticate } from "../helpers/authFunctions.js";
const getConfig = configFunctions.getProperty("methods.get");
export const handler = async (request, response) => {
    const userName = request.query[getConfig.userNameField];
    const password = request.query[getConfig.passwordField];
    const auth = await authenticate(userName, password);
    return response.json(auth);
};
export default handler;
