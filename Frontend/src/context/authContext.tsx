import { createContext, ReactNode, useContext, useState } from "react";
import { authService } from "../service/authService";
import { Credential } from "../utils/types/userTypes";
import clientType from "../utils/types/clientType";
import { clientsService } from "../service/clientsService";
import { salesService } from "../service/salesService";

interface AuthContextProps {
    user: any | null;
    sales: Array<any>;
    products: Array<any>
    login: (credentials: Credential) => Promise<any>;
    createClient: (client : clientType) => Promise<any>;
    getAllSales: () => Promise<any>;
    getAllProducts: () => Promise<any>;
  }
  
  const AuthContext = createContext<AuthContextProps | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [products,setProducts] = useState<Array<any>>([])
    const [sales,setSales] = useState<Array<any>>([])

    const login = async (credentials : Credential) => {
      
      const user = await authService.login(credentials);
      setUser(user);
     
    };
    
    const createClient = async(client : clientType) =>{
      let url = "http://localhost:3000/clients/";
      const response = await clientsService.create(url,client);
      return response;
    }

    const getAllSales = async() =>{
      const sales = await salesService.getAllSales();
      setSales(sales);
    }

    const getAllProducts = async()=>{
      const products = await salesService.getAllProducts();
      setProducts(products);
    }

    return (
      <AuthContext.Provider value={{products,sales,user, login,createClient,getAllSales,getAllProducts }}>
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