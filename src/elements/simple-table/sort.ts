import { Directive, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { NovoSimpleTableChange, NovoSimpleSelectionChange } from './interfaces';
import { NovoActivityTableState } from './state';

@Directive({
    selector: '[novoSortFilter]',
})
export class NovoSortFilter {
    constructor(private state: NovoActivityTableState) { }

    public filter(id: string, value: string): void {
        let filter;
        if (value) {
            filter = { id, value };
        } else {
            filter = undefined;
        }
        this.state.filter = filter;
        this.state.reset(false, true);
        this.state.updates.next({ filter: filter, sort: this.state.sort });
    }

    public sort(id: string, value: string): void {
        let sort = { id, value };
        this.state.sort = sort;
        this.state.reset(false, true);
        this.state.updates.next({ sort: sort, filter: this.state.filter });
    }
}

@Directive({
    selector: '[novoSelection]',
})
export class NovoSelection implements OnDestroy {
    @Output() public novoSelectAllToggle = new EventEmitter<boolean>();

    public allRows = new Map<string, object>();

    constructor(public state: NovoActivityTableState) { }

    public register(id, row): void {
        this.allRows.set(id, row);
    }

    public deregister(id): void {
        this.allRows.delete(id);
        this.state.selectedRows.delete(id);
        if (this.state.selectedRows.size === 0) {
            this.novoSelectAllToggle.emit(false);
        }
    }

    public ngOnDestroy(): void {
        this.allRows.clear();
        this.state.selectedRows.clear();
    }

    public toggle(id: string, selected: boolean, row: any): void {
        if (selected) {
            this.state.selectedRows.set(id, row);
        } else {
            this.state.selectedRows.delete(id);
        }
    }

    public selectAll(value: boolean): void {
        if (value) {
            this.state.selectedRows = new Map<string, object>(this.allRows);
        } else {
            this.state.selectedRows.clear();
        }
        this.novoSelectAllToggle.emit(value);
    }
}
