import { z } from "zod";
import { borradoSchema, idSchema, nombreSchema } from "./generalSchemas";

export const RolesSchemaFilter = z.object({
    id: idSchema,
    nombre: nombreSchema,
    borrado: borradoSchema,
    Usuarios: z.any()
})

export const RolesSchemaCreate = z.object({
    nombre: nombreSchema
})