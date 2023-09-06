import { ObjectId } from "mongodb";

export type LoginStatusDTO = {
  userID?: ObjectId;
  adminID?: ObjectId;
  token: string;
};
