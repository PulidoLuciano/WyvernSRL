import { Credential } from "../utils/types/userTypes";

const login = async (credentials : Credential) => {
  try {
    
    const response = await fetch(`http://localhost:3000/users/login`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({"nombre":credentials.nombre, "password":credentials.password}),
    })

    if (!response.ok) {
      console.log(response);
      
      throw new Error();
    }
    
    const user = await response.json();
    
    return user
  } catch (error) {
    console.log(error);
  }
    
}

export const authService = { login }