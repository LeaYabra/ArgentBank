import { RootState } from "../../app/store"

export const authenticated = (state: RootState) =>
  state.user && state.user.success
export const selectFirstName = (state: RootState) => state.info?.firstName || ""
