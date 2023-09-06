import httpStatus from "http-status";
import { ProductModel } from "../../entities";
import { UpdateProductDTO } from "../DTOs/UpdateProductDTO";
import { getProductByIDService } from "./getProduct.service";

export const updateProduct = async (UpdateProductDTO: UpdateProductDTO) => {
    const { productID, name, description, price, imageUrl } = UpdateProductDTO;
    let newName: string, newDescription: string, newPrice: number, newImageUrl: string;
    const { data: product } = await getProductByIDService({ productID });
    const { _id, name: _name, description: _description, price: _price, imageUrl: _imageUrl } = product;
    newName = name || _name;
    newDescription = description || _description;
    newPrice = price || _price;
    newImageUrl = imageUrl || _imageUrl;
    const updatedProduct = await ProductModel.findByIdAndUpdate(_id, { name: newName, description: newDescription, price: newPrice, imageUrl: newImageUrl }, { new: true });
    return { status: httpStatus.OK, message: `product updated successfully`, data: updatedProduct }
}