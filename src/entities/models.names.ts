import { Product, User } from "./Product"

export enum ModelNames {
    PRODUCT = "product",
    USER ="user"
}

export type ModelTypeMap = {
    [ModelNames.PRODUCT]: Product,
    [ModelNames.USER]: User
}