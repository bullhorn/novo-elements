// NG2
import { Directive, EventEmitter } from '@angular/core';

@Directive({
    selector: '[novoThSortable]',
    inputs: ['config: novoThSortable', 'column'],
    outputs: ['onSortChange'],
    host: {
        '(click)': 'onToggleSort($event, $target)'
    }
})
export class ThSortable {
    constructor() {
        this.config = null;
        this.column = null;
        this.onSortChange = new EventEmitter();
    }

    onToggleSort(event) {
        if (event) {
            event.preventDefault();
        }

        if (this.config && this.column && this.config.sorting !== false && this.column.sorting !== false) {
            switch (this.column.sort) {
                case 'asc':
                    this.column.sort = 'desc';
                    break;
                default:
                    this.column.sort = 'asc';
                    break;
            }

            this.onSortChange.emit(this.column);
        }
    }
}
