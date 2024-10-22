import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export enum ROLE {
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

export interface UserRequest extends Request{
    user : AuthenticationToken
}