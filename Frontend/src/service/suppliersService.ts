import { contractType } from "../utils/types/contractType";
import { suppliersType } from "../utils/types/suppliersType";
import { purchaseType } from "../utils/types/purchaseType";

const getAllSuppliers = async (url: string) => {

    const response = await fetch(`${url}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
    })

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}

const createSupplier = async (url: string, obj: suppliersType) => {

    const response = await fetch(`${url}/`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "nombre": obj.name,
            "correo": obj.email ? obj.email : null,
            "telefono": obj.phone ? obj.phone : null,
            "Provincias_id": Number(obj.state),
            "Rubros_id": Number(obj.category),

        })
    })

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}

const updateSupplier = async (id: number, obj: suppliersType) => {

    const response = await fetch(`http://localhost:3000/providers/${id}`, {
        mode: "cors",
        method: "PUT",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            "nombre": obj.name,
            "correo": obj.email ? obj.email : null,
            "telefono": obj.phone ? obj.phone : null,
            "Provincias_id": Number(obj.state),
            "Rubros_id": Number(obj.category),

        })
    })

    const data = await response.json()
    console.log(data);
    if (!response.ok) throw new Error(`${data.message}`);
    return data;

}

const getSupplierScore = async (id:number) =>{

    const response = await fetch(`http://localhost:3000/providers/${id}/score`,{
        mode:"cors",
        method:"GET",
        credentials:"include"
    })

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}

const getSupplierBreaches = async (id:number) =>{

    const response = await fetch(`http://localhost:3000/providers/${id}/breaches`,{
        mode:"cors",
        method:"GET",
        credentials:"include"
    })

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}

const deleteObj = async (url: string, ids: Array<any | null>) => {
    const response = await fetch(`${url}`, {
        mode: 'cors',
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ ids })
    })

    const data = await response.json();
    console.log(data);
    
    if (!response.ok) throw new Error(`${data.message}`);
    return data
}

const getOne = async (url: string) => {

    const response = await fetch(`${url}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
    })

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}

const createContract = async (url: string, obj: contractType) => {

    const response = await fetch(`${url}/`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "descripcion": obj.motive,
            "fechaVencimiento": obj.expireDate ? new Date(obj.expireDate) : null,
            "fechaPago": obj.payDate ? new Date(obj.payDate) : null,
            "monto": Number(obj.amount),
            "Proveedores_id": Number(obj.supplier),
            "Monedas_id": Number(obj.currency),

        })
    })

    const data = await response.json();
    console.log(data);

    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}

const createPurchase = async (url: string, obj: purchaseType) => {
    const response = await fetch(`${url}`, {
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "descripcion": obj.description,
            "precioUnitario": Number(obj.unitPrice),
            "cantidad": Number(obj.quantity),
            "fechaCompra": obj.purchaseDate ? new Date(obj.purchaseDate) : null,
            "entregado": obj.delivered,
            "pagado": obj.paid,
            "Monedas_id": Number(obj.currency),
            "Proveedores_id": Number(obj.supplier),
            
        })
    })

    const data = await response.json();
    console.log(data);

    if (!response.ok) throw new Error(`${data.message}`);

    return data;
}

export const suppliersService = { getSupplierBreaches,getSupplierScore,createPurchase,updateSupplier, getAllSuppliers, getOne, createContract, createSupplier, deleteObj }