import { Schema, Document, model } from "mongoose";

import { ModelNames } from "./models.names";
import { Gender } from "../typings/User.types";
import { AccountStatus } from "../typings/Account.types";


export class Admin extends Document {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email: string;
    password: string;
    avatar?: string;
    gender?: Gender;
    status: AccountStatus;
    isVerified: boolean;
}

const AdminSchema = new Schema(
    {
        firstName: {
            type: String,
            minlength: 2,
            maxlength: 25,
            trim: true,
            lowercase: false,
            required: true,
        },
        lastName: {
            type: String,
            minlength: 2,
            maxlength: 25,
            trim: true,
            lowercase: false,
            required: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        email: { type: String, index: true, required: true },
        password: { type: String, required: true },
        avatar: { type: String },
        gender: {
            type: String,
            trim: true,
            lowercase: true,
            enum: [Gender.MALE, Gender.FEMALE],
        },
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
        isVerified: { type: Boolean, default: false, required: true },
    },
    { timestamps: true },
);

export const AdminModel = model<Admin>(ModelNames.ADMIN, AdminSchema);
