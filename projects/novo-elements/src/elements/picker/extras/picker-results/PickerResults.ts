// NG2
import { ChangeDetectorRef, Component, ElementRef, ViewEncapsulation } from '@angular/core';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';

@Component({
  selector: 'picker-results',
  host: {
    class: 'active',
  },
  template: `
    @if (matches.length > 0) {
      <novo-list direction="vertical">
        @for (match of matches; track match) {
          <novo-list-item
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match)"
            data-automation-id="picker-result-list-item">
            <item-content> <span [innerHtml]="match.label | highlight:term"></span> </item-content>
          </novo-list-item>
        }
        @if (isLoading && matches.length > 0) {
          <novo-loading theme="line"></novo-loading>
        }
      </novo-list>
    }
    @if (isLoading && matches.length === 0) {
      <div class="picker-loader"><novo-loading theme="line"></novo-loading></div>
    }
    @if (hasError) {
      <p class="picker-error">{{ labels.pickerError }}</p>
    }
    @if (hasNonErrorMessage) {
      <p class="picker-null-results">{{ getEmptyMessage() }}</p>
    }
  `,
  styleUrls: ['./PickerResults.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
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
