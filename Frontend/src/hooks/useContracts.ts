import { useState, useCallback } from "react";
import { contractsService } from "../service/contractService";
import { contractType } from "../utils/types/contractType";
import { breacheType } from "../utils/types/breacheType";
import { generalService } from "../service/generalService";

const useContracts = () => {

    const [contractDetail, setContractDetail] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    const [loadingContract, setLoadingContract] = useState<boolean>(false)
    const [contractBreaches,setContractBreaches] = useState<Array<any>>([])
    const [loadingContractBreaches, setLoadingContractBreaches] = useState<boolean>(false)



    const getContract = async (contractId: number, supplier?: boolean, currency?: boolean) => {
        setLoadingContract(true)
        setError(null)
        let url = `http://localhost:3000/contracts/${contractId}/`
        let includeStatements = "?include=id&include=descripcion&include=fechaVencimiento&include=fechaPago&include=monto"
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

            const data = await contractsService.getContract(url)
            setContractDetail(data);
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoadingContract(false)
        }


    }

    const updateContract = async (id: number, contractData: contractType) => {
        setLoadingContract(true)
        setError(null)
        try {
            await contractsService.updateContract(id, contractData);
            await getContract(id,true,true);
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoadingContract(false)
        }
    }

    const getContractBreaches = async (id: number) => {

        setLoadingContractBreaches(true)
        setError(null)
        let url = `http://localhost:3000/breaches/?Contratos_id=${id}&include=id&include=fecha&include=descripcion&borrado=false&include=NivelDeIncumplimiento`
        try {
            const data = await contractsService.getContractBreaches(url)
            setContractBreaches(data)
        } catch (err:any) {
            setError(err.message)
        }finally{
            setLoadingContractBreaches(false)
        }

    }

    const createBreache = async (breacheData : breacheType) =>{

        setLoadingContractBreaches(true)
        setError(null)
        let url = "http://localhost:3000/breaches"
        try {
            await contractsService.createBreache(url,breacheData);
            await getContractBreaches(Number(breacheData.contractId));
        } catch (err:any) {
            setError(err.message)
        }finally{
            setLoadingContractBreaches(false)
        }


    }


    const deleteContractBreaches = async(contractId:number,ids:Array<string>) => {
        setLoadingContractBreaches(true);
        setError(null);
        let url = "http://localhost:3000/breaches/";
        try {
          const response = await generalService.deleteObj(url, ids);
          await getContractBreaches(contractId);
          console.log(await response);
          return response;
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoadingContractBreaches(false);
        }
      }

    return { contractBreaches,contractDetail, error, loadingContractBreaches,loadingContract,deleteContractBreaches,getContractBreaches, getContract, updateContract,createBreache }

}

export default useContracts

