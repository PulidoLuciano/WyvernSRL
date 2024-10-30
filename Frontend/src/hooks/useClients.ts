import { useState, useCallback } from 'react';
import { clientsService } from '../service/clientsService';
import clientType from '../utils/types/clientType';

export const useClients = () =>{

  const [clients, setClients] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const getAllClients = useCallback(async (platforms?:boolean,countries?:boolean) => {
    setLoading(true);
    setError(null);
    let url = "http://localhost:3000/clients/";
    try {
  
        if (countries && platforms) {
            url = url.concat("?include=id&include=nombre&include=correo&include=telefono&include=suscripto&include=Plataformas&include=Paises");
        }
        else if (platforms) {
            url = url.concat("?include=id&include=nombre&include=correo&include=telefono&include=suscripto&include=Plataformas");
        } else if (countries){
            url = url.concat("?include=id&include=nombre&include=correo&include=telefono&include=suscripto&include=Paises");
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
      await getAllClients(); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

//   const deleteClient = async (clientId: number) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await clientsService.delete(clientId);
//       await getClients(); 
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

  return { clients ,loading, error, getAllClients, createClient };
};
