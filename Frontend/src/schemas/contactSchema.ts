import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
    Medio: Yup.number().integer("Este id no es valido").typeError("Este id no es valido").required("Este campo es obligatorio"),
    duracion: Yup.string(),
    fecha: Yup.date().required("Este campo es obligatorio"),
    motivo: Yup.string().min(1,'El motivo no puede estar vacio').max(250,"Escriba un motivo con menos de 250 caracteres").required("Este campo es obligatorio")
})


