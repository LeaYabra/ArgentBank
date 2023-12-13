import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { useDispatch } from "react-redux"
export const useAuth = () => {
  const info = useSelector((state: RootState) => state.info)
  const isAuthenticated = useSelector((state: RootState) => state.user.success)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }
  const getName = () => {
    return info.firstName
  }

  return { isAuthenticated, handleLogout, getName }
}
