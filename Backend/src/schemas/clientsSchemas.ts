import { z } from "zod";
import { borradoSchema, correoSchema, idSchema, nombreSchema, telefonoSchema } from "./generalSchemas";

export const ClientSchemaFilter = z.object({
    id:idSchema,
    nombre: nombreSchema,
    correo: correoSchema,
    telefono: telefonoSchema,
    suscripto: z.coerce.boolean(),
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