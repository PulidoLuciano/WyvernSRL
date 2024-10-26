import { useState } from "react"
import { useForm } from "react-hook-form"
import logo from '../images/WyvernLogo.jpg'
import wyvernFondo from '../images/wyvern_pescando.jpg'
import Input from "../components/form/Input"
import Form from '../components/form/Form';

const Login = () => {
  const [createData, setCreateData] = useState({
    user: '',
    password:''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log(createData);
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
            <Input id={"usuario"} name={"user"} value={createData.user} title={"Usuario"} type={"text"} placeholder={"User125"} onChange={handleChange}></Input>
            <Input id={"contrasenia"} name={"password"} value={createData.password} title={"Contraseña"} type={"password"} placeholder={"••••••••"} onChange={handleChange}></Input>
          </>

        </Form>
        
      
    </main>
  )
}

export default Login