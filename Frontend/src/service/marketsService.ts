import { marketType } from "../utils/types/suppliersType";


const getMarkets = async (url: string) => {
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

  const createMarket = async (marketData: marketType) => {
    const response = await fetch("http://localhost:3000/markets", {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        "nombre": marketData.name,
      })
    })
  
    if (!response.ok) {
      throw new Error;
    }
  
    const market = await response.json()
    return market;
  
  }

const updateMarket = async(id: number,obj: marketType)=>{

    const response = await fetch(`http://localhost:3000/markets/${id}`,{
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

export const marketsService = { getMarkets, updateMarket, createMarket }
