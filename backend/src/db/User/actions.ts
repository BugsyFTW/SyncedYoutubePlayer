import { UserModel } from "@db/User";

// Actions
export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne( { email } );

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

export const updateUserById = (id: string, values: Record<string,any>) => UserModel.findByIdAndUpdate(id, values);