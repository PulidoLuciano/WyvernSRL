import * as Yup from 'yup'
import { dateSchema, idSchema, nameSchema } from './generalSchemas'

export const saleSchema = Yup.object().shape({
    date: dateSchema,
    client: nameSchema,
    product: idSchema
})