import { z } from "zod";
import { borradoSchema, idSchema, nombreSchema } from "./generalSchemas";

export const MarketsSchemaFilter = z.object({
    id: idSchema,
    nombre: nombreSchema,
    borrado: borradoSchema,
    Proveedores: z.any()
})

export const MarketsSchemaCreate = z.object({
    nombre: nombreSchema
})