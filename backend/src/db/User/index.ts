import { Schema, model } from 'mongoose';

// Interfaces
interface IUser {
    username: string;
    email: string;
    authentication: IAuthentication;
}

interface IAuthentication {
    password: string;
    salt: string;
    sessionToken: string;
}

// Schema
const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    }
});

// Model
export const UserModel = model<IUser>('Users', UserSchema);