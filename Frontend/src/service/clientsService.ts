import clientType from "../utils/types/clientType";


const getAllClients = async () => {
    try {
        const response = await fetch("http://localhost:3000/clients/", {
            mode: 'cors',
            method: 'GET',
            credentials: 'include',
        })

        if (!response.ok) {
            console.log(response);
            console.log(response.json());
            throw new Error;
        }

        const clients = response.json();
        return clients;

    } catch (error) {
        console.log(error);

    }
}

const createClient = async (obj: clientType) => {
    try {
        console.log(obj);
        
        const response = await fetch("http://localhost:3000/clients", {
            mode: 'cors',
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "nombre": obj.name,
                "correo": obj.email,
                "telefono": obj.phone,
                "Platforma_id": obj.platform,
                "Paises_id": obj.country,
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



export const clientsService = { getAllClients, createClient }