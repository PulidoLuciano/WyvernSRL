import { z } from "zod";
import { borradoSchema, correoSchema, idSchema, nombreSchema, telefonoSchema, trueBooleanSchema } from "./generalSchemas";

export const ProviderSchemaFilter = z.object({
    id:idSchema,
    nombre: nombreSchema,
    correo: correoSchema,
    telefono: telefonoSchema,
    borrado: borradoSchema,
    Provincias_id: idSchema,
    Rubros_id: idSchema,
    Rubros: z.any(),
    Provincias: z.any(),
    Compras: z.any(),
    Contratos: z.any()
})

export const ProviderSchemaCreate = z.object({
    nombre: nombreSchema,
    correo: correoSchema.optional().nullable(),
    telefono: telefonoSchema.optional().nullable(),
    Provincias_id: idSchema,
    Rubros_id: idSchema,
})