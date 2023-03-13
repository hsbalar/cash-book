import {GoogleSpreadsheet} from 'google-spreadsheet';
import {SPREADSHEET_ID, CLIENT_EMAIL, PRIVATE_KEY} from '@env';

const init = async () => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  });
  return doc;
};

const getBooks = async () => {
  const doc = await init();
  await doc.loadInfo();
  const list = doc.sheetsByIndex.map((sheet) => ({
    title: sheet.title,
    id: sheet.sheetId,
  }));
  return list;
};

const addSheet = async () => {
  const doc = await init();
  await doc.loadInfo();
  await doc.addSheet({title});
  return 'success';
};

const deleteSheet = async () => {
  const doc = await init();
  await doc.loadInfo();
  await doc.addSheet({title});
  return 'success';
};

const getRows = async () => {
  const doc = await init();
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle.Sheet1;
  const rows = await sheet.getRows();
  let initValue = 0;
  const list = rows
    .map(({date, remark, amount}: any, index: number) => ({
      date,
      remark,
      amount: Number(amount),
      index: index + 1,
    }))
    .sort(
      (a: any, b: any) => (new Date(a.date) as any) - (new Date(b.date) as any),
    )
    .map((row) => {
      initValue = initValue + row.amount;
      return {...row, balance: initValue};
    });
  return {result: list};
};

const addRow = async (row: any) => {
  const doc = await init();
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle.Sheet1;
  const result = await sheet.addRow(row);
  return result;
};

export {init, getRows, addRow, addSheet, getBooks, deleteSheet};
