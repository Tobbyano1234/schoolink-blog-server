import { ProductModel } from "../../schoolinka-entities";
import httpStatus from "http-status";
import { CreateProductDTO } from "../DTOs/CreateProductDTO";



export const createProductService = async ({ name, description, price, imageUrl }: CreateProductDTO) => {
    const productExist = await ProductModel.findOne({ name });
    if (productExist) return { status: httpStatus.BAD_REQUEST, message: `product with ${name} already exist`, data: null };

    const product = await ProductModel.create({ name, description, price, imageUrl });
    return { status: httpStatus.CREATED, message: `product created successfully`, data: product };
}