import { HttpStatus } from "../types";

export default class ApiError extends Error{
    httpStatus : HttpStatus
    constructor(httpStatus : HttpStatus, message : string){
        super(message)
        this.httpStatus = httpStatus;
    }
}