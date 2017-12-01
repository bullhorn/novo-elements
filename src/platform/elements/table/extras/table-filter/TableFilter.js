"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var KeyCodes_1 = require("./../../../../utils/key-codes/KeyCodes");
var Helpers_1 = require("./../../../../utils/Helpers");
var TableFilter = (function () {
    function TableFilter(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.onFilterChange = new core_1.EventEmitter();
        this.element = element;
        this.renderer = renderer;
    }
    TableFilter.prototype.ngOnInit = function () {
        this.ngOnChanges();
    };
    TableFilter.prototype.ngOnChanges = function (changes) {
        var label = '';
        if (this.config.freetextFilter) {
            label = this.config.freetextFilter;
        }
        else if (this.config.filter) {
            label = this.config.filter;
        }
        this.renderer.setElementProperty(this.element, 'value', label);
    };
    TableFilter.prototype.onChangeFilter = function (event) {
        var _this = this;
        clearTimeout(this.filterThrottle);
        if (KeyCodes_1.KeyCodes.ENTER === event.keyCode) {
            this.config.filter = event.target.value;
            this.onFilterChange.emit({ filtering: this.config });
        }
        else {
            this.filterThrottle = setTimeout(function () {
                _this.config.filter = event.target.value;
                _this.onFilterChange.emit({ filtering: _this.config });
            }, 300);
        }
    };
    TableFilter.prototype.onClick = function (event) {
        Helpers_1.Helpers.swallowEvent(event);
    };
    return TableFilter;
}());
TableFilter.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[novoTableFilter]',
            },] },
];
/** @nocollapse */
TableFilter.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
]; };
TableFilter.propDecorators = {
    'config': [{ type: core_1.Input, args: ['novoTableFilter',] },],
    'onFilterChange': [{ type: core_1.Output },],
    'onChangeFilter': [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
    'onClick': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
};
exports.TableFilter = TableFilter;
//# sourceMappingURL=TableFilter.js.map