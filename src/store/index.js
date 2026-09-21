import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import localeReducer from './slices/localeSlice';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import notificationsReducer from './slices/notificationsSlice';
import compareReducer from './slices/compareSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    locale: localeReducer,
    products: productsReducer,
    orders: ordersReducer,
    notifications: notificationsReducer,
    compare: compareReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
