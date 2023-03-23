// NG2
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';

@Component({
  selector: 'picker-results',
  host: {
    class: 'active',
  },
  template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
        data-automation-id="picker-result-list-item"
      >
        <item-content> <span [innerHtml]="match.label | highlight:term"></span> </item-content>
      </novo-list-item>
      <novo-loading *ngIf="isLoading && matches.length > 0" theme="line"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `,
})
export class PickerResults extends BasePickerResults {
  constructor(element: ElementRef, public labels: NovoLabelService, ref: ChangeDetectorRef) {
    super(element, ref);
  }

  get hasNonErrorMessage() {
    return !this.isLoading && !this.matches.length && !this.hasError;
  }

  getEmptyMessage() {
    if (this.shouldShowMessageForZeroLengthSearch()) {
      // this property comes from Field Interactions
      return this.config.emptyPickerMessage;
    } else {
      return this.term === '' ? this.labels.pickerTextFieldEmpty : this.labels.pickerEmpty;
    }
  }

  shouldShowMessageForZeroLengthSearch() {
    return this.config && this.config.minSearchLength === 0 && this.term === '' && this.config.emptyPickerMessage;
  }

  getListElement() {
    return this.element.nativeElement.querySelector('novo-list');
  }
}
