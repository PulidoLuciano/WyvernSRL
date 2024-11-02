export interface contractType {
    motive:string,
    expireDate:string,
    payDate:string,
    currency:string,
    amount:string,
    supplier:string
}

export interface CreateContractErrors{
    motive?:string,
    expireDate?:string,
    payDate?:string,
    currency?:string,
    amount?:string,
}