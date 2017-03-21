// NG2
import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { OutsideClick } from '../../utils/outside-click/OutsideClick'; // TODO - change imports
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSelectElement),
    multi: true
};

@Component({
    selector: 'novo-select',
    providers: [SELECT_VALUE_ACCESSOR],
    template: `
        <div (click)="toggleActive($event)" tabIndex="-1" type="button" [ngClass]="{empty: empty}">{{selected.label}}<i class="bhi-collapse"></i></div>
        <ul class="novo-select-list" tabIndex="-1" [ngClass]="{header: headerConfig}">
            <ng-content></ng-content>
            <li *ngIf="headerConfig" class="select-header" [ngClass]="{open: header.open}">
                <button  *ngIf="!header.open" (click)="toggleHeader($event); false" tabIndex="-1" type="button" class="header"><i class="bhi-add-thin"></i>&nbsp;{{headerConfig.label}}</button>
                <div *ngIf="header.open" [ngClass]="{active: header.open}">
                    <input autofocus type="text" [placeholder]="headerConfig.placeholder" [attr.id]="name" autocomplete="false" [(ngModel)]="header.value" [ngClass]="{invalid: !header.valid}"/>
                    <footer>
                        <button (click)="toggleHeader($event, false)">{{labels.cancel}}</button>
                        <button (click)="saveHeader()" class="primary">{{labels.save}}</button>
                    </footer>
                </div>
            </li>
            <li *ngFor="let option of options; let i = index" [ngClass]="{active: option.active}" (click)="onClickOption(option, i)" [attr.data-automation-value]="option.label">
              <span [innerHtml]="highlight(option.label, filterTerm)"></span>
              <i *ngIf="option.active" class="bhi-check"></i>
            </li>
        </ul>
    `,
    host: {
        '(keydown)': 'onKeyDown($event)',
        '[class.active]': 'active'
    }
})
export class NovoSelectElement extends OutsideClick implements OnInit, OnChanges {
    @Input() options: Array<any>;
    @Input() placeholder: string = 'Select...';
    @Input() readonly: boolean;
    @Input() headerConfig: any;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    selectedIndex: number = -1;
    empty: boolean = true;
    header: any = {
        open: false,
        valid: true,
        value: ''
    };
    createdItem: any;
    selected: any;
    model: any;
    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };
    filterTerm: string = '';
    filterTermTimeout;

    constructor(element: ElementRef, public labels: NovoLabelService) {
        super(element);
    }

    ngOnInit() {
        this.ngOnChanges();
    }

    ngOnChanges(changes?: SimpleChanges) {
        this.readonly = this.readonly === true;
        if (this.options && this.options.length && typeof this.options[0] === 'string') {
            this.options = this.options.map((item) => {
                return { value: item, label: item };
            });
        }

        if (!this.model && !this.createdItem) {
            this.clear();
        } else if (this.createdItem) {
            let item = this.options.find(i => i.label === this.createdItem);
            let index = this.options.indexOf(item);
            this.select(item, index);
        } else {
            this.writeValue(this.model);
        }
    }

    onClickOption(option, i) {
        this.select(option, i);
        this.toggleActive();
    }

    select(option, i) {
        this.selected.active = false;
        this.selectedIndex = i;
        this.selected = option;
        this.selected.active = true;
        this.empty = false;
        this.onModelChange(this.selected.value);
        this.onSelect.emit({ selected: this.selected.value });
    }

    clear() {
        this.selected = {
            label: this.placeholder,
            value: null,
            active: false
        };
        this.header = {
            open: false,
            valid: true,
            value: ''
        };
        this.selectedIndex = -1;
        this.empty = true;
    }

    onKeyDown(event: KeyboardEvent): void {
        if (this.active) {
            if (!this.header.open) {
                // Prevent Scrolling
                event.preventDefault();
            }
            // Close popup on escape key
            if (event.keyCode === KeyCodes.ESC) {
                this.toggleActive();
                return;
            }
            if (event.keyCode === KeyCodes.ENTER) {
                if (this.header.open && this.header.value) {
                    this.saveHeader();
                    return;
                }
                this.select(this.options[this.selectedIndex], this.selectedIndex);
                this.toggleActive();
                return;
            }

            if (event.keyCode === KeyCodes.UP && this.selectedIndex > 0) {
                this.selectedIndex--;
                this.select(this.options[this.selectedIndex], this.selectedIndex);
                this.scrollToSelected();
            } else if (event.keyCode === KeyCodes.DOWN && this.selectedIndex < this.options.length - 1) {
                this.selectedIndex++;
                this.select(this.options[this.selectedIndex], this.selectedIndex);
                this.scrollToSelected();
                if (this.header.open) {
                    this.toggleHeader(null, false);
                }
            } else if (event.keyCode === KeyCodes.UP && this.selectedIndex === 0) {
                this.selectedIndex--;
                this.toggleHeader(null, true);
            } else if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode === KeyCodes.SPACE) {
                clearTimeout(this.filterTermTimeout);
                this.filterTermTimeout = setTimeout(() => { this.filterTerm = ''; }, 2000);
                let char = String.fromCharCode(event.keyCode);
                this.filterTerm = this.filterTerm.concat(char);
                let element = this.element.nativeElement;
                let list = element.querySelector('.novo-select-list');
                let item = element.querySelector(`[data-automation-value^="${this.filterTerm}" i]`);
                if (item) {
                    list.scrollTop = item.offsetTop;
                    let listItems = Array.from(list.querySelectorAll('li')).map((element: any) => element.getAttribute('data-automation-value'));
                    this.selectedIndex = listItems.indexOf(item.getAttribute('data-automation-value'));
                    this.select(this.options[this.selectedIndex], this.selectedIndex);
                }
            } else if ([KeyCodes.BACKSPACE, KeyCodes.DELETE].includes(event.keyCode)) {
                clearTimeout(this.filterTermTimeout);
                this.filterTermTimeout = setTimeout(() => { this.filterTerm = ''; }, 2000);
                this.filterTerm = this.filterTerm.slice(0, -1);
            }
        }
    }

    scrollToSelected() {
        let element = this.element.nativeElement;
        let list = element.querySelector('.novo-select-list');
        list.scrollTop = 48 * (this.selectedIndex - 1);
    }

    toggleHeader(event, forceValue) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        // Reverse the active property (if forceValue, use that)
        this.header = {
            open: forceValue !== undefined ? forceValue : !this.header.open,
            value: '',
            valid: true
        };
    }

    toggleActive(event?, forceValue?) {
        // Reverse the active property (if forceValue, use that)
        this.active = forceValue || !this.active;
        // Bind window click events to hide on outside click
        if (this.active) {
            window.addEventListener('click', this.onOutsideClick);
        } else {
            window.removeEventListener('click', this.onOutsideClick);
        }
        // If closing select, also close header
        this.toggleHeader(event, false);
    }

    highlight(match, query) {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return query ? match.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : match;
    }

    escapeRegexp(queryToEscape) {
        // Ex: if the capture is "a" the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    saveHeader() {
        if (this.header.value) {
            this.headerConfig.onSave(this.header.value);
            this.createdItem = this.header.value;
            this.toggleActive();
        } else {
            this.header.valid = false;
        }
    }

    writeValue(model: any): void {
        this.model = model;
        if (this.options) {
            let item = this.options.find(i => i.value === model);
            if (!item && !Helpers.isEmpty(model)) {
                item = {
                    label: model,
                    value: model
                };
                this.options.unshift(item);
            }
            if (item) {
                this.empty = false;
                this.selected = item;
                this.selected.active = true;
                this.selectedIndex = this.options.indexOf(item);
            } else {
                this.clear();
            }

        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}
