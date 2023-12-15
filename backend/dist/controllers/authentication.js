"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const index_actions_1 = require("../db/User/index.actions");
const _helpers_1 = require("../helpers/index");
const variables_1 = __importDefault(require("../config/variables"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.statusMessage = "Missing email or password";
            return res.sendStatus(400);
        }
        const user = yield (0, index_actions_1.getUserByEmail)(email).select("+authentication.salt +authentication.password");
        if (!user) {
            res.statusMessage = "No user found";
            return res.sendStatus(400);
        }
        const expectedHash = (0, _helpers_1.authentication)(user.authentication.salt, password);
        if (expectedHash !== user.authentication.password) {
            res.statusMessage = "Wrong password";
            return res.sendStatus(403);
        }
        const salt = (0, _helpers_1.random)();
        user.authentication.sessionToken = (0, _helpers_1.authentication)(salt, user._id.toString());
        yield user.save();
        res.cookie(variables_1.default.getCookieName(), user.authentication.sessionToken, { domain: 'localhost', path: '/' });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.statusMessage = "Missing username or email or password";
            return res.sendStatus(400);
        }
        const existingUser = yield (0, index_actions_1.getUserByEmail)(email);
        if (existingUser) {
            res.statusMessage = "User with email already exists";
            return res.sendStatus(400);
        }
        const salt = (0, _helpers_1.random)();
        const user = yield (0, index_actions_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, _helpers_1.authentication)(salt, password),
            }
        });
        return res.status(300).json(user).end();
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
});
exports.register = register;
//# sourceMappingURL=authentication.js.map