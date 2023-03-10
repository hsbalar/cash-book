import {createSlice} from '@reduxjs/toolkit';

const app = createSlice({
  name: 'app',
  initialState: {
    clientId: null,
    credential: null,
    loggedIn: false,
  },
  reducers: {
    onLoginSuccess(state: any, action: any) {
      const {clientId, credential} = action.payload;
      state.clientId = clientId;
      state.credential = credential;
      state.loggedIn = true;
    },
  },
});

export const {onLoginSuccess} = app.actions;
export default app.reducer;
