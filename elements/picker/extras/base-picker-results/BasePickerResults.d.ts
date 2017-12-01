import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { OverlayRef } from '@angular/cdk/overlay';
/**
 * @name: PickerResults
 *
 * @description This is the actual list of matches that gets injected into the DOM. It's also the piece that can be
 * overwritten if custom list options are needed.
 */
export declare class BasePickerResults {
    _term: string;
    selected: Array<any>;
    matches: any;
    hasError: boolean;
    isLoading: boolean;
    isStatic: boolean;
    config: any;
    activeMatch: any;
    parent: any;
    element: ElementRef;
    ref: ChangeDetectorRef;
    page: number;
    lastPage: boolean;
    autoSelectFirstOption: boolean;
    overlay: OverlayRef;
    constructor(element: ElementRef, ref: ChangeDetectorRef);
    onScrollDown(target: any): void;
    term: string;
    processSearch(): void;
    search(term: any, mode?: any): Observable<{}>;
    /**
     * @name structureArray
     * @param collection - the data once getData resolves it
     * @returns { Array }
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection: any): any;
    /**
     * @name filterData=
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches: any): Array<any>;
    /**
     * @name selectActiveMatch
     *
     * @description This function is called when the user presses the enter key to call the selectMatch method.
     */
    selectActiveMatch(): void;
    /**
     * @name prevActiveMatch
     *
     * @description This function sets activeMatch to the match before the current node.
     */
    prevActiveMatch(): void;
    /**
     * @name nextActiveMatch
     *
     * @description This function sets activeMatch to the match after the current node.
     */
    nextActiveMatch(): void;
    getListElement(): any;
    getChildrenOfListElement(): any[];
    scrollToActive(): void;
    /**
     * @name selectActive
     * @param match
     *
     * @description
     */
    selectActive(match: any): void;
    /**
     * @name isActive
     * @param match
     *
     * @description
     */
    isActive(match: any): boolean;
    /**
     * @name selectMatch
     * @param event
     * @param item
     *
     * @description
     */
    selectMatch(event?: any, item?: any): boolean;
    /**
     * @name escapeRegexp
     * @param queryToEscape
     *
     * @description This function captures the whole query string and replace it with the string that will be used to
     * match.
     */
    escapeRegexp(queryToEscape: any): any;
    /**
     * @name highlight
     * @param match
     * @param query
     *
     * @description This function should return a <strong>-tag wrapped HTML string.
     */
    highlight(match: any, query: any): any;
    preselected(match: any): boolean;
}
