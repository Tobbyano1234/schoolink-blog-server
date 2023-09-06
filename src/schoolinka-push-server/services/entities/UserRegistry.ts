import { ObjectId } from "mongodb"
import { Schema, model } from "mongoose";
import { ModelNames } from "../../../famwork-entities";


type SocketType = {
  socketID: string;
};

export class UserRegistry {
  userID: ObjectId;
  sockets: SocketType[];
}

const userRegistrySchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: ModelNames.USER, required: true },
    sockets: { type: Array },
  },
  { 
    timestamps: true,
  }
);

export const UserRegistryModel = model<UserRegistry>(ModelNames.USER_REGISTRY, userRegistrySchema);
