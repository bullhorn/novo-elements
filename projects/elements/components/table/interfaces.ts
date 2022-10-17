export interface TableColumn<T> {
  id: string;
  label: string;
  renderType?: 'text' | 'link';
  renderer: Function;
  customClass?: (row?: T) => string;
  onClick?(row: T): any;
  width?: number;
  config?: {
    sortable?: boolean;
    filterable?: boolean;
    transforms?: {
      filter?: Function;
      sort?: Function;
    };
    sortTransform?: Function;
    filterConfig?: TableColumnFilterConfig;
  };
}

export interface TablePaginationOptions {
  page?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
}

export interface TableColumnFilterConfig {
  type: 'text' | 'date' | 'select';
  options?: string[] | TableColumnFilterOption[];
  allowCustomRange?: boolean;
}

export interface TableColumnFilterOption {
  label: string;
  value?: any;
  min?: number;
  max?: number;
}

export interface TableSearchOptions {
  placeholder?: string;
  tooltip?: string;
}

export interface TableActionColumnOption<T> {
  label: string;
  onClick(row: T): string;
  disabled?: boolean;
  disabledCheck?(row: T): boolean;
}

export interface TableActionColumn<T> {
  id: string;
  icon?: string;
  label?: string;
  disabled?: boolean;
  disabledCheck?(row: T): boolean;
  options?: TableActionColumnOption<T>[];
  onClick?(row: T): void;
}

// export interface NovoSortFilter {
//   id: string;
//   direction?: string;
//   active?: boolean;
//   filter?: string | boolean;
// }

export interface NovoTableChange {
  sort?: { id: string; value: string };
  filter?: { id: string; value: string };
  page?: number;
  pageSize?: number;
  globalSearch?: string;
}

export interface NovoSelectionChange {
  selected: any[];
}

export interface NovoPaginationEvent {
  page: number;
  pageSize: number;
  length: number;
}
