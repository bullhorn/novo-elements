// NG2
import { Component, ElementRef, ChangeDetectorRef, HostBinding } from '@angular/core';
// App
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';

@Component({
    selector: 'skill-specialty-picker-results',
    template: `
        <section class="picker-loading" *ngIf="isLoading && !matches?.length">
            <novo-loading theme="line"></novo-loading>
        </section>
        <novo-list *ngIf="matches.length > 0" direction="vertical">
            <novo-list-item
                *ngFor="let match of matches"
                (click)="selectMatch($event)"
                [class.active]="match === activeMatch"
                (mouseenter)="selectActive(match)"
                [class.disabled]="preselected(match)">
                <item-content>
                    <h6><span [innerHtml]="highlight(match.label, term)"></span></h6>
                    <div class="category">
                        <i class="bhi-category-tags"></i><span [innerHtml]="highlight(match.data.categories || match.data.parentCategory.name, term)"></span>
                    </div>
                </item-content>
            </novo-list-item>
            <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
        </novo-list>
        <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
        <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.pickerEmpty }}</p>
    `,
})
export class SkillsSpecialtyPickerResults extends BasePickerResults {
    @HostBinding('class.active') active: boolean = true;

    constructor(public element: ElementRef, public labels: NovoLabelService, ref: ChangeDetectorRef) {
        super(element, ref);
    }

    getListElement(): any {
        return this.element.nativeElement.querySelector('novo-list');
    }
}
