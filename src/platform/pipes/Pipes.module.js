"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var Plural_1 = require("./plural/Plural");
var DecodeURI_1 = require("./decode-uri/DecodeURI");
var GroupBy_1 = require("./group-by/GroupBy");
var NovoPipesModule = (function () {
    function NovoPipesModule() {
    }
    return NovoPipesModule;
}());
NovoPipesModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [Plural_1.PluralPipe, DecodeURI_1.DecodeURIPipe, GroupBy_1.GroupByPipe],
                exports: [Plural_1.PluralPipe, DecodeURI_1.DecodeURIPipe, GroupBy_1.GroupByPipe]
            },] },
];
/** @nocollapse */
NovoPipesModule.ctorParameters = function () { return []; };
exports.NovoPipesModule = NovoPipesModule;
//# sourceMappingURL=Pipes.module.js.map