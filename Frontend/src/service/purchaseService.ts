import { breacheType } from "../utils/types/breacheType";
import { purchaseType } from "../utils/types/purchaseType";


const getPurchase = async(url:string) =>{

    const response = await fetch(`${url}`,{
        mode:"cors",
        method:"GET",
        credentials:"include"
    })

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}


const getPurchaseBreaches = async(url:string) =>{

    const response = await fetch(`${url}`,{
        mode:"cors",
        method:"GET",
        credentials:"include"
    })

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

    return data;

}

const updatePurchase = async(id:number,purchaseData : purchaseType)=>{

    const response = await fetch(`http://localhost:3000/purchases/${id}`,{
        mode:"cors",
        method:"PUT",
        credentials:"include",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "descripcion": purchaseData.description,
            "Monedas_id": Number(purchaseData.currency),
            "Proveedores_id": Number(purchaseData.supplier),
            "precioUnitario": Number(purchaseData.unitPrice),
            "pagado": purchaseData.paid,
            "entregado": purchaseData.delivered,
            "fechaCompra": purchaseData.purchaseDate ? new Date(purchaseData.purchaseDate) : null,
            "cantidad": Number(purchaseData.quantity)
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
            "Contratos_id": null,
            "NivelDeIncumplimiento_id": Number(breacheData.breachLevel),
            "Compras_id": Number(breacheData.purchaseId)
        })
    })

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

    return data;


}



export const purchaseService = {getPurchase,updatePurchase,getPurchaseBreaches,createBreache}

