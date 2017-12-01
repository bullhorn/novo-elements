"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var novo_label_service_1 = require("../../services/novo-label-service");
var NovoSliderElement = (function () {
    function NovoSliderElement(element, labels) {
        this.element = element;
        this.labels = labels;
        this.currentSlide = 0;
        this.start = true;
        this.end = true;
        this.currSlides = ['active'];
        this.handleKeyDownFunc = this.handleKeyDown.bind(this);
    }
    NovoSliderElement.prototype.ngOnInit = function () {
        for (var i = 0; i < this.slides; i++) {
            this.currSlides[i] = (i > 0) ? 'inactive' : 'active';
        }
        // Catch Tab Events
        this.element.nativeElement.addEventListener('keydown', this.handleKeyDownFunc);
    };
    NovoSliderElement.prototype.ngOnDestroy = function () {
        this.element.nativeElement.removeEventListener('keydown', this.handleKeyDownFunc);
    };
    NovoSliderElement.prototype.handleKeyDown = function (event) {
        if (event.keyCode === 9) {
            event.stopImmediatePropagation();
            event.preventDefault();
        }
    };
    NovoSliderElement.prototype.changeSlide = function (direction) {
        if (direction === 'next') {
            if (this.currentSlide === this.slides - 1) {
                return;
            }
            this.currentSlide++;
        }
        else {
            if (this.currentSlide === 0) {
                return;
            }
            this.currentSlide--;
        }
        for (var i = 0; i < this.slides; i++) {
            this.currSlides[i] = 'inactive';
        }
        this.currSlides[this.currentSlide] = 'active';
        this.start = (this.currentSlide === 0);
        this.end = (this.currentSlide === this.slides - 1);
        this.currentClass = "slide-" + this.currentSlide;
    };
    return NovoSliderElement;
}());
NovoSliderElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-slider',
                template: "\n        <section class=\"slides\">\n            <ng-content select=\"div[slide]\"></ng-content>\n        </section>\n        <div class=\"controls\">\n            <button *ngIf=\"!start\" theme=\"icon\" icon=\"previous\" (click)=\"changeSlide('back')\"></button>\n            <div class=\"indicators\">\n                <div class=\"indicator-circle\" *ngFor=\"let indicator of currSlides; let i = index\" [ngClass]=\"indicator\"></div>\n            </div>\n            <button *ngIf=\"!end\" theme=\"primary\" icon=\"next\" (click)=\"changeSlide('next')\">{{ labels.next }}</button>\n            <ng-content select=\"button\" *ngIf=\"end\"></ng-content>\n        </div>\n    ",
                host: {
                    '[class]': 'currentClass'
                }
            },] },
];
/** @nocollapse */
NovoSliderElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: novo_label_service_1.NovoLabelService, },
]; };
NovoSliderElement.propDecorators = {
    'slides': [{ type: core_1.Input },],
};
exports.NovoSliderElement = NovoSliderElement;
//# sourceMappingURL=Slider.js.map