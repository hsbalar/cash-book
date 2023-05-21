import format from 'date-fns/format';

import {IRow} from '../types/cashbook';

function* groupByDate(list: any) {
  let groups = new Map();
  for (let item of list) {
    let group = groups.get(item.date) ?? [];
    group.push(item);
    groups.set(item.date, group);
  }
  for (let [date, data] of groups) {
    yield {date, data};
  }
  return groups;
}

function formatDate(date: string) {
  return format(new Date(date), 'dd MMM, yyyy');
}

function sortRows(rows: IRow[]) {
  let initValue = 0;
  let credit = 0;
  let debit = 0;
  const list = rows
    .map(({date, remark, amount}, index) => ({
      date,
      remark,
      amount: Number(amount),
      index,
    }))
    .sort(
      (a: any, b: any) => (new Date(a.date) as any) - (new Date(b.date) as any),
    )
    .map((row: any) => {
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
}

export {groupByDate, formatDate, sortRows};
