import { productType } from "../utils/types/productType";

const getAllProducts = async (url: string) => {
    try {
      const response = await fetch(`${url}`, {
        mode: "cors",
        method: "GET",
        credentials: "include",
      })
  
      if (!response.ok) {
        console.log(response);
        console.log(await response.json());
        throw new Error;
      }
  
      const products = await response.json()
      return products;
  
    } catch (error) {
      console.log(error);
  
    }
  }

  const getProductSales = async (url: string) => {
    try {
      const response = await fetch(`${url}`, {
        mode: "cors",
        method: "GET",
        credentials: "include",
      })
  
      if (!response.ok) {
        console.log(response);
        console.log(await response.json());
        throw new Error;
      }
  
      const products = await response.json()
      return products;
  
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
  

  const createProduct = async (productData: productType) => {
    const response = await fetch("http://localhost:3000/products", {
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "nombre": productData.name,
            "lanzamiento": productData.date ? new Date(productData.date) : null,
            "precio": Number(productData.price),
            "Categorias_id": Number(productData.category)
    
        })
        })
    
    
        if (!response.ok) {
        throw new Error;
        }
    
        const product = await response.json()
        return product;
    }

    const updateProduct = async(id: number,obj: productType)=>{

        
        const response = await fetch(`http://localhost:3000/products/${id}`,{
            mode:"cors",
            method: "PUT",
            credentials: "include",
            headers:{
                'Content-Type' : 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                "nombre": obj.name,
                "lanzamiento": obj.date,
                "Categorias_id": Number(obj.category),
                "precio": obj.price
            })
        })
        
        const data = await response.json()
        console.log(data);
        if(!response.ok) throw new Error(`${data.message}`);
        return data;
 
}

    const deleteProduct = async (url: string, ids: Array<string>) => {
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

export const productsService = { getAllProducts, createProduct, updateProduct, deleteProduct, getOne, getProductSales }
