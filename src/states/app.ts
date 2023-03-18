import {createSlice} from '@reduxjs/toolkit';

const app = createSlice({
  name: 'app',
  initialState: {
    showAddRowDialog: false,
    showAddCashbookDialog: false,
  },
  reducers: {
    toggleAddRowDialog(state) {
      state.showAddRowDialog = !state.showAddRowDialog;
    },
    toggleAddCashbookDialog(state) {
      state.showAddCashbookDialog = !state.showAddCashbookDialog;
    },
  },
});

export const {toggleAddRowDialog, toggleAddCashbookDialog} = app.actions;

export default app.reducer;
