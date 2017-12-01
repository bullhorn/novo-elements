"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// APP
var Helpers_1 = require("../../../../utils/Helpers");
// Value accessor for the component (supports ngModel)
var CHECKLIST_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoCheckListElement; }),
    multi: true
};
var NovoCheckListElement = (function () {
    function NovoCheckListElement() {
        this.onSelect = new core_1.EventEmitter();
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
    }
    NovoCheckListElement.prototype.ngOnInit = function () {
        this.setModel();
        this.setupOptions();
    };
    NovoCheckListElement.prototype.select = function (event, item) {
        Helpers_1.Helpers.swallowEvent(event);
        item.checked = !item.checked;
        this.model = this._options.filter(function (checkBox) { return checkBox.checked; }).map(function (x) { return x.value; });
        this.onModelChange(this.model.length > 0 ? this.model : '');
        this.onSelect.emit({ selected: this.model });
    };
    NovoCheckListElement.prototype.setupOptions = function () {
        var _this = this;
        this.options = this.options || [];
        this._options = [];
        if (this.options.length && !this.options[0].value) {
            this.options.forEach(function (option) {
                var formattedOption = {
                    value: option,
                    label: option,
                    checked: (_this.model && _this.model.length && (_this.model.indexOf(option.value) !== -1))
                };
                _this._options.push(formattedOption);
            });
        }
        else {
            this.options.forEach(function (option) {
                var formattedOption = option;
                formattedOption.checked = (_this.model && _this.model.length && (_this.model.indexOf(option.value) !== -1));
                _this._options.push(formattedOption);
            });
        }
    };
    NovoCheckListElement.prototype.setModel = function () {
        var checkedOptions = this.options.filter(function (checkBox) { return checkBox.checked; }).map(function (x) { return x.value; });
        this.writeValue(checkedOptions);
    };
    NovoCheckListElement.prototype.writeValue = function (model) {
        this.model = model || [];
        if (model) {
            this.setupOptions();
        }
    };
    NovoCheckListElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoCheckListElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    return NovoCheckListElement;
}());
NovoCheckListElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-check-list',
                providers: [CHECKLIST_VALUE_ACCESSOR],
                template: "\n        <div class=\"check-box-group\" *ngFor=\"let option of _options; let i = index\" [ngClass]=\"{checked: option.checked}\" >\n            <input [name]=\"name\" type=\"checkbox\" [ngModel]=\"option.checked\" [attr.id]=\"name+i\" [value]=\"option.checked\" (change)=\"select($event, option)\">\n            <label [attr.for]=\"name+i\" (click)=\"select($event, option)\">\n              <i [ngClass]=\"{'bhi-checkbox-empty': !option.checked, 'bhi-checkbox-filled': option.checked }\"></i>\n              <span>{{option.label}}</span>\n            </label>\n        </div>\n    "
            },] },
];
/** @nocollapse */
NovoCheckListElement.ctorParameters = function () { return []; };
NovoCheckListElement.propDecorators = {
    'name': [{ type: core_1.Input },],
    'options': [{ type: core_1.Input },],
    'onSelect': [{ type: core_1.Output },],
};
exports.NovoCheckListElement = NovoCheckListElement;
//# sourceMappingURL=CheckList.js.map