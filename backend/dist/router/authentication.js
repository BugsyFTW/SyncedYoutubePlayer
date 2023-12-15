"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../config/constants");
const authentication_1 = require("../controllers/authentication");
exports.default = (router) => {
    router.post(`${constants_1.AUTH_PATH}/register`, authentication_1.register);
    router.post(`${constants_1.AUTH_PATH}/login`, authentication_1.login);
};
//# sourceMappingURL=authentication.js.map