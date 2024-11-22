import * as Yup from 'yup';
import { dniSchema, idSchema, nameSchema } from './generalSchemas';

export const userSchema = Yup.object().shape({
    name: nameSchema,
    password: Yup.string().max(100, "La contraseña debe ser más corta que cien caracteres").min(8, "La contraseña debe ser mayor a ocho caracteres"),
    employeeDNI: dniSchema ,
    role: idSchema,
})


