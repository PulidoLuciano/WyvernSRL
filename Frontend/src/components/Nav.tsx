import logo from '../images/WyvernLogoBlanco.png'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='bg-primary items-center h-full p-8'>
        <img src={logo} alt="" className='w-72 mb-8 m-auto'/>
        <p className='text-white text-center my-9'>Usando como <strong>Usuario</strong></p>
        <Link to="/clients"><p className='text-white text-center p-1'>Clientes</p></Link>
        <Link to="/"><p className='text-white text-center p-1'>Proveedores</p></Link>
        <Link to="/"><p className='text-white text-center p-1'>Ventas</p></Link>
        <Link to="/"><p className='text-white text-center p-1'>Empleados</p></Link>
        <Link to="/"><p className='text-white text-center p-1'>Admin</p></Link>
        <Link to="/"><p className='text-white text-center p-1 mt-52'>Salir</p></Link>
    </div>
  )
}

export default Nav