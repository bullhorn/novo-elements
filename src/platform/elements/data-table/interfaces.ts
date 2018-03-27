import { Observable } from 'rxjs/Observable';

export interface IDataTableColumn<T> {
  id: string;
  label?: string;
  type: 'string' | 'link' | 'date' | 'datetime' | 'time' | 'currency' | 'number' | 'action';
  template?: string;
  property?: string;
  disabled?: boolean;
  cellClass?: (row: T) => string;
  disabledFunc?: (row: T) => boolean;
  handlers?: {
    click?({ originalEvent: MouseEvent, row: T }): void;
    // dblclick?({ originalEvent: MouseEvent, row: T }): void;
    // rightclick?({ originalEvent: MouseEvent, row: T }): void;
  };
  width?: number;
  sortable?: boolean | IDataTableColumnSortConfig;
  filterable?: boolean | IDataTableColumnFilterConfig;
  action?: {
    icon?: string;
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
}

export interface IDataTablePaginationOptions {
  theme: 'basic' | 'standard';
  page?: number;
  pageSize: number;
  pageSizeOptions: number[] | { value: string; label: string }[];
}

export interface IDataTableColumnSortConfig {
  // template?: string;
  icon?: string;
  transform?: Function;
}

export interface IDataTableColumnFilterConfig {
  // template?: string;
  type: 'text' | 'date' | 'select';
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
  sort?: { id: string; value: string };
  filter?: { id: string; value: string };
  page?: number;
  pageSize?: number;
  globalSearch?: string;
}

export interface IDataTableSelectionChangeEvent {
  selected: any[];
}

export interface IDataTablePaginationEvent {
  page: number;
  pageSize: number;
  length: number;
}

export interface IDataTableService<T> {
  getTableResults(
    sort: { id: string; value: string; transform?: Function },
    filter: { id: string; value: string; transform?: Function },
    page: number,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
  ): Observable<{ results: T[]; total: number }>;
}

export interface IDataTableCell<T> {
  column: IDataTableColumn<T>;
  row: T;
}
