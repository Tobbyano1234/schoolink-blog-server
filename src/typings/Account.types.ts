import { ModelNames } from "../famwork-entities";


export enum AccountType {
    USER = "user",
    ADMIN = "admin"
}

export enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "inprogress",
    COMPLETED = "completed"
};

export enum AccountSignType {
    TWITTER = "twitter",
    GOOGLE = "google",
    FACEBOOK = "facebook",
    DIRECT = "direct",
}

export interface AccountTokenType {
    _id: string;
    issuedAt: number;
    email?: string;
    accountType: AccountType;
}

export enum AccountStatus {
    BANNED = "banned",
    SUSPENDED = "suspended",
    ACTIVE = "active",
    INACTIVE = "inactive",
    DEACTIVATED = "deactivated",
}

export type AccountMetaDataGeneral = {
    collectionName: ModelNames,
    collectionID: string,
    associatedData: {
        metaData: {
            signType: AccountSignType,
            status: AccountStatus,
            firstLoginDate: Date,
            lastLoginDate: Date,
            passwordChangedAt: Date[],
            verifiedAt: Date,
        }
    };
};
