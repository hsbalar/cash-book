function* groupByDate(list) {
  let groups = new Map();
  for (let item of list) {
    let group = groups.get(item.date) ?? [];
    group.push(item);
    groups.set(item.date, group);
  }
  for (let [date, data] of groups) {
    yield { date, data };
  }
  return groups;
}

export { groupByDate };
