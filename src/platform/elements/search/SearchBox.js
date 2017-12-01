"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var keycodes_1 = require("@angular/cdk/keycodes");
// APP
var Overlay_1 = require("../overlay/Overlay");
var novo_label_service_1 = require("../../services/novo-label-service");
// Value accessor for the component (supports ngModel)
var SEARCH_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoSearchBoxElement; }),
    multi: true
};
var NovoSearchBoxElement = (function () {
    function NovoSearchBoxElement(element, labels, _changeDetectorRef, _zone) {
        this.element = element;
        this.labels = labels;
        this._changeDetectorRef = _changeDetectorRef;
        this._zone = _zone;
        this.icon = 'search';
        this.placeholder = 'Search...';
        this.alwaysOpen = false;
        this.theme = 'positive';
        this.closeOnSelect = true;
        this.searchChanged = new core_1.EventEmitter();
        this.focused = false;
        /** View -> model callback called when value changes */
        this._onChange = function () { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = function () { };
    }
    /**
     * @name showFasterFind
     * @description This function shows the picker and adds the active class (for animation)
     */
    NovoSearchBoxElement.prototype.showSearch = function (event, forceClose) {
        var _this = this;
        if (forceClose === void 0) { forceClose = false; }
        if (!this.panelOpen) {
            // Reset search
            // Set focus on search
            setTimeout(function () {
                var element = _this.input.nativeElement;
                if (element) {
                    element.focus();
                }
            }, 10);
        }
    };
    NovoSearchBoxElement.prototype.onFocus = function () {
        var _this = this;
        this._zone.run(function () {
            _this.focused = true;
            _this.openPanel();
        });
    };
    NovoSearchBoxElement.prototype.onBlur = function () {
        this.focused = false;
    };
    /** BEGIN: Convienient Panel Methods. */
    NovoSearchBoxElement.prototype.openPanel = function () {
        this.overlay.openPanel();
    };
    NovoSearchBoxElement.prototype.closePanel = function () {
        this.overlay.closePanel();
    };
    Object.defineProperty(NovoSearchBoxElement.prototype, "panelOpen", {
        get: function () {
            return this.overlay && this.overlay.panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoSearchBoxElement.prototype, "active", {
        get: function () {
            return this.panelOpen || this.alwaysOpen;
        },
        enumerable: true,
        configurable: true
    });
    /** END: Convienient Panel Methods. */
    NovoSearchBoxElement.prototype._handleKeydown = function (event) {
        if ((event.keyCode === keycodes_1.ESCAPE || event.keyCode === keycodes_1.ENTER || event.keyCode === keycodes_1.TAB) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
        }
    };
    NovoSearchBoxElement.prototype._handleInput = function (event) {
        var _this = this;
        if (document.activeElement === event.target) {
            this._onChange(event.target.value);
            if (this.debounceSearchChange) {
                clearTimeout(this.debounceSearchChange);
            }
            this.debounceSearchChange = setTimeout(function () {
                _this.searchChanged.emit(event.target.value);
            }, 400);
        }
    };
    NovoSearchBoxElement.prototype.writeValue = function (value) {
        this._setValue(value);
    };
    NovoSearchBoxElement.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    NovoSearchBoxElement.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    NovoSearchBoxElement.prototype._setValue = function (value) {
        this.value = value;
        var toDisplay = value;
        if (value && this.displayField) {
            toDisplay = value.hasOwnProperty(this.displayField) ? value[this.displayField] : value;
        }
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        this.displayValue = toDisplay ? toDisplay : '';
        this.input.nativeElement.value = this.displayValue;
        this._changeDetectorRef.markForCheck();
    };
    /**
    * This method closes the panel, and if a value is specified, also sets the associated
    * control to that value. It will also mark the control as dirty if this interaction
    * stemmed from the user.
    */
    NovoSearchBoxElement.prototype.setValueAndClose = function (event) {
        if (event && event.value) {
            this._setValue(event.value);
            this._onChange(event.value);
        }
        this.closePanel();
    };
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    NovoSearchBoxElement.prototype.clearValue = function (skip) {
        this.writeValue(null);
        this._onChange(null);
    };
    return NovoSearchBoxElement;
}());
NovoSearchBoxElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-search',
                providers: [SEARCH_VALUE_ACCESSOR],
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                template: "\n        <!-- SEARCH ICON -->\n        <button theme=\"fab\" [color]=\"theme\" [icon]=\"icon\" (click)=\"showSearch()\" [tooltip]=\"hint\" tooltipPosition=\"bottom\" data-automation-id=\"novo-search-fab\"></button>\n        <!-- SEARCH INPUT -->\n        <input type=\"text\" [attr.name]=\"name\" [attr.value]=\"displayValue\" [attr.placeholder]=\"placeholder\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" (keydown)=\"_handleKeydown($event)\" (input)=\"_handleInput($event)\" #input data-automation-id=\"novo-search-input\"/>\n        <!-- SEARCH OVERLAY -->\n        <novo-overlay-template [parent]=\"element\" [closeOnSelect]=\"closeOnSelect\" (select)=\"closePanel()\" (closing)=\"onBlur()\">\n            <ng-content></ng-content>\n        </novo-overlay-template>\n    "
            },] },
];
/** @nocollapse */
NovoSearchBoxElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: novo_label_service_1.NovoLabelService, },
    { type: core_1.ChangeDetectorRef, },
    { type: core_1.NgZone, },
]; };
NovoSearchBoxElement.propDecorators = {
    'name': [{ type: core_1.Input },],
    'icon': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'alwaysOpen': [{ type: core_1.Input },],
    'theme': [{ type: core_1.Input },],
    'closeOnSelect': [{ type: core_1.Input },],
    'displayField': [{ type: core_1.Input },],
    'displayValue': [{ type: core_1.Input },],
    'hint': [{ type: core_1.Input },],
    'searchChanged': [{ type: core_1.Output },],
    'focused': [{ type: core_1.HostBinding, args: ['class.focused',] },],
    'overlay': [{ type: core_1.ViewChild, args: [Overlay_1.NovoOverlayTemplate,] },],
    'input': [{ type: core_1.ViewChild, args: ['input',] },],
    'active': [{ type: core_1.HostBinding, args: ['class.active',] },],
};
exports.NovoSearchBoxElement = NovoSearchBoxElement;
//# sourceMappingURL=SearchBox.js.map