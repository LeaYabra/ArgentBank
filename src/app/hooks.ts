import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"
import { selectFirstName, authenticated } from "../features/header/selectors"

// Utilisation de `useDispatch` et `useSelector` dans l'appli
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuth = () => {
  const firstName = useSelector(selectFirstName)
  const isAuthenticated = useSelector(authenticated)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }

  return { isAuthenticated, handleLogout, firstName }
}
