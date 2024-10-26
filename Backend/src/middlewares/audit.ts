import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { UserRequest } from "../types";

export default async function audit(req : UserRequest, res : Response, next : NextFunction){
    await prisma.$queryRaw`SET @User = ${req.user.id}`
    next()
}