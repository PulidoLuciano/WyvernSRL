import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

interface PrivateRouteProps {
    roles: string[];
    element: JSX.Element
  }


const PrivateRoute = ( {element, roles} : PrivateRouteProps) => {
    const { role, authenticated, loading } = useAuth();
    
    if (loading) return <h1>Loading...</h1>
    
  if (!loading && !authenticated ) return <Navigate to='/' replace/>

  if (!loading && authenticated && !roles.includes(role) ) return  <Navigate to="/unauthorized" replace />;
    

  return element

};


export default PrivateRoute;