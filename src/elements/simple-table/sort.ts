import { Directive, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { NovoSimpleTableChange, NovoSimpleSelectionChange } from './interfaces';

@Directive({
    selector: '[novoSortFilter]',
})
export class NovoSortFilter {
    @Output() public novoTableChange = new EventEmitter<NovoSimpleTableChange>();

    public currentFilterColumn: { id: string, value: string };
    public currentSortColumn: { id: string, value: string };

    public filter(id: string, value: string): void {
        if (value) {
            this.currentFilterColumn = { id, value };
        } else {
            this.currentFilterColumn = undefined;
        }
        this.novoTableChange.next({
            sort: this.currentSortColumn,
            filter: this.currentFilterColumn
        });
    }

    public sort(id: string, value: string): void {
        this.currentSortColumn = { id, value };
        this.novoTableChange.next({
            sort: this.currentSortColumn,
            filter: this.currentFilterColumn
        });
    }
}

@Directive({
    selector: '[novoSelection]',
})
export class NovoSelection implements OnDestroy {
    @Output() public novoSelectionChange = new EventEmitter<NovoSimpleSelectionChange>();
    @Output() public novoSelectAllToggle = new EventEmitter<boolean>();

    public allRows = new Map<string, object>();
    public selectedRows = new Map<string, object>();

    get value() {
        return Array.from(this.selectedRows.values());
    }

    public register(id, row): void {
        this.allRows.set(id, row);
    }

    public deregister(id): void {
        this.allRows.delete(id);
        this.selectedRows.delete(id);
        if (this.selectedRows.size === 0) {
            this.novoSelectAllToggle.emit(false);
        }
    }

    public ngOnDestroy(): void {
        this.allRows.clear();
        this.selectedRows.clear();
    }

    public toggle(id: string, selected: boolean, row: any): void {
        if (selected) {
            this.selectedRows.set(id, row);
        } else {
            this.selectedRows.delete(id);
        }
    }

    public selectAll(value: boolean): void {
        if (value) {
            this.selectedRows = new Map<string, object>(this.allRows);
        } else {
            this.selectedRows.clear();
        }
        this.novoSelectAllToggle.emit(value);
    }
}
