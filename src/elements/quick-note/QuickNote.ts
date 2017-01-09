// NG2
import { Component, EventEmitter, forwardRef, ElementRef, ViewChild, ViewContainerRef, Input, Output, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';
import { QuickNoteResults } from './extras/quick-note-results/QuickNoteResults';
import { ComponentUtils } from './../../utils/component-utils/ComponentUtils';

// Value accessor for the component (supports ngModel)
const QUICK_NOTE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QuickNoteElement),
    multi: true
};

@Component({
    selector: 'novo-quick-note',
    providers: [QUICK_NOTE_VALUE_ACCESSOR],
    template: `
        <div class="quick-note-wrapper">
            <textarea [(ngModel)]="basicNote"
                      (ngModelChange)="onChange($event)"
                      (keyup)="onKeyUp($event)"
                      (keypress)="onKeyPress($event)"
                      (focus)="onFocus($event)"
                      (blur)="onTouched($event)">
            </textarea>
            <div class="quick-note-overlay"
                [innerHTML]="formattedNote"
                [attr.placeholder]="placeholder">
            </div>
            <span #results></span>
        </div>
    `
})
export class QuickNoteElement extends OutsideClick implements OnInit {
    // Results container
    @ViewChild('results', { read: ViewContainerRef }) results: ViewContainerRef;

    @Input() config: any;
    @Input() placeholder: string;

    // Emitter for selects
    @Output() focus: EventEmitter<any> = new EventEmitter();
    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();

    searchTerm: string = '';
    resultsComponent: any;
    quickNoteResults: any;
    formattedNote: any;
    basicNote: any;
    isTagging: boolean;
    taggingMode: string;
    model: any;
    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };

    constructor(element: ElementRef, private componentUtils: ComponentUtils) {
        super(element);
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
        // Make sure we have a proper config
        if (!this.config) {
            throw new Error('No config set for QuickNote!');
        }
        // Make sure that we have triggers
        if (!this.config.triggers) {
            throw new Error('QuickNote config must supply triggers!');
        }
        // Make sure that we have triggers
        if (!this.config.options) {
            throw new Error('QuickNote config must supply options!');
        }
        // Custom results template
        this.resultsComponent = this.config.resultsTemplate || QuickNoteResults;
    }

    onKeyPress(event) {
        // Go over all defined triggers
        let triggers = this.config.triggers || {};
        Object.keys(triggers).forEach(key => {
            let trigger = triggers[key] || {};
            if (event.keyCode === trigger.charCodeAt()) {
                this.isTagging = true;
                this.taggingMode = key;
            }
        });
        return true;
    }

    onChange(event) {
        // Keep the formatted note up-to-date
        this.updateFormattedNote(event);
        return true;
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
            if (event.keyCode === KeyCodes.ESC) {
                this.hideResults();
                return false;
            }

            if (event.keyCode === KeyCodes.UP) {
                this.quickNoteResults.instance.prevActiveMatch();
                return false;
            }

            if (event.keyCode === KeyCodes.DOWN) {
                this.quickNoteResults.instance.nextActiveMatch();
                return false;
            }

            if (event.keyCode === KeyCodes.ENTER) {
                this.quickNoteResults.instance.selectActiveMatch();
                return false;
            }
        }

        let timer = null;
        clearTimeout(timer);
        if (this.isTagging) {
            timer = setTimeout(() => {
                let searchQuery;
                searchQuery = this.extractSearchQuery();
                if (searchQuery.length) {
                    this.searchTerm = searchQuery;
                    this.showResults();
                } else {
                    this.searchTerm = null;
                    this.hideResults();
                }
            }, 250);
        }
        return true;
    }

    /**
     * @name updateFormattedNote
     * @param value - unformatted text
     *
     * @description - Updates the value inside the div to render the text
     */
    updateFormattedNote(value) {
        // Replace references with anchor tags
        let tempFormattedValue = value;
        let tempBasicValue = value;
        if (this.model.references) {
            Object.keys(this.model.references).forEach(key => {
                let array = this.model.references[key] || [];
                let formatter = (this.config.renderer ? this.config.renderer[key] : null) || this.renderLink;
                this.model.references[key] = array.filter(item => {
                    let ref = `${this.config.triggers[key]}${item.label}`;
                    let exists = tempFormattedValue.indexOf(ref) !== -1;
                    if (exists) {
                        tempFormattedValue = this.replaceLastOccurrence(tempFormattedValue, ref, formatter(this.config.triggers[key], item));
                    } else {
                        this.taggingMode = key;
                        this.isTagging = true;
                    }
                    return exists;
                });
                // If no references, then delete the key
                if (this.model.references[key].length === 0) {
                    delete this.model.references[key];
                }
            });
        }
        // Update formatted value
        this.formattedNote = tempFormattedValue;
        // Update basic note
        this.basicNote = tempBasicValue;
        // Propagate change to ngModel
        let newModel = { note: (this.formattedNote || ''), references: this.model.references };
        // If no note or references, delete the model (form validation)
        if (newModel.note === '' && Object.keys(newModel.references).length === 0) {
            newModel = null;
        }
        this.onModelChange(newModel);
        this.change.emit(newModel);
    }

    renderLink(symbol, item) {
        return `<a>${symbol}${item.label}</a>`;
    }

    /**
     * @name extractSearchQuery
     *
     * @description - Gets the search query based on what the user is searching for
     */
    extractSearchQuery() {
        let symbol = this.config.triggers[this.taggingMode];
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
            this.quickNoteResults.instance.term = { searchTerm: this.searchTerm, taggingMode: this.taggingMode };
        } else {
            this.quickNoteResults = this.componentUtils.appendNextToLocation(this.resultsComponent, this.results);
            this.quickNoteResults.instance.parent = this;
            this.quickNoteResults.instance.config = this.config;
            this.quickNoteResults.instance.term = { searchTerm: this.searchTerm, taggingMode: this.taggingMode };
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

    /**
     * @name onSelected
     * @param taggingMode - type of tags we are looking for
     * @param selected - selected value
     *
     * @description - handles the selection from the QuickNoteResults Component
     */
    onSelected(taggingMode, selected) {
        // Turn off tagging
        this.isTagging = false;
        // Reset focus
        this.element.nativeElement.querySelector('textarea').focus();
        // Replace searchTerm
        let symbol = this.config.triggers[this.taggingMode];
        this.basicNote = this.replaceLastOccurrence(this.basicNote, this.searchTerm, `${symbol}${selected.label}`);
        // Reset search term
        this.searchTerm = null;

        // Add the references
        this.model.references = this.model.references || {};
        this.model.references[taggingMode] = this.model.references[taggingMode] || [];
        this.model.references[taggingMode].push(selected);

        // Update the formatted note
        this.updateFormattedNote(this.basicNote);
        // Propagate change to ngModel
        this.onModelChange({ note: this.formattedNote, references: this.model.references });
    }

    replaceLastOccurrence(value, key, replaceValue) {
        let index = value.lastIndexOf(key);
        if (index >= 0) {
            return value.substring(0, index) + replaceValue + value.substring(index + key.length);
        }
        return value.toString();
    }

    // Set touched on blur
    onTouched(event?: any) {
        this.blur.emit(event);
        this.onModelTouched();
    }

    writeValue(model: any): void {
        if (model && (model.references || model.note)) {
            this.model = {
                note: model.note || '',
                references: model.references || {}
            };
        } else {
            this.model = {
                note: model,
                references: {}
            };
        }
        // Update formatted note for the initial value
        if (!this.basicNote) {
            this.updateFormattedNote(this.model.note);
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}
