import { GoogleSpreadsheet } from "google-spreadsheet";
import { SPREADSHEET_ID, CLIENT_EMAIL, PRIVATE_KEY } from "@env";

const init = async () => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  });
  return doc;
};

const getSheetRows = async () => {
  const doc = await init();
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["Sheet1"];
  const rows = await sheet.getRows();
  const list = rows
    .map(({ date, remark, balance }, index) => ({
      date,
      remark,
      balance,
      index,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  return Array.from(groupByDate(list));
};

function* groupByDate(list) {
  let groups = new Map();
  for (let item of list) {
    let group = groups.get(item.date) ?? [];
    group.push(item);
    groups.set(item.date, group);
  }
  for (let [date, items] of groups) {
    yield { date, items };
  }
  return groups;
}

export { init, getSheetRows };
