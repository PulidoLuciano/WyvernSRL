import { Suspense } from "react"
import { RouteType } from "./types"
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App({routes} : {routes : Array<RouteType>}) {
  return (
    <Suspense fallback={<h1>Cargando...</h1>}>
        <BrowserRouter>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
