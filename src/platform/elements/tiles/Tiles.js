"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// APP
var Helpers_1 = require("../../utils/Helpers");
// Value accessor for the component (supports ngModel)
var TILES_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoTilesElement; }),
    multi: true
};
var NovoTilesElement = (function () {
    function NovoTilesElement(element, ref) {
        this.element = element;
        this.ref = ref;
        this.onChange = new core_1.EventEmitter();
        this.onDisabledOptionClick = new core_1.EventEmitter();
        this._options = [];
        this.activeTile = null;
        this.state = 'inactive';
        this.focused = false;
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
    }
    NovoTilesElement.prototype.setFocus = function (focus) {
        this.focused = focus;
    };
    NovoTilesElement.prototype.ngAfterContentInit = function () {
        this.name = this.name || '';
        this.setupOptions();
    };
    NovoTilesElement.prototype.ngOnChanges = function (change) {
        if (change['options'] && change['options'].currentValue && !change['options'].firstChange) {
            this.name = this.name || '';
            this._options = [];
            this.setupOptions();
        }
    };
    NovoTilesElement.prototype.setupOptions = function () {
        var _this = this;
        if (this.options && this.options.length && (this.options[0].value === undefined || this.options[0].value === null)) {
            this._options = this.options.map(function (x) {
                var item = { value: x, label: x, checked: _this.model === x };
                if (item.checked) {
                    _this.setTile(item);
                }
                return item;
            });
        }
        else {
            this._options = this.options.map(function (x) {
                x.checked = _this.model === x.value;
                if (x.checked) {
                    _this.setTile(x);
                }
                return x;
            });
        }
        this.ref.markForCheck();
    };
    NovoTilesElement.prototype.select = function (event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (item.checked) {
            return;
        }
        if (!item.disabled) {
            for (var _i = 0, _a = this._options; _i < _a.length; _i++) {
                var option = _a[_i];
                option.checked = false;
            }
            item.checked = !item.checked;
            this.onChange.emit(item.value);
            this.onModelChange(item.value);
            this.setTile(item);
            this.model = item.value;
        }
        else {
            this.onDisabledOptionClick.emit(item);
        }
        this.ref.markForCheck();
    };
    NovoTilesElement.prototype.setTile = function (item) {
        if (item) {
            this.activeTile = item.value;
            this.moveTile();
        }
    };
    NovoTilesElement.prototype.moveTile = function () {
        var _this = this;
        setTimeout(function () {
            var ind = _this.element.nativeElement.querySelector('.active-indicator');
            var el = _this.element.nativeElement.querySelector('.tile.active');
            if (ind && el) {
                var w_1 = el.clientWidth;
                var left_1 = el.offsetLeft;
                // These style adjustments need to occur in this order.
                setTimeout(function () {
                    ind.style.width = w_1 + 4 + "px";
                    setTimeout(function () {
                        ind.style.transform = "translateX(" + left_1 + "px)";
                        setTimeout(function () {
                            _this.state = 'active';
                            _this.ref.markForCheck();
                        });
                    });
                });
            }
        });
    };
    NovoTilesElement.prototype.writeValue = function (model) {
        this.model = model;
        if (!Helpers_1.Helpers.isBlank(model)) {
            this.setupOptions();
        }
    };
    NovoTilesElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoTilesElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    return NovoTilesElement;
}());
NovoTilesElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-tiles',
                providers: [TILES_VALUE_ACCESSOR],
                template: "\n        <div class=\"tile-container\" [class.active]=\"focused\">\n            <div class=\"tile\" *ngFor=\"let option of _options; let i = index\" [ngClass]=\"{active: option.checked, disabled: option.disabled}\" (click)=\"select($event, option, i)\" [attr.data-automation-id]=\"option.label || option\">\n                <input class=\"tiles-input\" [name]=\"name\" type=\"radio\" [value]=\"option.checked || option\" [attr.id]=\"name + i\" (change)=\"select($event, option, i)\" (focus)=\"setFocus(true)\" (blur)=\"setFocus(false)\">\n                <label [attr.for]=\"name + i\" [attr.data-automation-id]=\"option.label || option\">\n                    {{ option.label || option}}\n                </label>\n            </div>\n            <span class=\"active-indicator\" [@tileState]=\"state\" [hidden]=\"activeTile === undefined || activeTile === null\"></span>\n        </div>\n    ",
                animations: [
                    core_1.trigger('tileState', [
                        core_1.state('inactive', core_1.style({
                            opacity: '0'
                        })),
                        core_1.state('active', core_1.style({
                            opacity: '1'
                        })),
                        core_1.transition('inactive => active', core_1.animate('200ms ease-in')),
                        core_1.transition('active => inactive', core_1.animate('200ms ease-out'))
                    ])
                ],
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
NovoTilesElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.ChangeDetectorRef, },
]; };
NovoTilesElement.propDecorators = {
    'name': [{ type: core_1.Input },],
    'options': [{ type: core_1.Input },],
    'required': [{ type: core_1.Input },],
    'onChange': [{ type: core_1.Output },],
    'onDisabledOptionClick': [{ type: core_1.Output },],
};
exports.NovoTilesElement = NovoTilesElement;
//# sourceMappingURL=Tiles.js.map