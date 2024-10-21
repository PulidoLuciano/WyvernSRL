import { StrictMode, lazy} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RouteType} from './types';
const Login = lazy(() => import("./pages/Login.tsx"));
const Clients = lazy(() => import('./pages/Clients.tsx'));

const routes: Array<RouteType> = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/clients',
    element: <Clients />,
  },
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App routes={routes}/>
  </StrictMode>,
)
