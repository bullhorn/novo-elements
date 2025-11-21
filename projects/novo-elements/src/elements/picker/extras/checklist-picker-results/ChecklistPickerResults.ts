// NG2
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
// Vendor
import { from, Observable } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
// APP
import { BasePickerResults } from '../base-picker-results/BasePickerResults';

/**
 * @description This is the actual list of matches that gets injected into the DOM.
 */
@Component({
  selector: 'checklist-picker-results',
  host: {
    class: 'active picker-results',
  },
  template: `
    @if (isLoading && !matches.length) {
      <novo-loading theme="line"></novo-loading>
    }
    @if (matches.length > 0) {
      <ul>
        @for (section of matches; track section; let i = $index) {
          <span>
            @if (section.data.length > 0) {
              <li class="header caption">{{ section.label || section.type }}</li>
            }
            @for (match of section.data; track match; let i = $index) {
              <li
                [ngClass]="{ checked: match.checked }"
                (click)="selectMatch($event, match)"
                [class.active]="match === activeMatch"
                (mouseenter)="selectActive(match)">
                <label>
                  <i
                    [ngClass]="{
                      'bhi-checkbox-empty': !match.checked,
                      'bhi-checkbox-filled': match.checked,
                      'bhi-checkbox-indeterminate': match.indeterminate
                    }"></i>
                  {{ match.label }}
                </label>
              </li>
            }
          </span>
        }
      </ul>
    }
    @if (hasError) {
      <p class="picker-error">{{ labels.pickerError }}</p>
    }
    @if (!isLoading && !matches.length && !hasError && term !== '') {
      <p class="picker-null-results">{{ labels.pickerEmpty }}</p>
    }
  `,
  standalone: false
})
export class ChecklistPickerResults extends BasePickerResults {
  filteredMatches: any;

  constructor(element: ElementRef, public labels: NovoLabelService, ref: ChangeDetectorRef) {
    super(element, ref);
  }

  search(): Observable<any> {
    const options = this.config.options;
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
   * @param matches - Collection of objects=
   *
   * @description This function loops through the picker options and creates a filtered list of objects that contain
   * the newSearch.
   */
  filterData(matches): any {
    if (this.term && matches) {
      this.filteredMatches = matches.map((section) => {
        const items = section.originalData.filter((match) => {
          return ~String(match.label).toLowerCase().indexOf(this.term.toLowerCase());
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

  selectMatch(event, item) {
    Helpers.swallowEvent(event);
    if (item.indeterminate) {
      item.indeterminate = false;
      item.checked = true;
    } else {
      item.checked = !item.checked;
    }

    const selected = this.activeMatch;
    if (selected) {
      this.parent.value = selected;
    }
    this.ref.markForCheck();
    return false;
  }
}
