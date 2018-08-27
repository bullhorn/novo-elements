// NG2
import { Component, ElementRef, ChangeDetectorRef, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';

@Component({
  selector: 'distribution-list-picker-results',
  template: `
        <section class="picker-loading" *ngIf="isLoading && !matches?.length">
            <novo-loading theme="line"></novo-loading>
        </section>
        <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
            <novo-list-item *ngFor="let match of matches" (click)="selectMatch($event)" [class.active]="match === activeMatch" (mouseenter)="selectActive(match)" [class.disabled]="preselected(match)">
                <item-header>
                    <item-title>
                        <span [innerHtml]="sanitizeHTML(match.label)"></span>
                    </item-title>
                </item-header>
                <item-content direction="horizontal">
                    <p>
                        <span class='label'>{{ labels.distributionListOwner }}: </span><span>{{ match?.data?.owner?.name }}</span>
                    </p>
                    <p>
                        <span class='label'>{{ labels.dateAdded }}: </span><span>{{ labels.formatDateWithFormat(match?.data?.dateAdded, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
                    </p>
                </item-content>
            </novo-list-item>
            <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
        </novo-list>
    `,
})
export class DistributionListPickerResults extends BasePickerResults {
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

  sanitizeHTML(html: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
