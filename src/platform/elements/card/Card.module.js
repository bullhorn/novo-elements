"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var Loading_module_1 = require("../loading/Loading.module");
var Button_module_1 = require("../button/Button.module");
var Tooltip_module_1 = require("../tooltip/Tooltip.module");
var Card_1 = require("./Card");
var CardBestTime_1 = require("./extras/best-time/CardBestTime");
var CardDonutChart_1 = require("./extras/donut-chart/CardDonutChart");
var CardTimeline_1 = require("./extras/timeline/CardTimeline");
var NovoCardModule = (function () {
    function NovoCardModule() {
    }
    return NovoCardModule;
}());
NovoCardModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, Button_module_1.NovoButtonModule, Loading_module_1.NovoLoadingModule, Tooltip_module_1.NovoTooltipModule],
                declarations: [Card_1.CardElement, Card_1.CardActionsElement, CardBestTime_1.CardBestTimeElement, CardDonutChart_1.CardDonutChartElement, CardTimeline_1.CardTimelineElement],
                exports: [Card_1.CardElement, Card_1.CardActionsElement, CardBestTime_1.CardBestTimeElement, CardDonutChart_1.CardDonutChartElement, CardTimeline_1.CardTimelineElement]
            },] },
];
/** @nocollapse */
NovoCardModule.ctorParameters = function () { return []; };
exports.NovoCardModule = NovoCardModule;
//# sourceMappingURL=Card.module.js.map