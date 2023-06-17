import { configureStore } from '@reduxjs/toolkit'
import noteSlice from './noteSlice'


export const store = configureStore({
    reducer: {
      note: noteSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }),
  })

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch