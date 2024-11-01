import { z } from "zod";
import { borradoSchema, idSchema, nombreSchema } from "./generalSchemas";

export const AreasSchemaFilter = z.object({
    id: idSchema,
    nombre: nombreSchema,
    borrado: borradoSchema,
    Puestos: z.any()
})

export const AreasSchemaCreate = z.object({
    nombre: nombreSchema
})