import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import * as i0 from "@angular/core";
/**
 * @description This is the actual list of matches that gets injected into the DOM.
 */
export declare class ChecklistPickerResults extends BasePickerResults {
    labels: NovoLabelService;
    filteredMatches: any;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    search(): Observable<any>;
    /**
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches: any): any;
    selectMatch(event: any, item: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChecklistPickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChecklistPickerResults, "checklist-picker-results", never, {}, {}, never, never, false, never>;
}
