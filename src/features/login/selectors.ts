import { RootState } from "../../app/store"

export const getToken = (state: RootState) => state.user && state.user.token
