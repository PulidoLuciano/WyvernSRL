import * as Yup from "yup"
export const supplierSchema = Yup.object().shape({
    name: Yup.string().trim().min(2,"Ingrese un nombre de mínimo 2 letras").max(32,"Ingrese un nombre de máximo 32 letras").required("Este campo es obligatorio"),
    email: Yup.string().email("Ingrese un email valido").optional(),
    phone: Yup.string().matches(/^(\+?\d{1,4}?[-.\s]?)?(\(?\d{1,3}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}|$/,"Ingrese un telefono valido").optional(),
    category: Yup.number().required("Este campo es obligatorio").typeError("Este id no es valido"),
    state: Yup.number().required("Este campo es obligatorio").typeError("Este id no es valido"),
}) 

export const supplierEditSchema = Yup.object().shape({
    name: Yup.string().trim().min(2,"Ingrese un nombre de mínimo 2 letras").max(32,"Ingrese un nombre de máximo 32 letras").optional(),
    email: Yup.string().email("Ingrese un email valido").optional().nullable(),
    phone: Yup.string().matches(/^(\+?\d{1,4}?[-.\s]?)?(\(?\d{1,3}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}|$/,"Ingrese un telefono valido").optional().nullable(),
    category: Yup.number().optional().typeError("Este id no es valido"),
    state: Yup.number().optional().typeError("Este id no es valido"),
    score: Yup.string().min(4,"La calificacion debe tener min. 4 caracteres").max(10,"La calificacion debe tener máx. 10 caracteres").optional()
}) 

export const contractSchema = Yup.object().shape({
    motive: Yup.string().min(10,"La descripción debe tener min. 15 caracteres.").max(200,"La descripcion debe tener max. 200 caracteres.").required("Este campo es obligatorio"),
    expireDate: Yup.string().matches(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/,"Ingrese una fecha valida").required("Este campo es obligatorio"),
    payDate: Yup.string().matches(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/,"Ingrese una fecha valida").required("Este campo es obligatorio"),
    amount: Yup.number().positive("Ingrese un número positivo").typeError("Este número no es valido").required("Este campo es obligatorio"),
    currency: Yup.number().typeError("Este id no es valido").required("Este campo es obligatorio")
})


export const purchaseSchema = Yup.object().shape({

    description: Yup.string().min(10,"La descripcion debe tener min. 10 caracteres").max(40,"La descripcion debe tener máx. 40 caracteres").required("Este campo es obligatorio"),
    unitPrice: Yup.number().positive("Ingrese un numero positivo").required("Este campo es obligatorio").typeError("Ingrese un numero"),
    paid: Yup.boolean().required("Este campo es obligatorio"),
    delivered:Yup.boolean().required("Este campo es obligatorio"),
    purchaseDate:Yup.date().required("Este campo es obligatorio").typeError("Ingrese una fecha valida"),
    quantity:Yup.number().positive("Ingrese un numero positivo").integer("Ingrese un numero entero").required("Este campo es obligatorio").typeError("Ingrese un numero"),
    currency:Yup.number().typeError("Este id no es valido").required("Este campo es obligatorio")
})

export const marketSchema = Yup.object().shape({

    name: Yup.string().trim().min(2,"Ingrese un nombre de mínimo 2 letras").max(20,"Ingrese un nombre de máximo 20 letras").required("Este campo es obligatorio"),

})