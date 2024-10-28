import { array, string, z } from "zod";
import { borradoSchema } from "./generalSchemas";

export const LoginSchema = z.object({
    nombre: z.string({
        required_error: "Es necesario un nombre de usuario",
        invalid_type_error: "El nombre de usuario debe ser una cadena"
    }),
    password: z.string({
        required_error: "Es necesaria una contraseña",
        invalid_type_error: "La contraseña debe ser una cadena"
    })
})

export const UserSchema = z.object({
    nombre: z.string().trim(),
    contrasenia: z.string(),
    Empleados_id: z.coerce.number(),
    Roles_id: z.coerce.number(),
    borrado: borradoSchema
})

export const UserSchemaOptional = z.object({
    nombre: z.string().trim().nullish(),
    contrasenia: z.string().nullish(),
    Empleados_id: z.coerce.number().nullish(),
    Roles_id: z.coerce.number().nullish()
})

export const IdsSchema = z.object({
    ids: array(z.coerce.number())
})