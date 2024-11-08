import { Suspense } from "react"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import routes from "./utils/router"
import { AuthProvider } from "./context/authContext"
import PrivateRoute from "./components/routes/PrivateRoute"
import Login from "./pages/Login"
import Unauthorized from "./pages/Unauthorized"
import Home from "./pages/Home"
import RedirectIfLoggedIn from "./components/routes/RedirectIdLoggedIn"
import PageTemplate from "./components/PageTemplate"

const createRoutes = () => {
  return routes.map((route) => {
    if (route.roles) {
      return {
        path: route.path,
        element: (
          <PrivateRoute element={route.element} roles={route.roles}/>
        ),
      };
    }
    return route;
  });
};

function App() {

  const router = createBrowserRouter([
    ...createRoutes(),
    {
      path: '/home',element: <PageTemplate element={<Home/>}/>,roles: ["Admin", 'Ventas', 'RRHH' ,'Compras', 'Auditor' ]
    },
    { path: "/", element: <RedirectIfLoggedIn><Login/></RedirectIfLoggedIn> },
    { path: "/unauthorized", element: <PageTemplate element={<Unauthorized />}/> },
  ]);


  return (
    <AuthProvider>
      <Suspense fallback={<h1>Cargando...</h1>}>
        <RouterProvider router={router}/>     
      </Suspense>
    </AuthProvider>
  )
}

export default App
