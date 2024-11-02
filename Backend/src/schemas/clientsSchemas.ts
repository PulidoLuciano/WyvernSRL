import { z } from "zod";
import { borradoSchema, correoSchema, idSchema, nombreSchema, telefonoSchema, trueBooleanSchema } from "./generalSchemas";

export const ClientSchemaFilter = z.object({
    id:idSchema,
    nombre: nombreSchema,
    correo: correoSchema,
    telefono: telefonoSchema,
    suscripto: trueBooleanSchema,
    borrado: borradoSchema,
    Paises_id: idSchema,
    Plataformas_id: idSchema,
    Plataformas: z.any(),
    Paises: z.any()
})

export const ClientSchemaCreate = z.object({
    nombre: nombreSchema,
    correo: correoSchema,
    telefono: telefonoSchema.optional().nullable(),
    suscripto: z.coerce.boolean(),
    Paises_id: idSchema,
    Plataformas_id: idSchema,
})

export const broadcastSchema = z.object({
    subject: z.string({message: "Es necesario un asunto para el broadcast"}).min(2, "Se necesita un asunto de al menos dos caracteres").max(100, "No se puede enviar un asunto de mas de 100 caracteres"),
    text: z.string({message: "Es necesario un texto para el broadcast"}).min(2, "El texto debe ser de al menos dos caracteres")
})