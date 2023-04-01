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

const cashbooks = async () => {
  const doc = await init();
  await doc.loadInfo();
  const list = doc.sheetsByIndex.map((sheet) => ({
    title: sheet.title,
    id: sheet.sheetId,
  }));
  return list;
};

const addCashbook = async (request) => {
  const {title, headerValues} = request.params;
  const doc = await init();
  await doc.loadInfo();
  await doc.addSheet({title, headerValues});
  return 'success';
};

const deleteCashbook = async (request) => {
  const {id} = request.params;
  const doc = await init();
  await doc.loadInfo();
  const sheet = doc.sheetsById[id];
  await sheet.delete();
  return 'success';
};

const updateCashbook = async (request) => {
  const {id, title} = request.params;
  const doc = await init();
  await doc.loadInfo();
  const sheet = doc.sheetsById[id];
  await sheet.updateProperties({title});
  return 'success';
};

const getRows = async (id) => {
  const doc = await init();
  await doc.loadInfo();
  const sheet = doc.sheetsById[id];
  const rows = await sheet.getRows();

  let initValue = 0;
  let credit = 0;
  let debit = 0;
  const list = rows
    .map(({date, remark, amount}, index) => ({
      date: new Date(date),
      remark,
      amount: Number(amount),
      index,
    }))
    .sort((a, b) => a.date - b.date)
    .map((row) => {
      initValue = initValue + row.amount;
      if (row.amount > 0) {
        credit += row.amount;
      } else {
        debit += row.amount;
      }
      return {...row, balance: initValue};
    })
    .reverse();
  return {list, debit, credit};
};

const addRow = async (request) => {
  const {id, date, remark, amount} = request.params;
  const doc = await init();
  await doc.loadInfo();
  const sheet = doc.sheetsById[id];
  sheet.addRow({
    date,
    remark,
    amount,
  });
  return 'success';
};

const updateRow = async (request) => {
  const {id, index, date, remark, amount} = request.params;
  const doc = await init();
  await doc.loadInfo();
  const sheet = doc.sheetsById[id];
  const rows = await sheet.getRows();
  rows[index].date = date;
  rows[index].remark = remark;
  rows[index].amount = amount;
  await rows[index].save();
  return 'success';
};

const deleteRow = async (request) => {
  const {id, index} = request.params;
  const doc = await init();
  await doc.useServiceAccountAuth({
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  });
  await doc.loadInfo();
  const sheet = doc.sheetsById[id];
  const rows = await sheet.getRows();
  await rows[index].delete();
};

export {
  init,
  updateCashbook,
  cashbooks,
  addCashbook,
  deleteCashbook,
  getRows,
  addRow,
  updateRow,
  deleteRow,
};
