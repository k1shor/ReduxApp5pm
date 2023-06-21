import { combineReducers, createStore } from "redux";
import itemReducer from "./itemReducer";
import cartReducer from "./cartReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    itemStore: itemReducer,
    cartStore: cartReducer
})

const persistConfig = {
    key: 'root',
    storage: storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const myStore = createStore(persistedReducer)
export const myPersistor = persistStore(myStore)
