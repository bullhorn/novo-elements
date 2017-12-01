"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// APP
var OutsideClick_1 = require("./../../utils/outside-click/OutsideClick");
var KeyCodes_1 = require("./../../utils/key-codes/KeyCodes");
var QuickNoteResults_1 = require("./extras/quick-note-results/QuickNoteResults");
var ComponentUtils_1 = require("./../../utils/component-utils/ComponentUtils");
// Value accessor for the component (supports ngModel)
var QUICK_NOTE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return QuickNoteElement; }),
    multi: true
};
var QuickNoteElement = (function (_super) {
    __extends(QuickNoteElement, _super);
    function QuickNoteElement(zone, element, componentUtils) {
        var _this = _super.call(this, element) || this;
        _this.zone = zone;
        _this.componentUtils = componentUtils;
        // Emitter for selects
        _this.focus = new core_1.EventEmitter();
        _this.blur = new core_1.EventEmitter();
        _this.change = new core_1.EventEmitter();
        _this.placeholderVisible = false;
        _this._placeholderElement = null;
        _this.onModelChange = function () {
        };
        _this.onModelTouched = function () {
        };
        // Bind to the active change event from the OutsideClick
        _this.onActiveChange.subscribe(function (active) {
            if (!active) {
                setTimeout(function () {
                    _this.hideResults();
                });
            }
        });
        return _this;
    }
    QuickNoteElement.prototype.ngOnInit = function () {
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
        this.resultsComponent = this.config.resultsTemplate || QuickNoteResults_1.QuickNoteResults;
    };
    QuickNoteElement.prototype.ngOnDestroy = function () {
        var _this = this;
        // Tear down the CKEditor instance
        if (this.ckeInstance) {
            this.ckeInstance.focusManager.blur(true); // Remove focus from editor
            setTimeout(function () {
                _this.ckeInstance.removeAllListeners();
                CKEDITOR.instances[_this.ckeInstance.name].destroy();
                _this.ckeInstance.destroy();
                _this.ckeInstance = null;
            });
        }
    };
    /**
     * Connect to key/mouse events from CKEditor after the editor has been initialized
     */
    QuickNoteElement.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!CKEDITOR) {
            console.error('Make sure to include CKEditor sources in your dependencies!');
            return;
        }
        // Replace the textarea with an instance of CKEditor
        this.ckeInstance = CKEDITOR.replace(this.host.nativeElement, this.getCKEditorConfig());
        // Set initial value of the note in the editor
        this.writeValue(this.model);
        // Connect to the key event in CKEditor for showing results dropdown
        this.ckeInstance.on('key', function (event) {
            if (!_this.onKey(event.data.domEvent.$)) {
                event.cancel();
            }
        });
        // Connect to the change event in CKEditor for debouncing user modifications
        this.ckeInstance.on('change', function () {
            // Debounce update
            if (_this.debounceTimeout) {
                clearTimeout(_this.debounceTimeout);
            }
            _this.debounceTimeout = setTimeout(function () {
                // Run within the context of this angular element since we don't need to cancel event
                _this.zone.run(function () {
                    _this.onValueChange();
                });
                _this.debounceTimeout = null;
            }, 250);
        });
        // Propagate blur events from CKEditor to the Element's listeners
        this.ckeInstance.on('blur', function (event) {
            _this.showPlaceholder();
            _this.blur.emit(event);
        });
        // Propagate blur events from CKEditor to the Element's listeners
        this.ckeInstance.on('focus', function (event) {
            _this.hidePlaceholder();
            _this.focus.emit(event);
        });
        // Show placeholder if the note is empty, after the editor is instantiated
        this.ckeInstance.on('instanceReady', function (event) {
            _this.showPlaceholder();
        });
    };
    // Set touched on blur
    QuickNoteElement.prototype.onTouched = function (event) {
        this.onModelTouched();
    };
    /**
     * Handles setting the model and the view from the outside caller or the user's typing
     *
     * @param model A model that has a note (html content) and references (array of objects)
     */
    QuickNoteElement.prototype.writeValue = function (model) {
        // Set value of the model
        if (model && (model.references || model.note)) {
            this.model = {
                note: model.note || '',
                references: model.references || {}
            };
        }
        else {
            this.model = {
                note: model,
                references: {}
            };
        }
        // Set the note html value in the editor
        if (this.ckeInstance) {
            this.ckeInstance.setData(this.model.note);
        }
    };
    QuickNoteElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    QuickNoteElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    /**
     * If a renderer is not provided, the QuickNote will default to using this one, an anchor tag with no href
     */
    QuickNoteElement.defaultRenderer = function (symbol, item) {
        return "<a>" + symbol + item.label + "</a>";
    };
    /**
     * Returns the renderer for a given tagging mode if it exists in the config, otherwise the default.
     */
    QuickNoteElement.prototype.getRenderer = function (taggingMode) {
        return this.config.renderer ? this.config.renderer[taggingMode] : QuickNoteElement.defaultRenderer;
    };
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
    QuickNoteElement.prototype.onKey = function (event) {
        var _this = this;
        if (event.key) {
            if (this.quickNoteResults) {
                // Hide results on escape key
                if (event.keyCode === KeyCodes_1.KeyCodes.ESC) {
                    this.zone.run(function () {
                        _this.hideResults();
                    });
                    return false;
                }
                // Navigation inside the results
                if (event.keyCode === KeyCodes_1.KeyCodes.UP) {
                    this.zone.run(function () {
                        _this.quickNoteResults.instance.prevActiveMatch();
                    });
                    return false;
                }
                if (event.keyCode === KeyCodes_1.KeyCodes.DOWN) {
                    this.zone.run(function () {
                        _this.quickNoteResults.instance.nextActiveMatch();
                    });
                    return false;
                }
                if (event.keyCode === KeyCodes_1.KeyCodes.ENTER) {
                    this.zone.run(function () {
                        _this.quickNoteResults.instance.selectActiveMatch();
                    });
                    return false;
                }
            }
            else {
                // Loop through all triggers and turn on tagging mode if the user just pressed a trigger character
                var triggers_1 = this.config.triggers || {};
                Object.keys(triggers_1).forEach(function (key) {
                    var trigger = triggers_1[key] || {};
                    if (event.key === trigger) {
                        _this.isTagging = true;
                        _this.taggingMode = key;
                    }
                });
            }
        }
        return true;
    };
    /**
     * Debounced method that is run in the proper Angular context when the user has modified the CKEditor.
     * After the value has been updated in CKEditor, this will propagate that change to the model and listeners.
     */
    QuickNoteElement.prototype.onValueChange = function () {
        // Get the html text in CKEditor
        var value = this.ckeInstance.getData();
        // Remove empty 'ZERO WIDTH SPACE' characters that can get added erroneously by the editor
        var regex = new RegExp(String.fromCharCode(8203), 'g');
        value = value.replace(regex, '');
        // Make sure that any references in the model are still valid
        this.validateReferences();
        // Possibly show results if the user has entered a search term
        this.showResults();
        // Propagate change to ngModel for form validation, and send null if the note is empty
        var newModel = null;
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
    };
    /**
     * Creates an instance of the results (called popup) and adds all the bindings to that instance.
     */
    QuickNoteElement.prototype.showResults = function () {
        if (this.isTagging) {
            var searchTerm = this.getSearchTerm();
            if (searchTerm.length) {
                // Update Matches
                if (this.quickNoteResults) {
                    // Update existing list
                    this.quickNoteResults.instance.term = {
                        searchTerm: searchTerm,
                        taggingMode: this.taggingMode
                    };
                }
                else {
                    // Create the results DOM element
                    this.quickNoteResults = this.componentUtils.appendNextToLocation(this.resultsComponent, this.results);
                    this.quickNoteResults.instance.parent = this;
                    this.quickNoteResults.instance.config = this.config;
                    this.quickNoteResults.instance.term = {
                        searchTerm: searchTerm,
                        taggingMode: this.taggingMode
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
    };
    /**
     * Deletes the picker results from the DOM.
     */
    QuickNoteElement.prototype.hideResults = function () {
        this.isTagging = false;
        if (this.quickNoteResults) {
            this.quickNoteResults.destroy();
            this.quickNoteResults = null;
        }
    };
    /**
     * Handles the selection from the QuickNoteResults Component. Called by the QuickNoteResults component on it's
     * parent (this element).
     *
     * @param taggingMode - type of tags we are looking for
     * @param selected - selected object from the picker that has a label and value
     */
    QuickNoteElement.prototype.onSelected = function (taggingMode, selected) {
        // Turn off tagging
        this.isTagging = false;
        // Replace searchTerm with link
        var symbol = this.config.triggers[taggingMode];
        var renderer = this.getRenderer(taggingMode);
        var renderedText = renderer(symbol, selected);
        this.replaceWordAtCursor(renderedText);
        // Add the new reference, if it doesn't already exist
        this.model.references = this.model.references || {};
        this.model.references[taggingMode] = this.model.references[taggingMode] || [];
        var matchingItems = this.model.references[taggingMode].filter(function (item) { return JSON.stringify(item) === JSON.stringify(selected); });
        if (matchingItems.length === 0) {
            this.model.references[taggingMode].push(selected);
        }
        // Update the quick note with the changes due to the user's selection of an item in the dropdown
        this.onValueChange();
    };
    /**
     * Convenience method that gets the current word that the cursor is on, minus the tag.
     * Also, trims any whitespace before/after the term to aid in searching.
     */
    QuickNoteElement.prototype.getSearchTerm = function () {
        var word = this.getWordAtCursor().trim();
        if (this.isTagging) {
            var symbol = this.config.triggers[this.taggingMode];
            if (!word.includes(symbol)) {
                this.hideResults();
                return '';
            }
            word = word.slice(word.indexOf(symbol) + symbol.length);
        }
        return word;
    };
    /**
     * Gets the current word that the cursor is on CKEditor. Current word starts at the beginning of the line or a
     * tag character if we are in tagging mode. Current word ends at the end of the line or an empty space.
     *
     * @returns plain text string (removes all html formatting)
     */
    QuickNoteElement.prototype.getWordAtCursor = function () {
        var range = this.ckeInstance.getSelection().getRanges()[0];
        var start = range.startContainer;
        if (start.type === CKEDITOR.NODE_TEXT && range.startOffset) {
            var text = start.getText();
            var symbol = this.config.triggers[this.taggingMode];
            var wordStart = text.lastIndexOf(symbol, range.startOffset - 1);
            var wordEnd = text.indexOf(' ', range.startOffset + 1);
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
    };
    /**
     * Replaces the word that the user is on with the given html.
     *
     * CKEditor gives us access to the current line of html in the editor, so we replace the content of
     * the line, replacing only the current word.
     */
    QuickNoteElement.prototype.replaceWordAtCursor = function (newWord) {
        var originalWord = this.getWordAtCursor().trim();
        var range = this.ckeInstance.getSelection().getRanges()[0];
        var start = range.startContainer;
        var parentNode = start.getParent();
        if (start.type === CKEDITOR.NODE_TEXT && parentNode) {
            var line = parentNode.getHtml();
            var index = line.lastIndexOf(originalWord);
            if (index >= 0) {
                // Add a space after the replaced word so that multiple references can be added back to back
                var newLine = line.substring(0, index) + newWord + ' ' + line.substring(index + originalWord.length);
                parentNode.setHtml(newLine);
                // Place selection at the end of the line
                range.moveToPosition(parentNode, CKEDITOR.POSITION_BEFORE_END);
                this.ckeInstance.getSelection().selectRanges([range]);
            }
        }
    };
    /**
     * Returns current references, minus any from the model that have been removed from the editor.
     */
    QuickNoteElement.prototype.validateReferences = function () {
        var _this = this;
        var html = this.ckeInstance.document.getBody().getHtml();
        // CKEditor stopped supporting the config.forceSimpleAmpersand setting, so we have to convert '&amp;' to '&'
        // when we pull html from the editor - see: https://dev.ckeditor.com/ticket/13723
        var ampRegex = new RegExp('&amp;', 'g');
        html = html.replace(ampRegex, '&');
        Object.keys(this.model.references).forEach(function (taggingMode) {
            var array = _this.model.references[taggingMode] || [];
            var symbol = _this.config.triggers[taggingMode];
            var renderer = _this.getRenderer(taggingMode);
            _this.model.references[taggingMode] = array.filter(function (item) {
                var renderedText = renderer(symbol, item);
                return html.includes(renderedText);
            });
            // If no references, then delete the key
            if (_this.model.references[taggingMode].length === 0) {
                delete _this.model.references[taggingMode];
            }
        });
    };
    /**
     * Configures the CKEditor for QuickNote functionality.
     *
     * Sets the height of the CKEditor dynamically to the height of the wrapper upon initialization.
     * Removes the toolbar on the bottom and configures a slimmed down version of the toolbar.
     * Removes plugins and turns off setting to allow browser based spell checking.
     */
    QuickNoteElement.prototype.getCKEditorConfig = function () {
        var editorHeight = this.wrapper.nativeElement.clientHeight - QuickNoteElement.TOOLBAR_HEIGHT;
        return {
            enterMode: CKEDITOR.ENTER_BR,
            shiftEnterMode: CKEDITOR.ENTER_P,
            disableNativeSpellChecker: false,
            height: editorHeight,
            removePlugins: 'elementspath,liststyle,tabletools,contextmenu',
            resize_enabled: false,
            toolbar: [{
                    name: 'basicstyles',
                    items: ['Styles', 'FontSize', 'Bold', 'Italic', 'Underline', 'TextColor', '-', 'NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Link']
                }]
        };
    };
    /**
     * Returns the current screen position of the cursor in CKEditor, accounting for any scrolling in the editor.
     *
     * @returns {{top: number, left: number}}
     */
    QuickNoteElement.prototype.getCursorPosition = function () {
        var range = this.ckeInstance.getSelection().getRanges()[0];
        var parentElement = range.startContainer.$.parentElement;
        var editorElement = this.ckeInstance.editable().$;
        // Since the editor is a text node in the DOM that does not know about it's position, a temporary element has to
        // be inserted in order to locate the cursor position.
        var cursorElement = document.createElement('img');
        cursorElement.setAttribute('src', 'null');
        cursorElement.setAttribute('width', '0');
        cursorElement.setAttribute('height', '0');
        parentElement.appendChild(cursorElement);
        var cursorPosition = {
            top: cursorElement.offsetTop - editorElement.scrollTop,
            left: cursorElement.offsetLeft - editorElement.scrollLeft
        };
        cursorElement.remove();
        return cursorPosition;
    };
    /**
     * Positions the results dropdown based on the location of the cursor in the text field
     */
    QuickNoteElement.prototype.positionResultsDropdown = function () {
        var DROPDOWN_OFFSET = 30; // The distance between the cursor and the dropdown
        var MIN_MARGIN_TOP = DROPDOWN_OFFSET;
        var MAX_MARGIN_TOP = this.ckeInstance.config.height + QuickNoteElement.TOOLBAR_HEIGHT;
        var cursorPosition = this.getCursorPosition();
        var marginTop = cursorPosition.top + QuickNoteElement.TOOLBAR_HEIGHT + DROPDOWN_OFFSET;
        // Check that the margin is within the visible bounds
        marginTop = Math.max(marginTop, MIN_MARGIN_TOP);
        marginTop = Math.min(marginTop, MAX_MARGIN_TOP);
        // Set the margin-top of the dropdown
        this.quickNoteResults.instance.element.nativeElement.style.setProperty('margin-top', marginTop + 'px');
    };
    /**
     * Show the placeholder text if the editor is empty
     */
    QuickNoteElement.prototype.showPlaceholder = function () {
        if (!this.ckeInstance.getData()) {
            this.ckeInstance.editable().getParent().$.appendChild(this.placeholderElement);
            this.placeholderVisible = true;
        }
    };
    /**
     * Hide the placeholder text by removing the placeholder element from the DOM
     */
    QuickNoteElement.prototype.hidePlaceholder = function () {
        if (this.placeholderVisible) {
            this.ckeInstance.editable().getParent().$.removeChild(this.placeholderElement);
            this.placeholderVisible = false;
        }
    };
    Object.defineProperty(QuickNoteElement.prototype, "placeholderElement", {
        /**
         * Get or create the single placeholder object that is constructed only when needed.
         */
        get: function () {
            if (!this._placeholderElement) {
                this._placeholderElement = document.createElement('div');
                this._placeholderElement.className = 'placeholder';
                this._placeholderElement.style.cssText = 'margin: 20px; color: #AAAAAA; font-family: sans-serif; font-size: 13px; line-height: 20px; position: absolute; top: 0';
                this._placeholderElement.textContent = this.placeholder;
            }
            return this._placeholderElement;
        },
        enumerable: true,
        configurable: true
    });
    return QuickNoteElement;
}(OutsideClick_1.OutsideClick));
QuickNoteElement.TOOLBAR_HEIGHT = 40; // in pixels - configured by stylesheet
QuickNoteElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-quick-note',
                providers: [QUICK_NOTE_VALUE_ACCESSOR],
                template: "\n        <div class=\"quick-note-wrapper\" #wrapper>\n            <textarea #host></textarea>\n            <span #results></span>\n        </div>\n    "
            },] },
];
/** @nocollapse */
QuickNoteElement.ctorParameters = function () { return [
    { type: core_1.NgZone, },
    { type: core_1.ElementRef, },
    { type: ComponentUtils_1.ComponentUtils, },
]; };
QuickNoteElement.propDecorators = {
    'wrapper': [{ type: core_1.ViewChild, args: ['wrapper',] },],
    'host': [{ type: core_1.ViewChild, args: ['host',] },],
    'results': [{ type: core_1.ViewChild, args: ['results', { read: core_1.ViewContainerRef },] },],
    'config': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'focus': [{ type: core_1.Output },],
    'blur': [{ type: core_1.Output },],
    'change': [{ type: core_1.Output },],
};
exports.QuickNoteElement = QuickNoteElement;
//# sourceMappingURL=QuickNote.js.map