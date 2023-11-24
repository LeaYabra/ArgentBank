// Définition de la structure de l'état utilisateur
interface InfoState {
  token: string | null
  firstName: string
  lastName: string
  success: boolean
  error: string | null
}
// État initial pour le réducteur utilisateur
const informationState: InfoState = {
  token: null,
  firstName: "",
  lastName: "",
  success: false,
  error: null,
}

// Fonction de réduction pour gérer les actions liées à l'utilisateur
const infoReducer = (state = informationState, action: any) => {
  switch (action.type) {
    // Gérer l'action de connexion réussie
    case "FETCH_USER_INFO_SUCCESS":
      console.log("FETCH_USER_INFO_SUCCESS", action.payload)
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        success: true,
        error: null,
      }

    // Gérer l'action d'échec de connexion
    case "FETCH_USER_INFO_FAILURE":
      console.log("FETCH_USER_INFO_FAILURE", action.payload)
      return {
        ...state,
        firstName: "",
        lastName: "",
        success: false,
        error: action.payload.error,
      }

    // Cas par défaut : retourner l'état actuel
    default:
      return state
  }
}

export default infoReducer
