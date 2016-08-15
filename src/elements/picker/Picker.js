// NG2
import { Component, EventEmitter, ElementRef, DynamicComponentLoader, ViewContainerRef, forwardRef, Provider } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';
import { PickerResults } from './extras/picker-results/PickerResults';
// Vendor
import { Observable } from 'rxjs/Rx';

// Value accessor for the component (supports ngModel)
const PICKER_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => NovoPickerElement),
    multi: true
});

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
    `

})
export class NovoPickerElement extends OutsideClick {
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

    constructor(element:ElementRef, loader:DynamicComponentLoader, view:ViewContainerRef) {
        super(element);
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

    // get accessor
    get value() {
        return this._value;
    }

    //set accessor including call the onchange callback
    set value(selected) {
        if (!selected) {
            this.term = '';
            this._value = null;
            this.onModelChange(null);
        } else if (selected.value !== this._value) {
            this.term = this.clearValueOnSelect ? '' : selected.label;
            this._value = selected.value;
            this.select.emit(selected);
            this.onModelChange(selected.value);
        }
    }

    // Makes sure to clear the model if the user clears the text box
    checkTerm(event) {
        if (!event || !event.length) {
            this.onModelChange('');
        }
    }

    // Set touched on blur
    onTouched() {
        this.blur.emit(event);
        this.onModelTouched();
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

    registerOnChange(fn:Function):void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn:Function):void {
        this.onModelTouched = fn;
    }
}
