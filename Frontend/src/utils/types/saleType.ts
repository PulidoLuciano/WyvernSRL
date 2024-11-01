export interface saleType {
    date: string,
    client: string,
    product: string,
    deleted?:string
}

export interface CreateSaleErrors{
    date?: string,
    client?:string,
    product?:string
}