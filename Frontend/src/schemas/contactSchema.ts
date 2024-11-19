import * as Yup from 'yup';
import { dateSchema, idSchema } from './generalSchemas';

export const contactSchema = Yup.object().shape({
    Medio: idSchema,
    duracion: Yup.string(),
    fecha: dateSchema,
    motivo: Yup.string().min(1,'El motivo no puede estar vacio').max(250,"Escriba un motivo con menos de 250 caracteres").required("Este campo es obligatorio")
})


