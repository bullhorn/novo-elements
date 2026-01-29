import * as i0 from '@angular/core';
import { Component, forwardRef, EventEmitter, ViewContainerRef, Output, Input, ViewChild, NgModule } from '@angular/core';
import { from } from 'rxjs';
import * as i1 from 'novo-elements/services';
import { Helpers, OutsideClick } from 'novo-elements/utils';
import { PickerResults } from 'novo-elements/elements/picker';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from 'novo-elements/elements/loading';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import * as i4 from 'novo-elements/elements/list';
import { NovoListModule } from 'novo-elements/elements/list';
import * as i5 from 'novo-elements/pipes';
import { NovoPipesModule } from 'novo-elements/pipes';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

// NG2
class QuickNoteResults extends PickerResults {
    constructor(element, labels, ref) {
        super(element, labels, ref);
        this.labels = labels;
        // Mode that the quick note is in for tagging
        this.taggingMode = '';
    }
    get term() {
        return this._term;
    }
    set term(value) {
        this._term = value.searchTerm;
        this.taggingMode = value.taggingMode;
        this.hasError = false;
        this.isLoading = true;
        this.search(value, this.taggingMode).subscribe((results) => {
            this.matches = this.isStatic ? this.filterData(results) : results;
            this.isLoading = false;
        }, () => {
            this.hasError = true;
            this.isLoading = false;
        });
    }
    search(term, taggingMode) {
        const searchCall = this.config.options[taggingMode];
        return from(new Promise((resolve, reject) => {
            // Check if there is match data
            if (searchCall) {
                // Resolve the data
                if (Array.isArray(searchCall)) {
                    this.isStatic = true;
                    // Arrays are returned immediately
                    resolve(this.structureArray(searchCall));
                }
                else if ((searchCall.hasOwnProperty('reject') && searchCall.hasOwnProperty('resolve')) ||
                    Object.getPrototypeOf(searchCall).hasOwnProperty('then')) {
                    this.isStatic = false;
                    // Promises (ES6 or Deferred) are resolved whenever they resolve
                    searchCall.then(this.structureArray.bind(this)).then(resolve, reject);
                }
                else if (typeof searchCall === 'function') {
                    this.isStatic = false;
                    // Promises (ES6 or Deferred) are resolved whenever they resolve
                    searchCall(term).then(this.structureArray.bind(this)).then(resolve, reject);
                }
                else {
                    // All other kinds of data are rejected
                    reject('The data provided is not an array or a promise');
                    throw new Error('The data provided is not an array or a promise');
                }
            }
            else {
                // No data gets rejected
                reject('error');
            }
        }));
    }
    /**
     * @name structureArray
     * @param collection - the data once getData resolves it
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection) {
        if (collection && (typeof collection[0] === 'string' || typeof collection[0] === 'number')) {
            return collection.map((item) => {
                return {
                    value: item,
                    label: item,
                };
            });
        }
        return collection.map((data) => {
            const value = this.config.field ? data[this.config.field[this.taggingMode]] : data.value || data;
            const label = this.config.format ? Helpers.interpolate(this.config.format[this.taggingMode], data) : data.label || String(value);
            return { value, label, data };
        });
    }
    /**
     * @name selectMatch
     * @param event
     *
     * @description
     */
    selectMatch(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        const selected = this.activeMatch;
        if (selected) {
            this.parent.onSelected(this.taggingMode, selected);
            this.parent.hideResults();
        }
        return false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: QuickNoteResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: QuickNoteResults, isStandalone: false, selector: "quick-note-results", host: { classAttribute: "active" }, usesInheritance: true, ngImport: i0, template: `
    <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
    <novo-list *ngIf="matches.length > 0">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
      >
        <item-content>
          <p [innerHtml]="match.label | highlight:term"></p>
        </item-content>
      </novo-list-item>
    </novo-list>
    <p class="picker-error" *ngIf="hasError">{{ labels.quickNoteError }}</p>
    <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.quickNoteEmpty }}</p>
  `, isInline: true, styles: [":host{position:absolute;z-index:z(overlay);box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;top:0;left:0;right:0;max-width:100%;min-width:100%;align-items:center;display:flex;justify-content:center;padding:0!important;border:none!important}:host novo-list{box-shadow:none}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i4.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { kind: "component", type: i4.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { kind: "component", type: i4.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { kind: "pipe", type: i5.HighlightPipe, name: "highlight" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: QuickNoteResults, decorators: [{
            type: Component,
            args: [{ selector: 'quick-note-results', host: {
                        class: 'active',
                    }, template: `
    <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
    <novo-list *ngIf="matches.length > 0">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
      >
        <item-content>
          <p [innerHtml]="match.label | highlight:term"></p>
        </item-content>
      </novo-list-item>
    </novo-list>
    <p class="picker-error" *ngIf="hasError">{{ labels.quickNoteError }}</p>
    <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.quickNoteEmpty }}</p>
  `, standalone: false, styles: [":host{position:absolute;z-index:z(overlay);box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;top:0;left:0;right:0;max-width:100%;min-width:100%;align-items:center;display:flex;justify-content:center;padding:0!important;border:none!important}:host novo-list{box-shadow:none}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }] });

// NG2
// Value accessor for the component (supports ngModel)
const QUICK_NOTE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QuickNoteElement),
    multi: true,
};
class QuickNoteElement extends OutsideClick {
    static { this.TOOLBAR_HEIGHT = 40; } // in pixels - configured by stylesheet
    constructor(zone, element, componentUtils) {
        super(element);
        this.zone = zone;
        this.componentUtils = componentUtils;
        this.startupFocus = false;
        // Emitter for selects
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.change = new EventEmitter();
        this.placeholderVisible = false;
        this._placeholderElement = null;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        // Bind to the active change event from the OutsideClick
        this.onActiveChange.subscribe((active) => {
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
        // Make sure that we have options
        if (!this.config.options) {
            throw new Error('QuickNote config must supply options!');
        }
        // Allow for callers to use a custom results template class in the config
        this.resultsComponent = this.config.resultsTemplate || QuickNoteResults;
    }
    ngOnDestroy() {
        // Tear down the CKEditor instance
        if (this.ckeInstance) {
            this.ckeInstance.focusManager.blur(true); // Remove focus from editor
            setTimeout(() => {
                this.ckeInstance.removeAllListeners();
                CKEDITOR.instances[this.ckeInstance.name].destroy();
                this.ckeInstance.destroy();
                this.ckeInstance = null;
            });
        }
    }
    /**
     * Connect to key/mouse events from CKEditor after the editor has been initialized
     */
    ngAfterViewInit() {
        if (!CKEDITOR) {
            console.error('Make sure to include CKEditor sources in your dependencies!');
            return;
        }
        // Replace the textarea with an instance of CKEditor
        this.ckeInstance = CKEDITOR.replace(this.host.nativeElement, this.getCKEditorConfig());
        // Set initial value of the note in the editor
        this.writeValue(this.model);
        // Connect to the key event in CKEditor for showing results dropdown
        this.ckeInstance.on('key', (event) => {
            if (!this.onKey(event.data.domEvent.$)) {
                event.cancel();
            }
        });
        // Connect to the change event in CKEditor for debouncing user modifications
        this.ckeInstance.on('change', () => {
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
        this.ckeInstance.on('blur', (event) => {
            this.showPlaceholder();
            this.blur.emit(event);
        });
        // Propagate blur events from CKEditor to the Element's listeners
        this.ckeInstance.on('focus', (event) => {
            this.hidePlaceholder();
            this.focus.emit(event);
        });
        // Show placeholder if the note is empty, after the editor is instantiated
        this.ckeInstance.on('instanceReady', (event) => {
            this.showPlaceholder();
            // Set editor to readOnly
            if (this.config.readOnly) {
                this.ckeInstance.setReadOnly(this.config.readOnly);
            }
        });
    }
    // Set touched on blur
    onTouched(event) {
        this.onModelTouched();
    }
    /**
     * Handles setting the model and the view from the outside caller or the user's typing
     *
     * @param model A model that has a note (html content) and references (array of objects)
     */
    writeValue(model) {
        // Set value of the model
        if (model && (model.references || model.note)) {
            this.model = {
                note: model.note || '',
                references: model.references || {},
            };
        }
        else {
            this.model = {
                note: model,
                references: {},
            };
        }
        // Set the note html value in the editor
        if (this.ckeInstance) {
            this.ckeInstance.setData(this.model.note);
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    /**
     * If a renderer is not provided, the QuickNote will default to using this one, an anchor tag with no href
     */
    static defaultRenderer(symbol, item) {
        return `<a>${symbol}${item.label}</a>`;
    }
    /**
     * Returns the renderer for a given tagging mode if it exists in the config, otherwise the default.
     */
    getRenderer(taggingMode) {
        return this.config.renderer ? this.config.renderer[taggingMode] : QuickNoteElement.defaultRenderer;
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
    onKey(event) {
        if (event.key) {
            if (this.quickNoteResults) {
                // Hide results on escape key
                if (event.key === "Escape" /* Key.Escape */) {
                    this.zone.run(() => {
                        this.hideResults();
                    });
                    return false;
                }
                // Navigation inside the results
                if (event.key === "ArrowUp" /* Key.ArrowUp */) {
                    this.zone.run(() => {
                        this.quickNoteResults.instance.prevActiveMatch();
                    });
                    return false;
                }
                if (event.key === "ArrowDown" /* Key.ArrowDown */) {
                    this.zone.run(() => {
                        this.quickNoteResults.instance.nextActiveMatch();
                    });
                    return false;
                }
                if (event.key === "Enter" /* Key.Enter */) {
                    this.zone.run(() => {
                        this.quickNoteResults.instance.selectActiveMatch();
                    });
                    return false;
                }
            }
            else {
                // Loop through all triggers and turn on tagging mode if the user just pressed a trigger character
                const triggers = this.config.triggers || {};
                Object.keys(triggers).forEach((key) => {
                    const trigger = triggers[key] || {};
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
    onValueChange() {
        // Get the html text in CKEditor
        let value = this.ckeInstance.getData();
        // Remove empty 'ZERO WIDTH SPACE' characters that can get added erroneously by the editor
        const regex = new RegExp(String.fromCharCode(8203), 'g');
        value = value.replace(regex, '');
        // Make sure that any references in the model are still valid
        this.validateReferences();
        // Possibly show results if the user has entered a search term
        this.showResults();
        // Propagate change to ngModel for form validation, and send null if the note is empty
        let newModel = null;
        if (value) {
            newModel = {
                note: value,
                references: this.model.references,
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
    showResults() {
        if (this.isTagging) {
            const searchTerm = this.getSearchTerm();
            if (searchTerm.length) {
                // Update Matches
                if (this.quickNoteResults) {
                    // Update existing list
                    this.quickNoteResults.instance.term = {
                        searchTerm,
                        taggingMode: this.taggingMode,
                    };
                }
                else {
                    // Create the results DOM element
                    this.quickNoteResults = this.componentUtils.append(this.resultsComponent, this.results);
                    this.quickNoteResults.instance.parent = this;
                    this.quickNoteResults.instance.config = this.config;
                    this.quickNoteResults.instance.term = {
                        searchTerm,
                        taggingMode: this.taggingMode,
                    };
                    this.positionResultsDropdown();
                }
            }
            else if (this.quickNoteResults) {
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
    hideResults() {
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
    onSelected(taggingMode, selected) {
        // Turn off tagging
        this.isTagging = false;
        // Replace searchTerm with link
        const symbol = this.config.triggers[taggingMode];
        const renderer = this.getRenderer(taggingMode);
        const renderedText = renderer(symbol, selected);
        this.replaceWordAtCursor(renderedText);
        // Add the new reference, if it doesn't already exist
        this.model.references = this.model.references || {};
        this.model.references[taggingMode] = this.model.references[taggingMode] || [];
        const matchingItems = this.model.references[taggingMode].filter((item) => JSON.stringify(item) === JSON.stringify(selected));
        if (matchingItems.length === 0) {
            this.model.references[taggingMode].push(selected);
        }
        // Update the quick note with the changes due to the user's selection of an item in the dropdown
        this.onValueChange();
    }
    /**
     * Convenience method that gets the current word that the cursor is on, minus the tag.
     * Also, trims any whitespace before/after the term to aid in searching.
     */
    getSearchTerm() {
        let word = this.getWordAtCursor().trim();
        if (this.isTagging) {
            const symbol = this.config.triggers[this.taggingMode];
            if (!word.includes(symbol)) {
                this.hideResults();
                return '';
            }
            word = word.slice(word.indexOf(symbol) + symbol.length);
        }
        return word;
    }
    /**
     * Gets the current word that the cursor is on CKEditor. Current word starts at the beginning of the line or a
     * tag character if we are in tagging mode. Current word ends at the end of the line or an empty space.
     *
     * @returns plain text string (removes all html formatting)
     */
    getWordAtCursor() {
        const range = this.ckeInstance.getSelection().getRanges()[0];
        const start = range.startContainer;
        if (start.type === CKEDITOR.NODE_TEXT && range.startOffset) {
            const text = start.getText();
            const symbol = this.config.triggers[this.taggingMode];
            let wordStart = text.lastIndexOf(symbol, range.startOffset - 1);
            if (wordStart > 0) {
                const beforeSymbol = text.charAt(wordStart - 1);
                // We don't want to trigger the lookup call unless the symbol was preceded by whitespace
                if (beforeSymbol !== '\u200B' && /\S/.test(beforeSymbol)) {
                    return '';
                }
            }
            else if (start.hasPrevious() && /\S$/.test(start.getPrevious().getText())) {
                // When wordStart is <= 0, we need to check the previous node's text to see if it ended with whitespace or not
                return '';
            }
            let wordEnd = text.indexOf(' ', range.startOffset + 1);
            if (wordStart === -1) {
                wordStart = 0;
            }
            if (wordEnd === -1) {
                wordEnd = text.length;
            }
            return text.substring(wordStart, wordEnd);
        }
        // Selection starts at the 0 index of the text node or there's no previous text node in contents
        return '';
    }
    /**
     * Replaces the word that the user is on with the given html.
     *
     * CKEditor gives us access to the current line of html in the editor, so we replace the content of
     * the line, replacing only the current word.
     */
    replaceWordAtCursor(newWord) {
        const originalWord = this.getWordAtCursor().trim();
        const range = this.ckeInstance.getSelection().getRanges()[0];
        const start = range.startContainer;
        const parentNode = start.getParent();
        if (start.type === CKEDITOR.NODE_TEXT && parentNode) {
            const line = parentNode.getHtml();
            const index = line.lastIndexOf(originalWord);
            if (index >= 0) {
                // Add a space after the replaced word so that multiple references can be added back to back
                const newLine = line.substring(0, index) + newWord + ' ' + line.substring(index + originalWord.length);
                parentNode.setHtml(newLine);
                // Place selection at the end of the line
                range.moveToPosition(parentNode, CKEDITOR.POSITION_BEFORE_END);
                this.ckeInstance.getSelection().selectRanges([range]);
            }
        }
    }
    /**
     * Returns current references, minus any from the model that have been removed from the editor.
     */
    validateReferences() {
        let html = this.ckeInstance.document.getBody().getHtml();
        // CKEditor stopped supporting the config.forceSimpleAmpersand setting, so we have to convert '&amp;' to '&'
        // when we pull html from the editor - see: https://dev.ckeditor.com/ticket/13723
        const ampRegex = new RegExp('&amp;', 'g');
        html = html.replace(ampRegex, '&');
        Object.keys(this.model.references).forEach((taggingMode) => {
            const array = this.model.references[taggingMode] || [];
            const symbol = this.config.triggers[taggingMode];
            const renderer = this.getRenderer(taggingMode);
            this.model.references[taggingMode] = array.filter((item) => {
                const renderedText = renderer(symbol, item);
                return html.includes(renderedText);
            });
            // If no references, then delete the key
            if (this.model.references[taggingMode].length === 0) {
                delete this.model.references[taggingMode];
            }
        });
    }
    /**
     * Configures the CKEditor for QuickNote functionality.
     *
     * Sets the height of the CKEditor dynamically to the height of the wrapper upon initialization.
     * Removes the toolbar on the bottom and configures a slimmed down version of the toolbar.
     * Removes plugins and turns off setting to allow browser based spell checking.
     */
    getCKEditorConfig() {
        // Use the height of the wrapper element to set the initial height of the editor, then
        // set it to 100% to allow the editor to resize using the grippy.
        const editorHeight = this.wrapper.nativeElement.clientHeight - QuickNoteElement.TOOLBAR_HEIGHT;
        this.wrapper.nativeElement.style.setProperty('height', '100%');
        return {
            enterMode: CKEDITOR.ENTER_BR,
            shiftEnterMode: CKEDITOR.ENTER_P,
            disableNativeSpellChecker: false,
            height: editorHeight,
            startupFocus: this.startupFocus,
            removePlugins: 'liststyle,tabletools,contextmenu,tableselection', // allows browser based spell checking
            toolbar: [
                {
                    name: 'basicstyles',
                    items: [
                        'Styles',
                        'FontSize',
                        'Bold',
                        'Italic',
                        'Underline',
                        'TextColor',
                        '-',
                        'NumberedList',
                        'BulletedList',
                        'Outdent',
                        'Indent',
                        'Link',
                    ],
                },
            ],
        };
    }
    /**
     * Returns the current screen position of the cursor in CKEditor, accounting for any scrolling in the editor.
     */
    getCursorPosition() {
        const range = this.ckeInstance.getSelection().getRanges()[0];
        const parentElement = range.startContainer.$.parentElement;
        const editorElement = this.ckeInstance.editable().$;
        // Since the editor is a text node in the DOM that does not know about it's position, a temporary element has to
        // be inserted in order to locate the cursor position.
        const cursorElement = document.createElement('img');
        cursorElement.setAttribute('src', 'null');
        cursorElement.setAttribute('width', '0');
        cursorElement.setAttribute('height', '0');
        parentElement.appendChild(cursorElement);
        const cursorPosition = {
            top: cursorElement.offsetTop - editorElement.scrollTop,
            left: cursorElement.offsetLeft - editorElement.scrollLeft,
        };
        cursorElement.remove();
        return cursorPosition;
    }
    /**
     * Positions the results dropdown based on the location of the cursor in the text field
     */
    positionResultsDropdown() {
        const MIN_MARGIN_TOP = QuickNoteElement.TOOLBAR_HEIGHT * 2;
        const MAX_MARGIN_TOP = this.getContentHeight() + QuickNoteElement.TOOLBAR_HEIGHT;
        const cursorPosition = this.getCursorPosition();
        let marginTop = cursorPosition.top + QuickNoteElement.TOOLBAR_HEIGHT;
        // Check that the margin is within the visible bounds
        marginTop = Math.max(marginTop, MIN_MARGIN_TOP);
        marginTop = Math.min(marginTop, MAX_MARGIN_TOP);
        // Set the margin-top of the dropdown
        this.quickNoteResults.instance.element.nativeElement.style.setProperty('margin-top', marginTop + 'px');
    }
    /**
     * Returns the height in pixels of the content area - the text that the user has entered.
     */
    getContentHeight() {
        let contentHeight = 0;
        if (this.ckeInstance.ui &&
            this.ckeInstance.ui.contentsElement &&
            this.ckeInstance.ui.contentsElement.$ &&
            this.ckeInstance.ui.contentsElement.$.style) {
            const cssText = this.ckeInstance.ui.contentsElement.$.style.cssText;
            if (cssText.indexOf('height: ') !== -1) {
                let height = cssText.split('height: ')[1];
                height = height.split('px')[0];
                contentHeight = parseInt(height, 10);
            }
        }
        return contentHeight;
    }
    /**
     * Show the placeholder text if the editor is empty
     */
    showPlaceholder() {
        if (!this.ckeInstance.getData() && !this.startupFocus) {
            this.ckeInstance.editable().getParent().$.appendChild(this.placeholderElement);
            this.placeholderVisible = true;
        }
    }
    /**
     * Hide the placeholder text by removing the placeholder element from the DOM
     */
    hidePlaceholder() {
        if (this.placeholderVisible) {
            this.ckeInstance.editable().getParent().$.removeChild(this.placeholderElement);
            this.placeholderVisible = false;
        }
    }
    /**
     * Get or create the single placeholder object that is constructed only when needed.
     */
    get placeholderElement() {
        if (!this._placeholderElement) {
            this._placeholderElement = document.createElement('div');
            this._placeholderElement.className = 'placeholder';
            this._placeholderElement.style.cssText =
                'margin: 20px; color: #AAAAAA; font-family: sans-serif; font-size: 13px; line-height: 20px; position: absolute; top: 0; pointer-events: none';
            this._placeholderElement.textContent = this.placeholder;
        }
        return this._placeholderElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: QuickNoteElement, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i1.ComponentUtils }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: QuickNoteElement, isStandalone: false, selector: "novo-quick-note", inputs: { config: "config", startupFocus: "startupFocus", placeholder: "placeholder" }, outputs: { focus: "focus", blur: "blur", change: "change" }, providers: [QUICK_NOTE_VALUE_ACCESSOR], viewQueries: [{ propertyName: "wrapper", first: true, predicate: ["wrapper"], descendants: true, static: true }, { propertyName: "host", first: true, predicate: ["host"], descendants: true, static: true }, { propertyName: "results", first: true, predicate: ["results"], descendants: true, read: ViewContainerRef, static: true }], usesInheritance: true, ngImport: i0, template: ' <div class="quick-note-wrapper" #wrapper><textarea #host></textarea> <span #results></span></div> ', isInline: true, styles: [":host,.quick-note-wrapper{width:100%;height:200px;position:relative}:host ::ng-deep .cke_top,.quick-note-wrapper ::ng-deep .cke_top{padding:4px 3px 0}:host ::ng-deep .cke_top .cke_toolbar .cke_combo_text,.quick-note-wrapper ::ng-deep .cke_top .cke_toolbar .cke_combo_text{padding-left:7px}:host ::ng-deep .cke_top .cke_toolbar .cke_combo_open,.quick-note-wrapper ::ng-deep .cke_top .cke_toolbar .cke_combo_open{margin-left:4px}:host ::ng-deep .cke_top .cke_toolbar .cke_combo__fontsize .cke_combo_text,.quick-note-wrapper ::ng-deep .cke_top .cke_toolbar .cke_combo__fontsize .cke_combo_text{width:27px}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: QuickNoteElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-quick-note', providers: [QUICK_NOTE_VALUE_ACCESSOR], template: ' <div class="quick-note-wrapper" #wrapper><textarea #host></textarea> <span #results></span></div> ', standalone: false, styles: [":host,.quick-note-wrapper{width:100%;height:200px;position:relative}:host ::ng-deep .cke_top,.quick-note-wrapper ::ng-deep .cke_top{padding:4px 3px 0}:host ::ng-deep .cke_top .cke_toolbar .cke_combo_text,.quick-note-wrapper ::ng-deep .cke_top .cke_toolbar .cke_combo_text{padding-left:7px}:host ::ng-deep .cke_top .cke_toolbar .cke_combo_open,.quick-note-wrapper ::ng-deep .cke_top .cke_toolbar .cke_combo_open{margin-left:4px}:host ::ng-deep .cke_top .cke_toolbar .cke_combo__fontsize .cke_combo_text,.quick-note-wrapper ::ng-deep .cke_top .cke_toolbar .cke_combo__fontsize .cke_combo_text{width:27px}\n"] }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i1.ComponentUtils }], propDecorators: { wrapper: [{
                type: ViewChild,
                args: ['wrapper', { static: true }]
            }], host: [{
                type: ViewChild,
                args: ['host', { static: true }]
            }], results: [{
                type: ViewChild,
                args: ['results', { read: ViewContainerRef, static: true }]
            }], config: [{
                type: Input
            }], startupFocus: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], focus: [{
                type: Output
            }], blur: [{
                type: Output
            }], change: [{
                type: Output
            }] } });

// NG2
class NovoQuickNoteModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoQuickNoteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoQuickNoteModule, declarations: [QuickNoteElement, QuickNoteResults], imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule, NovoPipesModule], exports: [QuickNoteElement, QuickNoteResults] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoQuickNoteModule, imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule, NovoPipesModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoQuickNoteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule, NovoPipesModule],
                    declarations: [QuickNoteElement, QuickNoteResults],
                    exports: [QuickNoteElement, QuickNoteResults],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoQuickNoteModule, QuickNoteElement, QuickNoteResults };
//# sourceMappingURL=novo-elements-elements-quick-note.mjs.map
