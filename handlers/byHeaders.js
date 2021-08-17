import * as configFunctions from "../helpers/configFunctions.js";
import * as authenticate from "../helpers/authFunctions.js";
const headersConfig = configFunctions.getProperty("methods.headers");
export const handler = async (request, response) => {
    const userName = request.header(headersConfig.userNameField);
    const password = request.header(headersConfig.passwordField);
    const auth = await authenticate.authenticate(userName, password);
    return response.json(auth);
};
export default handler;
