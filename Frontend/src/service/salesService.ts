import { saleType } from "../utils/types/saleType";
const getAll = async(url : string) =>{
    try {
        const response = await fetch(`${url}`,{
            mode: 'cors',
            method: 'GET',
            credentials: 'include'
        })
    
        if(!response.ok){
            console.log(response);
            console.log(await response.json());
        }
    
        const sales = response.json()
        return sales;

    } catch (error) {
        console.log(error);
            
    }

}


const create = async(url:string,obj : saleType) =>{
    
    const response = await fetch(`${url}/`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "fecha": new Date(obj.date),
            "Clientes_id": obj.client,
            "Productos_id": obj.product,
        })
    })

    const data = await response.json();
    console.log(data);
    
    if (!response.ok) throw new Error(`${data.message}`);
    
    
    return data;

}

const deleteSale = async (url: string, ids: Array<any | null>) => {
    const response = await fetch(`${url}`,{
                mode: 'cors',
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ids})
            })

    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message}`);
    return data
}

const getClientsPurchases = async(url : string) =>{
    try {
        const response = await fetch(`${url}`,{
            mode: 'cors',
            method: 'GET',
            credentials: 'include'
        })
    
        if(!response.ok){
            console.log(response);
            console.log(await response.json());
        }
    
        const sales = response.json()
        return sales;

    } catch (error) {
        console.log(error);
            
    }

}




export const salesService = {getAll,create,deleteSale}