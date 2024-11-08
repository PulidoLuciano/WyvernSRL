
import { Credential } from "../utils/types/userTypes";

const login = async (credentials : Credential) => {
    const response = await fetch(`http://localhost:3000/users/login`, {
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({"nombre":credentials.nombre, "password":credentials.password}),
    })

    const user = await response.json();

    if (!response.ok) throw new Error(`${user.message}`);
    
    return user
   
}


export const authService = { login }