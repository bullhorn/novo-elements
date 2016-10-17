// NG2
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
// APP
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';
import { Helpers } from './../../utils/Helpers';

@Component({
    selector: 'novo-category-dropdown',
    template: `
        <ng-content select="button"></ng-content>
        <div class="dropdown-container" *ngIf="active">
            <novo-nav theme="white" [outlet]="novoCategoryDropdownOutlet" direction="vertical">
                <novo-tab *ngFor="let category of _categories">
                    <span>{{ category }} ({{ _categoryMap[category].length }})</span>
                </novo-tab>
            </novo-nav>
            <novo-nav-outlet #novoCategoryDropdownOutlet>
                <novo-nav-content *ngFor="let category of _categories">
                    <novo-list direction="vertical">
                        <novo-list-item *ngFor="let item of _categoryMap[category]" (click)="select($event, item)">
                            <item-content>{{ item.label }}</item-content>
                            <item-end class="novo-category-dropdown-hover" *ngIf="item.hoverText && !item.selected">{{ item.hoverText }}</item-end>
                            <item-end class="novo-category-dropdown-hover" *ngIf="item.hoverIcon && !item.selected"><i class="bhi-{{ item.hoverIcon }}"></i></item-end>
                            <item-end *ngIf="item.selected"><i class="bhi-check"></i></item-end>
                        </novo-list-item>
                    </novo-list>
                </novo-nav-content>
            </novo-nav-outlet>
        </div>
    `,
    host: {
        '(keydown)': 'onKeyDown($event)',
        '[class.active]': 'active'
    }
})
export class NovoCategoryDropdownElement extends OutsideClick {
    _categoryMap:any = {};
    _categories:string[] = [];
    @Input() persistSelection:boolean = false;
    @Input() closeOnSelect:boolean = false;
    @Output('select') _select:EventEmitter = new EventEmitter();

    @Input()
    set categories(categories:any) {
        this._categoryMap = categories;
        this._categories = Object.keys(categories);
    }

    constructor(element:ElementRef) {
        super(element);
        this.clickHandler = this.toggleActive.bind(this);
    }

    ngOnInit() {
        let button = this.element.nativeElement.querySelector('button');
        button.addEventListener('click', this.clickHandler);
    }

    ngOnDestroy() {
        let button = this.element.nativeElement.querySelector('button');
        button.removeEventListener('click', this.clickHandler);
    }

    onKeyDown(event) {
        if (this.active && (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.ENTER)) {
            this.toggleActive();
        }
    }

    clearSelection() {
        this._categories.forEach(category => {
            this._categoryMap[category].forEach(item => {
                item.selected = false;
            });
        });
    }

    select(event, item) {
        Helpers.swallowEvent(event);
        // If we persist the selection, clear and show a check
        if (this.persistSelection) {
            this.clearSelection();
            item.selected = true;
        }
        // Emit the item
        this._select.emit(item);
        // Close, if input is set
        if (this.closeOnSelect) {
            this.toggleActive();
        }
    }
}
