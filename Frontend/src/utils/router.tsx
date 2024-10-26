import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
const Login = lazy(() => import("../pages/Login.tsx"));
const Clients = lazy(() => import('../pages/ClientsModule.tsx'));
const ClientDetail = lazy(() => import("../pages/ClientData.tsx"))
const Suppliers = lazy(() => import("../pages/SuppliersModule.tsx"))

const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>,
    },
    {
      path: '/clients',
      element: <Clients/>,
    },
    {
      path: '/clients/:clientId',
      element: <ClientDetail/>
    },
    {
      path: '/suppliers',
      element: <Suppliers/>
    }
  ]);

export default router