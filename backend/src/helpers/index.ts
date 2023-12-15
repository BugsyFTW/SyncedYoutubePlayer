import { createHmac, randomBytes } from 'crypto';
import variables from "@config/variables";

export const random = () => randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
    return createHmac('sha256', [salt, password].join('/')).update(variables.getAppSecret()).digest('hex');
}