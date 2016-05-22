import { Component, ElementRef } from '@angular/core';
import { COMMON_DIRECTIVES, NgModel } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NOVO_PICKER_ELEMENTS } from './../../../picker';
import { PickerResults } from './../../../picker/extras/PickerExtras';
import { NOVO_LIST_ELEMENTS } from './../../../list';

@Component({
    selector: 'entity-input',
    inputs: [
        'name',
        'placeholder',
        'options',
        'required'
    ],
    directives: [COMMON_DIRECTIVES, NOVO_PICKER_ELEMENTS, NgModel],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <input
            [name]="name"
            [(ngModel)]="value"
            [(picker)]="options"
            [placeholder]="placeholder"
            (select)="onSelect($event)"
            autocomplete="false"
        />
        <i class="bhi-search"></i>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">Required</span>
    `
})
export class EntityInput extends BaseInput {
    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.ngOnChanges();
    }

    ngOnChanges() {
        this.options = Object.assign(this.options, {
            resultsTemplate: EntityPickerResults
        });
        this.control.updateValue(this.value);
    }

    onChanged(e) {
        this.value = e.value.length ? e.value : null;
        this.update.emit(this.value);
    }

    onSelect(value) {
        this.update.emit(value);
        this.control.updateValue(value);
    }
}

@Component({
    selector: 'entity-picker-results',
    template: `
        <novo-list *ngIf="matches.length > 0" direction="vertical">
            <novo-list-item *ngFor="let match of matches"
            (click)="selectMatch($event)"
            [ngClass]="{active: isActive(match)}"
            (mouseenter)="selectActive(match)">
                <item-avatar [icon]="getIconForResult(match)"></item-avatar>
                <item-title>
                    <span [innerHtml]="highlight(getNameForResult(match), query)"></span>
                </item-title>
                <item-content direction="horizontal">
                    <!-- COMPANY 1 -->
                    <p class="company" *ngIf="match.companyName">
                        <i class="bhi-company"></i>
                        <span [innerHtml]="highlight(match.companyName, query)"></span>
                    </p>
                    <!-- CLIENT CORP -->
                    <p class="company" *ngIf="match?.clientCorporation?.name">
                        <i class="bhi-company"></i>
                        <span [innerHtml]="highlight(match.clientCorporation.name, query)"></span>
                    </p>
                    <!-- EMAIL -->
                    <p class="email" *ngIf="match.email">
                        <i class="bhi-email"></i>
                        <span [innerHtml]="highlight(match.email, query)"></span>
                    </p>
                    <!-- PHONE -->
                    <p class="phone" *ngIf="match.phone">
                        <i class="bhi-phone"></i>
                        <span [innerHtml]="highlight(match.phone, query)"></span>
                    </p>
                    <!-- ADDRESS -->
                    <p class="location" *ngIf="match.address && (match.address.city || match.address.state)">
                        <i class="bhi-location"></i>
                        <span *ngIf="match.address.city" [innerHtml]="highlight(match.address.city, query)"></span>
                        <span *ngIf="match.address.city && match.address.state">, </span>
                        <span *ngIf="match.address.state" [innerHtml]="highlight(match.address.state, query)"></span>
                    </p>
                    <!-- STATUS -->
                    <p class="status" *ngIf="match.status">
                        <i class="bhi-info"></i>
                        <span [innerHtml]="highlight(match.status, query)"></span>
                    </p>
                </item-content>
            </novo-list-item>
        </novo-list>
    `,
    directives: [NOVO_LIST_ELEMENTS]
})
export class EntityPickerResults extends PickerResults {
    constructor(element:ElementRef) {
        super(element);
    }

    getIconForResult(result) {
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
            default:
                return '';
        }
    }

    getNameForResult(result) {
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
            default:
                return `${result.name || ''}`.trim();
        }
    }
}
