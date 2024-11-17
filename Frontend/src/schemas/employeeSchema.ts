import * as Yup from "yup"
import { dateSchema, emailSchema, idSchema, nameSchema, phoneSchema } from "./generalSchemas"
export const employeeSchema = Yup.object().shape({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    dni: Yup.number().integer().required("Este campo es obligatorio"),
    hiringDate: dateSchema,
    salary: Yup.number().required("Este campo es obligatorio"),
    country: idSchema,
    state: idSchema,
    position: idSchema
}) 
