import { NextFunction, Request, Response } from "express";
import { AuthenticationToken, ROLE, UserRequest} from "../types";
import ApiError from "../utils/ApiError";
import HttpStatuses from "../utils/HttpStatus";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export default function authorization(neededRol : ROLE){
    return (req : Request, res : Response, next : NextFunction) => {
        try {
            if(!req.cookies?.authenticationToken) 
                throw new ApiError(HttpStatuses.UNAUTHORIZED, "Necesita iniciar sesión para realizar esta acción.");

            const {authenticationToken} = req.cookies;

            const jwtPassword = process.env.JWT_PASSWORD
            if(!jwtPassword) 
                throw new ApiError(HttpStatuses.INTERNAL_SERVER_ERROR, "No se ha definido una contraseña para los JWT");
            
            const tokenData = jwt.verify(authenticationToken, jwtPassword);
            
            if((tokenData as AuthenticationToken).role != neededRol)
                throw new ApiError(HttpStatuses.UNAUTHORIZED, `No puede realizar esta acción con el rol de ${(tokenData as AuthenticationToken).role}`);

            (req as UserRequest).user = (tokenData as AuthenticationToken);
            return next();
        } catch (error) {
            if((error as ApiError).httpStatus)
                return next(error)
            else if(error instanceof JsonWebTokenError)
                return next(new ApiError(HttpStatuses.UNAUTHORIZED, "Token no válido"))
            else
                return next(new ApiError(HttpStatuses.INTERNAL_SERVER_ERROR, (error as Error).message))
        }  
    }
}