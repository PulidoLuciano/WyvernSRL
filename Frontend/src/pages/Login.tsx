import { useEffect, useState } from "react"
import logo from '../images/WyvernLogo.jpg'
import wyvernFondo from '../images/wyvern_pescando.jpg'
import Input from "../components/form/Input"
import Form from '../components/form/Form';
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom";
import authSchema from "../schemas/authSchema";
import { credentialErrors, Credential } from "../utils/types/userTypes";
import * as Yup from 'yup';

const Login = () => {

  const { login } = useAuth();

  const navigate = useNavigate()

  const [authData, setAuthData] = useState<Credential>({
    nombre:'',
    password:''
  });

  const [authErrors, setAuthErrors] = useState<credentialErrors>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try {
      await authSchema.validate(authData, { abortEarly: false });
      login(authData)
      navigate('/home')
      setAuthErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        
        const credentialErrors: credentialErrors  = {};
        err.inner.forEach((error) => {
            if (error.path) credentialErrors[error.path as keyof credentialErrors ] = error.message;
          });

          setAuthErrors(credentialErrors);
          console.log(credentialErrors);
          
      }
    }
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    const { name, value } = e.target;
    setAuthData({
      ...authData,
      [name]: value
    });
  }

  return (
    <main className="grid grid-cols-2">

      <img src={wyvernFondo} alt="" className="min-h-screen"/>

        <Form handleSubmit={handleSubmit} className="flex flex-col m-auto" >
          <>
            <img src={logo} className="h-44" />
            <p className="text-xl text-center my-8">Ingresar al area de trabajo</p>
            <Input id={"usuario"} name={"nombre"} value={authData.nombre} title={"Usuario"} type={"text"} placeholder={"User125"} onChange={handleChange} error={authErrors.nombre}></Input>
            <Input id={"contrasenia"} name={"password"} value={authData.password} title={"Contraseña"} type={"password"} placeholder={"••••••••"} onChange={handleChange} error={authErrors.password}></Input>
            <button type='submit' className='text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center '>
            Iniciar Sesion
            </button> 
          </>

        </Form>
        
      
    </main>
  )
}

export default Login