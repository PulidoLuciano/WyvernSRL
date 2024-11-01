import * as Yup from "yup"
export const supplierSchema = Yup.object().shape({
    name: Yup.string().trim().min(2,"Ingrese un nombre de mínimo 2 letras").max(32,"Ingrese un nombre de máximo 32 letras").required("Este campo es obligatorio"),
    email: Yup.string().email("Ingrese un email valido").optional(),
    phone: Yup.string().matches(/^(\+?\d{1,4}?[-.\s]?)?(\(?\d{1,3}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}|$/,"Ingrese un telefono valido").optional(),
    category: Yup.number().required("Este campo es obligatorio").typeError("Este id no es valido"),
    state: Yup.number().required("Este campo es obligatorio").typeError("Este id no es valido"),
}) 