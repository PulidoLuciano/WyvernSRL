import { z } from "zod";
import { borradoSchema, dateTimeSchema, idSchema } from "./generalSchemas";

export const ContactsSchemaFilter = z.object({
    id: idSchema,
    duracion: z.coerce.number(),
    motivo: z.string().trim().min(1, "El motivo no puede estar vacío").max(250, "Escriba un motivo con menos de 250 caracteres"),
    fecha: dateTimeSchema,
    Clientes_id: idSchema,
    Medios_id: idSchema,
    borrado: borradoSchema,
    Clientes: z.any(),
    Medios: z.any()
})

export const ContactsSchemaCreate = z.object({
    duracion: z.coerce.number().optional().nullable(),
    motivo: z.string().trim().min(1, "El motivo no puede estar vacío").max(250, "Escriba un motivo con menos de 250 caracteres"),
    fecha: dateTimeSchema,
    Clientes_id: idSchema,
    Medios_id: idSchema,
})