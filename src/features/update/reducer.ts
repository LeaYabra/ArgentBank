// Définition de la structure de la modification info
export interface UpdateState {
  success: boolean
  error: string | null
}
// État initial pour le réducteur utilisateur
export const updateState: UpdateState = {
  success: false,
  error: null,
}

// Fonction de réduction pour gérer les actions liées à l'utilisateur
const updateReducer = (state = updateState, action: any) => {
  switch (action.type) {
    // Gérer l'action de modification réussie
    case "UPDATE_USER_INFO_SUCCESS":
      return {
        ...state,
        success: true,
        error: null,
      }
    // Gérer l'action d'échec de modification
    case "UPDATE_USER_INFO_FAILURE":
      return {
        ...state,
        success: false,
        error: action.payload.error,
      }
    // Cas de réinitialisation de l'état lors d'une déconnexion
    case "RESET_UPDATE_STATE":
      return updateState

    // Cas par défaut : retourner l'état actuel
    default:
      return state
  }
}

export default updateReducer
