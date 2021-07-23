import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      // Ignore these paths in the state
      ignoredPaths: ['items.dates']
    }
  })
})
