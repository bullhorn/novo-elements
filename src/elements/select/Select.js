import { Component, ElementRef, EventEmitter, OptionalMetadata } from 'angular2/core';
import { COMMON_DIRECTIVES, NgControl, NgModel } from 'angular2/common';
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';

@Component({
    selector: 'novo-select',
    directives: [COMMON_DIRECTIVES],
    inputs: ['options', 'placeholder', 'readonly'],
    template: `
        <button (click)="toggleActive($event)" tabIndex="-1" type="button" [ngClass]="{empty: empty}">{{selected.label}}<i class="bhi-collapse"></i></button>
        <ul class="novo-select-list" tabIndex="-1">
            <ng-content></ng-content>
            <li *ngFor="#option of options; #i = index" [ngClass]="{active: option.active}" (click)="onClickOption(option, i)" [attr.data-automation-value]="option.label">
              <span>{{option.label}}</span>
              <i *ngIf="option.active" class="bhi-check"></i>
            </li>
        </ul>
    `,
    host: {
        '(keydown)': 'onKeyDown($event)',
        '[class.active]': 'active',
        '[class.ng-untouched]': 'model.control?.untouched == true',
        '[class.ng-touched]': 'model.control?.touched == true',
        '[class.ng-pristine]': 'model.control?.pristine == true',
        '[class.ng-dirty]': 'model.control?.dirty == true',
        '[class.ng-valid]': 'model.control?.valid == true',
        '[class.ng-invalid]': 'model.control?.valid == false'
    }
})
@Reflect.metadata('parameters', [[new OptionalMetadata()]])
export class Select extends OutsideClick {
    constructor(model:NgControl, element:ElementRef) {
        super(element);
        // Defaults
        this.selectedIndex = -1;
        this.placeholder = 'Select...';
        this.empty = true;
        this.value = null;

        this.onChange = null;
        this.onTouched = null;
        this.onHover = new EventEmitter(false);
        this.onLeave = new EventEmitter(false);

        this.model = model || new NgModel();
        this.model.valueAccessor = this;
    }

    ngOnInit() {
        this.ngOnChanges();
    }

    ngOnChanges() {
        this.readonly = this.readonly === true;
        if (this.options && this.options.length && typeof this.options[0] === 'string') {
            this.options = this.options.map((item) => {
                return { value: item, label: item }; //esfmt-ignore-line
            });
        }

        if (!this.model.value) {
            this.clear();
        } else {
            //TODO: @jgodi fix this
            this.writeValue(this.model.value);
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
        this.model.viewToModelUpdate(this.selected.value);
    }

    clear() {
        this.selected = {
            label: this.placeholder,
            value: null,
            active: false
        };
        this.selectedIndex = -1;
        this.empty = true;
    }

    // TODO: Add key listener to jump to options starting with that letter.
    onKeyDown(event) {
        if (this.active) {
            // Prevent Scrolling
            event.preventDefault();
            // Close popup on escape key
            if (event.keyCode === KeyCodes.ESC) {
                this.toggleActive();
                return;
            }
            if (event.keyCode === KeyCodes.ENTER) {
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
            } else if (event.keyCode >= 65 && event.keyCode <= 90) {
                let char = String.fromCharCode(event.keyCode);
                let element = this.element.nativeElement;
                let list = element.querySelector('.novo-select-list');
                let item = element.querySelector(`[data-automation-value^=${char}]`);
                if (item) {
                    list.scrollTop = item.offsetTop;
                }
            }
        }
    }

    scrollToSelected() {
        let element = this.element.nativeElement;
        let list = element.querySelector('.novo-select-list');
        list.scrollTop = 48 * (this.selectedIndex - 1);
    }

    //valueAccessor Functions
    writeValue(value) {
        this.value = value;
        let item = this.options && this.options.find(i => i.value === value);
        if (item) {
            this.empty = false;
            this.selected = item;
            this.selected.active = true;
            this.selectedIndex = this.options.indexOf(item);
        } else {
            this.clear();
        }
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}

export const NOVO_SELECT_ELEMENTS = [Select];
