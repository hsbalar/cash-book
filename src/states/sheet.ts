import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {parseISO} from 'date-fns';
import format from 'date-fns/format';
import fetch from '../utils/fetch';
import {groupByDate} from '../utils/helper-functions';

export const fetchRows = createAsyncThunk('sheet/fetchRows', async () => {
  const response = await fetch('/functions/rows');
  const rows = response.result.map((item: any) => ({
    ...item,
    date: format(parseISO(item.date.iso), 'dd MMM yyyy'),
  }));
  return Array.from(groupByDate(rows));
});

export const addRow = createAsyncThunk('sheet/addRow', async (row: any) => {
  await fetch('/functions/add-row', row);
  return '';
});

const app = createSlice({
  name: 'sheet',
  initialState: {
    rows: [],
    refetch: false,
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRows.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchRows.fulfilled, (state: any, action) => {
      state.rows = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRows.rejected, state => {
      state.loading = false;
    });
    builder.addCase(addRow.fulfilled, state => {
      state.refetch = true;
    });
  },
});

export default app.reducer;
