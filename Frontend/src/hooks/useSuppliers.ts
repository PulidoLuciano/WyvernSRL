import { useState, useCallback } from "react";
import { suppliersService } from "../service/suppliersService";
import { suppliersType } from "../utils/types/suppliersType";
import { contractType } from "../utils/types/contractType";

const useSuppliers = () => {

    const [suppliers, setSuppliers] = useState<Array<any>>([]);
    const [supplierDetail, setSupplierDetail] = useState<any>(null);
    const [contracts, setContracts] = useState<Array<any>>([]);
    const [contractDetail, setContractDetail] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [deletes, setDeletes] = useState<Array<any> | null>(null);

    //Suppliers
    const getAllSuppliers = useCallback(
        async (state?: boolean, category?: boolean, filterUrl?: string) => {
            setLoading(true);
            setError(null);

            let filterUrlLast;
            filterUrl
                ? (filterUrlLast = filterUrl.replace("?", "&"))
                : (filterUrlLast = "");

            let url = "http://localhost:3000/providers/";
            let includesStatements = "?include=id&include=nombre&include=correo&include=telefono&borrado=false"
            let includeStateCategory = "?include=id&include=nombre&include=correo&include=telefono&include=Rubros&include=Provincias&borrado=false";
            let includeState = "?include=id&include=nombre&include=correo&include=telefono&include=Provincias&borrado=false";
            let includeCategory = "?include=id&include=nombre&include=correo&include=telefono&include=Rubros&borrado=false";
            try {

                if (state && category) {
                    filterUrl
                        ? (url = url.concat(includesStatements, filterUrlLast, "&include=Provincias&include=Rubros"))
                        : (url = url.concat(includeStateCategory));
                } else if (state) {
                    filterUrl
                        ? (url = url.concat(includesStatements, filterUrlLast, "&include=Provincias"))
                        : (url = url.concat(includeState));
                } else if (category) {
                    filterUrl
                        ? (url = url.concat(includesStatements, filterUrlLast, "&include=Rubros"))
                        : (url = url.concat(includeCategory));
                } else {
                    if (filterUrl) url = url.concat(filterUrl);
                }

                const data = await suppliersService.getAllSuppliers(url);
                setSuppliers(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const createSupplier = async (supplierData: suppliersType) => {
        setLoading(true);
        setError(null);
        let url = "http://localhost:3000/providers";
        try {
            await suppliersService.createSupplier(url, supplierData);
            await getAllSuppliers(true, true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteSuppliers = async (ids: Array<any>) => {
        setLoading(true);
        setError(null);
        let url = "http://localhost:3000/providers/";
        try {
            const response = await suppliersService.deleteObj(url, ids);
            await getAllSuppliers(true, true);
            console.log(await response.json());
            return response;
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getSupplier = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        let url = `http://localhost:3000/providers/${id}/?include=id&include=nombre&include=correo&include=telefono&include=Provincias&include=Rubros&borrado=false`;
        try {
            const data = await suppliersService.getOne(url);
            setSupplierDetail(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);


    //Contracts
    const getSupplierContracts = useCallback(
        async (supplier?: boolean, currency?: boolean, filterUrl?: string, id?: string) => {
            setLoading(true);
            setError(null);

            let filterUrlLast;
            filterUrl
                ? (filterUrlLast = filterUrl.replace("?", "&"))
                : (filterUrlLast = "");

            let url = `http://localhost:3000/contracts/?Proveedores_id=${id}`;
            let includesStatements = "&include=id&include=descripcion&include=fechaVencimiento&include=fechaPago&include=monto&borrado=false"
            let includeSupplier = "&include=Proveedores";
            let includeCurrency = "&include=Monedas";
            try {

                if (supplier && currency) {
                    filterUrl
                        ? (url = url.concat(includesStatements, filterUrlLast, includeSupplier, includeCurrency))
                        : (url = url.concat(includesStatements, includeSupplier, includeCurrency));
                } else if (supplier) {
                    filterUrl
                        ? (url = url.concat(includesStatements, filterUrlLast, includeSupplier))
                        : (url = url.concat(includesStatements, includeSupplier));
                } else if (currency) {
                    filterUrl
                        ? (url = url.concat(includesStatements, filterUrlLast, includeCurrency))
                        : (url = url.concat(includesStatements, includeCurrency));
                } else {
                    if (filterUrl) url = url.concat(filterUrl);
                }

                const data = await suppliersService.getAllSuppliers(url);

                setContracts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const createContract = async (supplierId:string,contractData: contractType) => {
        setLoading(true);
        setError(null);
        let url = "http://localhost:3000/contracts";
        try {
            await suppliersService.createContract(url, contractData);
            await getSupplierContracts(true, true,undefined,supplierId);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteContract = async (idSupplier: string, ids: Array<any>) => {
        setLoading(true);
        setError(null);
        let url = "http://localhost:3000/contracts";
        try {
            const response = await suppliersService.deleteObj(url, ids);
            console.log(response);
            await getSupplierContracts(true,true,undefined,idSupplier);
            return response;
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getContract = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        let url = `http://localhost:3000/contracts/${id}/?include=id&include=descripcion&include=fechaVencimiento&include=fechaPago&include=monto&borrado=false&include=Proveedores&include=Monedas`;
        try {
            const data = await suppliersService.getOne(url);
            setContractDetail(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSupplier = async(id:number,supplierData:suppliersType)=>{
       setLoading(true)
       setError(null)
        try {
        await suppliersService.updateSupplier(id,supplierData);
        await getSupplier(id);
       } catch (err : any) {
        setError(err.message)
       }finally{
        setLoading(false)
       }

    }

    return { createSupplier, updateSupplier, deleteSuppliers, createContract, getContract, deleteContract, getSupplierContracts, getAllSuppliers, getSupplier, contracts, contractDetail, loading, supplierDetail, suppliers, error }

}

export default useSuppliers