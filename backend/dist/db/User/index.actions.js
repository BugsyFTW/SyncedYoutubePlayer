"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUsers = void 0;
const User_1 = require("../User");
// Actions
const getUsers = () => User_1.UserModel.find();
exports.getUsers = getUsers;
const getUserByEmail = (email) => User_1.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = (sessionToken) => User_1.UserModel.findOne({ 'authentication.sessionToken': sessionToken });
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = (id) => User_1.UserModel.findById(id);
exports.getUserById = getUserById;
const createUser = (values) => new User_1.UserModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const updateUserById = (id, values) => User_1.UserModel.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
//# sourceMappingURL=index.actions.js.map