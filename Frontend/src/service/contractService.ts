import { breacheType } from "../utils/types/breacheType";
import { contractType } from "../utils/types/contractType";


const getContract = async(url:string) =>{

    const response = await fetch(`${url}`,{
        mode:"cors",
        method:"GET",
        credentials:"include"
    })

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}

const getContractBreaches = async(url:string) =>{

    const response = await fetch(`${url}`,{
        mode:"cors",
        method:"GET",
        credentials:"include"
    })

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}

const updateContract = async(id:number,contractData : contractType)=>{

    const response = await fetch(`http://localhost:3000/contracts/${id}`,{
        mode:"cors",
        method:"PUT",
        credentials:"include",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "descripcion": contractData.motive,
            "fechaVencimiento": contractData.expireDate ? new Date(contractData.expireDate) : null,
            "fechaPago": contractData.payDate ? new Date(contractData.payDate) : null,
            "monto": Number(contractData.amount),
            "Proveedores_id": Number(contractData.supplier),
            "Monedas_id": Number(contractData.currency),
        })
    })

    const data = await response.json();
    
    
    if (!response.ok) throw new Error(`${data.message}`);

    return data;


}

const createBreache = async(url:string,breacheData:breacheType)=>{

    const response = await fetch(`${url}`,{
        mode:"cors",
        method:"POST",
        credentials:"include",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "descripcion": breacheData.description,
            "fecha": breacheData.date ? new Date(breacheData.date) : null,
            "Contratos_id": Number(breacheData.contractId),
            "NivelDeIncumplimiento_id": Number(breacheData.breachLevel),
            "Compras_id": null
        })
    })

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

    return data;


}


export const contractsService = {getContract,updateContract,getContractBreaches,createBreache}