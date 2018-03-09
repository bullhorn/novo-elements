// NG
import { ChangeDetectorRef, Component, ElementRef, forwardRef, Host, Input, Output, Inject, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TAB, ENTER, ESCAPE } from '@angular/cdk/keycodes';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

// App
import { NovoOverlayTemplate } from '../overlay/Overlay';
import { NovoLabelService } from '../../services/novo-label-service';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { Helpers } from '../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTimePickerInputElement),
    multi: true
};

@Component({
    selector: 'novo-time-picker-input',
    providers: [DATE_VALUE_ACCESSOR],
    template: `
        <input type="text" [name]="name" [(ngModel)]="formattedValue" [textMask]="maskOptions" [placeholder]="placeholder" (focus)="openPanel()" (keydown)="_handleKeydown($event)" (input)="_handleInput($event)" #input/>
        <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-clock"></i>
        <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>

        <novo-overlay-template [parent]="element">
            <novo-time-picker inline="true" (onSelect)="setValue($event)" [ngModel]="value" [military]="military"></novo-time-picker>
        </novo-overlay-template>
  `
})
export class NovoTimePickerInputElement implements OnInit, ControlValueAccessor {
    public value: any;
    public formattedValue: any;

    /** View -> model callback called when value changes */
    _onChange: (value: any) => void = () => { }
    /** View -> model callback called when autocomplete has been touched */
    _onTouched = () => { };

    @Input() name: string;
    @Input() placeholder: string;
    @Input() military: boolean = false;
    @Input() maskOptions: any;
    @Output() changed: EventEmitter<any> = new EventEmitter();
    /** Element for the panel containing the autocomplete options. */
    @ViewChild(NovoOverlayTemplate) overlay: NovoOverlayTemplate;

    constructor(
        public element: ElementRef,
        public labels: NovoLabelService,
        private dateFormatService: DateFormatService,
        protected _changeDetectorRef: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.placeholder = this.military ? this.labels.timeFormatPlaceholder24Hour : this.labels.timeFormatPlaceholderAM;
        this.maskOptions = {
            mask: this.military ? [/\d/, /\d/, ':', /\d/, /\d/] : [/\d/, /\d/, ':', /\d/, /\d/, ' ', /[aApP]/, /[mM]/], //this.dateFormatService.getTimeMask(this.military),
            pipe: createAutoCorrectedDatePipe('HH:MM'),
            keepCharPositions: false,
            guide: true,
        }; 
    }

    /** BEGIN: Convienient Panel Methods. */
    openPanel(): void {
        this.overlay.openPanel();
        let hour = new Date().getHours();
        Promise.resolve(null).then(() => this.scrollToIndex((hour*4)));
    }
    closePanel(): void {
        this.overlay.closePanel();
    }
    get panelOpen(): boolean {
        return this.overlay && this.overlay.panelOpen;
    }
    /** END: Convienient Panel Methods. */

    _handleKeydown(event: KeyboardEvent): void {
        if ((event.keyCode === ESCAPE || event.keyCode === ENTER || event.keyCode === TAB) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    }

    _handleInput(event: KeyboardEvent): void {
        if (document.activeElement === event.target) {
            // this._onChange((event.target as HTMLInputElement).value);
            let text = (event.target as HTMLInputElement).value;
            if (this.military ? text.replace(/_/g, '').length === 5 : text.replace(/_/g, '').length === 8) {
                let [dateTimeValue, formatted] = this.dateFormatService.parseString(text, this.military, 'time');
                this._onChange(dateTimeValue);
                this._setTriggerValue(dateTimeValue);
            } else {
                this.changed.next(text);
                this._onChange(text);
            }
            this.openPanel();
            let num = Number(text.split(':')[0]);
            this.scrollToIndex((num*4));
        }
    }

    writeValue(value: any): void {
        Promise.resolve(null).then(() => this._setTriggerValue(value));
    }
    registerOnChange(fn: (value: any) => {}): void {
        this._onChange = fn;
    }
    registerOnTouched(fn: () => {}) {
        this._onTouched = fn;
    }

    private _setTriggerValue(value: any): void {
        const toDisplay = value;

        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        let inputValue = toDisplay !== null ? toDisplay : '';

        // If it's used within a `MdFormField`, we should set it through the property so it can go
        // through change detection.
        //this._element.nativeElement.value = inputValue;
        if(inputValue instanceof Date && this.value instanceof Date) {
            inputValue = new Date(inputValue.setFullYear(this.value.getFullYear(), this.value.getMonth(), this.value.getDate()));
        }
        
        this.value = inputValue;
        this.formattedValue = this.formatDateValue(inputValue);
        this.changed.next(this.value);
        this._changeDetectorRef.markForCheck();
    }

    public setValue(event: any | null): void {
        if (event && event.date) {
            this._setTriggerValue(event.date);
            this._onChange(event.date);
        }
    }

    public setValueAndClose(event: any | null): void {
        this.setValue(event);
        this.closePanel();
    }

    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    public clearValue(skip: any) {
        this.writeValue(null);
        this._onChange(null);
    }

    public formatDateValue(value) {
        if (!value) {
            return '';
        }
        let format = this.labels.formatDateWithFormat(value, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: !this.military
        });
        if (format.split(':')[0].length===1) {
            return `0${format}`;    
        }
        return format;
    }

    public get hasValue() {
        return !Helpers.isEmpty(this.value);
    }

    public scrollToIndex(index: number) {
        let element = this.overlay._overlayRef.overlayElement;
        let list = element.querySelector('.increments');
        let items = list.querySelectorAll('novo-list-item');
        let item = items[index];
        if (item) {
            list.scrollTop = (item as HTMLElement).offsetTop;
        }
    }

}
