import { Observable } from 'rxjs';

export interface IDataTablePreferences {
  name: string;
  sort?: IDataTableSort;
  filter?: IDataTableFilter | IDataTableFilter[];
  where?: { query: string; form: any };
  globalSearch?: any;
  pageSize?: number;
  displayedColumns?: string[];
  savedSearchName?: string;
}

export interface IDataTableColumn<T> {
  id: string;
  label?: string;
  labelIcon?: string;
  enabled?: boolean;
  type:
    | 'text'
    | 'link'
    | 'link:tel'
    | 'link:mailto'
    | 'date'
    | 'datetime'
    | 'time'
    | 'currency'
    | 'bigdecimal'
    | 'number'
    | 'percent'
    | 'action'
    | 'expand';
  template?: string;
  format?: string | string[];
  disabled?: boolean;
  cellClass?: (row: T) => string;
  disabledFunc?: (row: T) => boolean;
  handlers?: {
    click?({ originalEvent: MouseEvent, row: T }): void;
  };
  width?: number;
  sortable?: boolean | IDataTableColumnSortConfig;
  filterable?: boolean | IDataTableColumnFilterConfig;
  resizable?: boolean;
  action?: {
    icon?: string;
    tooltip?: string;
    options?: {
      label: string;
      handlers: {
        click({ originalEvent: MouseEvent, row: T }): void;
      };
      disabled?: boolean;
      disabledFunc?: (row: T) => boolean;
    }[];
  };
  attributes?: { [key: string]: any }; // for any custom config in cells
  initialResizable?: {
    resizable: boolean;
    width: number;
  };
  rightAlignCellContent?: boolean;
  configuration?: object; // intended to be implemented by each column type if and as needed
}

export interface IDataTablePaginationOptions {
  theme: 'basic' | 'standard' | 'basic-wide';
  page?: number;
  pageSize: number;
  pageSizeOptions: number[] | { value: string; label: string }[];
}

export interface IDataTableColumnSortConfig {
  transform?: Function;
}

export interface IDataTableColumnFilterConfig {
  type: 'text' | 'number' | 'date' | 'select' | 'multi-select' | 'custom';
  options?: string[] | IDataTableColumnFilterOption[];
  allowCustomRange?: boolean;
  transform?: Function;
}

export interface IDataTableColumnFilterOption {
  label: string;
  value?: any;
  min?: number;
  max?: number;
}

export interface IDataTableSearchOptions {
  placeholder?: string;
  tooltip?: string;
}

export interface IDataTableSortFilter {
  id: string;
  direction?: string;
  active?: boolean;
  filter?: string | boolean;
}

export interface IDataTableChangeEvent {
  sort?: IDataTableSort;
  filter?: IDataTableFilter | IDataTableFilter[];
  page?: number;
  pageSize?: number;
  globalSearch?: string;
  outsideFilter?: IDataTableFilter | IDataTableFilter[];
  where?: { query: string; form: any };
  savedSearchName?: string;
  displayedColumns?: string[];
}

export interface IDataTableSelectionChangeEvent {
  selected: any[];
}

export interface IDataTableSelectionOption {
  label: 'none' | 'page' | 'pageSize' | 'sort' | 'filter' | 'globalSearch';
}

export interface IDataTablePaginationEvent {
  page: number;
  pageSize: number;
  length: number;
}

export interface IDataTableSort {
  id: string;
  value: string;
  transform?: Function;
}

export interface IDataTableFilter {
  id: string;
  value: string | string[];
  transform?: Function;
  type?: string;
  selectedOption?: Object;
}

export interface IDataTableService<T> {
  getTableResults(
    sort: IDataTableSort,
    filter: { id: string; value: string; transform?: Function } | IDataTableFilter | IDataTableFilter[],
    page: number,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
    where?: { query: string; form: any },
  ): Observable<{ results: T[]; total: number }>;
}

export interface IDataTableCell<T> {}
