import {configureStore} from '@reduxjs/toolkit';
import app from './app';
import sheet from './sheet';

export const store = configureStore({
  reducer: {
    app,
    sheet,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
