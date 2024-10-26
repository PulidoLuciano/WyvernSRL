import { NextFunction, Request, RequestHandler, Response, Router } from "express"
import { ROLE } from "./utils/Role"

export type AuthenticationToken = { 
    role : ROLE
    id : number
}

export type HttpStatus = {
    code : number
    reason : string
}

export interface UserRequest extends Request{
    user? : AuthenticationToken
}

export type WyvernRouter = {
    path : string
    routes : Array<WyvernRoute>
}

export type WyvernRoute = {
    path : string
    authentication: boolean
    authorization : Array<ROLE>
    middlewares : Array<RequestHandler>
    handler : RequestHandler
    method : "GET" | "POST" | "PUT" | "DELETE"
}