// NG
import { ChangeDetectorRef, Component, ElementRef, forwardRef, Host, Input, Inject, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TAB, ENTER, ESCAPE } from '@angular/cdk/keycodes';
// App
import { NovoDateTimePickerElement } from './DateTimePicker';
import { NovoOverlayTemplate } from '../overlay/Overlay';
import { NovoLabelService } from '../../services/novo-label-service';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { Helpers } from '../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateTimePickerInputElement),
    multi: true
};

@Component({
    selector: 'novo-date-time-picker-input',
    providers: [DATE_VALUE_ACCESSOR],
    template: `
        <novo-date-picker-input [(ngModel)]="datePart" (changed)="updateDate($event)" [maskOptions]="maskOptions"></novo-date-picker-input>
        <novo-time-picker-input [(ngModel)]="timePart" (changed)="updateTime($event)" [military]="military"></novo-time-picker-input>
  `
})
export class NovoDateTimePickerInputElement implements ControlValueAccessor {
    public value: any;
    public datePart: any;
    public timePart: any;

    /** View -> model callback called when value changes */
    _onChange: (value: any) => void = () => { };

    /** View -> model callback called when autocomplete has been touched */
    _onTouched = () => { };

    @Input() name: string;
    @Input() placeholder: string;
    @Input() maskOptions: any;
    @Input() military: boolean = false;
    @Input() format: string;
    
    constructor(
        public element: ElementRef,
        public labels: NovoLabelService,
        private dateFormatService: DateFormatService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    writeValue(value: any): void {
        this.datePart = value;
        this.timePart = value;
        Promise.resolve(null).then(() => this._setTriggerValue(value));
    }
    updateDate(event) {
        try {
            if (event instanceof Date && this.timePart instanceof Date) {
                let newDt = new Date(event.getFullYear(), event.getMonth(), event.getDate(), this.timePart.getHours(), this.timePart.getMinutes());
                this.setValue({date: newDt});
            } else {
                this.clearValue(true);
            }
        } catch (err) {
            // Date not valid
            this.clearValue(true);
        }
    }
    updateTime(event) {
        try {
            if (event instanceof Date && this.datePart instanceof Date) {
                let newDt = new Date(this.datePart.getFullYear(), this.datePart.getMonth(), this.datePart.getDate(), event.getHours(), event.getMinutes());
                this.setValue({date: newDt});
            } else {
                this.clearValue(true);
            }
        } catch (err) {
            // Date not valid
            this.clearValue(true);
        }
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
        const inputValue = toDisplay !== null ? toDisplay : '';

        // If it's used within a `MdFormField`, we should set it through the property so it can go
        // through change detection.
        //this._element.nativeElement.value = inputValue;
        this.value = inputValue; 
        // this.formattedValue = this.formatDateValue(inputValue);
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
    }

    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    public clearValue(skip: any) {
        this._onChange(null);
        this._setTriggerValue(null);
    }

    public get hasValue() {
        return !Helpers.isEmpty(this.value);
    }
}
