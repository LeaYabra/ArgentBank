import { RootState } from "../../app/store"

export const getToken = (state: RootState) => state.user && state.user.token
export const selectLoginError = (state: RootState) => state.user.error
