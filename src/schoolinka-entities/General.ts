import { ObjectId } from "mongodb";
import { Schema, Document, model } from "mongoose";
import { ModelNames } from "./models.names";

export class General extends Document {
  collectionName: ModelNames;
  collectionID: string;
  associatedData: { [key:string]: any };
  isValid: boolean;
}

const GeneralSchema = new Schema(
  {
    collectionName: { type: String, required: true },
    collectionID: { type: ObjectId, required: true },
    associatedData: { type: Object },
    isValid: { type: Boolean, default: true },
 },
 { timestamps: true },
);

export const GeneralModel = model<General>(ModelNames.GENERAL, GeneralSchema);
