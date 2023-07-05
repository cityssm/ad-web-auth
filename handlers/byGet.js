import { authenticate } from '../helpers/authFunctions.js';
import * as configFunctions from '../helpers/configFunctions.js';
const getConfig = configFunctions.getProperty('methods.get');
export async function handler(request, response) {
    const userName = request.query[getConfig.userNameField];
    const password = request.query[getConfig.passwordField];
    const auth = await authenticate(userName, password);
    response.json(auth);
}
export default handler;
