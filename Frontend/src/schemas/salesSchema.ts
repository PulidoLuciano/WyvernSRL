import * as Yup from 'yup'

export const saleSchema = Yup.object().shape({
    date: Yup.date().required("Este campo es obligatorio").typeError("Ingrese una fecha valida"),
    client:  Yup.string().trim().min(2,"Ingrese un nombre de mínimo 2 letras").max(32,"Ingrese un nombre de máximo 32 letras").required("Este campo es obligatorio") ,
    product: Yup.number().integer("Este id no es valido").required("Este campo es obligatorio").typeError("Este id no es valido")
})