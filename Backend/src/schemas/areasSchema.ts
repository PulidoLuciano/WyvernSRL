import { z } from "zod";
import { borradoSchema, idSchema, nombreSchema } from "./generalSchemas";

export const AreasSchemaFilter = z.object({
    id: idSchema,
    nombre: nombreSchema
})

export const AreasSchemaCreate = z.object({
    nombre: nombreSchema
})