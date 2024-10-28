import { z } from "zod";
import { borradoSchema, dateTimeSchema, idSchema } from "./generalSchemas";

export const SalesSchema = z.object({
    id: idSchema.optional(),
    fecha: dateTimeSchema,
    Clientes_id: idSchema,
    Productos_id: idSchema,
    borrado: borradoSchema,
    Clientes: z.any(),
    Productos: z.any()
})