import * as authenticate from '../helpers/authFunctions.js';
import * as configFunctions from '../helpers/configFunctions.js';
const postConfig = configFunctions.getProperty('methods.post');
export async function handler(request, response) {
    const userName = request.body[postConfig.userNameField];
    const password = request.body[postConfig.passwordField];
    const auth = await authenticate.authenticate(userName, password);
    response.json(auth);
}
export default handler;
