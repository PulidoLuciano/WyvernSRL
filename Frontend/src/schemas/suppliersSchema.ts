import * as Yup from "yup"
import { dateSchema, descriptionSchema, emailSchema, idSchema, nameSchema, phoneSchema } from "./generalSchemas"

export const supplierSchema = Yup.object().shape({
    name: nameSchema,
    email: emailSchema.optional(),
    phone: phoneSchema.optional(),
    category: idSchema,
    state: idSchema,
}) 

export const supplierEditSchema = Yup.object().shape({
    name: nameSchema,
    email: emailSchema.optional(),
    phone: phoneSchema.optional(),
    category: idSchema,
    state: Yup.number().optional().typeError("Este id no es valido"),
    // score: Yup.string().min(4,"La calificacion debe tener min. 4 caracteres").max(20,"La calificacion debe tener máx. 20 caracteres").optional()
}) 

export const contractSchema = Yup.object().shape({
    motive: descriptionSchema,
    expireDate: dateSchema,
    payDate: dateSchema,
    amount: Yup.number().positive("Ingrese un número positivo").typeError("Este número no es valido").required("Este campo es obligatorio"),
    currency: idSchema
})


export const purchaseSchema = Yup.object().shape({

    description: descriptionSchema,
    unitPrice: Yup.number().positive("Ingrese un numero positivo").required("Este campo es obligatorio").typeError("Ingrese un numero"),
    paid: Yup.boolean().required("Este campo es obligatorio"),
    delivered: Yup.boolean().required("Este campo es obligatorio"),
    purchaseDate: Yup.date().required("Este campo es obligatorio").typeError("Ingrese una fecha valida"),
    quantity: Yup.number().positive("Ingrese un numero positivo").integer("Ingrese un numero entero").required("Este campo es obligatorio").typeError("Ingrese un numero"),
    currency: idSchema
})

export const marketSchema = Yup.object().shape({

    name: nameSchema,

})