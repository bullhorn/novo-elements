import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { PickerResults } from '../../../picker/extras/picker-results/PickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
export declare class QuickNoteResults extends PickerResults {
    labels: NovoLabelService;
    taggingMode: string;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    term: any;
    search(term: string, taggingMode: any): Observable<{}>;
    /**
     * @name structureArray
     * @param collection - the data once getData resolves it
     * @returns { Array }
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection: Array<any>): {
        value: any;
        label: any;
    }[];
    /**
     * @name selectMatch
     * @param event
     *
     * @description
     */
    selectMatch(event: KeyboardEvent): boolean;
}
