
const getAll = async (url: string) => {
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


export const statsService = { getAll }
