import { Component, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { NOVO_LOADING_ELEMENTS } from './../../../loading/Loading';

/**
 * @name: PickerResults
 *
 * @description This is the actual list of matches that gets injected into the DOM. It's also the piece that can be
 * overwritten if custom list options are needed.
 */
@Component({
    selector: 'picker-results',
    host: {
        'class': 'active'
    },
    directives: [NOVO_LOADING_ELEMENTS],
    template: `
        <novo-loading theme="line" *ngIf="loading && !matches.length"></novo-loading>
        <ul *ngIf="matches.length > 0">
            <li
                *ngFor="let match of matches"
                (click)="selectMatch($event)"
                [class.active]="match===activeMatch"
                (mouseenter)="selectActive(match)">
                <span [innerHtml]="highlight(match[field], query)"></span>
            </li>
        </ul>
        <p class="picker-error" *ngIf="hasError">Oops! An error occured.</p>
        <p class="picker-null" *ngIf="!loading && !matches.length">No results to display...</p>
    `
})
export class PickerResults {
    _term:string = '';
    matches:Array = [];
    hasError:boolean = false;
    loading:boolean = true;

    constructor(element:ElementRef) {
        this.element = element;
    }

    get term() {
        return this._term;
    }

    set term(value) {
        this._term = value;
        this.hasError = false;
        this.loading = true;
        this.search(value)
            .subscribe(
                results => {
                    this.matches = this.filterData(results);
                    this.loading = false;
                },
                err => {
                    this.handleError(err);
                    this.loading = false;
                });
    }

    search(term) {
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
    structureArray(collection:Array) {
        let structuredCollection = [];
        if (collection && (typeof collection[0] === 'string' || typeof collection[0] === 'number')) {
            structuredCollection = collection.map((item) => {
                let obj = {};
                obj[this.field] = item;
                return obj;
            });
        } else {
            structuredCollection = collection;
        }
        return structuredCollection;
    }

    /**
     * @name filterData=
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches) {
        if (this.term && this.field && matches) {
            return matches.filter((match) => {
                return ~match[this.field].toLowerCase().indexOf(this.term.toLowerCase());
            });
        }
        // Show no recent results template
        return matches;
    }

    handleError() {
        this.hasError = true;
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
        // TODO: behaviorally this works, but functionally it doesn't (see spec)
        // Use this: 'this.parent.field'
        let index = this.matches.indexOf(this.activeMatch);
        this.activeMatch = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
        this.scrollToActive();
    }

    scrollToActive() {
        let list = this.element.nativeElement;
        //let list = element.querySelector('ul');
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
     *
     * @description
     */
    selectMatch(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        let newValue = this.activeMatch;
        this.parent.updateSearch(newValue);
        this.parent.select.emit(newValue);
        this.parent.hideResults();
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
}
