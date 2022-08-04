import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';

@Component({
  selector: 'entity-picker-result',
  template: `
    <novo-list-item *ngIf="match.data" (click)="select.next(match.data)">
      <novo-item-header>
        <novo-item-avatar [icon]="getIconForResult(match.data)"></novo-item-avatar>
        <novo-item-title> <span [innerHtml]="getNameForResult(match.data) | highlight:term"></span> </novo-item-title>
      </novo-item-header>
      <novo-item-content direction="horizontal">
        <!-- COMPANY 1 -->
        <novo-text smaller class="company" *ngIf="match.data.companyName || match.data?.clientCorporation?.name">
          <i class="bhi-company company"></i>
          <span [innerHtml]="match.data.companyName || match.data?.clientCorporation?.name | highlight:term"></span>
        </novo-text>
        <!-- CLIENT CONTACT -->
        <novo-text smaller class="contact" *ngIf="match.data?.clientContact?.firstName">
          <i class="bhi-person contact person"></i>
          <span [innerHtml]="match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName | highlight:term"></span>
        </novo-text>
        <!-- CANDIDATE -->
        <novo-text smaller class="candidate" *ngIf="match.data.candidate && match.data.searchEntity === 'Placement'">
          <i class="bhi-candidate candidate"></i>
          <span [innerHtml]="match.data.candidate.firstName + ' ' + match.data.candidate.lastName | highlight:term"></span>
        </novo-text>
        <!-- START & END DATE -->
        <novo-text smaller class="start-date" *ngIf="match.data.dateBegin && match.data.searchEntity === 'Placement'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.dateBegin) + ' - ' + renderTimestamp(match.data.dateEnd)"></span>
        </novo-text>
        <!-- START Date -->
        <novo-text smaller class="start-date" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
          <i class="bhi-calendar"></i>
          <span [innerHtml]="renderTimestamp(match.data.startTime)"></span>
        </novo-text>
        <!-- START & END TIME -->
        <novo-text smaller class="start-time" *ngIf="match.data.startTime && match.data.searchEntity === 'JobShift'">
          <i class="bhi-clock"></i>
          <span [innerHtml]="renderTimeNoOffset(match.data.startTime) + ' - ' + renderTimeNoOffset(match.data.endTime)"></span>
        </novo-text>
        <!-- JOBORDER -->
        <novo-text smaller class="job" *ngIf="match.data.jobOrder && match.data.searchEntity === 'JobShift'">
          <i class="bhi-job job"></i>
          <span [innerHtml]="match.data.jobOrder.title | highlight:term"></span>
        </novo-text>
        <!-- OPENINGS -->
        <novo-text smaller class="openings" *ngIf="match.data.openings && match.data.searchEntity === 'JobShift'">
          <i class="bhi-candidate"></i>
          <span>{{ match.data.numAssigned }} / {{ match.data.openings }}</span>
        </novo-text>
        <!-- EMAIL -->
        <novo-text smaller class="email" *ngIf="match.data.email">
          <i class="bhi-email"></i> <span [innerHtml]="match.data.email | highlight:term"></span>
        </novo-text>
        <!-- PHONE -->
        <novo-text smaller class="phone" *ngIf="match.data.phone">
          <i class="bhi-phone"></i> <span [innerHtml]="match.data.phone | highlight:term"></span>
        </novo-text>
        <!-- ADDRESS -->
        <novo-text smaller class="location" *ngIf="match.data.address && (match.data.address.city || match.data.address.state)">
          <i class="bhi-location"></i> <span *ngIf="match.data.address.city" [innerHtml]="highlight(match.data.address.city, term)"></span>
          <span *ngIf="match.data.address.city && match.data.address.state">, </span>
          <span *ngIf="match.data.address.state" [innerHtml]="match.data.address.state | highlight:term"></span>
        </novo-text>
        <!-- STATUS -->
        <novo-text smaller class="status" *ngIf="match.data.status">
          <i class="bhi-info"></i> <span [innerHtml]="match.data.status | highlight:term"></span>
        </novo-text>
        <!-- OWNER -->
        <novo-text smaller class="owner" *ngIf="match.data.owner && match.data.owner.name && match.data.searchEntity === 'Candidate'">
          <i class="bhi-person"></i> <span [innerHtml]="match.data.owner.name | highlight:term"></span>
        </novo-text>
        <!-- PRIMARY DEPARTMENT -->
        <novo-text
          smaller
          class="primary-department"
          *ngIf="match.data.primaryDepartment && match.data.primaryDepartment.name && match.data.searchEntity === 'CorporateUser'"
        >
          <i class="bhi-department"></i> <span [innerHtml]="match.data.primaryDepartment.name | highlight:term"></span>
        </novo-text>
        <!-- OCCUPATION -->
        <novo-text smaller class="occupation" *ngIf="match.data.occupation && match.data.searchEntity === 'CorporateUser'">
          <i class="bhi-occupation"></i> <span [innerHtml]="match.data.occupation | highlight:term"></span>
        </novo-text>
      </novo-item-content>
    </novo-list-item>
  `,
})
export class EntityPickerResult {
  @Input() match: any;
  @Input() term: any;
  @Output() select: EventEmitter<any> = new EventEmitter();

