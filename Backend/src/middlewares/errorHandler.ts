import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import HttpStatuses from "../utils/HttpStatus";
import ApiError from "../utils/ApiError";

export const errorHandler : ErrorRequestHandler = (err : ApiError, req : Request, res : Response, next : NextFunction) => {
    return res.status(err.httpStatus.code).json({reason: err.httpStatus.reason, message: err.message, stack: err.stack})
}

export const notFoundHandler = (req : Request, res : Response, next : NextFunction) => {
    const err = new ApiError(HttpStatuses.NOT_FOUND, "La ruta no fue encontrada.")
    return next(err)
}