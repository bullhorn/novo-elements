"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// APP
var Countries_1 = require("../../../../utils/countries/Countries");
var novo_label_service_1 = require("../../../../services/novo-label-service");
// Value accessor for the component (supports ngModel)
var ADDRESS_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoAddressElement; }),
    multi: true
};
var NovoAddressElement = (function () {
    function NovoAddressElement(labels) {
        this.labels = labels;
        this.states = [];
        this.countries = Countries_1.getCountries();
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
    }
    NovoAddressElement.prototype.ngOnInit = function () {
        if (this.model) {
            this.writeValue(this.model);
            this.updateControl();
        }
        else if (!this.model) {
            this.model = {};
        }
    };
    NovoAddressElement.prototype.onCountryChange = function (evt) {
        var country = Countries_1.findByCountryName(evt);
        if (country) {
            this.model.countryName = country.name;
            this.model.countryCode = country.code;
            this.model.countryID = country.id;
            this.updateStates();
        }
        // Update state
        this.model.state = undefined;
        this.updateControl();
    };
    NovoAddressElement.prototype.onStateChange = function (evt) {
        this.model.state = evt;
        this.updateControl();
    };
    NovoAddressElement.prototype.updateStates = function () {
        if (this.model.countryName) {
            this.states = Countries_1.getStates(this.model.countryName);
        }
        else {
            this.states = [];
        }
    };
    NovoAddressElement.prototype.updateControl = function () {
        this.onModelChange(this.model);
    };
    NovoAddressElement.prototype.writeValue = function (model) {
        if (model) {
            var countryName = void 0;
            if (model.countryName) {
                countryName = model.countryName;
            }
            else if (model.countryID) {
                var country = Countries_1.findByCountryId(model.countryID);
                if (country) {
                    countryName = country.name;
                }
                ;
            }
            if (countryName) {
                countryName = countryName.trim();
                model.state = model.state || '';
                var stateObj = Countries_1.getStateObjects(countryName).find(function (state) {
                    return state.code === model.state.replace(/\W+/g, '').toUpperCase() || state.name === model.state;
                }) || {};
                this.model = Object.assign(model, { countryName: countryName, state: stateObj.name });
                this.updateStates();
            }
        }
    };
    NovoAddressElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoAddressElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    return NovoAddressElement;
}());
NovoAddressElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-address',
                providers: [ADDRESS_VALUE_ACCESSOR],
                template: "\n        <input type=\"text\" class=\"street-address\" id=\"address1\" name=\"address1\" placeholder=\"{{ labels.address }}\" [(ngModel)]=\"model.address1\" (ngModelChange)=\"updateControl()\"/>\n        <input type=\"text\" class=\"apt suite\" id=\"address2\" name=\"address2\" placeholder=\"{{ labels.apt }}\" [(ngModel)]=\"model.address2\" (ngModelChange)=\"updateControl()\"/>\n        <input type=\"text\" class=\"city locality\" id=\"city\" name=\"city\" placeholder=\"{{ labels.city }}\" [(ngModel)]=\"model.city\" (ngModelChange)=\"updateControl()\"/>\n        <novo-select class=\"state region\" id=\"state\" [options]=\"states\" placeholder=\"{{ labels.state }}\" [(ngModel)]=\"model.state\" (ngModelChange)=\"onStateChange($event)\"></novo-select>\n        <input type=\"text\" class=\"zip postal-code\" id=\"zip\" name=\"zip\" placeholder=\"{{ labels.zipCode }}\" [(ngModel)]=\"model.zip\" (ngModelChange)=\"updateControl()\"/>\n        <novo-select class=\"country-name\" id=\"country\" [options]=\"countries\" placeholder=\"{{ labels.country }}\" [(ngModel)]=\"model.countryName\" (ngModelChange)=\"onCountryChange($event)\"></novo-select>\n    "
            },] },
];
/** @nocollapse */
NovoAddressElement.ctorParameters = function () { return [
    { type: novo_label_service_1.NovoLabelService, },
]; };
exports.NovoAddressElement = NovoAddressElement;
//# sourceMappingURL=Address.js.map