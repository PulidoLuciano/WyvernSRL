import * as Yup from 'yup';

const authSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre de usuario es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
});

export default authSchema;