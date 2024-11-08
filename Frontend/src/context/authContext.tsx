import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authService } from "../service/authService";
import { Credential } from "../utils/types/userTypes";
import {clientType} from "../utils/types/clientType";
import { clientsService } from "../service/clientsService";
import { salesService } from "../service/salesService";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface AuthContextProps {
    user: any | null;
    login: (credentials: Credential) => Promise<any>;
    createClient: (client : clientType) => Promise<any>;
    role: string;
    authenticated: boolean;
    logout: () => any;
    loading: boolean;
    error: string | null
  }
  
  const AuthContext = createContext<AuthContextProps | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<any | null>(null);
    const [role, setRole] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    console.log(loading, authenticated);
    

    const login = async (credentials : Credential) => {
      setLoading(true);
      setError(null);
      try {
        
        const user = await authService.login(credentials);
        setUser(user);
        const cookies = Cookies.get()
        const decode : {role : string} = jwtDecode(cookies.authenticationToken)
        const rol = decode.role
        
        if (rol) {
          setRole(rol);
        }        
        setAuthenticated(true);
      } catch (err: any) {       
        setError(err.message);
      } finally {
        setLoading(false);
      }
     
    };

    const logout = async () => {
      
      Cookies.remove('authenticationToken');
      setAuthenticated(false)
      setUser(null)
      setRole(null)
    };

    useEffect(() => {
      async function checkLogin() {

          const cookies = Cookies.get()
          console.log(cookies.authenticationToken);
          
          if (cookies.authenticationToken==undefined || cookies.authenticationToken==null) {
            
              setAuthenticated(false)
              setLoading(false)
              setRole(null)
          }else{
              setAuthenticated(true)   
              setLoading(false)

              const cookies = Cookies.get()
              const decode : {role : string} = jwtDecode(cookies.authenticationToken)
              const rol = decode.role
              
              if (rol) {
                setRole(rol);
              }else{
                setRole(null);
              }    

          }         
       
      }

      checkLogin();
  }, []);
    
    const createClient = async(client : clientType) =>{
      let url = "http://localhost:3000/clients/";
      const response = await clientsService.create(url,client);
      return response;
    }

    
    return (
      <AuthContext.Provider value={{user, login,createClient, role, authenticated, logout, loading, error}}>
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