import { ObjectId } from "mongodb";
import { User } from "../famwork-entities";
import { ModelNames } from "../famwork-entities/models.names";
import { AccountSignType, AccountStatus } from "./Account.types";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export type UserMetaDataGeneral = {
  _id: ObjectId;
  collectionName: ModelNames.USER,
  collectionID: string,
  associatedData: {
    type: "metaData",
    metaData: {
      signType: AccountSignType,
      status: AccountStatus,
      firstLoginDate: Date,
      lastLoginDate: Date,
      passwordChangedAt: Date[],
      verifiedAt: Date,
      deactivatedAt: Date[],
    }
  };
};


export type DeletedUserDataGeneral = {
  _id: ObjectId;
  collectionName: ModelNames.USER,
  collectionID: string,
  associatedData: {
    type: "deletedUserData",
    deletedUserData: User
  };
};


