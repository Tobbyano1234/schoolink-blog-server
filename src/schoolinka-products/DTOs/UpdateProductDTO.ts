

export type UpdateProductDTO = { productID: string } & Partial<{
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}>;
