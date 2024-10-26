import { HttpStatus } from "../types";

export default class ApiError extends Error{
    httpStatus : HttpStatus
    details? : Array<string> | null
    constructor(httpStatus : HttpStatus, message : string, details? : Array<string> | null){
        super(message)
        this.httpStatus = httpStatus;
        this.details = details
    }
}