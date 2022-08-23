// NG2
import { ChangeDetectorRef, Component, ElementRef, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BasePickerResults } from '../base-picker-results/base-picker-results';
import { NovoLabelService } from 'novo-elements/services';

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

  getListElement() {
    return this.element.nativeElement.querySelector('novo-list');
  }

  sanitizeHTML(compCode: string, name: string) {
    return this.sanitizer.bypassSecurityTrustHtml(`${compCode} | ${name}`);
  }
}
