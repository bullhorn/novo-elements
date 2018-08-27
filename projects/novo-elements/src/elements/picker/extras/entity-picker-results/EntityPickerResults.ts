// NG2
import { Component, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
// Vendor
// APP
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';

@Component({
  selector: 'entity-picker-result',
  template: `
        <novo-list-item *ngIf="match.data">
            <item-header>
                <item-avatar [icon]="getIconForResult(match.data)"></item-avatar>
                <item-title>
                    <span [innerHtml]="highlight(getNameForResult(match.data), term)"></span>
                </item-title>
            </item-header>
            <item-content direction="horizontal">
                <!-- COMPANY 1 -->
                <p class="company" *ngIf="match.data.companyName || match.data?.clientCorporation?.name">
                    <i class="bhi-company"></i>
                    <span [innerHtml]="highlight(match.data.companyName || match.data?.clientCorporation?.name, term)"></span>
                </p>
                <!-- CLIENT CONTACT -->
                <p class="contact" *ngIf="match.data?.clientContact?.firstName">
                    <i class="bhi-person contact person"></i>
                    <span [innerHtml]="highlight(match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName, term)"></span>
                </p>
                <!-- CANDIDATE -->
                <p class="candidate" *ngIf="match.data.candidate && match.data.searchEntity === 'Placement'">
                    <i class="bhi-candidate"></i>
                    <span [innerHtml]="highlight((match.data.candidate.firstName + ' ' + match.data.candidate.lastName), term)"></span>
                </p>
                <!-- START & END DATE -->
                <p class="start-date" *ngIf="match.data.dateBegin && match.data.searchEntity === 'Placement'">
                    <i class="bhi-calendar"></i>
                    <span [innerHtml]="renderTimestamp(match.data.dateBegin) + ' - ' + renderTimestamp(match.data.dateEnd)"></span>
                </p>
                <!-- EMAIL -->
                <p class="email" *ngIf="match.data.email">
                    <i class="bhi-email"></i>
                    <span [innerHtml]="highlight(match.data.email, term)"></span>
                </p>
                <!-- PHONE -->
                <p class="phone" *ngIf="match.data.phone">
                    <i class="bhi-phone"></i>
                    <span [innerHtml]="highlight(match.data.phone, term)"></span>
                </p>
                <!-- ADDRESS -->
                <p class="location" *ngIf="match.data.address && (match.data.address.city || match.data.address.state)">
                    <i class="bhi-location"></i>
                    <span *ngIf="match.data.address.city" [innerHtml]="highlight(match.data.address.city, term)"></span>
                    <span *ngIf="match.data.address.city && match.data.address.state">, </span>
                    <span *ngIf="match.data.address.state" [innerHtml]="highlight(match.data.address.state, term)"></span>
                </p>
                <!-- STATUS -->
                <p class="status" *ngIf="match.data.status">
                    <i class="bhi-info"></i>
                    <span [innerHtml]="highlight(match.data.status, term)"></span>
                </p>
                <!-- OWNER -->
                <p class="owner" *ngIf="match.data.owner && match.data.owner.name && match.data.searchEntity === 'Candidate'">
                    <i class="bhi-person"></i>
                    <span [innerHtml]="highlight(match.data.owner.name, term)"></span>
                </p>
                <!-- PRIMARY DEPARTMENT -->
                <p class="primary-department" *ngIf="match.data.primaryDepartment && match.data.primaryDepartment.name && match.data.searchEntity === 'CorporateUser'">
                    <i class="bhi-department"></i>
                    <span [innerHtml]="highlight(match.data.primaryDepartment.name, term)"></span>
                </p>
                <!-- OCCUPATION -->
                <p class="occupation" *ngIf="match.data.occupation && match.data.searchEntity === 'CorporateUser'">
                    <i class="bhi-occupation"></i>
                    <span [innerHtml]="highlight(match.data.occupation, term)"></span>
                </p>
            </item-content>
        </novo-list-item>
    `,
})
export class EntityPickerResult {
  @Input()
  match: any;
  @Input()
  term: any;

  constructor(public labels: NovoLabelService) {}

  /**
   * @name escapeRegexp
   * @param queryToEscape
   *
   * @description This function captures the whole query string and replace it with the string that will be used to
   * match.
   */
  escapeRegexp(queryToEscape) {
    // Ex: if the capture is "a" the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  /**
   * @name highlight
   * @param match
   * @param query
   *
   * @description This function should return a <strong>-tag wrapped HTML string.
   */
  highlight(match, query) {
    // Replaces the capture string with a the same string inside of a "strong" tag
    return query && match ? match.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : match;
  }

  getIconForResult(result?: any): string {
    if (result) {
      switch (result.searchEntity) {
        case 'ClientContact':
          return 'person contact';
        case 'ClientCorporation':
          return 'company';
        case 'Opportunity':
          return 'opportunity';
        case 'Candidate':
          return 'candidate';
        case 'Lead':
          return 'lead';
        case 'JobOrder':
          return 'job';
        case 'Placement':
          return 'star placement';
        case 'CorporateUser':
          return 'user';
        default:
          return '';
      }
    }
    return '';
  }

  renderTimestamp(date?: any) {
    let timestamp = '';
    if (date) {
      timestamp = this.labels.formatDateWithFormat(date, { year: 'numeric', month: 'numeric', day: 'numeric' });
    }
    return timestamp;
  }

  getNameForResult(result?: any) {
    if (result) {
      switch (result.searchEntity) {
        case 'Lead':
        case 'CorporateUser':
        case 'ClientContact':
        case 'Candidate':
        case 'Person':
          if ('firstName' in result) {
            return `${result.firstName} ${result.lastName}`.trim();
          }
          return `${result.name || ''}`.trim();
        case 'ClientCorporation':
          return `${result.name || ''}`.trim();
        case 'Opportunity':
        case 'JobOrder':
          return `${result.title || ''}`.trim();
        case 'Placement':
          let label = '';
          if (result.candidate) {
            label = `${result.candidate.firstName} ${result.candidate.lastName}`.trim();
          }
          if (result.jobOrder) {
            label = `${label} - ${result.jobOrder.title}`.trim();
          }
          return label;
        default:
          return `${result.name || ''}`.trim();
      }
    }
    return '';
  }
}

@Component({
  selector: 'entity-picker-results',
  template: `
        <novo-list *ngIf="matches.length > 0" direction="vertical">
            <entity-picker-result *ngFor="let match of matches"
                    [match]="match"
                    [term]="term"
                    (click)="selectMatch($event, match)"
                    [ngClass]="{active: isActive(match)}"
                    (mouseenter)="selectActive(match)"
                    [class.disabled]="preselected(match)">
            </entity-picker-result>
            <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
        </novo-list>
        <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
        <p class="picker-null-results" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.pickerEmpty }}</p>
    `,
})
export class EntityPickerResults extends BasePickerResults {
  @Output()
  select: EventEmitter<any> = new EventEmitter();
  constructor(element: ElementRef, public labels: NovoLabelService, ref: ChangeDetectorRef) {
    super(element, ref);
  }

  getListElement() {
    return this.element.nativeElement.querySelector('novo-list');
  }

  selectMatch(event?: any, item?: any) {
    this.select.next(item);
    return super.selectMatch(event, item);
  }
}
