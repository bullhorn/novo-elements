import { Component, ElementRef, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES, NgModel } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NOVO_PICKER_ELEMENTS } from './../../../picker';
import { PickerResults } from './../../../picker/extras/PickerExtras';
import { NOVO_LIST_ELEMENTS } from './../../../list';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'entity-input',
    inputs: [
        'name',
        'placeholder',
        'options',
        'required'
    ],
    outputs: ['inputState'],
    directives: [COMMON_DIRECTIVES, NOVO_PICKER_ELEMENTS, NgModel],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <novo-picker [config]="options" [(ngModel)]="value" [placeholder]="placeholder" (select)="onSelect($event)" (blur)="toggleInactive($event)" (focus)="toggleInactive($event)"></novo-picker>
        <i class="bhi-search"></i>
        <span class="error-message" *ngIf="required && control.touched && control?.errors?.required">{{labels.required}}</span>
    `
})
export class EntityInput extends BaseInput {
    inactive:Boolean = false;
    inputState:EventEmitter = new EventEmitter();

    constructor(labels:NovoLabelService) {
        super();
        this.labels = labels;
    }

    ngOnInit() {
        super.ngOnInit();
        this.ngOnChanges();
        setTimeout(() => {
            this.toggleInactive(null);
        }, 10);
    }

    ngOnChanges() {
        this.options = Object.assign(this.options, {
            resultsTemplate: EntityPickerResults
        });
        this.control.updateValue(this.value);
    }

    onChanged(e) {
        this.value = e;
        this.update.emit(this.value);
    }

    onSelect(value) {
        this.update.emit(value);
        this.control.updateValue(value);

        this.toggleInactive(value);
    }

    toggleInactive(ev) {
        if (ev) {
            if (ev.type === 'focus' || this.value || this.placeholder) this.inactive = false;
            else this.inactive = true;
        } else {
            if (this.value || this.placeholder) this.inactive = false;
            else this.inactive = true;
        }

        this.inputState.emit({
            value: this.inactive
        });
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
                <item-avatar [icon]="getIconForResult(match.data)"></item-avatar>
                <item-title>
                    <span [innerHtml]="highlight(getNameForResult(match.data), query)"></span>
                </item-title>
                <item-content direction="horizontal">
                    <!-- COMPANY 1 -->
                    <p class="company" *ngIf="match.data.companyName">
                        <i class="bhi-company"></i>
                        <span [innerHtml]="highlight(match.data.companyName, query)"></span>
                    </p>
                    <!-- CLIENT CORP -->
                    <p class="company" *ngIf="match.data?.clientCorporation?.name">
                        <i class="bhi-company"></i>
                        <span [innerHtml]="highlight(match.data.clientCorporation.name, query)"></span>
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
