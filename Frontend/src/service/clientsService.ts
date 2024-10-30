import clientType from "../utils/types/clientType";


const getAll = async (url : string) => {
    
    try {
        const response = await fetch(`${url}`, {
            mode: 'cors',
            method: 'GET',
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error;
        }

        const clients = response.json();

        return clients;
        
    } catch (error) {
        console.log(error);

    }
}

const create = async (url: string,obj: clientType) => {

    try {
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

        if (!response.ok) {
            console.log(response);
            console.log(await response.json());


            throw new Error;
        }

        return response.json();


    } catch (error) {
        console.log(error);

    }
}



export const clientsService = { getAll, create}