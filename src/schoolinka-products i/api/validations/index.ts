import { Joi } from "celebrate";
import { toObjectId } from "../../../shared/helpers/validateToObjectId";


export default {
    createProduct: {
        body: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            imageUrl: Joi.string().required(),
        })
    },
    getProduct: {
        params: {
            productID: Joi.string().custom(toObjectId).required(),
        }
    },
    updateProduct: {
        body: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            imageUrl: Joi.string().required(),
        }),
        params: {
            productID: Joi.string().custom(toObjectId).required(),
        }
    },

    deleteProduct: {
        params: {
            productID: Joi.string().custom(toObjectId).required(),
        }
    },
    getPagination: {
        query: {
            page: Joi.number(),
            limit: Joi.number(),
        }
    },
};