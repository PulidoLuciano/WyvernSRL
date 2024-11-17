import * as Yup from 'yup'
import { dateSchema, descriptionSchema, idSchema } from './generalSchemas'

export const breacheSchema = Yup.object().shape({
    description: descriptionSchema,
    date: dateSchema,
    breachLevel: idSchema
}) 