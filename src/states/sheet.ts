import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fetch from '../utils/fetch';
import {groupByDate, formatDate} from '../utils/helper-functions';

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

export const deleteCashbook = createAsyncThunk(
  'sheet/deleteCashbook',
  async (id: string, {dispatch}) => {
    await fetch('/functions/deleteCashbook', {id});
    dispatch(fetchCashbooks());
    return;
  },
);

export const updateCashbook = createAsyncThunk(
  'sheet/updateCashbook',
  async (data: any, {dispatch}) => {
    await fetch('/functions/updateCashbook', data);
    dispatch(fetchCashbooks());
    return;
  },
);

export const fetchRows = createAsyncThunk(
  'sheet/fetchRows',
  async (id: string) => {
    const {result} = await fetch('/functions/rows', {id});
    const {list, debit, credit} = result;
    const rows = list.map((item: any) => {
      return {...item, dateString: formatDate(item.date.iso)};
    });
    return {rows: Array.from(groupByDate(rows)), total: {debit, credit}};
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
    total: {
      debit: 0,
      credit: 0,
    },
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
      state.rows = action.payload.rows;
      state.total = action.payload.total;
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
