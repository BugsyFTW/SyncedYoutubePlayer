"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.random = void 0;
const crypto_1 = require("crypto");
const variables_1 = __importDefault(require("../config/variables"));
const random = () => (0, crypto_1.randomBytes)(128).toString('base64');
exports.random = random;
const authentication = (salt, password) => {
    return (0, crypto_1.createHmac)('sha256', [salt, password].join('/')).update(variables_1.default.getAppSecret()).digest('hex');
};
exports.authentication = authentication;
//# sourceMappingURL=index.js.map