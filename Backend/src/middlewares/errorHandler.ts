import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";
import HttpStatuses from "../utils/HttpStatus";
import ApiError from "../utils/ApiError";

export const errorHandler : ErrorRequestHandler = (err : ApiError, req : Request, res : Response, next : NextFunction) => {
    return res.status(err.httpStatus.code).json({reason: err.httpStatus.reason, message: err.message, stack: err.stack, details: err.details})
}

export const notFoundHandler = (req : Request, res : Response, next : NextFunction) => {
    const err = new ApiError(HttpStatuses.NOT_FOUND, "La ruta no fue encontrada.")
    return next(err)
}

export function tryCatch(fn : RequestHandler){
    return async (req : Request, res : Response, next : NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.log(error)
            const isApiError = error instanceof ApiError
            if(!isApiError)
                error = new ApiError(HttpStatuses.INTERNAL_SERVER_ERROR, (error as Error).message);
            return next(error);
        }
    }
}