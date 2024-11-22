import * as Yup from 'yup';


export const phoneSchema = Yup.string().trim().matches(/^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,"Ingrese un telefono valido")

export const idSchema = Yup.number().integer("Este id no es valido").required("Este campo es obligatorio").typeError("Este id no es valido");

export const emailSchema =  Yup.string().email("Ingrese un email valido");

export const nameSchema = Yup.string().trim().min(2,"Ingrese un nombre de mínimo 2 letras").max(32,"Ingrese un nombre de máximo 32 letras").required("Este campo es obligatorio");

export const descriptionSchema = Yup.string().min(5,"La descripcion debe tener mín. 5 caracteres").max(250,"La descripcion debe tener máx. 250 caracteres").required("Este campo es oblitagorio");

export const dateSchema = Yup.string().required("Este campo es obligatorio");

export const dniSchema = Yup.number().integer().required("Este campo es obligatorio");