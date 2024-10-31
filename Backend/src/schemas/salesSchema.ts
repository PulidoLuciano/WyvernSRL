import { z } from "zod";
import { borradoSchema, dateTimeSchema, idSchema } from "./generalSchemas";

export const SalesSchemaFilter = z.object({
    id: idSchema,
    fecha: dateTimeSchema,
    Clientes_id: idSchema,
    Productos_id: idSchema,
    borrado: borradoSchema,
    Clientes: z.any(),
    Productos: z.any()
})

export const SalesSchemaCreate = z.object({
    fecha: dateTimeSchema,
    Clientes_id: idSchema,
    Productos_id: idSchema,
})