import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authService } from "../service/authService";
import { Credential } from "../utils/types/userTypes";
import clientType from "../utils/types/clientType";
import { clientsService } from "../service/clientsService";
import { salesService } from "../service/salesService";

interface AuthContextProps {
    user: any | null;
    clients: Array<any>;
    countries: Array<any>;
    platforms: Array<any>;
    sales: Array<any>;
    login: (credentials: Credential) => Promise<any>;
    getAllClients: () => Promise<any>;
    createClient: (client : clientType) => Promise<any>;
    getAllSales: () => Promise<any>;
  }
  
  const AuthContext = createContext<AuthContextProps | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [clients,setClients] = useState<Array<any>>([])
    const [sales,setSales] = useState<Array<any>>([])
    const [countries,setCountries] = useState<Array<any>>([])
    const [platforms,setPlatforms] = useState<Array<any>>([])

    const login = async (credentials : Credential) => {
      
      const user = await authService.login(credentials);
      setUser(user);
     
    };
  
    const getAllClients = async() =>{
      const clients = await clientsService.getAllClients();
      setClients(clients)
    }

    const getAllCountries = async() =>{
      const countries = await authService.getAllCountries();
      setCountries(countries)
    }

    const getAllPlatforms = async() =>{
      const platforms = await authService.getAllPlatforms();
      setPlatforms(platforms)
    }
    
    const createClient = async(client : clientType) =>{
      const response = await clientsService.createClient(client);
      return response;
    }

    const getAllSales = async() =>{
      const sales = await salesService.getAllSales();
      setSales(sales)
    }


    useEffect(()=>{
      getAllCountries();
      getAllPlatforms();
        
    },[])

    return (
      <AuthContext.Provider value={{sales,platforms,countries,clients,user, login,getAllClients,createClient,getAllSales }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
    export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };