// NG2
import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
// APP
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { Helpers } from '../../../../utils/Helpers';
import { NovoLabelService } from '../../../../services/novo-label-service';
// Vendor
import { from, Observable } from 'rxjs';

/**
 * @name: ChecklistPickerResults
 *
 * @description This is the actual list of matches that gets injected into the DOM.
 */
@Component({
  selector: 'checklist-picker-results',
  host: {
    class: 'active picker-results',
  },
  template: `
        <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
        <ul *ngIf="matches.length > 0">
            <span *ngFor="let section of matches; let i = index">
                <li class="header caption" *ngIf="section.data.length > 0">{{ section.label || section.type }}</li>
                <li
                    *ngFor="let match of section.data; let i = index" [ngClass]="{checked: match.checked}"
                    (click)="selectMatch($event, match)"
                    [class.active]="match === activeMatch"
                    (mouseenter)="selectActive(match)">
                    <label>
                        <i [ngClass]="{'bhi-checkbox-empty': !match.checked, 'bhi-checkbox-filled': match.checked, 'bhi-checkbox-indeterminate': match.indeterminate }"></i>
                        {{match.label}}
                    </label>
                </li>
            </span>
        </ul>
        <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
        <p class="picker-null-results" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.pickerEmpty }}</p>
    `,
})
export class ChecklistPickerResults extends BasePickerResults {
  filteredMatches: any;

  constructor(element: ElementRef, public labels: NovoLabelService, ref: ChangeDetectorRef) {
    super(element, ref);
  }

  search(): Observable<any> {
    let options = this.config.options;
    // only set this the first time
    return from(
      new Promise((resolve, reject) => {
        // Check if there is match data
        if (options) {
          // Resolve the data
          if (Array.isArray(options)) {
            this.isStatic = true;
            // Arrays are returned immediately
            resolve(options);
          } else {
            // All other kinds of data are rejected
            reject('The data provided is not an array or a promise');
            throw new Error('The data provided is not an array or a promise');
          }
        } else {
          // No data gets rejected
          reject('error');
        }
      }),
    );
  }

  /**
   * @name filterData=
   * @param matches - Collection of objects=
   *
   * @description This function loops through the picker options and creates a filtered list of objects that contain
   * the newSearch.
   */
  filterData(matches): any {
    if (this.term && matches) {
      this.filteredMatches = matches.map((section) => {
        let items = section.originalData.filter((match) => {
          return ~String(match.label)
            .toLowerCase()
            .indexOf(this.term.toLowerCase());
        });
        section.data = items;
        return section;
      }, this);
      return this.filteredMatches;
    } else if (this.term === '') {
      matches.forEach((section) => {
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
   * @param item
   *
   * @description
   */
  selectMatch(event, item) {
    Helpers.swallowEvent(event);
    if (item.indeterminate) {
      item.indeterminate = false;
      item.checked = true;
    } else {
      item.checked = !item.checked;
    }

    let selected = this.activeMatch;
    if (selected) {
      this.parent.value = selected;
    }
    this.ref.markForCheck();
    return false;
  }
}
