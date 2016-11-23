// NG2
import { Component, EventEmitter, ElementRef, ViewContainerRef, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';
import { PickerResults } from './extras/picker-results/PickerResults';
import { ComponentUtils } from './../../utils/component-utils/ComponentUtils';
import { Helpers } from './../../utils/Helpers';
// Vendor
import { Observable } from 'rxjs/Rx';

// Value accessor for the component (supports ngModel)
const PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoPickerElement),
    multi: true
};

/**
 * @name Picker
 *
 * @description This class is the directive definition of the Picker. If you add and attribute of `picker` to an input,
 * it will create an instance of the picker which wraps the input in all of the picker HTML elements and functionality.
 * Picker should be added as a two-way bound ngModel instance `[(picker)]=""` in order to have the picker options
 * dynamically populate.
 */
@Component({
    selector: 'novo-picker',
    inputs: ['config', 'placeholder', 'clearValueOnSelect'],
    outputs: ['select', 'focus', 'blur'],
    providers: [PICKER_VALUE_ACCESSOR],
    template: `
        <input
            type="text"
            [(ngModel)]="term"
            (ngModelChange)="checkTerm($event)"
            [placeholder]="placeholder"
            (keyup)="onKeyUp($event)"
            (focus)="onFocus($event)"
            (blur)="onTouched($event)"
            autocomplete="off" />
        <i class="bhi-search" *ngIf="!_value"></i>
        <i class="bhi-times" *ngIf="_value" (click)="clearValue(true)"></i>
        <div class="picker-results-container">
            <span #results></span>
        </div>
    `
})
export class NovoPickerElement extends OutsideClick {
    // Container for the results
    @ViewChild('results', { read: ViewContainerRef }) results:ViewContainerRef;

    // Emitter for selects
    select:EventEmitter = new EventEmitter();
    focus:EventEmitter = new EventEmitter();
    blur:EventEmitter = new EventEmitter();

    // Flag for remote filtering
    isStatic:boolean = true;

    // Internal search string
    term:string = '';

    _value:any;
    onModelChange:Function = () => {
    };
    onModelTouched:Function = () => {
    };

    constructor(element:ElementRef, componentUtils:ComponentUtils) {
        super(element);
        // Component Utils
        this.componentUtils = componentUtils;
        // Instance of element
        this.element = element;
        // Bind to the active change event from the OutsideClick
        this.onActiveChange.subscribe(active => {
            if (!active) {
                setTimeout(() => {
                    this.hideResults();
                    this.blur.emit();
                });
            }
        });
    }

    ngOnInit() {
        // Custom results template
        this.resultsComponent = this.config.resultsTemplate || PickerResults;
        // Get all distinct key up events from the input and only fire if long enough and distinct
        let input = this.element.nativeElement.querySelector('input');
        const observer = Observable.fromEvent(input, 'keyup')
            .map(e => e.target.value)
            .debounceTime(250)
            .distinctUntilChanged();
        observer.subscribe(
            term => this.showResults(term),
            err => this.hideResults(err));
    }

    /**
     * @name onKeyUp
     * @param event - A keyboard event
     *
     * @description This function is called every time the input value changes. We listen for particular keys (e.g. UP
     * arrow, ESC, etc.) to handle certain behaviors of the picker.
     * It made sense to filter these out in the controller instead of using multiple listeners on the HTML element
     * because the quantity of different behaviors would make a messy element.
     */
    onKeyUp(event) {
        if (this.popup) {
            if (event.keyCode === KeyCodes.ESC) {
                this.hideResults();
                return;
            }

            if (event.keyCode === KeyCodes.UP) {
                this.popup.instance.prevActiveMatch();
                return;
            }

            if (event.keyCode === KeyCodes.DOWN) {
                this.popup.instance.nextActiveMatch();
                return;
            }

            if (event.keyCode === KeyCodes.ENTER) {
                this.popup.instance.selectActiveMatch();
                return;
            }

            if (event.keyCode === KeyCodes.BACKSPACE && !Helpers.isBlank(this._value)) {
                this.clearValue(false);
                this.showResults();
            }
        }
    }

    clearValue(wipeTerm) {
        this._value = null;
        this.select.emit(this._value);
        this.onModelChange(this._value);

        if (wipeTerm) {
            this.term = null;
            this.hideResults();
        }
    }

    /**
     * @name onFocus
     * @description When the input's focus event is called this method calls the debounced function that displays the
     * results.
     */
    onFocus(event) {
        this.showResults();
        this.focus.emit(event);
    }

    /**
     * @name showResults
     *
     * @description This method creates an instance of the results (called popup) and adds all the bindings to that
     * instance.
     */
    showResults() {
        this.toggleActive(null, true);
        // Update Matches
        if (this.popup) {
            // Update existing list or create the DOM element
            this.popup.instance.term = this.term;
        } else {
            this.popup = this.componentUtils.appendNextToLocation(this.resultsComponent, this.results);
            this.popup.instance.parent = this;
            this.popup.instance.config = this.config;
            this.popup.instance.term = this.term;
        }
    }

    /**
     * @name hideResults
     *
     * @description - This method deletes the picker results from the DOM.
     */
    hideResults() {
        if (this.popup) {
            this.popup.destroy();
            this.popup = null;
        }
    }

    // get accessor
    get value() {
        return this._value;
    }

    //set accessor including call the onchange callback
    set value(selected) {
        if (!selected) {
            this.term = '';
            this._value = null;
            this.onModelChange(this._value);
        } else if (selected.value !== this._value) {
            this.term = this.clearValueOnSelect ? '' : selected.label;
            this._value = selected.value;
            this.select.emit(selected);
            this.onModelChange(selected.value);
        } else {
            this.select.emit(selected);
        }
    }

    // Makes sure to clear the model if the user clears the text box
    checkTerm(event) {
        if (!event || !event.length) {
            this._value = null;
            this.onModelChange(this._value);
        }
    }

    // Set touched on blur
    onTouched() {
        this.blur.emit(event);
        this.onModelTouched();

        // If we don't have a value then clear the text in the picker
        if (!this._value) {
            this.term = '';
        }
    }

    //From ControlValueAccessor interface
    writeValue(value) {
        if (this.clearValueOnSelect) {
            this.term = '';
        } else {
            if (typeof value === 'string') {
                this.term = value;
            } else if (value && value.label) {
                this.term = value.label;
            } else if (value && value.firstName) {
                this.term = `${value.firstName} ${value.lastName}`;
            } else if (value && value.name) {
                this.term = value.name;
            } else if (this.config.getLabels && typeof this.config.getLabels === 'function') {
                this.config.getLabels(value).then(result => {
                    if (result) {
                        this.term = result.label || '';
                    } else {
                        this.term = value;
                    }
                });
            } else {
                this.term = value;
            }
        }
        this._value = value;
    }

    registerOnChange(fn:Function):void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn:Function):void {
        this.onModelTouched = fn;
    }
}
