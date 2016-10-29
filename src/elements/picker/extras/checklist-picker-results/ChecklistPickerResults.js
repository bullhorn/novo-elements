// NG2
import { Component, ElementRef } from '@angular/core';
// APP
import { PickerResults } from './../picker-results/PickerResults';
import { Helpers } from './../../../../utils/Helpers';
import { NovoLabelService } from './../../../../services/novo-label-service';
// Vendor
import { Observable } from 'rxjs/Rx';

/**
 * @name: ChecklistPickerResults
 *
 * @description This is the actual list of matches that gets injected into the DOM. It's also the piece that can be
 * overwritten if custom list options are needed.
 */
@Component({
    selector: 'checklist-picker-results',
    host: {
        'class': 'active picker-results'
    },
    template: `
        <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
        <ul *ngIf="matches.length > 0">
            <span *ngFor="let section of matches; let i = index">
                <li class="header" *ngIf="section.data.length > 0">{{section.type}}</li>
                <li
                    *ngFor="let match of section.data; let i = index" [ngClass]="{checked: match.checked}"
                    (click)="selectMatch($event, match)"
                    [class.active]="match===activeMatch"
                    (mouseenter)="selectActive(match)">
                    <label>
                        <i [ngClass]="{'bhi-checkbox-empty': !match.checked, 'bhi-checkbox-filled': match.checked }"></i>
                        {{match.label}}
                    </label>
                </li>
            </span>
        </ul>
        <p class="picker-error" *ngIf="hasError">Oops! An error occured.</p>
        <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">No results to display...</p>
    `
})
export class ChecklistPickerResults extends PickerResults {
    constructor(element:ElementRef, labels:NovoLabelService) {
        super(element, labels);
    }

    search(term) {
        let options = this.config.options;
        //only set this the first time
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
    structureArray(collection:Array):Array {
        return collection;
        // if (dataArray && (typeof dataArray[0] === 'string' || typeof dataArray[0] === 'number')) {
        //     return collection.map((item) => {
        //         return {
        //             value: item,
        //             label: item
        //         };
        //     });
        // }
        // return dataArray.map((data) => {
        //     let value = this.config.field ? data[this.config.field] : (data.value || data);
        //     let label = this.config.format ? Helpers.interpolate(this.config.format, data) : data.label || String(value);
        //     return { value, label, data };
        // });
    }

    /**
     * @name filterData=
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches):Array {
        if (this.term && matches) {
            this.filteredMatches = matches.map(section => {
                let items = section.originalData.filter((match) => {
                    return ~String(match.label).toLowerCase().indexOf(this.term.toLowerCase());
                });
                section.data = items;
                return section;
            }, this);
            return this.filteredMatches;
        } else if (this.term === '') {
            matches.forEach(section => {
                section.data = section.originalData;
            });
            return matches;
        }
        // Show no recent results template
        return matches;
    }

    /**
     * @name selectMatch
     * @param event
     *
     * @description
     */
    selectMatch(event, item) {
        Helpers.swallowEvent(event);
        item.checked = !item.checked;

        let selected = this.activeMatch;
        if (selected) {
            this.parent.value = selected;
        }
        return false;
    }
}
