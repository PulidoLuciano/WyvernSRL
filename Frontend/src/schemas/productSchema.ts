import * as Yup from 'yup'

export const productSchema = Yup.object().shape({

    name: Yup.string().trim().min(2,"Un nombre debe tener mín. 2 letras").max(50,"Un nombre debe tener max. 50 letras").required("Este campo es obligatorio"),
    date: Yup.date().typeError("Ingrese una fecha valida").required("Este campo es obligatorio"),
    price: Yup.number().positive("Ingrese un numero positivo").typeError("Ingrese un numero valido").required("Este campo es obligatorio"),
    category: Yup.number().typeError("Este id no es valido").required("Este campo es obligatorio")
})