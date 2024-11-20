import * as Yup from 'yup';
import { phoneSchema, idSchema, emailSchema, nameSchema } from './generalSchemas';


export const clientSchema = Yup.object().shape({
    name: nameSchema,
    email: emailSchema.required("Este campo es obligatorio"),
    suscription: Yup.string().matches(/^(true|false)$/,"Este dato no es correcto").required("Este campo es obligatorio"),
    phone: phoneSchema,
    country: idSchema,
    platform: idSchema,
})


