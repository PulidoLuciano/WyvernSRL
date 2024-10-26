import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { UserRequest } from "../types";
import ApiError from "../utils/ApiError";
import HttpStatuses from "../utils/HttpStatus";

export default async function audit(req : Request, res : Response, next : NextFunction) : Promise<void>{
    const request : UserRequest = req
    if(!request.user)
        throw new ApiError(HttpStatuses.FORBIDDEN, "Necesita iniciar sesión para ser auditado");
    await prisma.$queryRaw`SET @User = ${request.user.id}`
    next()
}