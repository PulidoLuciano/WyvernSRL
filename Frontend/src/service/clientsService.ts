import {clientType} from "../utils/types/clientType";

const getAllClients = async (url : string) => {
    
        const response = await fetch(`${url}`, {
            mode: 'cors',
            method: 'GET',
            credentials: 'include',
        })
        
        const data = await response.json();
        
        if (!response.ok) throw new Error(`${data.message}`);
       
        return data;

}

const create = async (url: string,obj: clientType) => {

        const response = await fetch(`${url}/`, {
            mode: 'cors',
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "nombre": obj.name,
                "correo": obj.email,
                "telefono": obj.phone ? obj.phone : null,
                "Plataformas_id": Number(obj.platform),
                "Paises_id": Number(obj.country) ,
                "suscripto": obj.suscription
            })
        })

        const data = await response.json();
        
        if (!response.ok) throw new Error(`${data.message}`);

        return data;

}

const deleteClient = async (url: string, ids: Array<any | null>) => {
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

const getOne = async (url : string, id : number) => {
    
    const response = await fetch(`${url}/${id}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
    })
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(`${data.message}`);
   
    return data;

}

const getAllContacts = async (url : string) => {
    
    const response = await fetch(`${url}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
    })
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(`${data.message}`);
   
    return data;

}


export const clientsService = { getAllClients, create, deleteClient, getOne, getAllContacts }