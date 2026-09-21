import { createSlice } from '@reduxjs/toolkit';

const loadInitialWishlist = () => {
  try {
    const saved = localStorage.getItem('chronos_wishlist_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        items: parsed.items || [],
        isWishlistDrawerOpen: false,
      };
    }
  } catch (e) {
    // Graceful fallback
  }
  return {
    items: [],
    isWishlistDrawerOpen: false,
  };
};

const saveWishlistToLocalStorage = (state) => {
  try {
    localStorage.setItem(
      'chronos_wishlist_state',
      JSON.stringify({
        items: state.items,
      })
    );
  } catch (e) {
    // Safe catch
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: loadInitialWishlist(),
  reducers: {
    toggleWishlist: (state, action) => {
      const watch = action.payload;
      const exists = state.items.some((item) => item.id === watch.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== watch.id);
      } else {
        state.items.unshift(watch);
      }
      saveWishlistToLocalStorage(state);
    },

    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveWishlistToLocalStorage(state);
    },

    toggleWishlistDrawer: (state, action) => {
      if (typeof action.payload === 'boolean') {
        state.isWishlistDrawerOpen = action.payload;
      } else {
        state.isWishlistDrawerOpen = !state.isWishlistDrawerOpen;
      }
    },

    setWishlistDrawerOpen: (state, action) => {
      state.isWishlistDrawerOpen = !!action.payload;
    },

    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToLocalStorage(state);
    },
  },
});

export const {
  toggleWishlist,
  removeFromWishlist,
  toggleWishlistDrawer,
  setWishlistDrawerOpen,
  clearWishlist,
} = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsWishlistDrawerOpen = (state) => state.wishlist.isWishlistDrawerOpen;
export const selectIsInWishlist = (id) => (state) =>
  state.wishlist.items.some((item) => item.id === id);

export default wishlistSlice.reducer;
