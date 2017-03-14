// NG2
import { Component, ElementRef } from '@angular/core';
// APP
import { Helpers } from '../../../../utils/Helpers';
import { PickerResults } from '../../../picker/extras/picker-results/PickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
// Vendor
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'quick-note-results',
    host: {
        'class': 'active'
    },
    template: `
        <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
        <ul *ngIf="matches.length > 0">
            <li
                *ngFor="let match of matches"
                (click)="selectMatch($event)"
                [class.active]="match===activeMatch"
                (mouseenter)="selectActive(match)">
                <span [innerHtml]="highlight(match.label, term)"></span>
            </li>
        </ul>
        <p class="picker-error" *ngIf="hasError">{{ labels.quickNoteError }}</p>
        <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.quickNoteEmpty }}</p>
    `
})
export class QuickNoteResults extends PickerResults {
    // Mode that the quick note is in for tagging
    taggingMode: string = '';

    constructor(element: ElementRef, public labels: NovoLabelService) {
        super(element, labels);
    }

    set term(value) {
        this._term = value.searchTerm;
        this.taggingMode = value.taggingMode;
        this.hasError = false;
        this.isLoading = true;
        this.search(value, this.taggingMode)
            .subscribe(
            results => {
                this.matches = this.isStatic ? this.filterData(results) : results;
                this.isLoading = false;
            },
            () => {
                this.hasError = true;
                this.isLoading = false;
            });
    }

    search(term, taggingMode) {
        let searchCall = this.config.options[taggingMode];
        return Observable.fromPromise(new Promise((resolve, reject) => {
            // Check if there is match data
            if (searchCall) {
                // Resolve the data
                if (Array.isArray(searchCall)) {
                    this.isStatic = true;
                    // Arrays are returned immediately
                    resolve(this.structureArray(searchCall));
                } else if ((searchCall.hasOwnProperty('reject') && searchCall.hasOwnProperty('resolve')) || Object.getPrototypeOf(searchCall).hasOwnProperty('then')) {
                    this.isStatic = false;
                    // Promises (ES6 or Deferred) are resolved whenever they resolve
                    searchCall
                        .then(this.structureArray.bind(this))
                        .then(resolve, reject);
                } else if (typeof searchCall === 'function') {
                    this.isStatic = false;
                    // Promises (ES6 or Deferred) are resolved whenever they resolve
                    searchCall(term)
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
    structureArray(collection) {
        if (collection && (typeof collection[0] === 'string' || typeof collection[0] === 'number')) {
            return collection.map((item) => {
                return {
                    value: item,
                    label: item
                };
            });
        }
        return collection.map((data) => {
            let value = this.config.field ? data[this.config.field[this.taggingMode]] : (data.value || data);
            let label = this.config.format ? Helpers.interpolate(this.config.format[this.taggingMode], data) : data.label || String(value);
            return { value, label, data };
        });
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

        let selected = this.activeMatch;
        if (selected) {
            this.parent.onSelected(this.taggingMode, selected);
            this.parent.hideResults();
        }
        return false;
    }
}
