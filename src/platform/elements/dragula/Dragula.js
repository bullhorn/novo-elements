"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// Vendor
var dragula = require("dragula");
// APP
var DragulaService_1 = require("./DragulaService");
var NovoDragulaElement = (function () {
    function NovoDragulaElement(element, dragulaService) {
        this.dragulaService = dragulaService;
        this.drake = null;
        this.container = element.nativeElement;
    }
    NovoDragulaElement.prototype.ngOnInit = function () {
        var bag = this.dragulaService.find(this.bag);
        if (bag) {
            this.drake = bag.drake;
            this.checkModel();
            this.drake.containers.push(this.container);
        }
        else {
            this.drake = dragula({
                containers: [this.container]
            });
            this.checkModel();
            this.dragulaService.add(this.bag, this.drake);
        }
    };
    NovoDragulaElement.prototype.checkModel = function () {
        if (this.dragulaModel) {
            if (this.drake.models) {
                this.drake.models.push(this.dragulaModel);
            }
            else {
                this.drake.models = [this.dragulaModel];
            }
        }
    };
    NovoDragulaElement.prototype.ngOnChanges = function (changes) {
        if (changes && changes.dragulaModel) {
            if (this.drake) {
                if (this.drake.models) {
                    var modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
                    this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
                }
                else {
                    this.drake.models = [changes.dragulaModel.currentValue];
                }
            }
        }
    };
    return NovoDragulaElement;
}());
NovoDragulaElement.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[dragula]'
            },] },
];
/** @nocollapse */
NovoDragulaElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: DragulaService_1.NovoDragulaService, },
]; };
NovoDragulaElement.propDecorators = {
    'bag': [{ type: core_1.Input, args: ['dragula',] },],
    'dragulaModel': [{ type: core_1.Input },],
};
exports.NovoDragulaElement = NovoDragulaElement;
//# sourceMappingURL=Dragula.js.map