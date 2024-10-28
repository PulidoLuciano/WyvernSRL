import clientType from "../utils/types/clientType";
import { Credential } from "../utils/types/userTypes";

const login = async (credentials : Credential) => {
  try {
    
    const response = await fetch(`http://localhost:3000/users/login`, {
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
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

const getAllCountries = async() =>{
  try {
    const response = await fetch("http://localhost:3000/countries",{
      mode:'cors',
      method:'GET',
      credentials:'include',
    })

    if(!response.ok){
      console.log(response);
      console.log(response.json());
      throw new Error;
    }

    const countries = response.json();
    return countries;

  } catch (error) {
    console.log(error);
    
  }
}

const getAllPlatforms = async() =>{
  try {
    const response = await fetch("http://localhost:3000/platforms",{
      mode:'cors',
      method:'GET',
      credentials:'include',
    })

    if(!response.ok){
      console.log(response);
      console.log(response.json());
      throw new Error;
    }

    const platforms = response.json();
    return platforms;

  } catch (error) {
    console.log(error);
    
  }
}


export const authService = { login,getAllCountries,getAllPlatforms}