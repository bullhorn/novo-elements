export interface SimpleTableColumn<T> {
    id: string,
    label: string;
    renderType?: 'text' | 'link';
    filterType?: 'text' | 'options' | 'date' | 'picker';
    renderer(row: T): string;
    onClick?(row: T): void;
    config?: {
        sortable?: boolean;
        filterable?: boolean;
    }
}

export interface SimpleTableButtonColumn<T> {
    icon: string;
    onClick?(row: T): void;
}
