import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userReducer from "../features/userLogin/userReducer"
import infoReducer from "../features/userLogin/infoReducer"
export const store = configureStore({
  reducer: {
    user: userReducer,
    info: infoReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
