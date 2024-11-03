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
}) 

export const contractSchema = Yup.object().shape({
    motive: Yup.string().min(10,"La descripción debe tener min. 15 caracteres.").max(100,"La descripcion debe tener max. 100 caracteres.").required("Este campo es obligatorio"),
    expireDate: Yup.string().matches(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/,"Ingrese una fecha valida").required("Este campo es obligatorio"),
    payDate: Yup.string().matches(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/,"Ingrese una fecha valida").required("Este campo es obligatorio"),
    amount: Yup.number().positive("Ingrese un número positivo").typeError("Este número no es valido").required("Este campo es obligatorio"),
    currency: Yup.number().typeError("Este id no es valido").required("Este campo es obligatorio")
})