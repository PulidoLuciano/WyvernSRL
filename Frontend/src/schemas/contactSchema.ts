import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
    Medio: Yup.number().integer("Este id no es valido").required("Este campo es obligatorio").typeError("Este id no es valido"),
    duracion: Yup.string(),
    fecha: Yup.date().required("Este campo es obligatorio"),
    motivo: Yup.string().min(10,'Ingrese un motivo de mínimo 10 letras').required("Este campo es obligatorio")
})


