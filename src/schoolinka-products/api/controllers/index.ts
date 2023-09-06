import { Request } from "express";
import { getAllProductsService, getProductByIDService } from "../../services/getProduct.service";
import { BaseController } from "../../../shared/api";
import { CreateProductDTO } from "../../DTOs/CreateProductDTO";
import { createProductService } from "../../services/createProduct.service";
import { updateProduct } from "../../services/updateProduct.service";
import { UpdateProductDTO } from "../../DTOs/UpdateProductDTO";
import { DeleteProductDTO } from "../../DTOs/DeleteProductDTO";
import { deleteProduct } from "../../services/deleteProduct.service";
import { getProductPagination } from "../../services/pagination.service";



export class ProductController {
    static createProduct = BaseController(async (request: Request) => {
        const CreateProductDTO = request.body as CreateProductDTO;
        const { status, message, data } = await createProductService(CreateProductDTO);
        return { status, message, data };
    });

    static getProductByID = BaseController(async (request: Request) => {
        const productID = request.params.productID
        const { status, message, data } = await getProductByIDService({ productID });
        return { status, message, data };
    });

    static getAllProducts = BaseController(async (request: Request) => {
        const { status, message, data } = await getAllProductsService();
        return { status, message, data };
    });

    static getProductPagination = BaseController(async (request: Request) => {
        const GetProductTableDTO = request.query;
        const { status, message, data } = await getProductPagination(GetProductTableDTO);
        return { status, message, data };
    });

    static updateProduct = BaseController(async (request: Request) => {
        const productID = request.params.productID;
        const UpdateProductDTO = { productID, ...request.body } as UpdateProductDTO;
        const { status, message, data } = await updateProduct(UpdateProductDTO);
        return { status, message, data };
    });

    static deleteProduct = BaseController(async (request: Request) => {
        const productID = request.params.productID;
        const DeleteProductDTO = { productID } as DeleteProductDTO;
        const { status, message } = await deleteProduct(DeleteProductDTO);
        return { status, message};
    });
}