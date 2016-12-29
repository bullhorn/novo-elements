// NG2
import { Component, ElementRef } from '@angular/core';
// Vendor
// APP
import { BasePickerResults } from './../picker-results/PickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';

@Component({
    selector: 'entity-picker-results',
    template: `
        <novo-list *ngIf="matches.length > 0" direction="vertical">
            <novo-list-item *ngFor="let match of matches"
            (click)="selectMatch($event)"
            [ngClass]="{active: isActive(match)}"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match)">
                <item-header>
                    <item-avatar [icon]="getIconForResult(match.data)"></item-avatar>
                    <item-title>
                        <span [innerHtml]="highlight(getNameForResult(match.data), query)"></span>
                    </item-title>
                </item-header>
                <item-content direction="horizontal">
                    <!-- COMPANY 1 -->
                    <p class="company" *ngIf="match.data.companyName || match.data?.clientCorporation?.name">
                        <i class="bhi-company"></i>
                        <span [innerHtml]="highlight(match.data.companyName || match.data?.clientCorporation?.name, query)"></span>
                    </p>
                    <!-- CLIENT CONTACT -->
                    <p class="contact" *ngIf="match.data?.clientContact?.firstName">
                        <i class="bhi-person contact person"></i>
                        <span [innerHtml]="highlight(match.data.clientContact.firstName + ' ' + match.data.clientContact.lastName, query)"></span>
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
                        <span [innerHtml]="highlight(match.data.email, query)"></span>
                    </p>
                    <!-- PHONE -->
                    <p class="phone" *ngIf="match.data.phone">
                        <i class="bhi-phone"></i>
                        <span [innerHtml]="highlight(match.data.phone, query)"></span>
                    </p>
                    <!-- ADDRESS -->
                    <p class="location" *ngIf="match.data.address && (match.data.address.city || match.data.address.state)">
                        <i class="bhi-location"></i>
                        <span *ngIf="match.data.address.city" [innerHtml]="highlight(match.data.address.city, query)"></span>
                        <span *ngIf="match.data.address.city && match.data.address.state">, </span>
                        <span *ngIf="match.data.address.state" [innerHtml]="highlight(match.data.address.state, query)"></span>
                    </p>
                    <!-- STATUS -->
                    <p class="status" *ngIf="match.data.status">
                        <i class="bhi-info"></i>
                        <span [innerHtml]="highlight(match.data.status, query)"></span>
                    </p>
                </item-content>
            </novo-list-item>
        </novo-list>
    `,
    host: {
        '[hidden]': 'matches.length === 0'
    }
})
export class EntityPickerResults extends BasePickerResults {
    constructor(element: ElementRef, public labels: NovoLabelService) {
        super(element);
    }

    getIconForResult(result?: any) {
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
                default:
                    return '';
            }
        }
        return '';
    }

    renderTimestamp(date?: any) {
        let timestamp = '';
        if (date) {
            timestamp = this.labels.formatDateWithFormat(date, 'L');
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
