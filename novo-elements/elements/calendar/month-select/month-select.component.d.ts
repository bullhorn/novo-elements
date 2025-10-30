import { EventEmitter, OnInit } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import type { DateLike } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class NovoMonthSelectElement implements OnInit {
    labels: NovoLabelService;
    activeDate: DateLike;
    selected: DateLike[];
    select: EventEmitter<any>;
    monthNames: string[];
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    onSelect(event: Event, month: number): void;
    _isActive(month: number): boolean;
    _isSelected(month: number): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoMonthSelectElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoMonthSelectElement, "novo-month-select", never, { "activeDate": { "alias": "activeDate"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "select": "select"; }, never, never, false, never>;
}
