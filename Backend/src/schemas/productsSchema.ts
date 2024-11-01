import { z } from "zod";
import { borradoSchema, dateTimeSchema, idSchema, nombreSchema } from "./generalSchemas";


export const ProductsSchemaFilter = z.object({
    id:idSchema,
    nombre: nombreSchema,
    precio: z.number().safe().positive().lt(99999999,"Este valor excede lo admitido por el sistema."),
    lanzamiento: dateTimeSchema,
    Categorias_id: idSchema,
    borrado: borradoSchema,
    Categorias: z.any()
})

export const ProductsSchemaCreate = z.object({
    nombre: nombreSchema,
    precio: z.coerce.number().safe().positive().lt(99999999,"Este valor excede lo admitido por el sistema."),
    lanzamiento: dateTimeSchema,
    Categorias_id:idSchema,
})