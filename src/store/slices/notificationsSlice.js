import { createSlice } from '@reduxjs/toolkit';

const INITIAL_NOTIFICATIONS = [
  { id: 1, text: 'Yangi buyurtma qabul qilindi: UZ-892104', time: '5 daqiqa oldin', unread: true },
  { id: 2, text: 'Yangi mijoz ro‘yxatdan o‘tdi: Alisher', time: '1 soat oldin', unread: true },
  { id: 3, text: 'Zaxira past: Rolex Daytona Gold (5 dona qoldi)', time: '3 soat oldin', unread: false },
];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: INITIAL_NOTIFICATIONS,
    isPanelOpen: false,
  },
  reducers: {
    addNotification: (state, action) => {
      state.items.unshift({
        id: Date.now(),
        unread: true,
        time: 'Hozirgina',
        ...action.payload,
      });
    },
    markAsRead: (state, action) => {
      const id = action.payload;
      state.items = state.items.map((n) => (n.id === id ? { ...n, unread: false } : n));
    },
    markAllAsRead: (state) => {
      state.items = state.items.map((n) => ({ ...n, unread: false }));
    },
    deleteNotification: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((n) => n.id !== id);
    },
    clearAllNotifications: (state) => {
      state.items = [];
    },
    togglePanel: (state, action) => {
      if (typeof action.payload === 'boolean') {
        state.isPanelOpen = action.payload;
      } else {
        state.isPanelOpen = !state.isPanelOpen;
      }
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  togglePanel
} = notificationsSlice.actions;

export const selectNotifications = (state) => state.notifications.items;
export const selectUnreadCount = (state) =>
  state.notifications.items.filter((n) => n.unread).length;
export const selectIsNotificationPanelOpen = (state) => state.notifications.isPanelOpen;

export default notificationsSlice.reducer;
