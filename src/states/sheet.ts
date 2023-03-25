import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fetch from '../utils/fetch';
import {groupByDate} from '../utils/helper-functions';

export const fetchCashbooks = createAsyncThunk('sheet/cashbooks', async () => {
  const response = await fetch('/functions/cashbooks');
  return response.result;
});

export const addCashbook = createAsyncThunk(
  'sheet/addCashbook',
  async (data: any, {dispatch}) => {
    await fetch('/functions/addCashbook', data);
    dispatch(fetchCashbooks());
    return;
  },
);

export const fetchRows = createAsyncThunk(
  'sheet/fetchRows',
  async (id: string) => {
    const response = await fetch('/functions/rows', {id});
    return Array.from(groupByDate(response.result));
  },
);

export const addRow = createAsyncThunk(
  'sheet/addRow',
  async (data: any, {dispatch}) => {
    await fetch('/functions/addRow', data);
    dispatch(fetchRows(data.id));
    return;
  },
);

export const deleteRow = createAsyncThunk(
  'sheet/deleteRow',
  async (data: any, {dispatch}) => {
    await fetch('/functions/deleteRow', data);
    dispatch(fetchRows(data.id));
    return;
  },
);

export const updateRow = createAsyncThunk(
  'sheet/updateRow',
  async (data: any, {dispatch}) => {
    await fetch('/functions/updateRow', data);
    dispatch(fetchRows(data.id));
    return;
  },
);

const app = createSlice({
  name: 'sheet',
  initialState: {
    cashbooks: [],
    rows: [],
    editRow: null,
    refetch: false,
    loading: false,
  },
  reducers: {
    setEditRow(state, action) {
      state.editRow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRows.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRows.fulfilled, (state: any, action) => {
      state.rows = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRows.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchCashbooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCashbooks.fulfilled, (state: any, action) => {
      state.cashbooks = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCashbooks.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {setEditRow} = app.actions;

export default app.reducer;
