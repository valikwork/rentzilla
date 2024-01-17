import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authReducer from './slices/authSlice';
import advertsReducer from './slices/advertsSlice';
import modalsReducer from './slices/modalsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    adverts: advertsReducer,
    modals: modalsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;