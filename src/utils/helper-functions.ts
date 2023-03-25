import {parseISO} from 'date-fns';
import format from 'date-fns/format';

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
  return format(parseISO(date), 'dd MMM yyyy');
}

export {groupByDate, formatDate};
