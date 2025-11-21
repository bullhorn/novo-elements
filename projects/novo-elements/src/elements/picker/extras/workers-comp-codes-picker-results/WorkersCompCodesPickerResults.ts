// NG2
import { ChangeDetectorRef, Component, ElementRef, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from 'novo-elements/services';
// Vendor
import {PickerResults} from '../picker-results';

@Component({
  selector: 'workers-comp-codes-picker-results',
  host: {
    class: 'active',
  },
  template: `
    @if (isLoading && !matches?.length) {
      <section class="picker-loading">
        <novo-loading theme="line"></novo-loading>
      </section>
    }
    @if (matches?.length > 0 && !hasError) {
      <novo-list direction="vertical">
        @for (match of matches; track match) {
          <novo-list-item
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match)">
            <item-header>
              <item-title>
                <span [innerHtml]="sanitizeHTML(match?.data?.compensation?.code, match?.data?.compensation?.name)"></span>
              </item-title>
            </item-header>
            <item-content direction="horizontal">
              <p>
                <span class="label">{{ labels.state }}: </span><span>{{ match?.data?.compensation?.state }}</span>
              </p>
              <p>
                <span class="label">{{ labels.rate }}: </span><span>{{ labels.formatCurrency(match?.data?.rate) }}</span>
              </p>
            </item-content>
            <item-content direction="horizontal">
              <p>
                <span class="label">{{ labels.startDate }}: </span><span>{{ labels.formatDateWithFormat(match?.data?.startDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
              </p>
              <p>
                <span class="label">{{ labels.endDate }}: </span><span>{{ labels.formatDateWithFormat(match?.data?.endDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
              </p>
            </item-content>
          </novo-list-item>
        }
        @if (isLoading && matches?.length > 0) {
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
  standalone: false
})
export class WorkersCompCodesPickerResults extends PickerResults {

  constructor(element: ElementRef, private sanitizer: DomSanitizer, public labels: NovoLabelService, ref: ChangeDetectorRef) {
    super(element, labels, ref);
  }

  sanitizeHTML(compCode: string, name: string) {
    return this.sanitizer.bypassSecurityTrustHtml(`${compCode} | ${name}`);
  }
}
