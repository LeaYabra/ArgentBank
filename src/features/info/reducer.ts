// Définition de la structure des infos utilisateur
export interface InfoState {
  token: string | null
  firstName: string
  lastName: string
  success: boolean
  error: string | null
}
// État initial pour le réducteur utilisateur
export const informationState: InfoState = {
  token: null,
  firstName: "",
  lastName: "",
  success: false,
  error: null,
}

// Fonction de réduction pour gérer les actions liées à l'utilisateur
const infoReducer = (state = informationState, action: any) => {
  switch (action.type) {
    // Gérer l'action d'info récuperer
    case "FETCH_USER_INFO_SUCCESS":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        success: true,
        error: null,
      }
    // Gérer l'action d'échec de récuparation
    case "FETCH_USER_INFO_FAILURE":
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
