import { z, ZodBigInt, ZodBoolean, ZodEnum, ZodError, ZodNumber, ZodObject, ZodSchema, ZodString } from "zod"

const FilterSchema = z.object({
    skip: z.coerce.number(),
    take: z.coerce.number(),
    select: z.any(),
    where: z.any()
})

type PrismaSearch = {
    where?: any
    select?: any
    skip?: any
    take?: any
}

export function createPrismaFilterSchema(query : PrismaSearch, originalSchema : ZodObject<any>){    
    const keys = originalSchema.keyof();
    let selectShape : z.ZodRawShape = {};
    let whereShape : z.ZodRawShape = {};
    
    if(query.select){
        const selectKeys = Object.keys(query.select);
        for (let i = 0; i < selectKeys.length; i++) {
            const key = selectKeys[i];
            keys.parse(key);
            selectKeys.forEach((key : string) => selectShape[key] = z.literal(true))
        }
    }
    
    if(query.where){
        const whereKeys = Object.keys(query.where);
        for (let i = 0; i < whereKeys.length; i++) {
            const key = whereKeys[i];
            keys.parse(key);
        }
        whereKeys.forEach((key : string) => {
            const schemaProperty = (originalSchema.shape[key] instanceof ZodString) ? z.string() : (originalSchema.shape[key] instanceof ZodBigInt) ? z.coerce.number() : (originalSchema.shape[key] instanceof ZodBoolean) ? z.coerce.boolean() : z.coerce.number();
            if(typeof query.where[key] == "object"){
                const whereKeys = Object.keys(query.where[key]);
                const schemaKey : z.ZodRawShape = {} 
                whereKeys.forEach((keyKey : string) => {
                    schemaKey[keyKey] = schemaProperty;
                })
                whereShape[key] = z.object(schemaKey);
            }else{
                whereShape[key] = schemaProperty;
            }
        })
    }
    return z.object({
        skip: z.coerce.number().optional(),
        take: z.coerce.number().optional(),
        select: z.object(selectShape).optional(),
        where: z.object(whereShape).optional()
    })
}