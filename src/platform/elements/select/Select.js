"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// APP
var Overlay_1 = require("../overlay/Overlay");
var KeyCodes_1 = require("../../utils/key-codes/KeyCodes");
var novo_label_service_1 = require("../../services/novo-label-service");
var Helpers_1 = require("../../utils/Helpers");
// Value accessor for the component (supports ngModel)
var SELECT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoSelectElement; }),
    multi: true
};
var NovoSelectElement = (function () {
    function NovoSelectElement(element, labels) {
        this.element = element;
        this.labels = labels;
        this.placeholder = 'Select...';
        this.onSelect = new core_1.EventEmitter();
        this.selectedIndex = -1;
        this.empty = true;
        this.header = {
            open: false,
            valid: true,
            value: ''
        };
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.filterTerm = '';
    }
    NovoSelectElement.prototype.ngOnInit = function () {
        this.ngOnChanges();
    };
    NovoSelectElement.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.readonly = this.readonly === true;
        if (this.options && this.options.length && typeof this.options[0] === 'string') {
            this.filteredOptions = this.options.map(function (item) {
                return { value: item, label: item };
            });
        }
        else {
            this.filteredOptions = (this.options || []).filter(function (item) {
                return !item.readOnly;
            });
            this.filteredOptions.forEach(function (element) {
                element.active = false;
            });
        }
        if (!this.model && !this.createdItem) {
            this.clear();
        }
        else if (this.createdItem) {
            var item = this.options.find(function (i) { return i.label === _this.createdItem; });
            var index = this.options.indexOf(item);
            this.select(item, index);
        }
        else {
            this.writeValue(this.model);
        }
        if (this.panelOpen) {
            this.openPanel();
        }
    };
    /** BEGIN: Convienient Panel Methods. */
    NovoSelectElement.prototype.openPanel = function () {
        this.overlay.openPanel();
    };
    NovoSelectElement.prototype.closePanel = function () {
        this.overlay.closePanel();
    };
    Object.defineProperty(NovoSelectElement.prototype, "panelOpen", {
        get: function () {
            return this.overlay && this.overlay.panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    /** END: Convienient Panel Methods. */
    /**
    * This method closes the panel, and if a value is specified, also sets the associated
    * control to that value. It will also mark the control as dirty if this interaction
    * stemmed from the user.
    */
    NovoSelectElement.prototype.setValueAndClose = function (event) {
        if (event.value && event.index >= 0) {
            this.select(event.value, event.index);
        }
        this.closePanel();
    };
    NovoSelectElement.prototype.select = function (option, i, fireEvents) {
        if (fireEvents === void 0) { fireEvents = true; }
        if (this.selected) {
            this.selected.active = false;
        }
        this.selectedIndex = i;
        this.selected = option;
        this.selected.active = true;
        this.empty = false;
        if (fireEvents) {
            this.onModelChange(this.selected.value);
            this.onSelect.emit({ selected: this.selected.value });
        }
    };
    NovoSelectElement.prototype.clear = function () {
        this.selected = {
            label: this.placeholder,
            value: null,
            active: false
        };
        this.header = {
            open: false,
            valid: true,
            value: ''
        };
        this.selectedIndex = -1;
        this.empty = true;
    };
    NovoSelectElement.prototype.onKeyDown = function (event) {
        var _this = this;
        if (this.panelOpen) {
            if (!this.header.open) {
                // Prevent Scrolling
                event.preventDefault();
            }
            // Close popup on escape key
            if (event.keyCode === KeyCodes_1.KeyCodes.ESC) {
                this.closePanel();
                return;
            }
            if (event.keyCode === KeyCodes_1.KeyCodes.ENTER) {
                if (this.header.open && this.header.value) {
                    this.saveHeader();
                    return;
                }
                this.setValueAndClose({ value: this.filteredOptions[this.selectedIndex], index: this.selectedIndex });
                return;
            }
            if (event.keyCode === KeyCodes_1.KeyCodes.UP && this.selectedIndex > 0) {
                this.selectedIndex--;
                this.select(this.filteredOptions[this.selectedIndex], this.selectedIndex);
                this.scrollToSelected();
            }
            else if (event.keyCode === KeyCodes_1.KeyCodes.DOWN && this.selectedIndex < this.filteredOptions.length - 1) {
                this.selectedIndex++;
                this.select(this.filteredOptions[this.selectedIndex], this.selectedIndex);
                this.scrollToSelected();
                if (this.header.open) {
                    this.toggleHeader(null, false);
                }
            }
            else if (event.keyCode === KeyCodes_1.KeyCodes.UP && this.selectedIndex === 0) {
                this.selectedIndex--;
                this.toggleHeader(null, true);
            }
            else if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode === KeyCodes_1.KeyCodes.SPACE) {
                clearTimeout(this.filterTermTimeout);
                this.filterTermTimeout = setTimeout(function () { _this.filterTerm = ''; }, 2000);
                var char = String.fromCharCode(event.keyCode);
                this.filterTerm = this.filterTerm.concat(char);
                // let element = this.element.nativeElement;
                // let list = element.querySelector('.novo-select-list');
                // let item = element.querySelector(`[data-automation-value^="${this.filterTerm}" i]`);
                var item = this.filteredOptions.find(function (i) { return i.label.toUpperCase().indexOf(_this.filterTerm) === 0; });
                if (item) {
                    this.select(item, this.filteredOptions.indexOf(item));
                    this.scrollToSelected();
                }
            }
            else if ([KeyCodes_1.KeyCodes.BACKSPACE, KeyCodes_1.KeyCodes.DELETE].includes(event.keyCode)) {
                clearTimeout(this.filterTermTimeout);
                this.filterTermTimeout = setTimeout(function () { _this.filterTerm = ''; }, 2000);
                this.filterTerm = this.filterTerm.slice(0, -1);
            }
        }
        else {
            if ([KeyCodes_1.KeyCodes.DOWN, KeyCodes_1.KeyCodes.UP].includes(event.keyCode)) {
                this.panelOpen ? this.closePanel() : this.openPanel();
            }
        }
    };
    NovoSelectElement.prototype.scrollToSelected = function () {
        this.scrollToIndex(this.selectedIndex);
    };
    NovoSelectElement.prototype.scrollToIndex = function (index) {
        var element = this.overlay._overlayRef.overlayElement;
        var list = element.querySelector('.novo-select-list');
        var items = list.querySelectorAll('li');
        var item = items[this.headerConfig ? index + 1 : index];
        if (item) {
            list.scrollTop = item.offsetTop;
        }
    };
    NovoSelectElement.prototype.toggleHeader = function (event, forceValue) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        // Reverse the active property (if forceValue, use that)
        this.header = {
            open: forceValue !== undefined ? forceValue : !this.header.open,
            value: '',
            valid: true
        };
    };
    NovoSelectElement.prototype.highlight = function (match, query) {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return query ? match.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : match;
    };
    NovoSelectElement.prototype.escapeRegexp = function (queryToEscape) {
        // Ex: if the capture is "a" the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    };
    NovoSelectElement.prototype.saveHeader = function () {
        if (this.header.value) {
            this.headerConfig.onSave(this.header.value);
            this.createdItem = this.header.value;
            this.closePanel();
        }
        else {
            this.header.valid = false;
        }
    };
    NovoSelectElement.prototype.writeValue = function (model) {
        this.model = model;
        if (this.options) {
            var item = this.filteredOptions.find(function (i) { return i.value === model; });
            if (!item && !Helpers_1.Helpers.isEmpty(model)) {
                item = {
                    label: model,
                    value: model
                };
                if (!item.readOnly) {
                    this.options.unshift(item);
                }
            }
            if (item) {
                this.select(item, this.filteredOptions.indexOf(item), false);
                this.empty = false;
            }
            else {
                this.clear();
            }
        }
    };
    NovoSelectElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoSelectElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    return NovoSelectElement;
}());
NovoSelectElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-select',
                providers: [SELECT_VALUE_ACCESSOR],
                template: "\n        <div (click)=\"openPanel()\" tabIndex=\"0\" type=\"button\" [class.empty]=\"empty\">{{selected.label}}<i class=\"bhi-collapse\"></i></div>\n        <novo-overlay-template [parent]=\"element\" position=\"center\">\n            <ul class=\"novo-select-list\" tabIndex=\"-1\" [class.header]=\"headerConfig\" [class.active]=\"panelOpen\">\n                <ng-content></ng-content>\n                <li *ngIf=\"headerConfig\" class=\"select-header\" [class.open]=\"header.open\">\n                    <button  *ngIf=\"!header.open\" (click)=\"toggleHeader($event); false\" tabIndex=\"-1\" type=\"button\" class=\"header\"><i class=\"bhi-add-thin\"></i>&nbsp;{{headerConfig.label}}</button>\n                    <div *ngIf=\"header.open\" [ngClass]=\"{active: header.open}\">\n                        <input autofocus type=\"text\" [placeholder]=\"headerConfig.placeholder\" [attr.id]=\"name\" autocomplete=\"false\" [(ngModel)]=\"header.value\" [ngClass]=\"{invalid: !header.valid}\"/>\n                        <footer>\n                            <button (click)=\"toggleHeader($event, false)\">{{labels.cancel}}</button>\n                            <button (click)=\"saveHeader()\" class=\"primary\">{{labels.save}}</button>\n                        </footer>\n                    </div>\n                </li>\n                <li *ngFor=\"let option of filteredOptions; let i = index\" [ngClass]=\"{active: option.active}\" (click)=\"setValueAndClose({value: option, index: i})\" [attr.data-automation-value]=\"option.label\">\n                    <span [innerHtml]=\"highlight(option.label, filterTerm)\"></span>\n                    <i *ngIf=\"option.active\" class=\"bhi-check\"></i>\n                </li>\n            </ul>\n        </novo-overlay-template>\n    ",
                host: {
                    '(keydown)': 'onKeyDown($event)'
                }
            },] },
];
/** @nocollapse */
NovoSelectElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: novo_label_service_1.NovoLabelService, },
]; };
NovoSelectElement.propDecorators = {
    'name': [{ type: core_1.Input },],
    'options': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'readonly': [{ type: core_1.Input },],
    'headerConfig': [{ type: core_1.Input },],
    'onSelect': [{ type: core_1.Output },],
    'overlay': [{ type: core_1.ViewChild, args: [Overlay_1.NovoOverlayTemplate,] },],
    'onKeyDown': [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
};
exports.NovoSelectElement = NovoSelectElement;
//# sourceMappingURL=Select.js.map