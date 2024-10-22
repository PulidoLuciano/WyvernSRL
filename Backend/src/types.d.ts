export enum Role{
    Admin = "Admin",
    Ventas = "Ventas",
    RRHH = "RRHH",
    Compras = "Compras",
    Auditor = "Auditor"
}

export type AuthenticationToken = { 
    role : Role
    id : number
}

export type HttpStatus = {
    code : number
    reason : string
}