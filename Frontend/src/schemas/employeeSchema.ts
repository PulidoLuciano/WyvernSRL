import * as Yup from "yup"
import { dateSchema, dniSchema, emailSchema, idSchema, nameSchema, phoneSchema } from "./generalSchemas"
export const employeeSchema = Yup.object().shape({
    name: nameSchema,
    email: emailSchema.required("Este campo es obligatorio"),
    phone: phoneSchema.required("Este campo es obligatorio"),
    dni: dniSchema,
    hiringDate: dateSchema,
    salary: Yup.number().required("Este campo es obligatorio"),
    country: idSchema,
    state: idSchema,
    position: idSchema
}) 
