import { configureStore } from '@reduxjs/toolkit';
import layerPopup from './slices/layerPopupSlice';

export const store = configureStore({
  reducer: {
    layerPopup,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
