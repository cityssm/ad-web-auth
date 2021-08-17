import * as configFunctions from "../helpers/configFunctions.js";
import * as authenticate from "../helpers/authFunctions.js";
const postConfig = configFunctions.getProperty("methods.post");
export const handler = async (request, response) => {
    const userName = request.body[postConfig.userNameField];
    const password = request.body[postConfig.passwordField];
    const auth = await authenticate.authenticate(userName, password);
    return response.json(auth);
};
export default handler;
