export interface productType {
    name:string,
    date:string,
    category:string,
    price:string,
}

export interface CreateProductErrors {
    name?:string,
    date?:string,
    category?:string,
    price?:string,
}