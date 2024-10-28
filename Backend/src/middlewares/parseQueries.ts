import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import HttpStatuses from "../utils/HttpStatus";
import { createPrismaFilterSchema } from "../schemas/querySchema";
import { ZodObject } from "zod";

export default function parseQueries(validationSchema : ZodObject<any>){
    return (req : Request, res : Response, next : NextFunction) => {
    try {
        req.query = parseToPrisma(req.query, validationSchema);
        next()
    } catch (error) {
        if(error instanceof ApiError)
            next(error);
        next(new ApiError(HttpStatuses.INTERNAL_SERVER_ERROR, (error as Error).message));
    }
}
}

type PrismaSearch = {
    where?: any
    select?: any
    skip?: any
    take?: any
}

function parseToPrisma(query : any, validationSchema : ZodObject<any>){
    let prismaSearch : PrismaSearch = {};
    if(query.include){
        if(!query.include.forEach)
            query.include = [query.include]
        prismaSearch.select = {};
        query.include.forEach((column : string) => {
            prismaSearch.select[column] = true
        });
    }
    if(query.limit)
        prismaSearch.take = query.limit;
    if(query.offset)
        prismaSearch.skip = query.offset;
    
    prismaSearch.where = {}
    const keys = Object.keys(query).filter(key => !(key == "include" || key == "limit" || key == "offset"));
    keys.forEach(key => prismaSearch.where[key] = query[key])

    const schema = createPrismaFilterSchema(prismaSearch, validationSchema);
    prismaSearch = schema.parse(prismaSearch);
    return prismaSearch;
}

