import { Schema, Document, model } from "mongoose";

import { ModelNames } from "./models.names";
import { AccountStatus } from "../typings/Account.types";



export class User extends Document {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    avatar?: string;
    status: AccountStatus;
    isNewUser: boolean;
    isVerified: boolean;
    isDeactivatedAccount: boolean;
}

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            minlength: 2,
            maxlength: 25,
            trim: true,
            lowercase: false,
            // required: true,
        },
        lastName: {
            type: String,
            minlength: 2,
            maxlength: 25,
            trim: true,
            lowercase: false,
            // required: true,
        },
        username: {
            type: String,
            minlength: 2,
            maxlength: 20,
            trim: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            // required: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        email: { type: String, index: true, required: true },
        password: { type: String, required: true },
        avatar: { type: String },
        status: {
            type: String,
            trim: true,
            lowercase: true,
            enum: [
                AccountStatus.ACTIVE,
                AccountStatus.INACTIVE,
                AccountStatus.SUSPENDED,
                AccountStatus.BANNED,
            ],
            default: AccountStatus.ACTIVE,
        },
        isNewUser: { type: Boolean, default: true },
        isVerified: { type: Boolean, default: false },
        isDeactivatedAccount: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const UserModel = model<User>(ModelNames.USER, UserSchema);
