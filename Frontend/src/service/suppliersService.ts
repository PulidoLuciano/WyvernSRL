import { suppliersType } from "../utils/types/suppliersType";

const getAllSuppliers = async (url : string) => {
    
    const response = await fetch(`${url}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
    })
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(`${data.message}`);
   
    return data;

}

const create = async (url: string,obj: suppliersType) => {

    const response = await fetch(`${url}/`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "nombre": obj.name,
            "correo": obj.email? obj.email : null,
            "telefono": obj.phone ? obj.phone : null,
            "Provincias_id": Number(obj.state),
            "Rubros_id": Number(obj.category) ,
            
        })
    })

    const data = await response.json();
    
    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}

const deleteSupplier = async (url: string, ids: Array<any | null>) => {
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


export const suppliersService = {getAllSuppliers,getOne,create,deleteSupplier}