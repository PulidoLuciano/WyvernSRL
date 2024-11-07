import { useState } from "react";
import { purchaseService } from "../service/purchaseService";
import { purchaseType } from "../utils/types/purchaseType";
import { breacheType } from "../utils/types/breacheType";
import { generalService } from "../service/generalService";

const usePurchases = () => {
    
    const [purchaseDetail, setPurchaseDetail] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    const [loadingPurchase, setLoadingPurchase] = useState<boolean>(false)
    const [purchaseBreaches,setPurchaseBreaches] = useState<Array<any>>([])
    const [loadingPurchaseBreaches, setLoadingPurchaseBreaches] = useState<boolean>(false)



    const getPurchase = async (purchaseId: number, supplier?: boolean, currency?: boolean) => {
        setLoadingPurchase(true)
        setError(null)
        let url = `http://localhost:3000/purchases/${purchaseId}/`
        let includeStatements = "?include=id&include=descripcion&include=fechaCompra&include=pagado&include=entregado&include=cantidad&include=precioUnitario"
        let includeSupplier = "&include=Proveedores"
        let includeCurrency = "&include=Monedas"
        try {

            if (supplier && currency) {
                url = url.concat(includeStatements, includeCurrency, includeSupplier)
            } else if (supplier) {
                url = url.concat(includeStatements, includeSupplier)
            } else if (currency) {
                url = url.concat(includeStatements, includeCurrency)
            }

            const data = await purchaseService.getPurchase(url)
            setPurchaseDetail(data);
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoadingPurchase(false)
        }


    }

    const updatePurchase = async (id: number, purchaseData: purchaseType) => {
        setLoadingPurchase(true)
        setError(null)
        try {
            await purchaseService.updatePurchase(id, purchaseData);
            await getPurchase(id,true,true);
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoadingPurchase(false)
        }
    }

    const getPurchaseBreaches = async (id: number) => {

        setLoadingPurchaseBreaches(true)
        setError(null)
        let url = `http://localhost:3000/breaches/?Compras_id=${id}&include=id&include=fecha&include=descripcion&borrado=false&include=NivelDeIncumplimiento`
        try {
            const data = await purchaseService.getPurchaseBreaches(url)
            setPurchaseBreaches(data)
        } catch (err:any) {
            setError(err.message)
        }finally{
            setLoadingPurchaseBreaches(false)
        }

    }

    const createBreache = async (breacheData : breacheType) =>{

        setLoadingPurchaseBreaches(true)
        setError(null)
        let url = "http://localhost:3000/breaches"
        try {
            await purchaseService.createBreache(url,breacheData);
            await getPurchaseBreaches(Number(breacheData.purchaseId));
        } catch (err:any) {
            setError(err.message)
        }finally{
            setLoadingPurchaseBreaches(false)
        }


    }


    const deletePurchaseBreaches = async(contractId:number,ids:Array<string>) => {
        setLoadingPurchaseBreaches(true);
        setError(null);
        let url = "http://localhost:3000/breaches/";
        try {
          const response = await generalService.deleteObj(url, ids);
          await getPurchaseBreaches(contractId);
          console.log(await response);
          return response;
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoadingPurchaseBreaches(false);
        }
      }

    return { purchaseDetail,purchaseBreaches,loadingPurchase,loadingPurchaseBreaches,error,createBreache,getPurchaseBreaches,deletePurchaseBreaches,getPurchase,updatePurchase }


}

export default usePurchases