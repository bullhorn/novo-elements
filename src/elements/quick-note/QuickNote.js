import { Component, EventEmitter, ElementRef, ViewContainerRef, ComponentResolver, ViewChild, Optional } from '@angular/core'; //eslint-disable-line
import { NgModel } from '@angular/common';
import 'rxjs/Rx'; //eslint-disable-line

import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';
import { swallowEvent } from './../../utils/Helpers';
import { QuickNoteResults } from './extras/quick-note-results/QuickNoteResults';
import { ContentEditableModel } from './../../directives/content-editable-model/ContentEditableModel';

@Component({
    selector: 'novo-quick-note',
    directives: [NgModel, ContentEditableModel],
    inputs: ['config', 'placeholder', 'references'],
    outputs: ['select', 'focus', 'blur'],
    template: `
        <div class="quick-note-wrapper">
            <textarea [(ngModel)]="basicNote"
                      (keyup)="onKeyUp($event)"
                      (keypress)="onKeyPress($event)"
                      (focus)="onFocus($event)"
                      (input)="onInput($event)"
                      (blur)="onTouched($event)">
            </textarea>
            <div class="quick-note-overlay"
                [(contentEditableModel)]="formattedNote"
                [attr.placeholder]="placeholder">
            </div>
            <ref #results></ref>
        </div>
    `
})
export class QuickNote extends OutsideClick {
    // Emitter for selects
    select:EventEmitter = new EventEmitter();
    focus:EventEmitter = new EventEmitter();
    blur:EventEmitter = new EventEmitter();

    // Internal search string
    searchTerm:string = '';

    // Placeholders for the callbacks
    _onTouchedCallback = () => false;
    _onChangeCallback = () => false;

    // Results container
    @ViewChild('results', { read: ViewContainerRef }) results:ViewContainerRef;

    constructor(@Optional() model:NgModel, element:ElementRef, componentResolver:ComponentResolver) {
        super(element);
        // NgModel instance
        this.model = model || new NgModel();
        this.model.valueAccessor = this;
        // Component Resolver  Instance
        this.componentResolver = componentResolver;
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
        this.resultsComponent = this.config.resultsTemplate || QuickNoteResults;
        // Write the value to the model
        this.writeValue(this.model.value);
    }

    onKeyPress(event) {
        // Go over all defined triggers
        let triggers = this.config.triggers || {};
        Object.keys(triggers).forEach(key => {
            let trigger = triggers[key] || {};
            if (event.keyCode === Number(trigger.keyCode)) {
                this.isTagging = true;
                this.type = key;
                console.log('TAGGING ON', key);
            }
        });
    }

    onInput(event) {
        // Keep the formatted note up-to-date
        this.updateFormattedNote(event.target.value);
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
        // Navigation inside the results
        if (this.quickNoteResults) {
            swallowEvent(event);

            if (event.keyCode === KeyCodes.ESC) {
                this.hideResults();
                return;
            }

            if (event.keyCode === KeyCodes.UP) {
                this.quickNoteResults.instance.prevActiveMatch();
                return;
            }

            if (event.keyCode === KeyCodes.DOWN) {
                this.quickNoteResults.instance.nextActiveMatch();
                return;
            }

            if (event.keyCode === KeyCodes.ENTER) {
                this.quickNoteResults.instance.selectActiveMatch();
                return;
            }
        }

        let timer = null;
        clearTimeout(timer);
        if (this.isTagging) {
            timer = setTimeout(() => {
                let searchQuery;
                searchQuery = this.extractSearchQuery();
                console.log('SQ', searchQuery);
                if (searchQuery.length) {
                    this.searchTerm = searchQuery;
                    this.showResults();
                } else {
                    this.searchTerm = null;
                    this.hideResults();
                }
            }, 250);
        }
    }

    updateFormattedNote(value) {
        // Replace references with anchor tags
        let temp = value;
        if (this.references) {
            Object.keys(this.references).forEach(key => {
                let array = this.references[key] || [];
                let formatter = (this.config.renderers ? this.config.renderers[key] : null) || this.renderLink;
                array.forEach(item => {
                    temp = temp.replace(`${this.config.triggers[key].symbol}${item.label}`, formatter(this.config.triggers[key].symbol, item));
                });
            });
        }
        // Update formatted value
        this.formattedNote = temp;
        // Propagate change to ngModel
        this._onChangeCallback(this.formattedNote);
    }

    renderLink(symbol, item) {
        return `<a>${symbol}${item.label}</a>`;
    }

    extractSearchQuery() {
        let symbol = this.config.triggers[this.type].symbol;
        return this.basicNote.slice(this.basicNote.lastIndexOf(symbol), this.basicNote.length);
    }

    /**
     * @name onFocus
     * @description When the input's focus event is called this method calls the debounced function that displays the
     * results.
     */
    onFocus(event) {
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
        if (this.quickNoteResults) {
            // Update existing list or create the DOM element
            this.quickNoteResults.instance.term = { searchTerm: this.searchTerm, type: this.type };
        } else {
            this.componentResolver.resolveComponent(this.resultsComponent)
                .then(componentFactory => {
                    this.quickNoteResults = this.results.createComponent(componentFactory);
                    this.quickNoteResults.instance.parent = this;
                    this.quickNoteResults.instance.config = this.config;
                    this.quickNoteResults.instance.term = { searchTerm: this.searchTerm, type: this.type };
                });
        }
    }

    /**
     * @name hideResults
     *
     * @description - This method deletes the picker results from the DOM.
     */
    hideResults() {
        this.isTagging = false;
        if (this.quickNoteResults) {
            this.quickNoteResults.destroy();
            this.quickNoteResults = null;
        }
    }

    onSelected(type, selected) {
        // Turn off tagging
        this.isTagging = false;
        // Reset focus
        this.element.nativeElement.querySelector('textarea').focus();
        // Replace searchTerm
        let symbol = this.config.triggers[this.type].symbol;
        this.basicNote = this.basicNote.replace(this.searchTerm, `${symbol}${selected.label} `);
        // Update the formatted note
        this.updateFormattedNote(this.basicNote);
        // Propagate change to ngModel
        this._onChangeCallback(this.formattedNote);

        console.log('SELECTED TYPE', type);
        console.log('SELECTED', selected);

        this.references = this.references || {};
        this.references[type] = this.references[type] || [];
        this.references[type].push(selected);
    }

    // Set touched on blur
    onTouched() {
        this.blur.emit(event);
        this._onTouchedCallback();
    }

    // From ControlValueAccessor interface
    writeValue(value) {
        this.note = value;
        if (!value) {
            this._onChangeCallback();
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
}

export const NOVO_QUICK_NOTE_ELEMENTS = [QuickNote];
