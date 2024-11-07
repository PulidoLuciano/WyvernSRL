import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
    name: Yup.string().trim().min(2,"Ingrese un nombre de mínimo 2 letras").max(32,"Ingrese un nombre de máximo 32 letras").required("Este campo es obligatorio"),
    password: Yup.string().max(100, "La contraseña debe ser más corta que cien caracteres").min(8, "La contraseña debe ser mayor a ocho caracteres"),
    employee: Yup.string().trim().min(2,"Ingrese un nombre de mínimo 2 letras").max(32,"Ingrese un nombre de máximo 32 letras").required("Este campo es obligatorio") ,
    role: Yup.number().integer("Este id no es valido").required("Este campo es obligatorio").typeError("Este id no es valido"),
})


