import { Component, EventEmitter, ElementRef, DynamicComponentLoader, ViewContainerRef, Optional } from '@angular/core'; //eslint-disable-line
import { NgModel } from '@angular/common';
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';
import { PickerResults } from './extras/PickerExtras';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx'; //eslint-disable-line

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
    directives: [NgModel],
    inputs: ['config', 'placeholder', 'clearValueOnSelect'],
    outputs: ['select', 'focus', 'blur'],
    template: `
        <input
            type="text"
            [(ngModel)]="term"
            [placeholder]="placeholder"
            (keyup)="onKeyUp($event)"
            (focus)="onFocus($event)"
            (blur)="onTouched($event)"
            autocomplete="off" />
    `

})
export class Picker extends OutsideClick {
    // Emitter for selects
    select:EventEmitter = new EventEmitter();
    focus:EventEmitter = new EventEmitter();
    blur:EventEmitter = new EventEmitter();
    // Flag for remote filtering.
    isStatic:boolean = true;
    // Internal search string
    term:string = '';
    // private data model
    _value:any = '';
    //Placeholders for the callbacks
    _onTouchedCallback = () => false;
    _onChangeCallback = () => false;

    constructor(@Optional() model:NgModel, element:ElementRef, loader:DynamicComponentLoader, view:ViewContainerRef) {
        super(element);
        // NgModel instance
        this.model = model || new NgModel();
        this.model.valueAccessor = this;
        // Dynamic Component Loader Instance
        this.loader = loader;
        // View to load next to
        this.view = view;
        // Instance of element
        this.element = element;
        // Bind to the active change event from the OutsideClick
        this.onActiveChange.subscribe(active => {
            if (!active) {
                setTimeout(() => {
                    this.hideResults();
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

        this.writeValue(this.model.value);
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
        if (this.container) {
            if (event.keyCode === KeyCodes.ESC) {
                this.hideResults();
                return;
            }

            if (event.keyCode === KeyCodes.UP) {
                this.container.prevActiveMatch();
                return;
            }

            if (event.keyCode === KeyCodes.DOWN) {
                this.container.nextActiveMatch();
                return;
            }

            if (event.keyCode === KeyCodes.ENTER) {
                this.container.selectActiveMatch();
                return;
            }

            if (event.keyCode === KeyCodes.BACKSPACE && this.value !== null) {
                this.term = null;
                this.value = null;
                this.select.emit(null);
                this.showResults();
            }
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
        //console.log('Results', term);
        this.toggleActive(null, true);
        // Update Matches
        if (this.container) {
            // Update existing list or create the DOM element
            this.container.term = this.term;
        } else {
            this.popup = this.loader.loadNextToLocation(this.resultsComponent, this.view).then((componentRef) => {
                this.container = componentRef.instance;
                this.container.parent = this;
                this.container.config = this.config;
                this.container.term = this.term;
                return componentRef;
            });
        }
    }

    /**
     * @name hideResults
     *
     * @description - This method deletes the picker results from the DOM.
     */
    hideResults() {
        if (this.container) {
            this.popup.then((componentRef) => {
                componentRef.destroy();
                this.container = null;
                return componentRef;
            });
        }
    }

    //get accessor
    get value():any {
        return this._value;
    }

    //set accessor including call the onchange callback
    set value(selected:any) {
        if (!selected) {
            this.term = '';
            this._value = null;
            this._onChangeCallback(null);
        } else if (selected.value !== this._value) {
            this.term = this.clearValueOnSelect ? '' : selected.label;
            this._value = selected.value;
            this.select.emit(selected);
            this._onChangeCallback(selected.value);
        }
    }

    //Set touched on blur
    onTouched() {
        this.blur.emit(event);
        this._onTouchedCallback();
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
            } else {
                this.term = value;
            }
        }
        this._value = value;
    }

    //From ControlValueAccessor interface
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
}

export const NOVO_PICKER_ELEMENTS = [Picker, PickerResults];
