import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
/**
 * @name: ChecklistPickerResults
 *
 * @description This is the actual list of matches that gets injected into the DOM.
 */
export declare class ChecklistPickerResults extends BasePickerResults {
    labels: NovoLabelService;
    filteredMatches: any;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    search(): Observable<{}>;
    /**
     * @name filterData=
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches: any): any;
    /**
     * @name selectMatch
     * @param event
     * @param item
     *
     * @description
     */
    selectMatch(event: any, item: any): boolean;
}
