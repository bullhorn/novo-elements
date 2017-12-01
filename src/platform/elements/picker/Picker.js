"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// Vendor
var Observable_1 = require("rxjs/Observable");
var coercion_1 = require("@angular/cdk/coercion");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var KeyCodes_1 = require("../../utils/key-codes/KeyCodes");
var PickerResults_1 = require("./extras/picker-results/PickerResults");
var ComponentUtils_1 = require("../../utils/component-utils/ComponentUtils");
var Helpers_1 = require("../../utils/Helpers");
var Overlay_1 = require("../overlay/Overlay");
// Value accessor for the component (supports ngModel)
var PICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoPickerElement; }),
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
var NovoPickerElement = (function () {
    function NovoPickerElement(element, componentUtils, ref) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.ref = ref;
        this.closeOnSelect = true;
        this.selected = [];
        // Deprecated
        this.appendToBody = false;
        // Deprecated
        this.parentScrollAction = 'close';
        // Side the dropdown will open
        this.side = 'left';
        // Autoselects the first option in the results
        this.autoSelectFirstOption = true;
        this._disablePickerInput = false;
        // Emitter for selects
        this.changed = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.typing = new core_1.EventEmitter();
        this.isStatic = true;
        this.term = '';
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Object.defineProperty(NovoPickerElement.prototype, "disablePickerInput", {
        get: function () {
            return this._disablePickerInput;
        },
        // Disable from typing into the picker (result template does everything)
        set: function (v) {
            this._disablePickerInput = coercion_1.coerceBooleanProperty(v);
        },
        enumerable: true,
        configurable: true
    });
    NovoPickerElement.prototype.ngOnInit = function () {
        var _this = this;
        if (this.overrideElement) {
            this.element = this.overrideElement;
        }
        if (this.appendToBody) {
            console.warn("'appendToBody' has been deprecated. Please remove this attribute.");
        }
        // Custom results template
        this.resultsComponent = this.config.resultsTemplate || PickerResults_1.PickerResults;
        // Get all distinct key up events from the input and only fire if long enough and distinct
        //let input = this.element.nativeElement.querySelector('input');
        var pasteObserver = Observable_1.Observable.fromEvent(this.input.nativeElement, 'paste')
            .debounceTime(250)
            .distinctUntilChanged();
        pasteObserver.subscribe(function (event) { return _this.onDebouncedKeyup(event); }, function (err) { return _this.hideResults(err); });
        var keyboardObserver = Observable_1.Observable.fromEvent(this.input.nativeElement, 'keyup')
            .debounceTime(250)
            .distinctUntilChanged();
        keyboardObserver.subscribe(function (event) { return _this.onDebouncedKeyup(event); }, function (err) { return _this.hideResults(err); });
    };
    NovoPickerElement.prototype.onDebouncedKeyup = function (event) {
        if ([KeyCodes_1.KeyCodes.ESC, KeyCodes_1.KeyCodes.UP, KeyCodes_1.KeyCodes.DOWN, KeyCodes_1.KeyCodes.ENTER, KeyCodes_1.KeyCodes.TAB].includes(event['keyCode'])) {
            return;
        }
        this.show(event.target.value);
    };
    /** BEGIN: Convienient Panel Methods. */
    NovoPickerElement.prototype.openPanel = function () {
        this.container.openPanel();
    };
    NovoPickerElement.prototype.closePanel = function () {
        this.container.closePanel();
    };
    Object.defineProperty(NovoPickerElement.prototype, "panelOpen", {
        get: function () {
            return this.container && this.container.panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    /** END: Convienient Panel Methods. */
    NovoPickerElement.prototype.show = function (term) {
        this.openPanel();
        // Show the results inside
        this.showResults(term);
    };
    NovoPickerElement.prototype.hide = function () {
        this.closePanel();
        this.ref.markForCheck();
    };
    NovoPickerElement.prototype.onKeyDown = function (event) {
        if (this.disablePickerInput) {
            Helpers_1.Helpers.swallowEvent(event);
        }
        if (this.panelOpen && !this.disablePickerInput) {
            if (event.keyCode === KeyCodes_1.KeyCodes.ESC || event.keyCode === KeyCodes_1.KeyCodes.TAB) {
                this.hideResults();
                return;
            }
            if (event.keyCode === KeyCodes_1.KeyCodes.UP) {
                this.popup.instance.prevActiveMatch();
                this.ref.markForCheck();
                return;
            }
            if (event.keyCode === KeyCodes_1.KeyCodes.DOWN) {
                this.popup.instance.nextActiveMatch();
                this.ref.markForCheck();
                return;
            }
            if (event.keyCode === KeyCodes_1.KeyCodes.ENTER) {
                this.popup.instance.selectActiveMatch();
                this.ref.markForCheck();
                return;
            }
            if (event.keyCode === KeyCodes_1.KeyCodes.BACKSPACE && !Helpers_1.Helpers.isBlank(this._value)) {
                this.clearValue(false);
                this.closePanel();
            }
        }
    };
    NovoPickerElement.prototype.clearValue = function (wipeTerm) {
        this._value = null;
        this.select.emit(this._value);
        this.changed.emit({ value: this._value, rawValue: { label: '', value: this._value } });
        this.onModelChange(this._value);
        if (wipeTerm) {
            this.term = null;
            this.hideResults();
        }
        this.ref.markForCheck();
    };
    /**
     * @name onFocus
     * @description When the input's focus event is called this method calls the debounced function that displays the
     * results.
     */
    NovoPickerElement.prototype.onFocus = function (event) {
        this.show();
        this.focus.emit(event);
    };
    /**
     * @name showResults
     *
     * @description This method creates an instance of the results (called popup) and adds all the bindings to that
     * instance.
     */
    NovoPickerElement.prototype.showResults = function (term) {
        // Update Matches
        if (this.popup) {
            // Update existing list or create the DOM element
            this.popup.instance.config = this.config;
            this.popup.instance.term = this.term;
            this.popup.instance.selected = this.selected;
            this.popup.instance.autoSelectFirstOption = this.autoSelectFirstOption;
            this.ref.markForCheck();
        }
        else {
            this.popup = this.componentUtils.appendNextToLocation(this.resultsComponent, this.results);
            this.popup.instance.parent = this;
            this.popup.instance.config = this.config;
            this.popup.instance.term = this.term;
            this.popup.instance.selected = this.selected;
            this.popup.instance.autoSelectFirstOption = this.autoSelectFirstOption;
            this.popup.instance.overlay = this.container._overlayRef;
            this.ref.markForCheck();
        }
    };
    /**
     * @name hideResults
     *
     * @description - This method deletes the picker results from the DOM.
     */
    NovoPickerElement.prototype.hideResults = function (err) {
        if (this.popup) {
            this.popup.destroy();
            this.popup = null;
        }
        this.hide();
    };
    Object.defineProperty(NovoPickerElement.prototype, "value", {
        // get accessor
        get: function () {
            return this._value;
        },
        // set accessor including call the onchange callback
        set: function (selected) {
            if (!selected) {
                this.term = '';
                this._value = null;
                this.onModelChange(this._value);
            }
            else if (selected.value !== this._value) {
                this.term = this.clearValueOnSelect ? '' : selected.label;
                this._value = selected.value;
                this.changed.emit({ value: selected.value, rawValue: { label: this.term, value: selected.value } });
                this.select.emit(selected);
                this.onModelChange(selected.value);
            }
            else {
                this.changed.emit({ value: selected.value, rawValue: { label: this.term, value: this._value } });
                this.select.emit(selected);
            }
            this.ref.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    // Makes sure to clear the model if the user clears the text box
    NovoPickerElement.prototype.checkTerm = function (event) {
        this.typing.emit(event);
        if (!event || !event.length) {
            this._value = null;
            this.onModelChange(this._value);
        }
        this.ref.markForCheck();
    };
    // Set touched on blur
    NovoPickerElement.prototype.onTouched = function (event) {
        this.onModelTouched();
        this.blur.emit(event);
    };
    // From ControlValueAccessor interface
    NovoPickerElement.prototype.writeValue = function (value) {
        var _this = this;
        if (this.clearValueOnSelect) {
            this.term = '';
        }
        else {
            if (typeof value === 'string') {
                this.term = value;
            }
            else if (value && value.label) {
                this.term = value.label;
            }
            else if (value && value.firstName) {
                this.term = value.firstName + " " + value.lastName;
            }
            else if (value && value.name) {
                this.term = value.name;
            }
            else if (this.config.getLabels && typeof this.config.getLabels === 'function') {
                this.config.getLabels(value).then(function (result) {
                    if (result) {
                        _this.term = result.label || '';
                    }
                    else {
                        _this.term = value;
                    }
                });
            }
            else {
                this.term = value || '';
            }
        }
        this._value = value;
        this.ref.markForCheck();
    };
    NovoPickerElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoPickerElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    return NovoPickerElement;
}());
NovoPickerElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-picker',
                providers: [PICKER_VALUE_ACCESSOR],
                template: "\n        <i class=\"bhi-more\" *ngIf=\"config?.entityIcon && !_value\"></i>\n        <i class=\"bhi-{{ config?.entityIcon }} entity-icon {{ config?.entityIcon }}\" *ngIf=\"config?.entityIcon && _value\"></i>\n        <input\n            type=\"text\"\n            [(ngModel)]=\"term\"\n            [class.entity-picker]=\"config.entityIcon\"\n            [class.entity-selected]=\"config?.entityIcon && _value\"\n            (ngModelChange)=\"checkTerm($event)\"\n            [placeholder]=\"placeholder\"\n            (keydown)=\"onKeyDown($event)\"\n            (focus)=\"onFocus($event)\"\n            (click)=\"onFocus($event)\"\n            (blur)=\"onTouched($event)\"\n            autocomplete=\"off\" #input />\n        <i class=\"bhi-search\" *ngIf=\"!_value || clearValueOnSelect\"></i>\n        <i class=\"bhi-times\" [class.entity-selected]=\"config?.entityIcon && _value\" *ngIf=\"_value && !clearValueOnSelect\" (click)=\"clearValue(true)\"></i>\n        <novo-overlay-template class=\"picker-results-container\" [parent]=\"element\">\n            <span #results></span>\n            <ng-content></ng-content>\n        </novo-overlay-template>\n    "
            },] },
];
/** @nocollapse */
NovoPickerElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: ComponentUtils_1.ComponentUtils, },
    { type: core_1.ChangeDetectorRef, },
]; };
NovoPickerElement.propDecorators = {
    'results': [{ type: core_1.ViewChild, args: ['results', { read: core_1.ViewContainerRef },] },],
    'config': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'clearValueOnSelect': [{ type: core_1.Input },],
    'closeOnSelect': [{ type: core_1.Input },],
    'selected': [{ type: core_1.Input },],
    'appendToBody': [{ type: core_1.Input },],
    'parentScrollSelector': [{ type: core_1.Input },],
    'parentScrollAction': [{ type: core_1.Input },],
    'containerClass': [{ type: core_1.Input },],
    'side': [{ type: core_1.Input },],
    'autoSelectFirstOption': [{ type: core_1.Input },],
    'overrideElement': [{ type: core_1.Input },],
    'disablePickerInput': [{ type: core_1.Input },],
    'changed': [{ type: core_1.Output },],
    'select': [{ type: core_1.Output },],
    'focus': [{ type: core_1.Output },],
    'blur': [{ type: core_1.Output },],
    'typing': [{ type: core_1.Output },],
    'container': [{ type: core_1.ViewChild, args: [Overlay_1.NovoOverlayTemplate,] },],
    'input': [{ type: core_1.ViewChild, args: ['input',] },],
};
exports.NovoPickerElement = NovoPickerElement;
//# sourceMappingURL=Picker.js.map