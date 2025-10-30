export interface SimpleTableColumn<T> {
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
        filterConfig?: SimpleTableColumnFilterConfig;
    };
}
export interface SimpleTablePaginationOptions {
    page?: number;
    pageSize?: number;
    pageSizeOptions?: number[];
}
export interface SimpleTableColumnFilterConfig {
    type: 'text' | 'date' | 'select';
    options?: string[] | SimpleTableColumnFilterOption[];
    allowCustomRange?: boolean;
}
export interface SimpleTableColumnFilterOption {
    label: string;
    value?: any;
    min?: number;
    max?: number;
}
export interface SimpleTableSearchOptions {
    placeholder?: string;
    tooltip?: string;
}
export interface SimpleTableActionColumnOption<T> {
    label: string;
    onClick(row: T): string;
    disabled?: boolean;
    disabledCheck?(row: T): boolean;
}
export interface SimpleTableActionColumn<T> {
    id: string;
    icon?: string;
    label?: string;
    disabled?: boolean;
    disabledCheck?(row: T): boolean;
    options?: SimpleTableActionColumnOption<T>[];
    onClick?(row: T): void;
}
export interface NovoSimpleSortFilter {
    id: string;
    direction?: string;
    active?: boolean;
    filter?: string | boolean;
}
export interface NovoSimpleTableChange {
    sort?: {
        id: string;
        value: string;
    };
    filter?: {
        id: string;
        value: string;
    };
    page?: number;
    pageSize?: number;
    globalSearch?: string;
}
export interface NovoSimpleSelectionChange {
    selected: any[];
}
export interface NovoSimplePaginationEvent {
    page: number;
    pageSize: number;
    length: number;
}
