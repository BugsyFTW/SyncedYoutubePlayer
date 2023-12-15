"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app"); // init function that boots server
const env_1 = __importDefault(require("./config/env"));
const constants_1 = require("./config/constants");
void (0, env_1.default)();
void (0, app_1.startServer)();
process.on(constants_1.PROCESS_INTERRUPT_CODE, app_1.shutdownServer);
process.on(constants_1.PROCESS_TERMINATE_CODE, app_1.shutdownServer);
//# sourceMappingURL=index.js.map