  constructor(public labels: NovoLabelService) {}

  /**
   * @description This function captures the whole query string and replace it with the string that will be used to
   * match.
   */
  escapeRegexp(queryToEscape) {
    // Ex: if the capture is "a" the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  /**
   * @deprecated use highlight pipe
   */
  highlight(match, query) {
    // Replaces the capture string with a the same string inside of a "strong" tag
    return query && match ? match.replace(new RegExp(this.escapeRegexp(query.trim()), 'gi'), '<strong>$&</strong>') : match;
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
        case 'CorporationDepartment':
          return 'department';
        case 'JobShift':
          return 'timetable contract';
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

  renderTime(dateStr?: string) {
    let timestamp = '';
    if (dateStr) {
      timestamp = this.labels.formatTime(new Date(dateStr));
    }
    return timestamp;
  }

  renderTimeNoOffset(dateStr?: string) {
    let timestamp = '';
    if (dateStr) {
      dateStr = dateStr.slice(0, 19);
      timestamp = this.labels.formatTime(dateStr);
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
        case 'BillingProfile':
        case 'InvoiceTerm':
          return `${result.id} | ${result.title || ''}`.trim();
        case 'Placement':
          let label = `${result.id}`;
          if (result.candidate || result.jobOrder) {
            if (result.candidate && result.jobOrder) {
              label = `${label} | ${result.candidate.firstName} ${result.candidate.lastName} - ${result.jobOrder.title}`.trim();
            } else if (result.jobOrder) {
              label = `${label} | ${result.jobOrder.title}`.trim();
            } else {
              label = `${label} | ${result.candidate.firstName} ${result.candidate.lastName}`.trim();
            }
          }
          return label;
        case 'JobShift':
          return `${result.jobOrder?.title} @ ${result.jobOrder?.clientCorporation?.name || ''}`.trim();
        default:
          return `${result.name || result.label || ''}`.trim();
      }
    }
    return '';
  }
}

@Component({
  selector: 'entity-picker-results',
  template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <entity-picker-result
        *ngFor="let match of matches"
        [match]="match"
        [term]="term"
        [ngClass]="{ active: isActive(match) }"
        (click)="selectMatch($event, match)"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
      </entity-picker-result>
      <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</div>
    <div class="picker-null-results" *ngIf="hasNonErrorMessage && term !== ''">{{ labels.pickerEmpty }}</div>
    <div class="picker-null-results" *ngIf="hasNonErrorMessage && term === ''">{{ labels.pickerTextFieldEmpty }}</div>
  `,
  host: {
    class: 'novo-entity-picker-results',
  },
})
export class EntityPickerResults extends BasePickerResults {
  @Output() select: EventEmitter<any> = new EventEmitter();

  constructor(element: ElementRef, public labels: NovoLabelService, ref: ChangeDetectorRef) {
    super(element, ref);
  }

  get hasNonErrorMessage() {
    return !this.isLoading && !this.matches.length && !this.hasError;
  }

  getListElement() {
    return this.element.nativeElement.querySelector('novo-list');
  }

  selectMatch(event?: any, item?: any) {
    this.select.next(item);
    return super.selectMatch(event, item);
  }
}
