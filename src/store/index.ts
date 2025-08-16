import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cvReducer from './cvSlice';

const persistConfig = {
  key: 'cv-builder',
  storage,
  whitelist: ['cvData'], // Only persist CV data
};

const persistedCvReducer = persistReducer(persistConfig, cvReducer);

export const store = configureStore({
  reducer: {
    cv: persistedCvReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
