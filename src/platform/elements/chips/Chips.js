"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// Vendor
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var coercion_1 = require("@angular/cdk/coercion");
var KeyCodes_1 = require("../../utils/key-codes/KeyCodes");
var Helpers_1 = require("../../utils/Helpers");
var novo_label_service_1 = require("../../services/novo-label-service");
var ComponentUtils_1 = require("../../utils/component-utils/ComponentUtils");
// Value accessor for the component (supports ngModel)
var CHIPS_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoChipsElement; }),
    multi: true
};
var NovoChipElement = (function () {
    function NovoChipElement() {
        this.select = new core_1.EventEmitter();
        this.remove = new core_1.EventEmitter();
    }
    Object.defineProperty(NovoChipElement.prototype, "type", {
        set: function (type) {
            this._type = type ? type.toLowerCase() : null;
        },
        enumerable: true,
        configurable: true
    });
    NovoChipElement.prototype.onRemove = function (e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.remove.emit(e);
        return false;
    };
    NovoChipElement.prototype.onSelect = function (e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.select.emit(e);
        return false;
    };
    return NovoChipElement;
}());
NovoChipElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'chip,novo-chip',
                template: "\n        <span (click)=\"onSelect($event)\" (mouseover)=\"onSelect($event)\" [ngClass]=\"_type\">\n            <i *ngIf=\"_type\" class=\"bhi-circle\"></i>\n            <span><ng-content></ng-content></span>\n        </span>\n        <i class=\"bhi-close\" (click)=\"onRemove($event)\"></i>\n    "
            },] },
];
/** @nocollapse */
NovoChipElement.ctorParameters = function () { return []; };
NovoChipElement.propDecorators = {
    'type': [{ type: core_1.Input },],
    'select': [{ type: core_1.Output },],
    'remove': [{ type: core_1.Output },],
};
exports.NovoChipElement = NovoChipElement;
var NovoChipsElement = (function () {
    function NovoChipsElement(element, componentUtils, labels) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.labels = labels;
        this.closeOnSelect = false;
        this.placeholder = '';
        this._disablePickerInput = false;
        this.changed = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.typing = new core_1.EventEmitter();
        this.items = [];
        this.selected = null;
        this.config = {};
        // private data model
        this._value = '';
        this._items = new ReplaySubject_1.ReplaySubject(1);
        // Placeholders for the callbacks
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
    }
    Object.defineProperty(NovoChipsElement.prototype, "disablePickerInput", {
        get: function () {
            return this._disablePickerInput;
        },
        set: function (v) {
            this._disablePickerInput = coercion_1.coerceBooleanProperty(v);
        },
        enumerable: true,
        configurable: true
    });
    NovoChipsElement.prototype.ngOnInit = function () {
        this.setItems();
    };
    Object.defineProperty(NovoChipsElement.prototype, "value", {
        //get accessor
        get: function () {
            return this._value;
        },
        //set accessor including call the onchange callback
        set: function (selected) {
            this.itemToAdd = '';
            if (selected !== this._value) {
                this._value = selected;
                this.changed.emit({ value: selected, rawValue: this.items });
                this.onModelChange(selected);
            }
        },
        enumerable: true,
        configurable: true
    });
    NovoChipsElement.prototype.clearValue = function () {
        this.items = [];
        this._items.next(this.items);
        this.value = null;
        this.changed.emit({ value: this.value, rawValue: this.items });
        this.onModelChange(this.value);
    };
    NovoChipsElement.prototype.setItems = function () {
        var _this = this;
        this.items = [];
        if (this.model && Array.isArray(this.model)) {
            var noLabels = [];
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var value = _a[_i];
                var label = void 0;
                if (this.source && this.source.format && Helpers_1.Helpers.validateInterpolationProps(this.source.format, value)) {
                    label = Helpers_1.Helpers.interpolate(this.source.format, value);
                }
                if (this.source && label && label !== this.source.format) {
                    this.items.push({
                        value: value,
                        label: label
                    });
                }
                else if (this.source.getLabels && typeof this.source.getLabels === 'function') {
                    noLabels.push(value);
                }
                else if (this.source.options && Array.isArray(this.source.options)) {
                    this.items.push(this.getLabelFromOptions(value));
                }
                else {
                    this.items.push({
                        value: value,
                        label: value
                    });
                }
            }
            if (noLabels.length > 0 && this.source && this.source.getLabels && typeof this.source.getLabels === 'function') {
                this.source.getLabels(noLabels).then(function (result) {
                    for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                        var value = result_1[_i];
                        if (value.hasOwnProperty('label')) {
                            _this.items.push({
                                value: value,
                                label: value.label
                            });
                        }
                        else if (_this.source.options && Array.isArray(_this.source.options)) {
                            _this.items.push(_this.getLabelFromOptions(value));
                        }
                        else {
                            _this.items.push(value);
                        }
                    }
                    _this._items.next(_this.items);
                });
            }
        }
        this.changed.emit({ value: this.model, rawValue: this.items });
        this._items.next(this.items);
    };
    NovoChipsElement.prototype.getLabelFromOptions = function (value) {
        var optLabel = this.source.options.find(function (val) { return val.value === value; });
        return {
            value: value,
            label: optLabel ? optLabel.label : value
        };
    };
    NovoChipsElement.prototype.deselectAll = function (event) {
        this.selected = null;
        this.hidePreview();
    };
    NovoChipsElement.prototype.select = function (event, item) {
        this.blur.emit(event);
        this.deselectAll();
        this.selected = item;
        this.showPreview();
    };
    NovoChipsElement.prototype.onTyping = function (event) {
        this.typing.emit(event);
    };
    NovoChipsElement.prototype.onFocus = function (event) {
        this.deselectAll();
        this.element.nativeElement.classList.add('selected');
        this.focus.emit(event);
    };
    NovoChipsElement.prototype.add = function (event) {
        if (event && !(event instanceof Event)) {
            this.items.push(event);
            this.value = this.items.map(function (i) { return i.value; });
            // Set focus on the picker
            var input = this.element.nativeElement.querySelector('novo-picker > input');
            if (input) {
                input.focus();
            }
        }
        this._items.next(this.items);
    };
    NovoChipsElement.prototype.remove = function (event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.items.splice(this.items.indexOf(item), 1);
        this.deselectAll();
        this.value = this.items.map(function (i) { return i.value; });
        this.changed.emit({ value: this.value.length ? this.value : '', rawValue: this.items });
        this.onModelChange(this.value.length ? this.value : '');
        this._items.next(this.items);
    };
    NovoChipsElement.prototype.onKeyDown = function (event) {
        if (event.keyCode === KeyCodes_1.KeyCodes.BACKSPACE) {
            if (event.target && event.target.value.length === 0 && this.items.length) {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if (this.selected) {
                    this.remove(event, this.selected);
                }
                else {
                    this.select(event, this.items[this.items.length - 1]);
                }
            }
        }
    };
    // Set touched on blur
    NovoChipsElement.prototype.onTouched = function (e) {
        this.element.nativeElement.classList.remove('selected');
        this.onModelTouched();
        this.blur.emit(e);
    };
    NovoChipsElement.prototype.writeValue = function (model) {
        this.model = model;
        this.setItems();
    };
    NovoChipsElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoChipsElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    /**
     * @name showPreview
     *
     * @description This method creates an instance of the preview (called popup) and adds all the bindings to that
     * instance. Will reuse the popup or create a new one if it does not already exist. Will only work if there is
     * a previewTemplate given in the config.
     */
    NovoChipsElement.prototype.showPreview = function () {
        if (this.source.previewTemplate) {
            if (!this.popup) {
                this.popup = this.componentUtils.appendNextToLocation(this.source.previewTemplate, this.preview);
            }
            this.popup.instance.match = this.selected;
        }
    };
    /**
     * @name hidePreview
     *
     * @description - This method deletes the preview popup from the DOM.
     */
    NovoChipsElement.prototype.hidePreview = function () {
        if (this.popup) {
            this.popup.destroy();
            this.popup = null;
        }
    };
    return NovoChipsElement;
}());
NovoChipsElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'chips,novo-chips',
                providers: [CHIPS_VALUE_ACCESSOR],
                template: "\n        <chip\n            *ngFor=\"let item of _items | async\"\n            [type]=\"type || item?.value?.searchEntity\"\n            [class.selected]=\"item == selected\"\n            (remove)=\"remove($event, item)\"\n            (select)=\"select($event, item)\">\n            {{ item.label }}\n        </chip>\n        <div class=\"chip-input-container\">\n            <novo-picker\n                clearValueOnSelect=\"true\"\n                [closeOnSelect]=\"closeOnSelect\"\n                [config]=\"source\"\n                [disablePickerInput]=\"disablePickerInput\"\n                [placeholder]=\"placeholder\"\n                [(ngModel)]=\"itemToAdd\"\n                (select)=\"add($event)\"\n                (keydown)=\"onKeyDown($event)\"\n                (focus)=\"onFocus($event)\"\n                (typing)=\"onTyping($event)\"\n                (blur)=\"onTouched($event)\"\n                [selected]=\"items\"\n                [overrideElement]=\"element\">\n            </novo-picker>\n        </div>\n        <div class=\"preview-container\">\n            <span #preview></span>\n        </div>\n        <i class=\"bhi-search\" [class.has-value]=\"items.length\"></i>\n        <label class=\"clear-all\" *ngIf=\"items.length\" (click)=\"clearValue()\">{{ labels.clearAll }} <i class=\"bhi-times\"></i></label>\n   ",
                host: {
                    '[class.with-value]': 'items.length > 0'
                }
            },] },
];
/** @nocollapse */
NovoChipsElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: ComponentUtils_1.ComponentUtils, },
    { type: novo_label_service_1.NovoLabelService, },
]; };
NovoChipsElement.propDecorators = {
    'closeOnSelect': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'source': [{ type: core_1.Input },],
    'type': [{ type: core_1.Input },],
    'disablePickerInput': [{ type: core_1.Input },],
    'changed': [{ type: core_1.Output },],
    'focus': [{ type: core_1.Output },],
    'blur': [{ type: core_1.Output },],
    'typing': [{ type: core_1.Output },],
    'preview': [{ type: core_1.ViewChild, args: ['preview', { read: core_1.ViewContainerRef },] },],
    'value': [{ type: core_1.Input },],
};
exports.NovoChipsElement = NovoChipsElement;
//# sourceMappingURL=Chips.js.map