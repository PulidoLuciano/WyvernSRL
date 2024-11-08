import { lazy } from 'react';
import PageTemplate from '../components/PageTemplate.tsx';
const Login = lazy(() => import("../pages/Login.tsx"));
const Home = lazy(() => import("../pages/Home.tsx"));
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
const PurchaseDetail = lazy(()=> import("../pages/details/PurchaseDetail.tsx"))
const UserDetail = lazy(()=>import("../pages/details/UserDetail.tsx"))
const RoleDetail = lazy(()=>import("../pages/details/RoleDetail.tsx"))
const Stats = lazy(()=>import("../pages/Stats.tsx"))

const routes = [

    {
      path: '/clients',
      element: <PageTemplate element={<Clients/>}/>,
      roles: ["Admin", 'Ventas', 'Auditor' ]
    },
    {
      path: '/clients/:clientId',
      element: <PageTemplate element={<ClientDetail/>}/> ,
      roles: ["Admin", 'Ventas', 'Auditor' ]
    }, 
    {
      path: '/clients/:clientId/:contactId',
      element: <PageTemplate element={<ContactDetail/>}/>,
      roles: ["Admin", 'Ventas', 'Auditor' ]
    },
    {
      path: '/suppliers',
      element: <PageTemplate element={<Suppliers/>}/>,
      roles: ["Admin", 'Compras', 'Auditor' ]
    },
    {
      path: '/suppliers/:supplierId',
      element: <PageTemplate element={<SupplierDetail/>}/>,
      roles: ["Admin", 'Compras', 'Auditor' ]
    },
    {
      path: '/markets/:marketId',
      element: <PageTemplate element={<MarketDetail/>}/> ,
      roles: ["Admin", 'Compras', 'Auditor' ]
    },
    {
      path: '/contracts/:contractId',
      element: <PageTemplate element={<ContractDetail/>}/>,
      roles: ["Admin", 'Compras', 'Auditor' ]
    },
    {
      path: '/purchases/:purchaseId',
      element: <PageTemplate element={ <PurchaseDetail/>}/>,
      roles: ["Admin", 'Compras', 'Auditor' ]
    },
    {
      path: '/sales',
      element: <PageTemplate element={<Sales/>}/>,
      roles: ["Admin", 'Ventas', 'Auditor' ]
    },
    {
      path:'/sales/:saleId',
      element: <PageTemplate element={<SaleDetail/>}/> , 
      roles: ["Admin", 'Ventas', 'Auditor']
    },
    {
      path:'/products/:productId',
      element: <PageTemplate element={<ProductDetail/>}/> ,
      roles: ["Admin", 'Ventas', 'Auditor' ]
    },
    {
      path: '/employees',
      element: <PageTemplate element={<Employees/>}/> ,
      roles: ["Admin", 'RRHH', 'Auditor' ]
    },
    {
      path: '/employees/:employeeId',
      element: <PageTemplate element={<EmployeeDetail/>}/>,
      roles: ["Admin", 'RRHH', 'Auditor' ]
    },
    {
      path: '/area/:areaId',
      element: <PageTemplate element={<AreaDetail/>}/>,
      roles: ["Admin", 'RRHH', 'Auditor' ]
    }, 
    {
      path: '/area/:areaId/:positionId',
      element:  <PageTemplate element={<PositionDetail/>}/> ,
      roles: ["Admin", 'RRHH', 'Auditor' ]
    },
    {
      path: '/admin',
      element:  <PageTemplate element={<Admin/>}/> ,
      roles: ["Admin", 'Auditor' ]
    },
    {
      path: '/admin/:userId',
      element:  <PageTemplate element={<UserDetail/>}/> ,
      roles: ["Admin", 'Auditor' ]
    },
    {
      path: '/roles/:roleId',
      element:  <PageTemplate element={<RoleDetail/>}/> ,
      roles: ["Admin", 'Auditor' ]
    },
    {
      path: '/charts',
      element:  <PageTemplate element={<Stats/>}/> ,
      roles: ["Admin", 'Ventas', 'Auditor' ]
    },
  ];

export default routes