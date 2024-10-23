import { Suspense } from "react"
import {RouterProvider} from 'react-router-dom'
import router from "./utils/router"

function App() {
  return (
    <Suspense fallback={<h1>Cargando...</h1>}>
      <RouterProvider router={router}/>     
    </Suspense>
  )
}

export default App
