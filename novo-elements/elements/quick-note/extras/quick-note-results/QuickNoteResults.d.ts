import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { PickerResults } from 'novo-elements/elements/picker';
import * as i0 from "@angular/core";
export declare class QuickNoteResults extends PickerResults {
    labels: NovoLabelService;
    taggingMode: string;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    get term(): any;
    set term(value: any);
    search(term: string, taggingMode: any): Observable<any>;
    /**
     * @name structureArray
     * @param collection - the data once getData resolves it
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
    static ɵfac: i0.ɵɵFactoryDeclaration<QuickNoteResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QuickNoteResults, "quick-note-results", never, {}, {}, never, never, false, never>;
}
