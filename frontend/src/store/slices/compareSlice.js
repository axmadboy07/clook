import { createSlice } from '@reduxjs/toolkit';

const compareSlice = createSlice({
  name: 'compare',
  initialState: {
    items: [], // max 4 watches
    isCompareModalOpen: false,
  },
  reducers: {
    addToCompare: (state, action) => {
      const watch = action.payload;
      const exists = state.items.some((item) => item.id === watch.id);
      if (!exists && state.items.length < 4) {
        state.items.push(watch);
      }
    },
    toggleCompare: (state, action) => {
      const watch = action.payload;
      const exists = state.items.some((item) => item.id === watch.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== watch.id);
      } else {
        if (state.items.length < 4) {
          state.items.push(watch);
        }
      }
    },
    removeFromCompare: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCompare: (state) => {
      state.items = [];
    },
    setCompareModalOpen: (state, action) => {
      state.isCompareModalOpen = !!action.payload;
    },
    toggleCompareModal: (state) => {
      state.isCompareModalOpen = !state.isCompareModalOpen;
    },
  },
});

export const {
  addToCompare,
  toggleCompare,
  removeFromCompare,
  clearCompare,
  setCompareModalOpen,
  toggleCompareModal,
} = compareSlice.actions;

export const selectCompareItems = (state) => state.compare.items;
export const selectIsCompareModalOpen = (state) => state.compare.isCompareModalOpen;
export const selectIsInCompare = (id) => (state) =>
  state.compare.items.some((item) => item.id === id);

export default compareSlice.reducer;
