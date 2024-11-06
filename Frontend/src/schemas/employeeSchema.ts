import * as Yup from "yup"
export const employeeSchema = Yup.object().shape({
    name: Yup.string().trim().min(2,"Ingrese un nombre de mínimo 2 letras").max(32,"Ingrese un nombre de máximo 32 letras").required("Este campo es obligatorio"),
    email: Yup.string().email("Ingrese un email valido").required("Este campo es obligatorio"),
    phone: Yup.string().matches(/^(\+?\d{1,4}?[-.\s]?)?(\(?\d{1,3}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}|$/,"Ingrese un telefono valido").optional().nullable(),
    dni: Yup.number().integer().required("Este campo es obligatorio"),
    hiringDate: Yup.date().required("Este campo es obligatorio"),
    salary: Yup.number().required("Este campo es obligatorio"),
    country: Yup.number().integer("Este id no es valido").required("Este campo es obligatorio").typeError("Este id no es valido"),
    state: Yup.number().integer("Este id no es valido").required("Este campo es obligatorio").typeError("Este id no es valido"),
    position: Yup.number().integer("Este id no es valido").required("Este campo es obligatorio").typeError("Este id no es valido"),
}) 
