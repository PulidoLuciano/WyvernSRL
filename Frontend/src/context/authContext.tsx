import { createContext, ReactNode, useContext, useState } from "react";
import { authService } from "../service/authService";
import { Credential } from "../utils/types/userTypes";

interface AuthContextProps {
    user: any | null;
    login: (credentials: Credential) => Promise<any>;
  }
  
  const AuthContext = createContext<AuthContextProps | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    
  
    const login = async (credentials : Credential) => {
      
      const user = await authService.login(credentials);
      setUser(user);
     
    };
  
  
    return (
      <AuthContext.Provider value={{ user, login }}>
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