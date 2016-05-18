import { Directive, EventEmitter, ElementRef, DynamicComponentLoader, ViewContainerRef } from '@angular/core';
import { NgModel } from '@angular/common';
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';
import { PickerResults } from './extras/PickerExtras';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

/**
 * @name Picker
 *
 * @description This class is the directive definition of the Picker. If you add and attribute of `picker` to an input,
 * it will create an instance of the picker which wraps the input in all of the picker HTML elements and functionality.
 * Picker should be added as a two-way bound ngModel instance `[(picker)]=""` in order to have the picker options
 * dynamically populate.
 */
@Directive({
    selector: '[picker]',
    inputs: [
        'config: picker'
    ],
    host: {
        '(keyup)': 'onKeyUp($event)',
        '(focus)': 'onFocus()'
    },
    outputs: [
        'select',
        'queryChange'
    ],
    directives: [
        NgModel
    ]
})
export class Picker extends OutsideClick {
    // Emitter for search changes
    queryChange:EventEmitter = new EventEmitter(false);
    // Emitter for selects
    select:EventEmitter = new EventEmitter();
    // Flag for API errors
    hasDataError:boolean = false;
    // Flag for showing recents
    showNoRecents:boolean = false;
    // Flag for loading
    isLoading:boolean = true;
    // Collection for filtered matches
    filteredMatches = [];
    // Flag for remote filtering.
    isStatic:boolean = true;

    constructor(model:NgModel, element:ElementRef, loader:DynamicComponentLoader, view:ViewContainerRef) {
        super(element);
        // NgModel instance
        this.model = model;
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
                    this.filteredMatches = [];
                    this.queryChange.emit({
                        message: 'cancelled'
                    });
                    this.hideResults();
                });
            }
        });
    }

    ngOnInit() {
        // Default field name for data model
        this.field = this.config.field || 'label';
        this.format = this.config.format;

        // Custom results template
        this.resultsComponent = this.config.resultsTemplate || PickerResults;

        // Get all distinct key up events from the input and only fire if long enough and distinct
        const observer = Observable.fromEvent(this.element.nativeElement, 'keyup')
            .map(e => e.target.value)
            .debounceTime(500)
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
                let newValue = this.container.activeMatch;
                if (newValue) {
                    this.updateSearch(newValue);
                    this.select.emit(newValue);
                }
                this.hideResults();
                return;
            }
        }
    }

    /**
     * @name updateSearch
     * @param newValue - A string (that'll be the value of the input).
     *
     * @description This function updates the model (ngModel) and emits the queryChange. The queryChange emitter
     * is needed when the model needs to be used to query an API or some other data resource that updates the
     * picker's options.
     */

    updateSearch(newValue) {
        let value = this.format ? this.interpolate(this.format, newValue) : newValue[this.field];
        this.model.update.emit(value);
        this.queryChange.emit(value);
    }

    interpolate(str, props) {
        return str.replace(/\$([\w\.]+)/g, (original, key) => {
            let keys = key.split('.');
            let value = props[keys.shift()];
            while (keys.length && value !== undefined) {
                let k = keys.shift();
                value = k ? value[k] : `${value}.`;
            }
            return value !== undefined ? value : original;
        });
    }

    /**
     * @name onFocus
     *
     * @description When the input's focus event is called this method calls the debounced function that displays the
     * results.
     */
    onFocus() {
        this.showResults();
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
        //let matches = this.filterData(this.model.value, results, this.field);
        // Update Matches
        if (this.container) {
            // Update existing list or create the DOM element
            this.container.term = this.model.value;
        } else {
            this.popup = this.loader.loadNextToLocation(this.resultsComponent, this.view).then((componentRef) => {
                this.container = componentRef.instance;
                this.container.parent = this;
                this.container.config = this.config;
                this.container.field = this.field;
                this.container.term = this.model.value;
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
}

export const NOVO_PICKER_ELEMENTS = [Picker, PickerResults];
