import * as Yup from "yup"
export const positionSchema = Yup.object().shape({
    name: Yup.string().trim().min(2,"Ingrese un nombre de mínimo 2 letras").max(20,"Ingrese un nombre de máximo 20 letras").required("Este campo es obligatorio"),
}) 
