import { celebrate as validate, SchemaOptions } from 'celebrate';


export const baseValidation = (SchemaOptions: SchemaOptions) => validate(SchemaOptions, {
  abortEarly: false,
  stripUnknown: true,
});
