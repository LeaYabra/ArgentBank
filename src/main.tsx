import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import Home from "./pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import SignIn from "./pages/SignPage"
import "./index.css"
import SignIn from "./pages/SignPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
