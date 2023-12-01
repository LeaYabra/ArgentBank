import { AppThunk } from "../../app/store"
import { fetchUserInfo } from "../info/actions"

export const loginRequest = () => ({ type: "LOGIN_REQUEST" })

export const loginSuccess = (token: string) => ({
  type: "LOGIN_SUCCESS",
  payload: { token },
})

export const loginFailure = (error: string) => ({
  type: "LOGIN_FAILURE",
  payload: { error },
})

export const loginUser = (
  email: string,
  password: string,
  navigationHelper: (str: string) => void,
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest())

      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        dispatch(loginSuccess(data.body.token))

        // Dispatch de l'action pour récupérer les informations de l'utilisateur
        dispatch(fetchUserInfo(data.body.token))

        return navigationHelper("/user")
      } else {
        const errorData = await response.json()
        dispatch(loginFailure(errorData.message))
      }
    } catch (error) {
      console.error("Erreur lors de la requête d'authentification", error)
      dispatch(loginFailure("Erreur lors de l'authentification"))
    }
  }
}
