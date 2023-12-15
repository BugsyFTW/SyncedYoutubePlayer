"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../config/constants");
const users_1 = require("../controllers/users");
const _middlewares_1 = require("../middlewares/index");
exports.default = (router) => {
    // Apply middleware
    router.use(_middlewares_1.isAuthenticated);
    // Setup routes
    router.get(`${constants_1.USER_PATH}`, users_1.getAllUsers);
};
//# sourceMappingURL=users.js.map