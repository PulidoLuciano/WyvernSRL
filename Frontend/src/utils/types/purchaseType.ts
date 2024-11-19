export interface purchaseType {
    description:string,
    unitPrice:string,
    paid:string,
    delivered:string,
    purchaseDate:string | null,
    quantity:string,
    currency:string,
    supplier:string,
}

export interface CreatePurchaseErrors{
    description?:string,
    unitPrice?:string,
    paid?:string,
    delivered?:string,
    purchaseDate?:string,
    quantity?:string,
    currency?:string,
}