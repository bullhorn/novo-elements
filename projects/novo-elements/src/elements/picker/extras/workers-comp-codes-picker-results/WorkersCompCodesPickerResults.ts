// NG2
import { ChangeDetectorRef, Component, ElementRef, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from '../../../../services/novo-label-service';
// Vendor
import {PickerResults} from '../picker-results';

@Component({
  selector: 'workers-comp-codes-picker-results',
  host: {
    class: 'active',
  },
  template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length">
      <novo-loading theme="line"></novo-loading>
    </section>
    <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
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
            <span class="label">{{ labels.startDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.startDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
          <p>
            <span class="label">{{ labels.endDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.endDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `,
})
export class WorkersCompCodesPickerResults extends PickerResults {

  constructor(element: ElementRef, private sanitizer: DomSanitizer, public labels: NovoLabelService, ref: ChangeDetectorRef) {
    super(element, labels, ref);
  }

  sanitizeHTML(compCode: string, name: string) {
    return this.sanitizer.bypassSecurityTrustHtml(`${compCode} | ${name}`);
  }
}
