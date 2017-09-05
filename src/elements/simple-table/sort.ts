import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { getNovoSortDuplicateNovoSortableIdError, getNovoSortHeaderMissingIdError } from './sort-errors';

export interface NovoSortableFilterable {
    id: string;
    direction?: string
    active?: boolean;
    filter?: string;
}

export interface NovoTableChange {
    sort: { id: string, value: string },
    filter: { id: string, value: string }
}

export interface NovoSelectionChange {
    selected: any[]
}

@Directive({
    selector: '[novoSortFilter]',
})
export class NovoSortFilter {
    @Output() novoTableChange = new EventEmitter<NovoTableChange>();

    currentFilterColumn: { id: string, value: string };
    currentSortColumn: { id: string, value: string };

    filter(id: string, value: string) {
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

    sort(id: string, value: string) {
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
export class NovoSelection {
    @Output() novoSelectionChange = new EventEmitter<NovoSelectionChange>();
    @Output() novoSelectAllToggle = new EventEmitter<boolean>();

    toggle(id: string, value: boolean) {
        console.log('select', id, value);
    }

    selectAll(value: boolean): void {
        console.log('[NovoSelection] selectAll', value);
        this.novoSelectAllToggle.emit(value);
    }
}
