import React from "react"
import ReactDOM from "react-dom/client"
import { Provider, useSelector } from "react-redux"
import { store, persistor, RootState } from "./app/store"
import {
  createBrowserRouter,
  RouterProvider,
  RouteProps,
  Navigate,
} from "react-router-dom"
import "./index.css"
import SignIn from "./pages/SignIn"
import User from "./pages/User"
import Home from "./pages/Home"
import { PersistGate } from "redux-persist/integration/react"

const PrivateRoute: React.FC<RouteProps & { element: React.ReactNode }> = ({
  element,
}) => {
  // Utilisation de useSelector pour accéder à l'état Redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.token !== null,
  )
  // Rendu conditionnel basé sur l'authentification de l'utilisateur
  return isAuthenticated ? <>{element}</> : <Navigate to="/" />
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/user",
    element: <PrivateRoute element={<User />} />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
