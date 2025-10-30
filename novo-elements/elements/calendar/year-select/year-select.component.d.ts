import { EventEmitter, OnInit } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import type { DateLike } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class NovoYearSelectElement implements OnInit {
    labels: NovoLabelService;
    minYear: string | number;
    maxYear: string | number;
    activeDate: DateLike;
    selected: DateLike[];
    select: EventEmitter<any>;
    years: Array<any>;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    onSelect(event: Event, year: number): void;
    _isActive(year: number): boolean;
    _isSelected(year: number): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoYearSelectElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoYearSelectElement, "novo-year-select", never, { "minYear": { "alias": "minYear"; "required": false; }; "maxYear": { "alias": "maxYear"; "required": false; }; "activeDate": { "alias": "activeDate"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "select": "select"; }, never, never, false, never>;
}
