import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";


interface RedirectIfLoggedInProps {
    children: React.ReactNode;
  }

const RedirectIfLoggedIn = ({children} : RedirectIfLoggedInProps) => {
  const { authenticated, loading } = useAuth();

  if (!loading && authenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default RedirectIfLoggedIn;
