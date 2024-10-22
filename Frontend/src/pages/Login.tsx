import { useForm } from "react-hook-form"
import logo from '../images/WyvernLogo.jpg'
import wyvernFondo from '../images/wyvern_pescando.jpg'

const Login = () => {
  
  const {} = useForm();

  return (
    <main className="grid grid-cols-2">
      {/* <div className="bg-dragon bg-no-repeat bg-cover min-h-screen"></div> */}

      <img src={wyvernFondo} alt="" className="min-h-screen"/>
      <form className="flex flex-col m-auto">
        <img src={logo} className="h-44" />
        <p className="text-xl text-center my-6">Ingresar al area de trabajo</p>
        <label htmlFor="dni">DNI</label>
        <input type="number" placeholder="44446489" className="border-2 rounded-md border-primary-light outline-none mb-5 px-3"/>
        <label htmlFor="contrasenia" >Contraseña</label>
        <input type="password" placeholder="••••••••" className="border-2 rounded-md border-primary-light outline-none px-3"/>
        <button className="bg-primary rounded-md text-white py-1 my-5">Iniciar Sesion</button>
      </form>
      
    </main>
  )
}

export default Login