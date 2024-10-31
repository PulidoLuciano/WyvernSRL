import { useState, useCallback } from 'react';
import { clientsService } from '../service/clientsService';
import {clientType} from '../utils/types/clientType';

export const useClients = () =>{

  const [clients, setClients] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deletes, setDeletes] =useState<Array<any> | null>(null)

  const getAllClients = useCallback(async (platforms?:boolean,countries?:boolean) => {
    setLoading(true);
    setError(null);
    let url = "http://localhost:3000/clients/";
    try {
  
        if (countries && platforms) {
            url = url.concat("?include=id&include=nombre&include=correo&include=telefono&include=suscripto&include=Plataformas&include=Paises&borrado=false");
        }
        else if (platforms) {
            url = url.concat("?include=id&include=nombre&include=correo&include=telefono&include=suscripto&include=Plataformas&borrado=false");
        } else if (countries){
            url = url.concat("?include=id&include=nombre&include=correo&include=telefono&include=suscripto&include=Paises&borrado=false");
        }
        const data = await clientsService.getAll(url); 

        
        setClients(data);
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
