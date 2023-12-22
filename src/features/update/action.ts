import { AppThunk } from "../../app/store"
import { fetchUserInfoSuccess } from "../info/actions"
import { getToken } from "../login/selectors"
import { redirect } from "react-router-dom"

export const updateUserInfoSuccess = () => ({
  type: "UPDATE_USER_INFO_SUCCESS",
})

export const updateUserInfoFailure = (error: string) => ({
  type: "UPDATE_USER_INFO_FAILURE",
  payload: { error },
})

export const updateUserInfo = (
  firstName: string,
  lastName: string,
): AppThunk => {
  return async (dispatch, getState) => {
    const token = getToken(getState())
    try {
      if (!token) {
        console.error("Jeton d'authentification manquant.")
        // Rediriger vers la page de connexion
        redirect("/sign-in")
        return
      }
      const userInfoResponse = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ firstName, lastName }),
        },
      )
      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json()
        dispatch(updateUserInfoSuccess())
        dispatch(
          fetchUserInfoSuccess(userInfo.body.firstName, userInfo.body.lastName),
        )
      } else {
        const errorData = await userInfoResponse.json()
        if (userInfoResponse.status === 401) {
          dispatch(updateUserInfoFailure(errorData.message))
          console.error("Le jeton d'authentification a expiré.")
          // Attendre 3 secondes avant de rediriger vers la page de connexion
          setTimeout(() => {
            redirect("/sign-in")
            return
          }, 3000)
        } else {
          dispatch(updateUserInfoFailure(errorData.message))
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la requête pour obtenir les informations de l'utilisateur",
        error,
      )
      dispatch(
        updateUserInfoFailure(
          "Erreur lors de la récupération des informations de l'utilisateur",
        ),
      )
    }
  }
}
