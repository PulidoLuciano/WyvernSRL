import { areaType } from '../utils/types/areaType';
import { userType } from '../utils/types/userTypes';

const getAll= async (url: string) => {
    try {
      const response = await fetch(`${url}`, {
        mode: "cors",
        method: "GET",
        credentials: "include",
      })
  
      if (!response.ok) {
        throw new Error;
      }
  
      const data = await response.json()
      return data;
  
    } catch (error) {
      console.log(error);
  
    }
  }

  const getOne = async (url : string) => {
    
    const response = await fetch(`${url}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
    })
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(`${data.message}`);
   
    return data;

}

  const createUser = async (userData: userType) => {
    const response = await fetch("http://localhost:3000/users", {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        "nombre": userData.name,
        "contrasenia": userData.password,
        "Empleados_id": Number(userData.employeeDNI),
        "Roles_id": Number(userData.role)

      })
    })
  
    if (!response.ok) {
      throw new Error;
    }
  
    const data = await response.json()
    return data;
  
  }

export const userService = { getAll , createUser, getOne }
