import { Document, Schema, model } from "mongoose";
import { ModelNames } from "./models.names";

export class Product extends Document {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};
export class User extends Document {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true }
},
    { timestamps: true },
);

export const ProductModel = model<Product>(ModelNames.PRODUCT, ProductSchema);
