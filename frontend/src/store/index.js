import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import localeReducer from './slices/localeSlice';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import notificationsReducer from './slices/notificationsSlice';
import compareReducer from './slices/compareSlice';

import { cartApi, wishlistApi } from '../api';

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

// Automatic real-time synchronization with PostgreSQL backend & Swagger
let prevCartItems = null;
let prevWishlistItems = null;
let syncTimeout = null;

const syncCurrentState = () => {
  try {
    const state = store.getState();
    const currentCart = state.cart?.items;
    const currentWishlist = state.wishlist?.items;
    const currentUser = state.auth?.currentUser;
    const userIdentifier = currentUser?.email || (typeof currentUser?.id === 'number' ? currentUser.id : null) || currentUser?.phone || currentUser?.name || 8;

    const cartJson = JSON.stringify(currentCart || []);
    const wishJson = JSON.stringify(currentWishlist || []);

    if (cartJson !== prevCartItems || wishJson !== prevWishlistItems) {
      prevCartItems = cartJson;
      prevWishlistItems = wishJson;

      clearTimeout(syncTimeout);
      syncTimeout = setTimeout(() => {
        if (Array.isArray(currentCart)) {
          cartApi.sync(currentCart, userIdentifier).catch((err) => {
            console.warn("Cart sync warning:", err?.message || err);
          });
        }
        if (Array.isArray(currentWishlist)) {
          wishlistApi.sync(currentWishlist, userIdentifier).catch((err) => {
            console.warn("Wishlist sync warning:", err?.message || err);
          });
        }
      }, 250);
    }
  } catch (e) {
    // safe catch
  }
};

store.subscribe(syncCurrentState);

// Trigger initial sync on application boot
setTimeout(syncCurrentState, 500);

export default store;
