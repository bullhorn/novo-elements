import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import * as i0 from "@angular/core";
export declare class EntityPickerResult {
    labels: NovoLabelService;
    match: any;
    term: any;
    select: EventEmitter<any>;
    constructor(labels: NovoLabelService);
    /**
     * @description This function captures the whole query string and replace it with the string that will be used to
     * match.
     */
    escapeRegexp(queryToEscape: any): any;
    /**
     * @deprecated use highlight pipe
     */
    highlight(match: any, query: any): any;
    getIconForResult(result?: any): string;
    renderTimestamp(date?: any): string;
    renderTime(dateStr?: string): string;
    renderTimeNoOffset(dateStr?: string): string;
    getNameForResult(result?: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityPickerResult, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntityPickerResult, "entity-picker-result", never, { "match": { "alias": "match"; "required": false; }; "term": { "alias": "term"; "required": false; }; }, { "select": "select"; }, never, never, false, never>;
}
export declare class EntityPickerResults extends BasePickerResults {
    labels: NovoLabelService;
    select: EventEmitter<any>;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    get hasNonErrorMessage(): boolean;
    getListElement(): any;
    selectMatch(event?: any, item?: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityPickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntityPickerResults, "entity-picker-results", never, {}, { "select": "select"; }, never, never, false, never>;
}
