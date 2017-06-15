// NG2
import { Component, EventEmitter, forwardRef, ElementRef, ViewChild, ViewContainerRef, Input, Output, OnInit, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
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

declare var CKEDITOR: any;

@Component({
    selector: 'novo-quick-note',
    providers: [QUICK_NOTE_VALUE_ACCESSOR],
    template: `
        <div class="quick-note-wrapper" #wrapper>
            <textarea #host></textarea>
            <span #results></span>
        </div>
    `
})
export class QuickNoteElement extends OutsideClick implements OnInit, OnDestroy, AfterViewInit {
    // The quick-note-wrapper that contains the text area and results
    @ViewChild('wrapper') public wrapper: ElementRef;

    // The textarea host for CKEditor
    @ViewChild('host') public host: ElementRef;

    // Picker dropdown results container
    @ViewChild('results', { read: ViewContainerRef }) results: ViewContainerRef;

    // The config object that customizes the Quick Note behavior
    @Input() config: any;

    // The placeholder text when the value in the text field is empty
    @Input() placeholder: string;

    // Emitter for selects
    @Output() focus: EventEmitter<any> = new EventEmitter();
    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();

    // The characters that the user enters in order to search for a person/thing to tag
    resultsComponent: any;
    quickNoteResults: any;
    isTagging: boolean;
    taggingMode: string;
    model: any;
    instance: any;
    debounceTimeout: any;

    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };

    constructor(private zone: NgZone, element: ElementRef, private componentUtils: ComponentUtils) {
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

    /**
     * If a renderer is not provided, the QuickNote will default to using this one, an anchor tag with no href
     */
    static defaultRenderer(symbol: string, item: any): string {
        return `<a>${symbol}${item.label}</a>`;
    }

    ngOnInit(): void {
        // Make sure we have a proper config
        if (!this.config) {
            throw new Error('No config set for QuickNote!');
        }
        // Make sure that we have triggers
        if (!this.config.triggers) {
            throw new Error('QuickNote config must supply triggers!');
        }
        // Make sure that we have options
        if (!this.config.options) {
            throw new Error('QuickNote config must supply options!');
        }
        // Allow for callers to use a custom results template class in the config
        this.resultsComponent = this.config.resultsTemplate || QuickNoteResults;
    }

    ngOnDestroy(): void {
        // Tear down the CKEditor instance
        if (this.instance) {
            setTimeout(() => {
                this.instance.removeAllListeners();
                this.instance.destroy();
                this.instance = null;
            });
        }
    }

    /**
     * Connect to key/mouse events from CKEditor after the editor has been initialized
     */
    ngAfterViewInit(): void {
        if (!CKEDITOR) {
            console.error('Make sure to include CKEditor sources in your dependencies!');
            return;
        }

        // Replace the textarea with an instance of CKEditor
        this.instance = CKEDITOR.replace(this.host.nativeElement, this.getCKEditorConfig());

        // Set initial value of the note in the editor
        this.writeValue(this.model);

        // Connect to the key event in CKEditor for showing results dropdown
        this.instance.on('key', (event: any) => {
            if (!this.onKey(event.data.domEvent.$)) {
                event.cancel();
            }
        });

        // Connect to the change event in CKEditor for debouncing user modifications
        this.instance.on('change', () => {
            // Debounce update
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }
            this.debounceTimeout = setTimeout(() => {
                // Run within the context of this angular element since we don't need to cancel event
                this.zone.run(() => {
                    this.onValueChange();
                });
                this.debounceTimeout = null;
            }, 250);
        });

        // Propagate blur events from CKEditor to the Element's listeners
        this.instance.on('blur', (event: any) => {
            this.blur.emit(event);
        });

        // Propagate blur events from CKEditor to the Element's listeners
        this.instance.on('focus', (event: any) => {
            this.focus.emit(event);
        });
    }

    /**
     * Called every time a keystroke is made in the editor. Listens for particular keys (e.g. UP arrow, ESC, etc.)
     * to handle certain behaviors of the picker.
     *
     * Runs within the context of the CKEditor, so actions that affect the view have to be run back inside of the
     * Angular zone of this class.
     *
     * @param event The key press event
     * @return true to allow the event to occur, false to cancel the event
     */
    onKey(event: KeyboardEvent): boolean {
        if (event.key) {
            if (this.quickNoteResults) {
                // Hide results on escape key
                if (event.keyCode === KeyCodes.ESC) {
                    this.zone.run(() => {
                        this.hideResults();
                    });
                    return false;
                }

                // Navigation inside the results
                if (event.keyCode === KeyCodes.UP) {
                    this.zone.run(() => {
                        this.quickNoteResults.instance.prevActiveMatch();
                    });
                    return false;
                }

                if (event.keyCode === KeyCodes.DOWN) {
                    this.zone.run(() => {
                        this.quickNoteResults.instance.nextActiveMatch();
                    });
                    return false;
                }

                if (event.keyCode === KeyCodes.ENTER) {
                    this.zone.run(() => {
                        this.quickNoteResults.instance.selectActiveMatch();
                    });
                    return false;
                }
            } else {
                // Loop through all triggers and turn on tagging mode if the user just pressed a trigger character
                let triggers = this.config.triggers || {};
                Object.keys(triggers).forEach(key => {
                    let trigger = triggers[key] || {};
                    if (event.key === trigger) {
                        this.isTagging = true;
                        this.taggingMode = key;
                    }
                });
            }
        }
        return true;
    }

    /**
     * Debounced method that is run in the proper Angular context when the user has modified the CKEditor.
     * After the value has been updated in CKEditor, this will propagate that change to the model and listeners.
     */
    onValueChange(): void {
        // Get the HTML text in CKEditor
        let value = this.instance.getData();

        // Possibly show results if the user has entered a search term
        this.showResults();

        // Propagate change to ngModel for form validation, and send null if the note is empty
        let newModel = null;
        if (value) {
            newModel = {
                note: value,
                references: this.model.references
            };
        }

        // Inform listeners to the ngModel change event that something has changed
        this.onModelChange(newModel);

        // Inform listeners of the `@Output() change` event that the model has been updated
        this.change.emit(newModel);

        // Inform listeners to the ngModel touched event that something has changed
        this.onTouched();
    }

    /**
     * Creates an instance of the results (called popup) and adds all the bindings to that instance.
     */
    showResults(): void {
        if (this.isTagging) {
            if (this.searchTerm.length) {
                // Update Matches
                if (this.quickNoteResults) {
                    // Update existing list
                    this.quickNoteResults.instance.term = {
                        searchTerm: this.searchTerm,
                        taggingMode: this.taggingMode
                    };
                } else {
                    // Create the results DOM element
                    this.quickNoteResults = this.componentUtils.appendNextToLocation(this.resultsComponent, this.results);
                    this.quickNoteResults.instance.parent = this;
                    this.quickNoteResults.instance.config = this.config;
                    this.quickNoteResults.instance.term = {
                        searchTerm: this.searchTerm,
                        taggingMode: this.taggingMode
                    };
                }
            } else if (this.quickNoteResults) {
                this.quickNoteResults.destroy();
                this.quickNoteResults = null;
            }

            // Tell the OutsideClick base class to start listening for an outside clicks
            this.toggleActive(null, true);
        }
    }

    /**
     * Deletes the picker results from the DOM.
     */
    hideResults(): void {
        this.isTagging = false;
        if (this.quickNoteResults) {
            this.quickNoteResults.destroy();
            this.quickNoteResults = null;
        }
    }

    /**
     * Handles the selection from the QuickNoteResults Component. Called by the QuickNoteResults component on it's
     * parent (this element).
     *
     * @param taggingMode - type of tags we are looking for
     * @param selected - selected object from the picker that has a label and value
     */
    onSelected(taggingMode: string, selected: any): void {
        // Turn off tagging
        this.isTagging = false;

        // Replace searchTerm with link
        let symbol = this.config.triggers[taggingMode];
        let renderer = this.config.renderer ? this.config.renderer[taggingMode] : QuickNoteElement.defaultRenderer;
        let link = renderer(symbol, selected);

        this.replaceWordAtCursor(link);

        // Add the references
        this.model.references = this.model.references || {};
        this.model.references[taggingMode] = this.model.references[taggingMode] || [];
        this.model.references[taggingMode].push(selected);

        // Update the quick note with the changes due to the user's selection of an item in the dropdown
        this.onValueChange();
    }

    /**
     * Convenience method that gets the current word that the cursor is on, minus the tag.
     */
    get searchTerm(): string {
        let word = this.getWordAtCursor();
        if (this.isTagging) {
            let symbol = this.config.triggers[this.taggingMode];
            return word.slice(word.indexOf(symbol) + symbol.length);
        }
        return word;
    }

    /**
     * Gets the current word that the cursor is on CKEditor
     */
    getWordAtCursor(): string {
        let range = this.instance.getSelection().getRanges()[0];
        let start = range.startContainer;

        if (start.type === CKEDITOR.NODE_TEXT && range.startOffset) {
            let previousSpace = start.getText().lastIndexOf(' ', range.startOffset) + 1;
            let nextSpace = start.getText().indexOf(' ', range.startOffset);
            if (previousSpace === -1) {
                previousSpace = 0;
            }
            if (nextSpace === -1) {
                nextSpace = start.getText().length;
            }

            // Range at the non-zero position of a text node
            return start.getText().substring(previousSpace, nextSpace);
        }

        // Selection starts at the 0 index of the text node or there's no previous text node in contents
        return '';
    }

    /**
     * Replaces the word that the user is on with the given HTML
     */
    replaceWordAtCursor(newWord: string): void {
        let content = this.instance.getData();
        let originalWord = this.getWordAtCursor();
        let index = content.lastIndexOf(originalWord);

        if (index >= 0) {
            let newContent = content.substring(0, index) + newWord + content.substring(index + originalWord.length);

            // Just update the note, keep the same references. We can safely assume here that the model is filled out
            this.writeValue({
                note: newContent,
                references: this.model.references
            });
        }
    }

    // Set touched on blur
    onTouched(event?: any) {
        this.onModelTouched();
    }

    /**
     * Handles setting the model and the view from the outside caller or the user's typing
     *
     * @param model A model that has a note (HTML content) and references (array of objects)
     */
    writeValue(model: any): void {
        // Set value of the model
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

        // Set the note HTML value in the editor
        if (this.instance) {
            this.instance.setData(this.model.note);
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    /**
     * Configures the CKEditor for QuickNote functionality.
     *
     * Sets the height of the CKEditor dynamically to the height of the wrapper upon initialization.
     * Removes the toolbar on the bottom and configures a slimmed down version of the toolbar.
     */
    getCKEditorConfig(): any {
        let toolbarHeight = 40; // in pixels - configured by stylesheet
        let editorHeight = this.wrapper.nativeElement.clientHeight - toolbarHeight;

        return {
            scayt_autoStartup: true,
            height: editorHeight,
            removePlugins: 'elementspath', // removes the html tags in status bar
            resize_enabled: false, // hides the status bar
            toolbar: [{
                name: 'basicstyles',
                items: ['Styles', 'FontSize', 'Bold', 'Italic', 'Underline', 'TextColor', '-', 'NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Link']
            }]
        };
    }
}
