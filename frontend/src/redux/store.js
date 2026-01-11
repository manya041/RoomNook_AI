import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import pgSlice from './slices/pgSlice'
import messSlice from './slices/messSlice'
import uiSlice from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    pg: pgSlice,
    mess: messSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

// TypeScript types (if using TypeScript)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
