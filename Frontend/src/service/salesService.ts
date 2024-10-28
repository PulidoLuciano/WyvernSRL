const baseUrlSales = "http://localhost:3000/sales"
const baseUrlProducts = "http://localhost:3000/products"

const getAllSales = async() =>{
    try {
        const response = await fetch(`${baseUrlSales}`,{
            mode: 'cors',
            method: 'GET',
            credentials: 'include'
        })
    
        if(!response.ok){
            console.log(response);
            console.log(response.json());
        }
    
        const sales = response.json()
        return sales;

    } catch (error) {
        console.log(error);
            
    }

}

const getAllProducts = async() =>{
    try {
        const response = await fetch(`${baseUrlProducts}`,{
            mode:"cors",
            method: "GET",
            credentials: "include"
        })

        if(!response.ok){
            console.log(response);
            console.log(response.json());
        }
    
        const products = response.json()
        return products;

    } catch (error) {
        console.log(error);
        
    }
}





export const salesService = {getAllSales,getAllProducts}