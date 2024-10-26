import { z } from "zod";
import { correoSchema, idSchema, nombreSchema, telefonoSchema } from "./generalSchemas";

export const ClientSchema = z.object({
    nombre: nombreSchema,
    correo: correoSchema,
    telefono: telefonoSchema.optional().nullable(),
    suscripto: z.coerce.boolean(),
    Paises_id: idSchema,
    Plataformas_id: idSchema,
    Plataformas: z.any(),
    Paises: z.any()
})