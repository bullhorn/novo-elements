// NG2
import { Component, ElementRef } from '@angular/core';
// APP
import { Helpers } from './../../../../utils/Helpers';
import { NovoLabelService } from './../../../../services/novo-label-service';
// Vendor
import { Observable } from 'rxjs/Rx';

/**
 * @name: PickerResults
 *
 * @description This is the actual list of matches that gets injected into the DOM. It's also the piece that can be
 * overwritten if custom list options are needed.
 */
export class BasePickerResults {
    _term: string = '';
    selected: Array<any> = [];
    matches: any = [];
    hasError: boolean = false;
    isLoading: boolean = true;
    isStatic: boolean = true;
    config: any;
    activeMatch: any;
    parent: any;
    element: ElementRef;

    constructor(element: ElementRef) {
        this.element = element;
    }

    get term() {
        return this._term;
    }

    set term(value) {
        this._term = value;
        this.hasError = false;
        this.isLoading = true;
        this.search(value)
            .subscribe(
            results => {
                this.matches = this.isStatic ? this.filterData(results) : results;
                this.isLoading = false;
            },
            () => {
                this.hasError = value && value.length !== 0;
                this.isLoading = false;
            });
    }

    search(term, mode?) {
        let options = this.config.options;
        return Observable.fromPromise(new Promise((resolve, reject) => {
            // Check if there is match data
            if (options) {
                // Resolve the data
                if (Array.isArray(options)) {
                    this.isStatic = true;
                    // Arrays are returned immediately
                    resolve(this.structureArray(options));
                } else if ((options.hasOwnProperty('reject') && options.hasOwnProperty('resolve')) || Object.getPrototypeOf(options).hasOwnProperty('then')) {
                    this.isStatic = false;
                    // Promises (ES6 or Deferred) are resolved whenever they resolve
                    options
                        .then(this.structureArray.bind(this))
                        .then(resolve, reject);
                } else if (typeof options === 'function') {
                    this.isStatic = false;
                    // Promises (ES6 or Deferred) are resolved whenever they resolve
                    options(term)
                        .then(this.structureArray.bind(this))
                        .then(resolve, reject);
                } else {
                    // All other kinds of data are rejected
                    reject('The data provided is not an array or a promise');
                    throw new Error('The data provided is not an array or a promise');
                }
            } else {
                // No data gets rejected
                reject('error');
            }
        }));
    }

    /**
     * @name structureArray
     * @param collection - the data once getData resolves it
     * @returns { Array }
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection: any): any {
        let dataArray = collection.data ? collection.data : collection;
        if (dataArray && (typeof dataArray[0] === 'string' || typeof dataArray[0] === 'number')) {
            return collection.map((item) => {
                return {
                    value: item,
                    label: item
                };
            });
        }
        return dataArray.map((data) => {
            let value = this.config.field ? data[this.config.field] : (data.value || data);
            let label = this.config.format ? Helpers.interpolate(this.config.format, data) : data.label || String(value);
            return { value, label, data };
        });
    }

    /**
     * @name filterData=
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches): Array<any> {
        if (this.term && matches) {
            return matches.filter((match) => {
                return ~String(match.label).toLowerCase().indexOf(this.term.toLowerCase());
            });
        }
        // Show no recent results template
        return matches;
    }

    /**
     * @name selectActiveMatch
     *
     * @description This function is called when the user presses the enter key to call the selectMatch method.
     */
    selectActiveMatch() {
        this.selectMatch();
    }

    /**
     * @name prevActiveMatch
     *
     * @description This function sets activeMatch to the match before the current node.
     */
    prevActiveMatch() {
        let index = this.matches.indexOf(this.activeMatch);
        this.activeMatch = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
        this.scrollToActive();
    }

    /**
     * @name nextActiveMatch
     *
     * @description This function sets activeMatch to the match after the current node.
     */
    nextActiveMatch() {
        let index = this.matches.indexOf(this.activeMatch);
        this.activeMatch = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
        this.scrollToActive();
    }

    scrollToActive() {
        let list = this.element.nativeElement;
        // let list = element.querySelector('ul');
        let index = this.matches.indexOf(this.activeMatch);
        list.scrollTop = 65 * (index - 1);
    }

    /**
     * @name selectActive
     * @param match
     *
     * @description
     */
    selectActive(match) {
        this.activeMatch = match;
    }

    /**
     * @name isActive
     * @param match
     *
     * @description
     */
    isActive(match) {
        return this.activeMatch === match;
    }

    /**
     * @name selectMatch
     * @param event
     * @param item
     *
     * @description
     */
    selectMatch(event?: any, item?: any) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        let selected = this.activeMatch;
        if (selected) {
            this.parent.value = selected;

            if (this.parent.closeOnSelect) {
                this.parent.hideResults();
            }
        }
        return false;
    }

    /**
     * @name escapeRegexp
     * @param queryToEscape
     *
     * @description This function captures the whole query string and replace it with the string that will be used to
     * match.
     */
    escapeRegexp(queryToEscape) {
        // Ex: if the capture is "a" the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    /**
     * @name highlight
     * @param match
     * @param query
     *
     * @description This function should return a <strong>-tag wrapped HTML string.
     */
    highlight(match, query) {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return query ? match.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : match;
    }

    preselected(match) {
        return this.selected.findIndex(item => {
            let isPreselected = false;
            if (item && item.value && match && match.value) {
                if (item.value.id && match.value.id) {
                    isPreselected = item.value.id === match.value.id;
                } else {
                    isPreselected = item.value === match.value;
                }
            }
            return isPreselected;
        }) !== -1;
    }
}

@Component({
    selector: 'picker-results',
    host: {
        'class': 'active',
        '[hidden]': 'matches.length === 0'
    },
    template: `
        <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
        <ul *ngIf="matches.length > 0">
            <li
                *ngFor="let match of matches"
                (click)="selectMatch($event)"
                [class.active]="match===activeMatch"
                (mouseenter)="selectActive(match)"
                [class.disabled]="preselected(match)">
                <span [innerHtml]="highlight(match.label, term)"></span>
            </li>
        </ul>
        <p class="picker-error" *ngIf="hasError">{{labels.pickerError}}</p>
        <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{labels.pickerEmpty}}</p>
    `
})
export class PickerResults extends BasePickerResults {
    constructor(element: ElementRef, public labels: NovoLabelService) {
        super(element);
    }
}
