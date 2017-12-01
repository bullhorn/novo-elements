import { EventEmitter } from '@angular/core';
export declare class ThSortable {
    config: any;
    column: any;
    onSortChange: EventEmitter<any>;
    onToggleSort(event: any): void;
}
