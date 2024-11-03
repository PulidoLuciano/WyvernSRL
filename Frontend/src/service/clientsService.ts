import {clientType, contactType} from "../utils/types/clientType";

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

const updateClient = async(id: number,obj:clientType)=>{

    const response = await fetch(`http://localhost:3000/clients/${id}`,{
        mode:"cors",
        method: "PUT",
        credentials: "include",
        headers:{
            'Content-Type' : 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            "nombre": obj.name,
            "correo": obj.email? obj.email : null,
            "telefono": obj.phone ? obj.phone : null,
            "suscripto": obj.suscription,
            "Plataformas_id": Number(obj.platform),
            "Paises_id": Number(obj.country) ,
        })
    })
    
    const data = await response.json()
    console.log(data);
    if(!response.ok) throw new Error(`${data.message}`);
    return data;

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

const deleteContact = async (url: string, ids: Array<any | null>) => {
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
    console.log(data);
    
    if (!response.ok) throw new Error(`${data.message}`);
    return data
}

const createContact = async (url: string,obj: contactType) => {

    const response = await fetch(`${url}`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "Clientes_id": obj.Clientes_id,
            "Medios_id": Number(obj.Medio),
            "duracion": obj.duracion ? obj.duracion : null,
            "motivo": obj.motivo ,
            "fecha": obj.fecha
        })
    })

    const data = await response.json();
    console.log(data);
    
    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}


const getClientsPurchases = async (url : string) => {
    
    const response = await fetch(`${url}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
    })
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(`${data.message}`);
   
    return data;

}

const deletePurchase= async (url: string, ids: Array<any | null>) => {
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
    console.log(data);
    
    if (!response.ok) throw new Error(`${data.message}`);
    return data
}

export const clientsService = { getAllClients, create, deleteClient,updateClient, getOne, getAllContacts, deleteContact, createContact, getClientsPurchases, deletePurchase }