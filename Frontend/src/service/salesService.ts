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
            "fecha": obj.date ? new Date(obj.date) : null,
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
    console.log(ids);
    
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

const updateSale = async(id:number,obj : saleType) =>{
    try {
        const response = await fetch(`http://localhost:3000/sales/${id}`,{
            mode: 'cors',
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "fecha": obj.date ? new Date(obj.date) : null,
                "Clientes_id": obj.client,
                "Productos_id": obj.product,
            })
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




export const salesService = {updateSale,getAll,create,deleteSale, getClientsPurchases}