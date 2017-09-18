import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Host,
    Inject,
    InjectionToken,
    ViewChild,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    ViewContainerRef,
    TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { Overlay } from '@angular/cdk/overlay';
import { TAB, ENTER, ESCAPE } from '@angular/cdk/keycodes';

import { TextMaskModule } from 'angular2-text-mask';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';

import { NovoDatePickerElement } from './DatePicker';
import { HasOverlay } from '../overlay/HasOverlay';
import { DEFAULT_OVERLAY_SCROLL_STRATEGY } from '../overlay/Overlay';
import { NovoLabelService } from '../../services/novo-label-service';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { Helpers } from '../../utils/Helpers';


// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDatePickerInputElement),
    multi: true
};

@Component({
    selector: 'novo-date-picker-input',
    providers: [DATE_VALUE_ACCESSOR],
    template: `
        <input type="text" [name]="name" [value]="formattedValue" [textMask]="maskOptions" [placeholder]="placeholder" (focus)="openPanel()" (keydown)="_handleKeydown($event)" (input)="_handleInput($event)" #input/>
        <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-calendar"></i>
        <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>

        <novo-overlay-template #overlay>
            <novo-date-picker inline="true" (onSelect)="setValueAndClose($event)" [ngModel]="value"></novo-date-picker>
        </novo-overlay-template>
  `
})
export class NovoDatePickerInputElement extends HasOverlay implements OnDestroy, ControlValueAccessor {
    public value: any;
    public formattedValue: any;

    /** View -> model callback called when value changes */
    _onChange: (value: any) => void = () => { };

    /** View -> model callback called when autocomplete has been touched */
    _onTouched = () => { };

    @Input() name: string;
    @Input() placeholder: string;
    @Input() maskOptions: any;
    /** Element for the panel containing the autocomplete options. */
    @ViewChild('overlay') datepicker: any;

    constructor(
        protected _element: ElementRef,
        protected _overlay: Overlay,
        protected _viewContainerRef: ViewContainerRef,
        protected _zone: NgZone,
        protected _changeDetectorRef: ChangeDetectorRef,
        @Inject(DEFAULT_OVERLAY_SCROLL_STRATEGY) protected _scrollStrategy,
        @Optional() @Inject(DOCUMENT) protected _document: any,
        public labels: NovoLabelService,
        private dateFormatService: DateFormatService
    ) {
        super(_element, _overlay, _viewContainerRef, _zone, _changeDetectorRef, _scrollStrategy, _document);
        this.maskOptions = {
            mask: this.dateFormatService.getDateMask(),
            keepCharPositions: true,
            guide: false
        };
        this.placeholder = this.labels.dateFormatPlaceholder;
    }

    ngOnDestroy() {
        this._destroyPanel();
    }

    // /** Opens the overlay panel. */
    openPanel(): void {
        super.openPanel(this.datepicker.template);
    }

    onClosingAction(event): void {
        this.setValueAndClose(event);
    }

    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions(): Observable<any> {
        return merge(
            this._outsideClickStream
        );
    }

    _handleKeydown(event: KeyboardEvent): void {
        if ((event.keyCode === ESCAPE || event.keyCode === ENTER || event.keyCode === TAB) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
        }
    }

    _handleInput(event: KeyboardEvent): void {
        if (document.activeElement === event.target) {
            this._onChange((event.target as HTMLInputElement).value);
            let [dateTimeValue, formatted] = this.dateFormatService.parseString((event.target as HTMLInputElement).value, false, 'date');
            if (dateTimeValue && dateTimeValue.getTime() > 0) {
                this._setTriggerValue(dateTimeValue);
            }
            this.openPanel();
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
        const inputValue = toDisplay != null ? toDisplay : '';

        this.value = inputValue;
        this.formattedValue = this.formatDateValue(inputValue);
        this._changeDetectorRef.markForCheck();
    }

    /**
    * This method closes the panel, and if a value is specified, also sets the associated
    * control to that value. It will also mark the control as dirty if this interaction
    * stemmed from the user.
    */
    public setValueAndClose(event: any | null): void {
        if (event && event.date) {
            this._setTriggerValue(event.date);
            this._onChange(event.date);
        }
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
        return this.labels.formatDateWithFormat(value, {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });
    }

    public get hasValue() {
        return !Helpers.isEmpty(this.value);
    }

}
