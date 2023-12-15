import { RootState } from "../../app/store"

export const selectFirstName = (state: RootState) => state.info?.firstName || ""
export const selectLastName = (state: RootState) => state.info?.lastName || ""
export const selectUpdateSuccess = (state: RootState) => state.update.success
export const selectUpdateError = (state: RootState) => state.update.error
