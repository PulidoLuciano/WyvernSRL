export interface suppliersType {
    name: string,
    email: string,
    phone:string,
    state:string,
    category:string,
    country:string,
    score?:string
}

export interface suppliersFilter {
    name:string,
    category:string,
    state:string,
    country:string,
}

export interface CreateSupplierErrors {
    name?: string,
    email?: string,
    phone?:string,
    state?:string,
    category?:string,
    country?:string,
    score?:string,
}

export interface marketType {
    name: string,
}

export interface CreateMarketsErrors {
    name?: string,
}



