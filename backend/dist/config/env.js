"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const REQUIRED_ENV_VARS = [
    "APP_SECRET",
    "DB_USER",
    "DB_PASSWORD"
];
exports.default = () => {
    (0, dotenv_1.config)();
    assertRequiredVariables();
};
const assertRequiredVariables = () => {
    REQUIRED_ENV_VARS.forEach(envVar => {
        if (!process.env[envVar]) {
            throw new Error(`Required env variable ${envVar} not defined`);
        }
    });
};
//# sourceMappingURL=env.js.map