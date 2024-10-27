import { Suspense } from "react"
import {RouterProvider} from 'react-router-dom'
import router from "./utils/router"
import { AuthProvider } from "./context/authContext"
function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<h1>Cargando...</h1>}>
        <RouterProvider router={router}/>     
      </Suspense>
    </AuthProvider>
  )
}

export default App
