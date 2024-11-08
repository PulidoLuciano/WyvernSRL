export interface saleType {
    date: string | null,
    client: string,
    product: string | null,
}

export interface CreateSaleErrors{
    date?: string,
    client?:string,
    product?:string
}