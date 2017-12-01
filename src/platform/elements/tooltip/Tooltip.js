"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var TooltipDirective = (function () {
    function TooltipDirective() {
        this.position = 'top';
    }
    TooltipDirective.prototype.isPosition = function (position) {
        return position.toLowerCase() === (this.position || '').toLowerCase();
    };
    TooltipDirective.prototype.isType = function (type) {
        return type.toLowerCase() === (this.type || '').toLowerCase();
    };
    TooltipDirective.prototype.isSize = function (size) {
        return size.toLowerCase() === (this.size || '').toLowerCase();
    };
    return TooltipDirective;
}());
TooltipDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[tooltip]',
                host: {
                    '[class.hint--top]': 'tooltip && isPosition("top")',
                    '[class.hint--left]': 'tooltip && isPosition("left")',
                    '[class.hint--right]': 'tooltip && isPosition("right")',
                    '[class.hint--bottom]': 'tooltip && isPosition("bottom")',
                    '[class.hint--top-left]': 'tooltip && isPosition("top-left")',
                    '[class.hint--top-right]': 'tooltip && isPosition("top-right")',
                    '[class.hint--bottom-left]': 'tooltip && isPosition("bottom-left")',
                    '[class.hint--bottom-right]': 'tooltip && isPosition("bottom-right")',
                    '[class.hint--error]': 'tooltip && isType("error")',
                    '[class.hint--info]': 'tooltip && isType("info")',
                    '[class.hint--warning]': 'tooltip && isType("warning")',
                    '[class.hint--success]': 'tooltip && isType("success")',
                    '[class.hint--always]': 'tooltip && always',
                    '[class.hint--rounded]': 'tooltip && rounded',
                    '[class.hint--no-animate]': 'tooltip && noAnimate',
                    '[class.hint--bounce]': 'tooltip && bounce',
                    '[class.hint--hidden]': 'active === false',
                    '[class.hint--preline]': 'preline',
                    '[class.hint--small]': 'tooltip && isSize("small")',
                    '[class.hint--medium]': 'tooltip && isSize("medium")',
                    '[class.hint--large]': 'tooltip && isSize("large")',
                    '[attr.data-hint]': 'tooltip'
                }
            },] },
];
/** @nocollapse */
TooltipDirective.ctorParameters = function () { return []; };
TooltipDirective.propDecorators = {
    'tooltip': [{ type: core_1.Input },],
    'position': [{ type: core_1.Input, args: ['tooltipPosition',] },],
    'type': [{ type: core_1.Input, args: ['tooltipType',] },],
    'size': [{ type: core_1.Input, args: ['tooltipSize',] },],
    'bounce': [{ type: core_1.Input, args: ['tooltipBounce',] },],
    'noAnimate': [{ type: core_1.Input, args: ['tooltipNoAnimate',] },],
    'rounded': [{ type: core_1.Input, args: ['tooltipRounded',] },],
    'always': [{ type: core_1.Input, args: ['tooltipAlways',] },],
    'active': [{ type: core_1.Input, args: ['tooltipActive',] },],
    'preline': [{ type: core_1.Input, args: ['tooltipPreline',] },],
};
exports.TooltipDirective = TooltipDirective;
//# sourceMappingURL=Tooltip.js.map