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
exports.isOwner = exports.isAuthenticated = void 0;
const lodash_1 = require("lodash");
const variables_1 = __importDefault(require("../config/variables"));
const index_actions_1 = require("../db/User/index.actions");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionToken = req.cookies[variables_1.default.getCookieName()];
        if (!sessionToken) {
            return res.sendStatus(403);
        }
        const user = yield (0, index_actions_1.getUserBySessionToken)(sessionToken);
        if (!user) {
            return res.sendStatus(400);
        }
        (0, lodash_1.merge)(req, { identity: user });
        return next();
    }
    catch (error) {
        console.error(error);
        return res.status(400);
    }
});
exports.isAuthenticated = isAuthenticated;
const isOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const currentUserId = (0, lodash_1.get)(req, 'identity._id');
        if (!currentUserId) {
            return res.sendStatus(403);
        }
        if (currentUserId !== id) {
            return res.sendStatus(400);
        }
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(400);
    }
});
exports.isOwner = isOwner;
//# sourceMappingURL=index.js.map