import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userReducer from "../features/login/reducer"
import infoReducer from "../features/info/reducer"

const persistConfig = {
  key: "newRootKey",
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  info: infoReducer,
})

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
