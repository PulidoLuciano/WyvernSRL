
const getAllCountries = async( url : string) =>{
    try {
      const response = await fetch(`${url}`,{
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
  
  const getAllPlatforms = async(url : string) =>{
    try {
      const response = await fetch(`${url}`,{
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


  const getAllProducts = async(url:string) =>{
    try {
      const response = await fetch(`${url}`,{
        mode:"cors",
        method:"GET",
        credentials:"include",
      })

      if(!response.ok){
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
  

  
  
export const generalService = { getAllCountries, getAllPlatforms,getAllProducts }