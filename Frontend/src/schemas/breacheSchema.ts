import * as Yup from 'yup'

export const breacheSchema = Yup.object().shape({
    description: Yup.string().min(5,"La descripcion debe tener mín. 5 caracteres").max(250,"La descripcion debe tener máx. 250 caracteres").required("Este campo es oblitagorio"),
    date: Yup.date().typeError("Ingrese una fecha valida").required("Este campo es oblitagorio"),
    breachLevel: Yup.number().typeError("Este id no es valido").required("Este campo es obligatorio")
}) 