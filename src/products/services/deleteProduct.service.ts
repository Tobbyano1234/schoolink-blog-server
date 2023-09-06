import httpStatus from "http-status";
import { ProductModel } from "../../entities";
import { DeleteProductDTO } from "../DTOs/DeleteProductDTO";
import { getProductByIDService } from "./getProduct.service";

export const deleteProduct = async (DeleteProductDTO: DeleteProductDTO) => {
    const { productID } = DeleteProductDTO;
    const { data: product } = await getProductByIDService({ productID });
    const { _id } = product;
    const deletedProduct = await ProductModel.findByIdAndDelete(_id);
    return { status: httpStatus.OK, message: `product deleted successfully`, data: deletedProduct }
}