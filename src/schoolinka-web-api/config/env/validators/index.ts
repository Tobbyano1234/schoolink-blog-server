import { Joi } from "celebrate";

export const Validate = (schema: any) => Joi.object().keys(schema).unknown();