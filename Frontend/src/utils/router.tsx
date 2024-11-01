import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
const Login = lazy(() => import("../pages/Login.tsx"));
const Clients = lazy(() => import('../pages/ClientsModule.tsx'));
const ClientDetail = lazy(() => import("../pages/ClientDetail.tsx"))
const Suppliers = lazy(() => import("../pages/SuppliersModule.tsx"))
const Sales = lazy(() => import("../pages/SalesModule.tsx"))
const Employees = lazy(() => import("../pages/EmployeesModule.tsx"))

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
    },
    {
      path: '/sales',
      element: <Sales/>
    },
    {
      path: '/employees',
      element: <Employees/>
    },
  ]);

export default router