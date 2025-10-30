import { AfterViewInit, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentUtils } from 'novo-elements/services';
import { OutsideClick } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class QuickNoteElement extends OutsideClick implements OnInit, OnDestroy, AfterViewInit {
    private zone;
    private componentUtils;
    wrapper: ElementRef;
    host: ElementRef;
    results: ViewContainerRef;
    config: any;
    startupFocus: boolean;
    placeholder: string;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    change: EventEmitter<any>;
    private resultsComponent;
    private quickNoteResults;
    private isTagging;
    private taggingMode;
    private model;
    private ckeInstance;
    private debounceTimeout;
    private placeholderVisible;
    private _placeholderElement;
    private static TOOLBAR_HEIGHT;
    private onModelChange;
    private onModelTouched;
    constructor(zone: NgZone, element: ElementRef, componentUtils: ComponentUtils);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Connect to key/mouse events from CKEditor after the editor has been initialized
     */
    ngAfterViewInit(): void;
    onTouched(event?: any): void;
    /**
     * Handles setting the model and the view from the outside caller or the user's typing
     *
     * @param model A model that has a note (html content) and references (array of objects)
     */
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    /**
     * If a renderer is not provided, the QuickNote will default to using this one, an anchor tag with no href
     */
    private static defaultRenderer;
    /**
     * Returns the renderer for a given tagging mode if it exists in the config, otherwise the default.
     */
    private getRenderer;
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
    private onKey;
    /**
     * Debounced method that is run in the proper Angular context when the user has modified the CKEditor.
     * After the value has been updated in CKEditor, this will propagate that change to the model and listeners.
     */
    private onValueChange;
    /**
     * Creates an instance of the results (called popup) and adds all the bindings to that instance.
     */
    private showResults;
    /**
     * Deletes the picker results from the DOM.
     */
    private hideResults;
    /**
     * Handles the selection from the QuickNoteResults Component. Called by the QuickNoteResults component on it's
     * parent (this element).
     *
     * @param taggingMode - type of tags we are looking for
     * @param selected - selected object from the picker that has a label and value
     */
    private onSelected;
    /**
     * Convenience method that gets the current word that the cursor is on, minus the tag.
     * Also, trims any whitespace before/after the term to aid in searching.
     */
    private getSearchTerm;
    /**
     * Gets the current word that the cursor is on CKEditor. Current word starts at the beginning of the line or a
     * tag character if we are in tagging mode. Current word ends at the end of the line or an empty space.
     *
     * @returns plain text string (removes all html formatting)
     */
    private getWordAtCursor;
    /**
     * Replaces the word that the user is on with the given html.
     *
     * CKEditor gives us access to the current line of html in the editor, so we replace the content of
     * the line, replacing only the current word.
     */
    private replaceWordAtCursor;
    /**
     * Returns current references, minus any from the model that have been removed from the editor.
     */
    private validateReferences;
    /**
     * Configures the CKEditor for QuickNote functionality.
     *
     * Sets the height of the CKEditor dynamically to the height of the wrapper upon initialization.
     * Removes the toolbar on the bottom and configures a slimmed down version of the toolbar.
     * Removes plugins and turns off setting to allow browser based spell checking.
     */
    private getCKEditorConfig;
    /**
     * Returns the current screen position of the cursor in CKEditor, accounting for any scrolling in the editor.
     */
    private getCursorPosition;
    /**
     * Positions the results dropdown based on the location of the cursor in the text field
     */
    private positionResultsDropdown;
    /**
     * Returns the height in pixels of the content area - the text that the user has entered.
     */
    private getContentHeight;
    /**
     * Show the placeholder text if the editor is empty
     */
    private showPlaceholder;
    /**
     * Hide the placeholder text by removing the placeholder element from the DOM
     */
    private hidePlaceholder;
    /**
     * Get or create the single placeholder object that is constructed only when needed.
     */
    private get placeholderElement();
    static ɵfac: i0.ɵɵFactoryDeclaration<QuickNoteElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QuickNoteElement, "novo-quick-note", never, { "config": { "alias": "config"; "required": false; }; "startupFocus": { "alias": "startupFocus"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; }, { "focus": "focus"; "blur": "blur"; "change": "change"; }, never, never, false, never>;
}
