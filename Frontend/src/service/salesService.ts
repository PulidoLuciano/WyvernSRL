const baseUrl = "http://localhost:3000/sales"
const getAllSales = async() =>{
    try {
        const response = await fetch(`${baseUrl}`,{
            mode: 'cors',
            method: 'GET',
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





export const salesService = {getAllSales}