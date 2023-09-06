import { Types } from "mongoose";

export const toObjectId = (value: string, _helpers: any) => new Types.ObjectId(value);