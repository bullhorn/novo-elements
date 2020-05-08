// NG2
import {
    Component,
    ElementRef,
    HostBinding,
    ChangeDetectorRef,
    OnInit,
} from '@angular/core';

import { BasePickerResults } from '../../picker/extras/base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../services/novo-label-service';
import { Helpers } from '../../../../utils/Helpers';

@Component({
    selector: 'novo-data-table-saved-search',
    template: `
        <div class="dropdown">
            haha
            // <div class="list-wrap" (scroll)="onScrollDown($event)">
            //     <novo-loading theme="line" *ngIf="isLoading && matches.length === 0"></novo-loading>
            //     <novo-list *ngIf="matches.length > 0" direction="vertical">
            //         <candidate-certification-picker-result *ngFor="let match of matches"
            //             (click)="selectMatch($event)"
            //             [class.active]="match === activeMatch"
            //             (mouseenter)="selectActive(match)"
            //             [class.disabled]="preselected(match)"
            //             [candidateCertification]="match.data"
            //             inline="true"
            //             [term]="term"></candidate-certification-picker-result>
            //         <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
            //     </novo-list>
            //     <novo-list *ngIf="!isLoading && (!matches || matches?.length <= 0)" direction="vertical">
            //         <item-title>
            //             <div class="no-match">insert translated text here A</div>
            //         </item-title>
            //     </novo-list>
            // </div>
            <novo-list-item class="create-new" *ngIf="canAddNew"
                    (click)="triggerCallback($event)">
                <item-header>
                    <item-title>
                        <div class="link"><span>insert translated text here B</span> insert translated text here C</div>
                    </item-title>
                </item-header>
            </novo-list-item>
        </div>
    `,
})
export class NovoDataTableSavedSearch extends BasePickerResults implements OnInit {
    @HostBinding('class') class = 'novo-data-table-saved-search picker-results-container';
    @HostBinding('class.active')
    get hasItems(): any {
        return this.matches.length || this.term.length;
    }
    @HostBinding('class.no-results')
    get isEmpty(): any {
        return !this.matches.length;
    }
    term: string;
    canAddNew: boolean = true;

    constructor(element: ElementRef, public labels: NovoLabelService, ref: ChangeDetectorRef) {
        super(element, ref);
    }

    ngOnInit(): void {
        this.canAddNew = this.config.canAddNew === true;
    }

    getListElement(): ElementRef {
        return this.element.nativeElement.querySelector('novo-list');
    }

    triggerCallback(event: Event): any {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        if (this.parent.closeOnSelect) {
            this.parent.hideResults();
        }

        if (this.config && this.config.callback) {
            this.config.callback();
        }
    }
}
