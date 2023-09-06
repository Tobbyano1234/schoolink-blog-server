import { ObjectId } from "mongodb";
import { User } from "../../../famwork-entities";

export type GetUserDTO = {
  email?: string;
  userID?: string | ObjectId;
};

export type GetUserOptions = {
  onUserNotFound?: ({ email, userID }: GetUserDTO) => void;
  withPassword?: boolean;
};

export type CheckUserDTO = {
  username: string;
  userID: string;
  computedProps?: {
    _user?: User;
  }
};

