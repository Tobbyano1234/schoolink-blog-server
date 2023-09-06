import { Types } from "mongoose";

export const toObjectId = (value: string) => new Types.ObjectId(value);