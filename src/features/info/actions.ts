import { AppThunk } from "../../app/store"

export const fetchUserInfoSuccess = (firstName: string, lastName: string) => ({
  type: "FETCH_USER_INFO_SUCCESS",
  payload: { firstName, lastName },
})

export const fetchUserInfoFailure = (error: string) => ({
  type: "FETCH_USER_INFO_FAILURE",
  payload: { error },
})

export const fetchUserInfo = (token: string): AppThunk => {
  return async (dispatch) => {
    try {
      const userInfoResponse = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json()
        dispatch(
          fetchUserInfoSuccess(userInfo.body.firstName, userInfo.body.lastName),
        )
      } else {
        const errorData = await userInfoResponse.json()
        console.log("Error data:", errorData)
        dispatch(fetchUserInfoFailure(errorData.message))
      }
    } catch (error) {
      console.error(
        "Erreur lors de la requête pour obtenir les informations de l'utilisateur",
        error,
      )
      dispatch(
        fetchUserInfoFailure(
          "Erreur lors de la récupération des informations de l'utilisateur",
        ),
      )
    }
  }
}
