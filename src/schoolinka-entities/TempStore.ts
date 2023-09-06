import { Schema, Document, model } from "mongoose";
import { ModelNames } from "./models.names";

export class TempStore extends Document {
  key: string;
  value: string;
  expirationTime?: number;
  beginTime: Date;
}

const TempStoreSchema = new Schema(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
    expirationTime: { type: Number },
    beginTime: { type: Date, default: new Date() }
 },
 { timestamps: true },
);

export const TempStoreModel = model<TempStore>(ModelNames.TEMP_STORE, TempStoreSchema);
