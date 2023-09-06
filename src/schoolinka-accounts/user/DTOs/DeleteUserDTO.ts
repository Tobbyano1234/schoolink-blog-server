import { ObjectId } from "mongodb";

export type DeleteUserProfileDTO = {
  userID: string | ObjectId;
  adminID: string | ObjectId;
  role: string;
};

