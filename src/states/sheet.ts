import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICashbook, IEditRow, IRow, IRows } from '../types/cashbook';
import fetch from '../utils/fetch';
import { groupByDate, sortRows } from '../utils/helper-functions';
import { getData, setData } from '../utils/async-storage';

export const setCashbooks = createAsyncThunk('sheet/setCashbooks', async () => {
  const cashbooks = await getData();
  return cashbooks;
});

export const fetchCashbooks = createAsyncThunk('sheet/cashbooks', async () => {
  const {result} = await fetch('/functions/cashbooks');
  setData(result);
  return result;
});

export const addCashbook = createAsyncThunk(
  'sheet/addCashbook',
  async (data: any, { dispatch }) => {
    await fetch('/functions/addCashbook', data);
    dispatch(fetchCashbooks());
    return;
  },
);

export const deleteCashbook = createAsyncThunk(
  'sheet/deleteCashbook',
  async (id: string, { dispatch }) => {
    await fetch('/functions/deleteCashbook', { id });
    dispatch(fetchCashbooks());
    return;
  },
);

export const updateCashbook = createAsyncThunk(
  'sheet/updateCashbook',
  async (data: any, { dispatch }) => {
    await fetch('/functions/updateCashbook', data);
    dispatch(fetchCashbooks());
    return;
  },
);

export const aggregatedRows = (rows: Array<IRow>) => {
  const { list, debit, credit } = sortRows(rows);
  return {
    rows: Array.from(groupByDate(list)),
    total: { debit, credit },
    result: rows,
  };
};

export const fetchRows = createAsyncThunk(
  'sheet/fetchRows',
  async (id: string) => {
    const { result } = await fetch('/functions/rows', { id });
    return aggregatedRows(result);
  },
);

export const refetchRows = createAsyncThunk(
  'sheet/refetchRows',
  async (id: string, { dispatch }) => {
    const { result } = await fetch('/functions/rows', { id });
    dispatch(setRows(aggregatedRows(result)));
    return;
  },
);

export const addRow = createAsyncThunk(
  'sheet/addRow',
  async (data: IRow, { dispatch, getState }) => {
    const { sheet } = getState();
    const result = [...sheet.result];
    result.push(data);
    dispatch(setRows(aggregatedRows(result)));
    await fetch('/functions/addRow', data);
    dispatch(refetchRows(data.id));
    return;
  },
);

export const deleteRow = createAsyncThunk(
  'sheet/deleteRow',
  async (data: IRow, { dispatch, getState }) => {
    const { sheet } = getState();
    const result = [...sheet.result];
    result.splice(data.index, 1);
    dispatch(setRows(aggregatedRows(result)));
    await fetch('/functions/deleteRow', data);
    dispatch(refetchRows(data.id));
    return;
  },
);

export const updateRow = createAsyncThunk(
  'sheet/updateRow',
  async (data: IRow, { dispatch, getState }) => {
    const { sheet } = getState();
    const result = [...sheet.result];
    result.splice(data.index, 1, data);
    dispatch(setRows(aggregatedRows(result)));
    await fetch('/functions/updateRow', data);
    dispatch(refetchRows(data.id));
    return;
  },
);

const app = createSlice({
  name: 'sheet',
  initialState: {
    cashbooks: [] as Array<ICashbook>,
    result: [] as Array<IRow>,
    rows: [] as Array<IRows>,
    total: {
      debit: 0,
      credit: 0,
    },
    editRow: null as null | IEditRow,
    refetch: false,
    loading: false,
  },
  reducers: {
    setEditRow(state, action) {
      state.editRow = action.payload;
    },
    setRows(state, action) {
      state.rows = action.payload.rows;
      state.total = action.payload.total;
      state.result = action.payload.result;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRows.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchRows.fulfilled, (state, action) => {
      state.rows = action.payload.rows;
      state.total = action.payload.total;
      state.result = action.payload.result;
      state.loading = false;
    });
    builder.addCase(fetchRows.rejected, state => {
      state.loading = false;
    });
    builder.addCase(fetchCashbooks.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCashbooks.fulfilled, (state, action) => {
      state.cashbooks = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCashbooks.rejected, state => {
      state.loading = false;
    });
    builder.addCase(setCashbooks.fulfilled, (state, action) => {
      state.cashbooks = action.payload;
    });
  },
});

export const {setEditRow, setRows} = app.actions;

export default app.reducer;
