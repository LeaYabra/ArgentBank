import { AppThunk } from "../../app/store"

export const updateUserInfoSuccess = (firstName: string, lastName: string) => ({
  type: "UPDATE_USER_INFO_SUCCESS",
  payload: { firstName, lastName },
})

export const updateUserInfoFailure = (error: string) => ({
  type: "UPDATE_USER_INFO_FAILURE",
  payload: { error },
})

export const updateUserInfo = (
  token: string,
  firstName: string,
  lastName: string,
): AppThunk => {
  return async (dispatch) => {
    try {
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
      console.log(token)
      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json()
        dispatch(
          updateUserInfoSuccess(
            userInfo.body.firstName,
            userInfo.body.lastName,
          ),
        )
      } else {
        const errorData = await userInfoResponse.json()
        dispatch(updateUserInfoFailure(errorData.message))
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
