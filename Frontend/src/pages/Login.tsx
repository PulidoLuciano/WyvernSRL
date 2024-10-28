import { useEffect, useState } from "react"
import logo from '../images/WyvernLogo.jpg'
import wyvernFondo from '../images/wyvern_pescando.jpg'
import Input from "../components/form/Input"
import Form from '../components/form/Form';
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom";



const Login = () => {

  const { login, user } = useAuth();

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      
      navigate('/clients')
    }
  }, [user])

  const [createData, setCreateData] = useState({
    nombre: '',
    password:''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    
    login(createData)
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    const { name, value } = e.target;
    setCreateData({
      ...createData,
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
            <Input id={"usuario"} name={"nombre"} value={createData.nombre} title={"Usuario"} type={"text"} placeholder={"User125"} onChange={handleChange}></Input>
            <Input id={"contrasenia"} name={"password"} value={createData.password} title={"Contraseña"} type={"password"} placeholder={"••••••••"} onChange={handleChange}></Input>
            <button type='submit' className='text-white bg-primary my-3 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center '>
            Iniciar Sesion
            </button> 
          </>

        </Form>
        
      
    </main>
  )
}

export default Login