import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
const Login = lazy(() => import("../pages/Login.tsx"));
const Clients = lazy(() => import('../pages/ClientsModule.tsx'));
const ClientDetail = lazy(() => import("../pages/details/ClientDetail.tsx"));
const Suppliers = lazy(() => import("../pages/SuppliersModule.tsx"));
const SupplierDetail = lazy(() => import("../pages/details/SupplierDetail.tsx"));
const Sales = lazy(() => import("../pages/SalesModule.tsx"));
const Employees = lazy(() => import("../pages/EmployeesModule.tsx"));
const EmployeeDetail = lazy(() => import("../pages/details/EmployeeDetail.tsx"));

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
      path: '/suppliers/:supplierId',
      element: <SupplierDetail/>
    },
    {
      path: '/sales',
      element: <Sales/>
    },
    {
      path: '/employees',
      element: <Employees/>
    },
    {
      path: '/employees/:employeeId',
      element: <EmployeeDetail/>
    },
  ]);

export default router