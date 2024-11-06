import { areaType } from '../utils/types/areaType';

const getAllAreas = async (url: string) => {
    try {
      const response = await fetch(`${url}`, {
        mode: "cors",
        method: "GET",
        credentials: "include",
      })
  
      if (!response.ok) {
        throw new Error;
      }
  
      const products = await response.json()
      return products;
  
    } catch (error) {
      console.log(error);
  
    }
  }

  const getAreaEmployees= async (url: string) => {
    try {
      const response = await fetch(`${url}`, {
        mode: "cors",
        method: "GET",
        credentials: "include",
      })
  
      if (!response.ok) {
        throw new Error;
      }
  
      const products = await response.json()
      return products;
  
    } catch (error) {
      console.log(error);
    }
  }
  
  const createArea = async (areaData: areaType) => {
    const response = await fetch("http://localhost:3000/areas", {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        "nombre": areaData.name,
      })
    })
  
    if (!response.ok) {
      throw new Error;
    }
  
    const product = await response.json()
    return product;
  
  }
  
  const deleteArea = async (url: string, ids: Array<string>) => {
    const response = await fetch(`${url}`, {
      mode: "cors",
      method: "DELETE",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ ids })
    })
  
    if (!response.ok) {
      throw new Error;
    }
  
    const obj = await response.json()
    return obj;
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

const updateArea = async(id: number,obj:areaType)=>{

    const response = await fetch(`http://localhost:3000/areas/${id}`,{
        mode:"cors",
        method: "PUT",
        credentials: "include",
        headers:{
            'Content-Type' : 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            "nombre": obj.name,
        })
    })
    
    const data = await response.json()
    console.log(data);
    if(!response.ok) throw new Error(`${data.message}`);
    return data;

}


export const areaService = { getAllAreas, getAreaEmployees, deleteArea, createArea, getOne, updateArea}
