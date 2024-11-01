import { array, string, z } from "zod";
import { borradoSchema, idSchema, nombreSchema } from "./generalSchemas";

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

export const UserSchemaFilter = z.object({
    id: idSchema,
    nombre: nombreSchema,
    contrasenia: z.string().max(100, "La contraseña debe ser más corta que cien caracteres").min(8, "La contraseña debe ser mayor a ocho caracteres"),
    Empleados_id: idSchema,
    Roles_id: idSchema,
    borrado: borradoSchema,
    Empleados: z.any(),
    Roles: z.any()
})

export const UserSchemaCreate = z.object({
    nombre: nombreSchema,
    contrasenia: z.string().max(100, "La contraseña debe ser más corta que cien caracteres").min(8, "La contraseña debe ser mayor a ocho caracteres"),
    Empleados_id: idSchema,
    Roles_id: idSchema,
})

export const IdsSchema = z.object({
    ids: array(z.coerce.number())
})