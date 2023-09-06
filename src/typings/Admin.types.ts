import { ObjectId } from "mongodb";

import { ModelNames } from "../famwork-entities/models.names";
import { AccountSignType, AccountStatus } from "./Account.types";

export type AdminMetaDataGeneral = {
  _id: ObjectId;
  collectionName: ModelNames.ADMIN,
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
