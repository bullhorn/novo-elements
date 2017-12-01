"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var places_component_1 = require("./places.component");
var places_service_1 = require("./places.service");
var List_module_1 = require("../list/List.module");
var GooglePlacesModule = (function () {
    function GooglePlacesModule() {
    }
    return GooglePlacesModule;
}());
GooglePlacesModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    places_component_1.PlacesListComponent
                ],
                imports: [
                    common_1.CommonModule,
                    http_1.HttpModule,
                    forms_1.FormsModule,
                    List_module_1.NovoListModule
                ],
                exports: [
                    places_component_1.PlacesListComponent
                ],
                providers: [
                    { provide: places_service_1.GooglePlacesService, useClass: places_service_1.GooglePlacesService },
                ]
            },] },
];
/** @nocollapse */
GooglePlacesModule.ctorParameters = function () { return []; };
exports.GooglePlacesModule = GooglePlacesModule;
//# sourceMappingURL=places.module.js.map