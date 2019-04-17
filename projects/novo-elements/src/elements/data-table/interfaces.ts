import { Observable } from 'rxjs';

export interface IDataTablePreferences {
  name: string;
  pageSize?: number;
  displayedColumns?: string[];
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
  sort?: { id: string; value: string };
  filter?: { id: string; value: string | string[] };
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
    filter: { id: string; value: string | string[]; transform?: Function },
    page: number,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
  ): Observable<{ results: T[]; total: number }>;
}

export interface IDataTableCell<T> {}
