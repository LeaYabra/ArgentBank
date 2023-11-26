// Définition de la structure de l'état utilisateur
interface UserState {
  token: string | null
  loading: boolean
  success: boolean
  error: string | null
}

// État initial pour le réducteur utilisateur
const initialState: UserState = {
  token: null,
  loading: false,
  success: false,
  error: null,
}

// Fonction de réduction pour gérer les actions liées à l'utilisateur
const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Gérer l'action de demande de connexion
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      }

    // Gérer l'action de connexion réussie
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        loading: false,
        success: true,
        error: null,
      }

    // Gérer l'action d'échec de connexion
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      }
    case "LOGOUT":
      return {
        ...state,
        success: false,
      }

    // Cas par défaut : retourner l'état actuel
    default:
      return state
  }
}

export default userReducer
