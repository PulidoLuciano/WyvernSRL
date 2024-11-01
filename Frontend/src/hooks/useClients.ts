import { useState, useCallback } from 'react';
import { clientsService } from '../service/clientsService';
import {clientType} from '../utils/types/clientType';

export const useClients = () =>{

  const [clients, setClients] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deletes, setDeletes] =useState<Array<any> | null>(null)

  const getAllClients = useCallback(async (platforms?:boolean,countries?:boolean,filterUrl?:string) => {
    setLoading(true);
    setError(null);

    let filterUrlLast;
    filterUrl? filterUrlLast = filterUrl.replace("?","&") : filterUrlLast = "";

    let url = "http://localhost:3000/clients/";  
    let includePlatformsCountries = "?include=id&include=nombre&include=correo&include=telefono&include=suscripto&include=Plataformas&include=Paises&borrado=false";
    let includePlatforms = "?include=id&include=nombre&include=correo&include=telefono&include=suscripto&include=Plataformas&borrado=false";
    let includeCountries = "?include=id&include=nombre&include=correo&include=telefono&include=suscripto&include=Paises&borrado=false";
    try {
  
        if (countries && platforms) {
          filterUrl? url = url.concat(includePlatformsCountries,filterUrlLast)  :
            url = url.concat(includePlatformsCountries);
        }
        else if (platforms) {
          filterUrl? url = url.concat(includePlatforms,filterUrlLast)  :
            url = url.concat(includePlatforms);
        } else if (countries){
          filterUrl? url = url.concat(includeCountries,filterUrlLast)  :
            url = url.concat(includeCountries);
        }
        else
        {
          if(filterUrl) url = url.concat(filterUrl); 
        }
        
        console.log(url);
        
        const data = await clientsService.getAll(url); 
        
        setClients(data)  
        } catch (err: any) {    
        setError(err.message);
        } finally {
        setLoading(false);
    }
  }, []);

  const createClient = async (clientData: clientType) => {
    setLoading(true);
    setError(null);
    let url = "http://localhost:3000/clients";
    try {
      await clientsService.create(url, clientData);
      await getAllClients(true,true); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (ids: Array<any>) => {
    setLoading(true);
    setError(null);
    let url = "http://localhost:3000/clients/";
    try {
      const response = await clientsService.deleteClient(url,ids);
      await getAllClients(true, true); 
      console.log(await response);
      return response;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { clients ,loading, error, getAllClients, createClient, deleteClient, deletes, setDeletes };
};
