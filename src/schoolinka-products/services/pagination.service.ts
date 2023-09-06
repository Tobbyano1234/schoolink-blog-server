import { ProductModel } from "../../schoolinka-entities";
import httpStatus from "http-status";
import { GetProductTableDTO } from "../DTOs/PaginatioDTO";
import { pagination } from "../../shared/helpers/pagination";



export const getProductPagination = async (GetProductTableDTO: GetProductTableDTO) => {
    const { page, limit: _limit } = GetProductTableDTO as GetProductTableDTO;
    const { skip, limit } = pagination(page, _limit)
    const products = await ProductModel.find().limit(limit).skip(skip);
    if (products.length === 0) throw new Error(`you don't have any product`);

    return { status: httpStatus.OK, message: `all products fetched successfully`, data: products };
};
