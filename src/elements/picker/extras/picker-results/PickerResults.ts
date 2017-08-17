// NG2
import { Component, ElementRef } from '@angular/core';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';

@Component({
    selector: 'picker-results',
    host: {
        'class': 'active'
    },
    template: `
        <novo-list *ngIf="matches.length > 0" direction="vertical">
            <novo-list-item
                *ngFor="let match of matches"
                (click)="selectMatch($event)"
                [class.active]="match === activeMatch"
                (mouseenter)="selectActive(match)"
                [class.disabled]="preselected(match)">
                <item-content>
                    <span *ngIf="!config.overrideTemplate" [innerHtml]="highlight(match.label, term)"></span>
                    <custom-picker-result *ngIf="config.overrideTemplate" [match]="match" [template]="config.overrideTemplate"></custom-picker-result>
                </item-content>
            </novo-list-item>
        </novo-list>
        <div class="picker-loader" *ngIf="isLoading && matches.length === 0">
            <novo-loading theme="line"></novo-loading>
        </div>
        <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
        <p class="picker-null-results" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.pickerEmpty }}</p>
    `
})
export class PickerResults extends BasePickerResults {
    constructor(element: ElementRef, public labels: NovoLabelService) {
        super(element);
    }

    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
}
