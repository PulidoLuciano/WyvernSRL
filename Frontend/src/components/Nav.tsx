import { useState } from 'react'
import { useAuth } from '../context/authContext'
import logo from '../images/WyvernLogoBlanco.png'
import { Link } from 'react-router-dom'

const Nav = () => {
  const [collapse,setCollapse] = useState(false)
  const handleCollapse = () =>{
    setCollapse(!collapse)
  }
  const { logout, role } = useAuth()
  return (
    <div className='w-full tablet:w-[300px] flex flex-col'>
    
    <button onClick={handleCollapse} className={`w-full bg-primary fixed laptop:hidden p-2 mb-4 self-start z-30`}>
      {collapse? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg> }
    </button>
    
    
    <div className={`${collapse? "":"hidden"} w-full tablet:w-[300px] h-full z-20 laptop:block bg-primary items-center h-screen fixed`}>
        <img src={logo} alt="" className='w-72 mb-8 m-auto p-8'/>
        <p className='text-white text-center my-9'>Usando como <strong>{role}</strong></p>
        {role=='Ventas' ? (
          <>
              <Link onClick={handleCollapse}  to="/clients" ><p className='text-white text-center p-1 nav-link flex justify-center gap-1'><svg className='w-6 h-6' width="48px" height="48px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="user"> <g> <path d="M20,21V19a4,4,0,0,0-4-4H8a4,4,0,0,0-4,4v2" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path> <circle cx="12" cy="7" fill="none" r="4" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle> </g> </g> </g> </g></svg>
              Clientes</p></Link>
              <Link onClick={handleCollapse} to="/sales"><p className='text-white text-center p-1 nav-link flex justify-center gap-1'><svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M863-404 557-97q-9 8.5-20.25 12.75T514.25-80Q503-80 492-84.5T472-97L98-472q-8-8-13-18.96-5-10.95-5-23.04v-306q0-24.75 17.63-42.38Q115.25-880 140-880h307q12.07 0 23.39 4.87Q481.7-870.25 490-862l373 373q9.39 9 13.7 20.25 4.3 11.25 4.3 22.5t-4.5 22.75Q872-412 863-404ZM516-138l306-307-375-375H140v304l376 378ZM245-664q21 0 36.5-15.5T297-716q0-21-15.5-36.5T245-768q-21 0-36.5 15.5T193-716q0 21 15.5 36.5T245-664Zm236 185Z"/></svg>
              Ventas</p></Link>
              <Link to='/' onClick={logout}><p className='text-white text-center p-1 mt-72 nav-link flex justify-center gap-1'><svg  className='w-6 h-6' width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              Salir</p></Link>
          </>
      
        ) : 
        role == 'RRHH' ?(
          <>
              <Link onClick={handleCollapse} to="/employees"><p className='text-white text-center p-1 nav-link flex justify-center gap-1'><svg className='w-7 h-7' width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.7518 6.24359C12.983 5.01246 14.782 4.69543 16.3057 5.29249L13.5532 8.04496C13.2216 8.37659 13.2216 8.91425 13.5532 9.24588L14.7541 10.4468C15.0857 10.7784 15.6234 10.7784 15.955 10.4468L18.7075 7.69432C19.3046 9.21796 18.9875 11.017 17.7564 12.2482C16.5253 13.4793 14.7262 13.7963 13.2026 13.1993L7.89927 18.5026C7.23602 19.1658 6.16068 19.1658 5.49744 18.5026C4.83419 17.8393 4.83419 16.764 5.49744 16.1007L10.8007 10.7974C10.2037 9.2738 10.5207 7.47472 11.7518 6.24359Z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              Empleados</p></Link>
              <Link to='/' onClick={logout}><p className='text-white text-center p-1 mt-80 nav-link flex justify-center gap-1'><svg  className='w-6 h-6' width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              Salir</p></Link>
          </>
        ) :
        role == 'Compras' ? (
          <>
              <Link onClick={handleCollapse} to="/suppliers"><p className='text-white text-center p-1 nav-link flex justify-center gap-2'><svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M224.12-161q-49.12 0-83.62-34.42Q106-229.83 106-279H40v-461q0-24 18-42t42-18h579v167h105l136 181v173h-71q0 49.17-34.38 83.58Q780.24-161 731.12-161t-83.62-34.42Q613-229.83 613-279H342q0 49-34.38 83.5t-83.5 34.5Zm-.12-60q24 0 41-17t17-41q0-24-17-41t-41-17q-24 0-41 17t-17 41q0 24 17 41t41 17ZM100-339h22q17-27 43.04-43t58-16q31.96 0 58.46 16.5T325-339h294v-401H100v401Zm631 118q24 0 41-17t17-41q0-24-17-41t-41-17q-24 0-41 17t-17 41q0 24 17 41t41 17Zm-52-204h186L754-573h-75v148ZM360-529Z"/></svg>
              Proveedores</p></Link>
              <Link to='/' onClick={logout}><p className='text-white text-center p-1 mt-80 nav-link flex justify-center gap-1'><svg  className='w-6 h-6' width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              Salir</p></Link>
          </>
        ) : 
        (
          <>
              <Link onClick={handleCollapse} to="/clients" ><p className='text-white text-center p-1 nav-link flex justify-center gap-1'><svg className='w-6 h-6' width="48px" height="48px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="user"> <g> <path d="M20,21V19a4,4,0,0,0-4-4H8a4,4,0,0,0-4,4v2" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path> <circle cx="12" cy="7" fill="none" r="4" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle> </g> </g> </g> </g></svg>
              Clientes</p></Link>
              <Link to="/suppliers"><p className='text-white text-center p-1 nav-link flex justify-center gap-2'><svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M224.12-161q-49.12 0-83.62-34.42Q106-229.83 106-279H40v-461q0-24 18-42t42-18h579v167h105l136 181v173h-71q0 49.17-34.38 83.58Q780.24-161 731.12-161t-83.62-34.42Q613-229.83 613-279H342q0 49-34.38 83.5t-83.5 34.5Zm-.12-60q24 0 41-17t17-41q0-24-17-41t-41-17q-24 0-41 17t-17 41q0 24 17 41t41 17ZM100-339h22q17-27 43.04-43t58-16q31.96 0 58.46 16.5T325-339h294v-401H100v401Zm631 118q24 0 41-17t17-41q0-24-17-41t-41-17q-24 0-41 17t-17 41q0 24 17 41t41 17Zm-52-204h186L754-573h-75v148ZM360-529Z"/></svg>
              Proveedores</p></Link>
              <Link onClick={handleCollapse} to="/sales"><p className='text-white text-center p-1 nav-link flex justify-center gap-1'><svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M863-404 557-97q-9 8.5-20.25 12.75T514.25-80Q503-80 492-84.5T472-97L98-472q-8-8-13-18.96-5-10.95-5-23.04v-306q0-24.75 17.63-42.38Q115.25-880 140-880h307q12.07 0 23.39 4.87Q481.7-870.25 490-862l373 373q9.39 9 13.7 20.25 4.3 11.25 4.3 22.5t-4.5 22.75Q872-412 863-404ZM516-138l306-307-375-375H140v304l376 378ZM245-664q21 0 36.5-15.5T297-716q0-21-15.5-36.5T245-768q-21 0-36.5 15.5T193-716q0 21 15.5 36.5T245-664Zm236 185Z"/></svg>
              Ventas</p></Link>
              <Link onClick={handleCollapse} to="/employees"><p className='text-white text-center p-1 nav-link flex justify-center gap-1'><svg className='w-7 h-7' width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.7518 6.24359C12.983 5.01246 14.782 4.69543 16.3057 5.29249L13.5532 8.04496C13.2216 8.37659 13.2216 8.91425 13.5532 9.24588L14.7541 10.4468C15.0857 10.7784 15.6234 10.7784 15.955 10.4468L18.7075 7.69432C19.3046 9.21796 18.9875 11.017 17.7564 12.2482C16.5253 13.4793 14.7262 13.7963 13.2026 13.1993L7.89927 18.5026C7.23602 19.1658 6.16068 19.1658 5.49744 18.5026C4.83419 17.8393 4.83419 16.764 5.49744 16.1007L10.8007 10.7974C10.2037 9.2738 10.5207 7.47472 11.7518 6.24359Z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              Empleados</p></Link>
              <Link onClick={handleCollapse} to="/admin"><p className='text-white text-center p-1 nav-link flex justify-center gap-1'><svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="m239-160 40-159H120l15-60h159l51-202H186l15-60h159l39-159h59l-39 159h203l39-159h59l-39 159h159l-15 60H666l-51 202h159l-15 60H600l-40 159h-59l40-159H338l-40 159h-59Zm114-219h203l51-202H404l-51 202Z"/></svg>
              Admin</p></Link>
              <Link to='/' onClick={logout}><p className='text-white text-center p-1 mt-52 nav-link flex justify-center gap-1'><svg  className='w-6 h-6' width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              Salir</p></Link>
          </>
        )
        }
       
    </div>
    </div>
  )
}

export default Nav