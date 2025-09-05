import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import shoppingCartReducer from '../features/shoppingCartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingCart: shoppingCartReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
