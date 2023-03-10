import {configureStore} from '@reduxjs/toolkit';
import app from './app';
import sheet from './sheet';

export const store = configureStore({
  reducer: {
    app,
    sheet,
  },
});
