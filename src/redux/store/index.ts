import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import appReducer, { RootState } from "./rootReducer";
const persistConfig = {
  key: "@@appStateStores/STATE",
  storage,
  blacklist: ['AuditLog', 'Notification']
};

const RootReducer:Reducer =  (state:RootState, action: AnyAction)=> {
  if (action.type === "Auth/logout") {
    storage.removeItem('@@appStateStores/STATE')
    state = {} as RootState
  }
    return appReducer(state, action);
  }
  const persistedReducer = persistReducer(persistConfig, RootReducer);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;