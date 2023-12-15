import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { selectFirstName, authenticated } from "./selectors"

export const useAuth = () => {
  const firstName = useSelector(selectFirstName)
  const isAuthenticated = useSelector(authenticated)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }

  return { isAuthenticated, handleLogout, firstName }
}
