import { z } from "zod";

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