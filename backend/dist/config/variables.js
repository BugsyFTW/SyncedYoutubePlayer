"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envVariables = process.env;
const variables = {
    getPort: () => envVariables.PORT,
    getMongoURL: () => `mongodb+srv://${envVariables.DB_USER}:${envVariables.DB_PASSWORD}@cluster0.7ir2afg.mongodb.net/?retryWrites=true&w=majority`,
    getAppSecret: () => envVariables.APP_SECRET || '0x0',
    getCookieName: () => envVariables.COOKIE_NAME || "_session"
};
exports.default = variables;
//# sourceMappingURL=variables.js.map