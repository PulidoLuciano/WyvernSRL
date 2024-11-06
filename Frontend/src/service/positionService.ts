import { positionType } from '../utils/types/positionType'

const getPositions = async (url: string) => {
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

  const createPosition = async (areaId:number, positionData: positionType) => {
    console.log(areaId);
    
    const response = await fetch("http://localhost:3000/positions", {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        "Areas_id":Number(areaId),
        "nombre": positionData.name,
      })
    })
  
    if (!response.ok) {
      throw new Error;
    }
  
    const position = await response.json()
    console.log(position);
    
    return position;
  
  }
  
  const deletePosition = async (url: string, ids: Array<string>) => {
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


const updateArea = async(id: number,obj: positionType)=>{

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



export const positionService = {getPositions, createPosition, deletePosition, updateArea, }
