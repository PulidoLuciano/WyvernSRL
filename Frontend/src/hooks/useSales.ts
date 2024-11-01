import {useState,useCallback} from 'react'
import { salesService } from '../service/salesService'
import { saleType } from '../utils/types/saleType'

const useSales = () => {
  
    const [sales,setSales] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [deletes, setDeletes] =useState<Array<any> | null>(null)

    const getAllSales = useCallback(async (products?:boolean,clients?:boolean,filterUrl?:string) => {
        setLoading(true);
        setError(null);
    
        let filterUrlLast;
        filterUrl? filterUrlLast = filterUrl.replace("?","&") : filterUrlLast = "";
    
        let url = "http://localhost:3000/sales/";
        let includesStatements =   "?include=id&include=fecha&borrado=false"
        let includeClientsProducts = "?include=id&include=fecha&include=Clientes&include=Productos&borrado=false";
        let includeClients = "?include=id&include=fecha&include=Clientes&borrado=false";
        let includeProducts = "?include=id&include=fecha&include=Productos&borrado=false";
        try {
      
            if (products && clients) {
              filterUrl? url = url.concat(includesStatements,filterUrlLast,"&include=Clientes&include=Productos")  :
                url = url.concat(includeClientsProducts);
            }
            else if (clients) {
              filterUrl? url = url.concat(includesStatements,filterUrlLast,"&include=Clientes")  :
                url = url.concat(includeClients);
            } else if (products){
              filterUrl? url = url.concat(includesStatements,filterUrlLast,"&include=Productos")  :
                url = url.concat(includeProducts);
            }
            else
            {
              if(filterUrl) url = url.concat(filterUrl); 
            }
            
            console.log(url);
            
            const data = await salesService.getAll(url); 
            
            setSales(data)  
            } catch (err: any) {    
            setError(err.message);
            } finally {
            setLoading(false);
        }
      }, []);


      const createSale = async (saleData: saleType) => {
        setLoading(true);
        setError(null);
        let url = "http://localhost:3000/sales";
        try {
          await salesService.create(url, saleData);
          await getAllSales(true,true); 
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
       };
    
      const deleteSale = async (ids: Array<any>) => {
        setLoading(true);
        setError(null);
        let url = "http://localhost:3000/sales/";
        try {
          const response = await salesService.deleteSale(url,ids);
          await getAllSales(true, true); 
          console.log(await response);
          return response;
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };


    return {sales,loading,error,getAllSales,createSale,deleteSale}

}

export default useSales