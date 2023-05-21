interface IRow {
  id?: string | any;
  date: string;
  index: number;
  remark: string;
  amount: number;
  balance?: number;
  dateString?: string;
}

interface IRows {
  date: string;
  data: IRow[];
}

interface ICashbook {
  id: string;
  title: string;
  headerValues?: Array<string>;
}

interface IEditRow extends IRow {
  id: string;
  title: string;
}

export type {IRow, IRows, ICashbook, IEditRow};
