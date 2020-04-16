// NG2
import { Component, ElementRef, ChangeDetectorRef, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';

@Component({
  selector: 'workers-comp-codes-picker-results',
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
            <span [innerHtml]="sanitizeHTML(match?.compensation?.workersCompCode, match?.compensation?.name)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.state }}: </span><span>{{ match?.compensation?.state }}</span>
          </p>
          <p>
            <span class="label">{{ labels.rate }}: </span><span>{{ labels.formatCurrency((match?.rate || 0).toNumber()) }}</span>
          </p>
        </item-content>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.startDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.startDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
          <p>
            <span class="label">{{ labels.endDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.endDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
  `,
})
export class WorkersCompCodesPickerResults extends BasePickerResults {
  @HostBinding('class.active')
  active: boolean = true;
  @HostBinding('hidden')
  get isHidden(): boolean {
    return this.matches.length === 0;
  }

  constructor(element: ElementRef, private sanitizer: DomSanitizer, public labels: NovoLabelService, ref: ChangeDetectorRef) {
    super(element, ref);
    this.sanitizer = sanitizer;
  }

  getListElement(): any {
    return this.element.nativeElement.querySelector('novo-list');
  }

  sanitizeHTML(compCode: string, name: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(`${compCode} | ${name}`);
  }
}
