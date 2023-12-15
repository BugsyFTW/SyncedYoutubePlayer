"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// Schema
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    }
});
// Model
exports.UserModel = (0, mongoose_1.model)('UserSchema', UserSchema);
// Actions
/*export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne( { email } );

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

export const updateUserById = (id: string, values: Record<string,any>) => UserModel.findByIdAndUpdate(id, values); */ 
//# sourceMappingURL=index.js.map