import { z } from "zod";
import { borradoSchema, idSchema, nombreSchema } from "./generalSchemas";

export const PuestosSchemaFilter = z.object({
    id: idSchema,
    nombre: nombreSchema,
    borrado: borradoSchema,
    Empleados_Puestos: z.any(),
    Areas_id: idSchema,
    Areas: z.any()
})

export const PuestosSchemaCreate = z.object({
    nombre: nombreSchema,
    Areas_id: idSchema
})