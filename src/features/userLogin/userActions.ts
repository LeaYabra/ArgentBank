import { AppThunk } from "../../app/store"

//Crée une action de type "LOGIN_REQUEST"
export const loginRequest = () => ({ type: "LOGIN_REQUEST" })

//Crée une action de type "LOGIN_SUCCESS" avec un token en tant que payload
export const loginSuccess = (token: string) => ({
  type: "LOGIN_SUCCESS",
  payload: { token },
})

// Action creator : Crée une action de type "LOGIN_FAILURE" avec une erreur en tant que payload
export const loginFailure = (error: string) => ({
  type: "LOGIN_FAILURE",
  payload: { error },
})

export const fetchUserInfoSuccess = (firstName: string, lastName: string) => ({
  type: "FETCH_USER_INFO_SUCCESS",
  payload: { firstName, lastName },
})

// Action creator : Crée une action de type "FETCH_USER_INFO_FAILURE" avec une erreur en tant que payload
export const fetchUserInfoFailure = (error: string) => ({
  type: "FETCH_USER_INFO_FAILURE",
  payload: { error },
})

// Thunk : Effectue une requête d'authentification asynchrone
export const loginUser = (
  email: string,
  password: string,
  navigationHelper: (str: string) => void,
): AppThunk => {
  return async (dispatch) => {
    try {
      // Dispatch de l'action "LOGIN_REQUEST" pour indiquer le début de la requête
      dispatch(loginRequest())

      // Effectue la requête d'authentification vers le serveur
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      // Vérifie si la réponse est réussie (statut 200 OK)
      if (response.ok) {
        // Récupère les données de la réponse (token) et dispatch l'action "LOGIN_SUCCESS"
        const data = await response.json()
        dispatch(loginSuccess(data.body.token))

        // Après la connexion réussie, effectuez une autre requête pour obtenir les informations de l'utilisateur
        try {
          // Effectue la requête pour obtenir les informations de l'utilisateur
          const userInfoResponse = await fetch(
            "http://localhost:3001/api/v1/user/profile",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.body.token}`, // Ajoutez le token d'authentification
              },
            },
          )
          console.log(data.body.token)
          // Vérifie si la réponse est réussie (statut 200 OK)
          if (userInfoResponse.ok) {
            // Récupère les données de la réponse (informations de l'utilisateur) et dispatch l'action "FETCH_USER_INFO_SUCCESS"
            const userInfo = await userInfoResponse.json()
            dispatch(
              fetchUserInfoSuccess(
                userInfo.body.firstName,
                userInfo.body.lastName,
              ),
            )
            console.log("userInfo:", userInfo)
          } else {
            // En cas d'échec, récupère les données d'erreur de la réponse et dispatch l'action "FETCH_USER_INFO_FAILURE"
            const errorData = await userInfoResponse.json()
            console.log("Error data:", errorData)
            dispatch(fetchUserInfoFailure(errorData.message))
          }
        } catch (error) {
          // En cas d'erreur pendant la requête, affiche l'erreur dans la console et dispatch "FETCH_USER_INFO_FAILURE"
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
        // Redirect
        return navigationHelper("/user")
      } else {
        // En cas d'échec, récupère les données d'erreur de la réponse et dispatch l'action "LOGIN_FAILURE"
        const errorData = await response.json()
        dispatch(loginFailure(errorData.message))
      }
    } catch (error) {
      // En cas d'erreur pendant la requête, affiche l'erreur dans la console et dispatch "LOGIN_FAILURE"
      console.error("Erreur lors de la requête d'authentification", error)
      dispatch(loginFailure("Erreur lors de l'authentification"))
    }
  }
}
