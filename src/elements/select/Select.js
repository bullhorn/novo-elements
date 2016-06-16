import { Component, ElementRef, EventEmitter, Optional } from '@angular/core'; // eslint-disable-line
import { COMMON_DIRECTIVES, NgControl, NgModel } from '@angular/common';
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';

@Component({
    selector: 'novo-select',
    directives: [COMMON_DIRECTIVES],
    inputs: ['options', 'placeholder', 'readonly', 'footerConfig'],
    outputs: ['onSelect'],
    template: `
        <button (click)="toggleActive($event)" tabIndex="-1" type="button" [ngClass]="{empty: empty}">{{selected.label}}<i class="bhi-collapse"></i></button>
        <ul class="novo-select-list" tabIndex="-1" [ngClass]="{footer: footerConfig}">
            <ng-content></ng-content>
            <li *ngFor="let option of options; let i = index" [ngClass]="{active: option.active}" (click)="onClickOption(option, i)" [attr.data-automation-value]="option.label">
              <span>{{option.label}}</span>
              <i *ngIf="option.active" class="bhi-check"></i>
            </li>
            <div *ngIf="footerConfig" class="select-footer">
                <button  *ngIf="!footer.open" (click)="toggleFooter($event); false" tabIndex="-1" type="button" class="footer"><i class="bhi-add-thin"></i>{{footerConfig.label}}</button>
                <div *ngIf="footer.open" [ngClass]="{active: footer.open}">
                    <input autofocus type="text" [placeholder]="footerConfig.placeholder" [attr.id]="name" autocomplete="false" [(ngModel)]="footer.value" [ngClass]="{invalid: !footer.valid}"/>
                    <footer>
                        <button (click)="toggleFooter($event, false)">Cancel</button>
                        <button (click)="saveFooter()" class="primary">Save</button>
                    </footer>
                </div>
            </div>
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
export class Select extends OutsideClick {
    constructor(@Optional() model:NgControl, element:ElementRef) {
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
        this.onSelect = new EventEmitter();

        this.model = model || new NgModel();
        this.model.valueAccessor = this;

        this.footer = {
            open: false,
            valid: true,
            value: ''
        };
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

        if (!this.model.value && !this.createdItem) {
            this.clear();
        } else if (this.createdItem) {
            let item = this.options.find(i => i.label === this.createdItem);
            let index = this.options.indexOf(item);
            this.select(item, index);
        } else {
            // TODO - jgodi - maybe this isn't the best?
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
        this.onSelect.next({ selected: this.selected.value });
        this.model.viewToModelUpdate(this.selected.value);
    }

    clear() {
        this.selected = {
            label: this.placeholder,
            value: null,
            active: false
        };
        this.footer = {
            open: false,
            valid: true,
            value: ''
        };
        this.selectedIndex = -1;
        this.empty = true;
    }

    // TODO: Add key listener to jump to options starting with that letter.
    onKeyDown(event) {
        if (this.active) {
            if (!this.footer.open) {
                // Prevent Scrolling
                event.preventDefault();
            }
            // Close popup on escape key
            if (event.keyCode === KeyCodes.ESC) {
                this.toggleActive();
                return;
            }
            if (event.keyCode === KeyCodes.ENTER) {
                if (this.footer.open && this.footer.value) {
                    this.saveFooter();
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
            } else if (event.keyCode === KeyCodes.DOWN && this.selectedIndex === this.options.length - 1) {
                this.toggleFooter(null, true);
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
        if (this.options) {
            let item = this.options.find(i => i.value === value);
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

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    toggleFooter(event, forceValue) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        // Reverse the active property (if forceValue, use that)
        this.footer = {
            open: forceValue !== undefined ? forceValue : !this.footer.open,
            value: '',
            valid: true
        };
    }

    toggleActive(event, forceValue) {
        // Reverse the active property (if forceValue, use that)
        this.active = forceValue || !this.active;
        // Bind window click events to hide on outside click
        if (this.active) {
            window.addEventListener('click', this.onOutsideClick);
        } else {
            window.removeEventListener('click', this.onOutsideClick);
        }
        // Fire the active change event
        this.onActiveChange.emit(this.active);

        //If closing select, also close footer
        this.toggleFooter(event, false);
    }

    saveFooter() {
        //save value, select value, close list
        if (this.footer.value) {
            this.footerConfig.onSave(this.footer.value);
            this.createdItem = this.footer.value;
            this.toggleActive();
        } else {
            this.footer.valid = false;
        }
    }
}

export const NOVO_SELECT_ELEMENTS = [Select];
