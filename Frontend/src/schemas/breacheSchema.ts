import * as Yup from 'yup'

export const breacheSchema = Yup.object().shape({
    description: Yup.string().min(20,"La descripcion debe tener mín. 20 caracteres").max(200,"La descripcion debe tener máx. 200 caracteres").required("Este campo es oblitagorio"),
    date: Yup.date().typeError("Ingrese una fecha valida").required("Este campo es oblitagorio"),
    breachLevel: Yup.number().typeError("Este id no es valido").required("Este campo es obligatorio")
}) 