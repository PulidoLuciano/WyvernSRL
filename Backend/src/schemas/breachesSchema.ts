import { z } from "zod";
import { borradoSchema, dateTimeSchema, descripcionSchema, idSchema, nombreSchema } from "./generalSchemas";

export const BreachSchemaFilter = z.object({
    id: idSchema,
    descripcion: descripcionSchema,
    fecha: dateTimeSchema,
    Contratos_id: idSchema,
    Compras_id: idSchema,
    NivelDeIncumplimiento_id: idSchema,
    borrado: borradoSchema,
    Compras: z.any(),
    Contratos: z.any(),
    NivelDeIncumplimiento: z.any()
})

export const BreachSchemaCreate = z.object({
    descripcion: descripcionSchema,
    fecha: dateTimeSchema,
    Contratos_id: idSchema.nullable().optional(),
    Compras_id: idSchema.nullable().optional(),
    NivelDeIncumplimiento_id: idSchema
})