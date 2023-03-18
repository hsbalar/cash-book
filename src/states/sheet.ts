import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {parseISO} from 'date-fns';
import format from 'date-fns/format';
import fetch from '../utils/fetch';
import {groupByDate} from '../utils/helper-functions';

export const fetchCashbooks = createAsyncThunk('sheet/cashbooks', async () => {
  const response = await fetch('/functions/cashbooks');
  return response.result;
});

export const addCashbook = createAsyncThunk(
  'sheet/addCashbook',
  async (data: any) => {
    await fetch('/functions/addCashbook', data);
    return;
  },
);

export const fetchRows = createAsyncThunk(
  'sheet/fetchRows',
  async (id: string) => {
    const response = await fetch('/functions/rows', {id});
    const rows = response.result.map((item: any) => ({
      ...item,
      date: format(parseISO(item.date.iso), 'dd MMM yyyy'),
    }));
    return Array.from(groupByDate(rows));
  },
);

export const addRow = createAsyncThunk('sheet/addRow', async (row: any) => {
  await fetch('/functions/addRow', row);
  return;
});

const app = createSlice({
  name: 'sheet',
  initialState: {
    cashbooks: [],
    rows: [],
    refetch: false,
    loading: false,
  },
  reducers: {},
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
    builder.addCase(addRow.fulfilled, (state) => {
      state.refetch = true;
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
    builder.addCase(addCashbook.fulfilled, (state) => {
      // state.refetch = true;
    });
  },
});

export default app.reducer;
