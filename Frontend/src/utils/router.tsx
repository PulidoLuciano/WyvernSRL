import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
const Login = lazy(() => import("../pages/Login.tsx"));
const Clients = lazy(() => import('../pages/ClientsModule.tsx'));
const ClientDetail = lazy(() => import("../pages/details/ClientDetail.tsx"));
const ContactDetail = lazy(() => import("../pages/details/ContactDetail.tsx"));
const Suppliers = lazy(() => import("../pages/SuppliersModule.tsx"));
const SupplierDetail = lazy(() => import("../pages/details/SupplierDetail.tsx"));
const MarketDetail = lazy(()=>import("../pages/details/MarketDetail.tsx"))
const Sales = lazy(() => import("../pages/SalesModule.tsx"));
const SaleDetail = lazy(() => import("../pages/details/SaleDetail.tsx"));
const ProductDetail = lazy(()=> import("../pages/details/ProductDetail.tsx"))
const Employees = lazy(() => import("../pages/EmployeesModule.tsx"));
const EmployeeDetail = lazy(() => import("../pages/details/EmployeeDetail.tsx"));
const ContractDetail = lazy(()=>import("../pages/details/ContractDetail.tsx"));
const AreaDetail = lazy(()=>import("../pages/details/AreaDetail.tsx"));
const PositionDetail = lazy(()=>import("../pages/details/PositionDetail.tsx"))
const Admin = lazy(()=>import("../pages/AdminModule.tsx"))
const UserDetail = lazy(()=>import("../pages/details/UserDetail.tsx"))
const RoleDetail = lazy(()=>import("../pages/details/RoleDetail.tsx"))

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
      path: '/clients/:clientId/:contactId',
      element: <ContactDetail/>
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
      path: '/markets/:marketId',
      element: <MarketDetail/>
    },
    {
      path: '/contracts/:contractId',
      element: <ContractDetail/>
    },
    {
      path: '/sales',
      element: <Sales/>
    },
    {
      path:'/sales/:saleId',
      element: <SaleDetail/>
    },
    {
      path:'/products/:productId',
      element: <ProductDetail/>
    },
    {
      path: '/employees',
      element: <Employees/>
    },
    {
      path: '/employees/:employeeId',
      element: <EmployeeDetail/>
    },
    {
      path: '/area/:areaId',
      element: <AreaDetail/>
    }, 
    {
      path: '/area/:areaId/:positionId',
      element: <PositionDetail/>
    },
    {
      path: '/admin',
      element: <Admin/>
    },
    {
      path: '/admin/:userId',
      element: <UserDetail/>
    },
    {
      path: '/roles/:roleId',
      element: <RoleDetail/>
    },
  ]);

export default router