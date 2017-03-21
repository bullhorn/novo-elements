// NG2
import { Component, ElementRef } from '@angular/core';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';

@Component({
    selector: 'picker-results',
    host: {
        'class': 'active',
        '[hidden]': 'matches.length === 0'
    },
    template: `
        <novo-loading theme="line" *ngIf="isLoading && matches.length === 0"></novo-loading>
        <ul *ngIf="matches.length > 0">
            <li
                *ngFor="let match of matches"
                (click)="selectMatch($event)"
                [class.active]="match===activeMatch"
                (mouseenter)="selectActive(match)"
                [class.disabled]="preselected(match)">
                <span [innerHtml]="highlight(match.label, term)"></span>
            </li>
            <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
        </ul>
        <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
        <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.pickerEmpty }}</p>
    `
})
export class PickerResults extends BasePickerResults {
    constructor(element: ElementRef, public labels: NovoLabelService) {
        super(element);
    }
}
