import httpStatus from "http-status";
import { ProductModel } from "../../schoolinka-entities";
import { GetProductDTO } from "../DTOs/GetProductDTO";


export const getProductByIDService = async ({ productID }: GetProductDTO) => {
    const singleProduct = await ProductModel.findOne({ _id: productID });
    if (!singleProduct) throw new Error(`product with ${productID} does not exist`);

    return { status: httpStatus.OK, message: `product fetched successfully`, data: singleProduct };
};

export const getAllProductsService = async () => {
    const products = await ProductModel.find();
    if (products.length === 0) throw new Error(`you don't have any product`);

    return { status: httpStatus.OK, message: `all products fetched successfully`, data: products };
};
