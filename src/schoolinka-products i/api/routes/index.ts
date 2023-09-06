import { baseRouter, baseValidation } from "../../../shared/api";
import { ProductController } from "../controllers";
import productValidation from "../validations"


const { POST, GET, PUT, DELETE, router } = baseRouter();


POST("/", [baseValidation(productValidation.createProduct), ProductController.createProduct]);
PUT("/:productID", [baseValidation(productValidation.updateProduct), ProductController.updateProduct]);
DELETE("/:productID", [baseValidation(productValidation.deleteProduct), ProductController.deleteProduct]);
GET("/:productID", [baseValidation(productValidation.getProduct), ProductController.getProductByID]);
GET("/", [ProductController.getAllProducts]);
GET("/pagination/all", [baseValidation(productValidation.getPagination), ProductController.getProductPagination]);

export default router;