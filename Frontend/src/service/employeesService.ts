import { employeeType } from "../utils/types/employeeType";

const getAllEmployees = async (url : string) => {
    
    const response = await fetch(`${url}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
    })
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(`${data.message}`);
   
    return data;

}

const createEmployee= async (url: string,obj: employeeType) => {
    
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
            "dni": obj.dni,
            "telefono": obj.phone ? obj.phone : null,
            "fechaContratacion": obj.hiringDate ? new Date (obj.hiringDate) : null,
            "sueldo": obj.salary,
            "Provincias_id": Number(obj.state),
            "Puestos_id": Number(obj.position)
        })
    })

    const data = await response.json();
    console.log(data);
    
    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}

const updateEmployee = async(id: number,obj:employeeType)=>{
    
        const response = await fetch(`http://localhost:3000/employees/${id}`,{
            mode:"cors",
            method: "PUT",
            credentials: "include",
            headers:{
                'Content-Type' : 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                "nombre": obj.name,
                "correo": obj.email,
                "dni": obj.dni,
                "telefono": obj.phone ? obj.phone : null,
                "fechaContratacion": obj.hiringDate ? new Date(obj.hiringDate) : null,
                "sueldo": obj.salary,
                "Provincias_id": Number(obj.state),
                "Puestos_id": Number(obj.position)
            })
        })
        
        const data = await response.json()
        console.log(data);
        if(!response.ok) throw new Error(`${data.message}`);
        return data;
 
}

const deleteEmployee = async (url: string, ids: Array<any | null>) => {
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

const getEmployeePosition = async (url : string) => {

    const response = await fetch(`${url}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
    })
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(`${data.message}`);
    
    return data;
    
}

const getEmployeeCareer = async (url : string) => {

    const response = await fetch(`${url}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
    })
    
    const data = await response.json();
    
    if (!response.ok) throw new Error(`${data.message}`);
    
    return data;
    
}
    


export const employeesService = {updateEmployee, getAllEmployees, getOne, createEmployee, deleteEmployee, getEmployeePosition, getEmployeeCareer}