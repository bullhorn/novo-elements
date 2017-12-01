"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var CardDonutChartElement = (function () {
    function CardDonutChartElement(element) {
        this.element = element;
        // Geometric number that represents 100% of the chart area
        this.chartFillMax = 629;
        // Unique ID for instance
        this.uid = Math.round(Math.random() * 1000);
        // Prevent Collision
        this.isChartDrawing = false;
    }
    CardDonutChartElement.prototype.ngOnChanges = function (changes) {
        if (!this.isChartDrawing) {
            this.drawChart();
        }
    };
    CardDonutChartElement.prototype.ngOnInit = function () {
        if (!this.isChartDrawing) {
            this.drawChart();
        }
        this.color = this.color || '#662255';
    };
    CardDonutChartElement.prototype.drawChart = function () {
        var _this = this;
        this.isChartDrawing = true;
        setTimeout(function () {
            var chartContainer = _this.element.nativeElement.querySelector("#chart-percent-" + _this.uid);
            var fillElements = _this.element.nativeElement.querySelectorAll('.fill');
            for (var i = 0; i < fillElements.length; i++) {
                fillElements[i].setAttribute('stroke', _this.color);
            }
            // Set fill amount
            _this.element.nativeElement.querySelector("#chart-fill-" + _this.uid).setAttribute('stroke-dashoffset', (_this.chartFillMax * _this.value).toString());
            // Set Text Color
            chartContainer.style.color = _this.color;
            // Set percentage for chart
            chartContainer.setAttribute('data-percent', (Math.round(_this.value * 100)).toString() + "%");
            // Set Label
            chartContainer.setAttribute('data-name', _this.label);
            _this.isChartDrawing = false;
        });
    };
    return CardDonutChartElement;
}());
CardDonutChartElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-card-chart-donut',
                template: "\n        <aside id=\"chart-percent-{{ uid }}\">\n            <!-- COLORED FILL -->\n            <svg viewBox=\"-10 -10 220 220\">\n                <g fill=\"none\" stroke-width=\"20\" transform=\"translate(100,100)\">\n                    <path class=\"fill\" d=\"M 0,-100 A 100,100 0 0,1 86.6,-50\" />\n                    <path class=\"fill\" d=\"M 86.6,-50 A 100,100 0 0,1 86.6,50\" />\n                    <path class=\"fill\" d=\"M 86.6,50 A 100,100 0 0,1 0,100\" />\n                    <path class=\"fill\" d=\"M 0,100 A 100,100 0 0,1 -86.6,50\" />\n                    <path class=\"fill\" d=\"M -86.6,50 A 100,100 0 0,1 -86.6,-50\" />\n                    <path class=\"fill\" d=\"M -86.6,-50 A 100,100 0 0,1 0,-100\" />\n                </g>\n            </svg>\n            <!-- GREY BEZEL -->\n            <svg viewBox=\"-10 -10 220 220\">\n                <path id=\"chart-fill-{{uid}}\" d=\"M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z\"></path>\n            </svg>\n        </aside>\n    "
            },] },
];
/** @nocollapse */
CardDonutChartElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
CardDonutChartElement.propDecorators = {
    'value': [{ type: core_1.Input },],
    'label': [{ type: core_1.Input },],
    'color': [{ type: core_1.Input },],
};
exports.CardDonutChartElement = CardDonutChartElement;
//# sourceMappingURL=CardDonutChart.js.map