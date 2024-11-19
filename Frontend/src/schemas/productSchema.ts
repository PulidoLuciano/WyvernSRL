import * as Yup from 'yup'
import { dateSchema, idSchema, nameSchema } from './generalSchemas'

export const productSchema = Yup.object().shape({

    name: nameSchema,
    date: dateSchema,
    price: Yup.number().positive("Ingrese un numero positivo").typeError("Ingrese un numero valido").required("Este campo es obligatorio"),
    category: idSchema
})