import { RootState } from "../../app/store"

export const getFullName = (state: RootState) =>
  state.info &&
  state.info.firstName &&
  state.info.lastName &&
  `${state.info.firstName} ${state.info.lastName}`
