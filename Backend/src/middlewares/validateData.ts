import { Request, Response, NextFunction } from 'express';
import HttpStatuses from '../utils/HttpStatus';
import { z, ZodError } from 'zod';
import ApiError from '../utils/ApiError';

export function validateData(schema: z.ZodObject<any, any> | z.ZodArray<any, any>) {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => issue.message)
        next(new ApiError(HttpStatuses.BAD_REQUEST, "Datos incorrectos", errorMessages));
      }
      if(error instanceof ApiError)
        next(error)
      next(new ApiError(HttpStatuses.INTERNAL_SERVER_ERROR, (error as Error).message))
    }
  };
}