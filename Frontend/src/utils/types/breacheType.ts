export interface breacheType {
    description:string,
    date:string | null,
    breachLevel:string,
    contractId?:string,
    purchaseId?:string
}


export interface CreateBreacheErrors {
    description?:string,
    date?:string,
    breachLevel?:string,
}