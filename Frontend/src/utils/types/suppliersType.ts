export interface suppliersType {
    name: string,
    email: string,
    phone:string,
    state:string,
    category:string,
    country:string,
    // cbu:string,
    // paymentMethod:string,
    // qualification:string
}

export interface CreateSupplierErrors {
    name?: string,
    email?: string,
    phone?:string,
    state?:string,
    category?:string,
    country?:string,
    // cbu?:string,
    // paymentMethod?:string,
    // qualification?:string
}



