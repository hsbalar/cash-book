import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSheetRows } from "../services/sheet-apis";

export const fetchRows = createAsyncThunk("sheet/fetchRows", async () => {
  const response = await getSheetRows();
  return response;
});

const app = createSlice({
  name: "sheet",
  initialState: {
    rows: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRows.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRows.fulfilled, (state, action) => {
      state.rows = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRows.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { onLoginSuccess } = app.actions;
export default app.reducer;
