import { z } from "zod";
import { borradoSchema, dateTimeSchema, idSchema, nombreSchema } from "./generalSchemas";


export const ProductsSchema = z.object({
    id:idSchema.optional(),
    nombre: nombreSchema,
    precio: z.number().safe().positive().lt(99999999,"Este valor excede lo admitido por el sistema."),
    lanzamiento: dateTimeSchema,
    Categorias_id:idSchema,
    borrado: borradoSchema,
    Categorias: z.any()
})