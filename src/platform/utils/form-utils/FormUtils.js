"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var FormControls_1 = require("../../elements/form/FormControls");
var EntityPickerResults_1 = require("../../elements/picker/extras/entity-picker-results/EntityPickerResults");
var Helpers_1 = require("../Helpers");
var NovoFormControl_1 = require("../../elements/form/NovoFormControl");
var FormUtils = (function () {
    function FormUtils() {
    }
    FormUtils.prototype.toFormGroup = function (controls) {
        var group = {};
        controls.forEach(function (control) {
            var value = Helpers_1.Helpers.isBlank(control.value) ? '' : control.value;
            group[control.key] = new NovoFormControl_1.NovoFormControl(value, control);
        });
        return new NovoFormControl_1.NovoFormGroup(group);
    };
    FormUtils.prototype.emptyFormGroup = function () {
        return new NovoFormControl_1.NovoFormGroup({});
    };
    FormUtils.prototype.addControls = function (formGroup, controls) {
        controls.forEach(function (control) {
            var value = Helpers_1.Helpers.isBlank(control.value) ? '' : control.value;
            var formControl = new NovoFormControl_1.NovoFormControl(value, control);
            formGroup.addControl(control.key, formControl);
        });
    };
    /**
     * @name toFormGroupFromFieldset
     * @param fieldsets
     * @returns {NovoFormGroup}
     */
    FormUtils.prototype.toFormGroupFromFieldset = function (fieldsets) {
        var controls = [];
        fieldsets.forEach(function (fieldset) {
            controls.push.apply(controls, fieldset.controls);
        });
        return this.toFormGroup(controls);
    };
    /**
     * @name determineInputType
     * @param field
     * @returns {string}
     */
    FormUtils.prototype.determineInputType = function (field) {
        var type;
        if (field.dataSpecialization === 'DATETIME') {
            type = 'datetime';
        }
        else if (field.dataSpecialization === 'TIME') {
            type = 'time';
        }
        else if (field.dataSpecialization === 'MONEY') {
            type = 'currency';
        }
        else if (field.dataSpecialization === 'PERCENTAGE') {
            type = 'percentage';
        }
        else if (field.dataSpecialization === 'HTML') {
            type = 'editor';
        }
        else if (field.dataSpecialization === 'HTML-MINIMAL') {
            type = 'editor-minimal';
        }
        else if (field.dataSpecialization === 'YEAR') {
            type = 'year';
        }
        else if (field.dataType === 'Timestamp') {
            type = 'date';
        }
        else if (field.dataType === 'Boolean') {
            type = 'tiles';
        }
        else if (field.inputType === 'TEXTAREA') {
            type = 'textarea';
        }
        else if (field.options && ~['CHECKBOX', 'RADIO'].indexOf(field.inputType) && field.multiValue) {
            type = 'checklist';
        }
        else if (field.options && ~['CHECKBOX', 'RADIO'].indexOf(field.inputType) && !field.multiValue) {
            type = 'radio';
        }
        else if (field.options && ~['SELECT'].indexOf(field.inputType) && field.multiValue) {
            type = 'chips';
        }
        else if (field.options && ~['SELECT'].indexOf(field.inputType) && !field.multiValue) {
            type = 'select';
        }
        else if (~['Double', 'BigDecimal'].indexOf(field.dataType)) {
            type = 'float';
        }
        else if (field.options && ~['TILES'].indexOf(field.inputType) && !field.multiValue) {
            type = 'tiles';
        }
        else if (field.type === 'COMPOSITE') {
            type = 'address';
        }
        else if (field.dataType === 'Integer') {
            type = 'number';
        }
        else if (field.type === 'file') {
            type = 'file';
        } /* else {
            throw new Error('FormUtils: This field type is unsupported.');
        }*/
        return type;
    };
    FormUtils.prototype.isFieldEncrypted = function (key) {
        return key.indexOf('customEncrypted') > -1;
    };
    FormUtils.prototype.getControlForField = function (field, http, config, overrides, forTable) {
        if (forTable === void 0) { forTable = false; }
        // TODO: if field.type overrides `determineInputType` we should use it in that method or use this method
        // TODO: (cont.) as the setter of the field argument
        var type = this.determineInputType(field) || field.type;
        var control;
        var controlConfig = {
            type: type,
            key: field.name,
            label: field.label,
            placeholder: field.hint || '',
            required: field.required,
            hidden: !field.required,
            encrypted: this.isFieldEncrypted(field.name ? field.name.toString() : ''),
            value: field.value || field.defaultValue,
            sortOrder: field.sortOrder,
            associatedEntity: field.associatedEntity,
            optionsType: field.optionsType,
            multiple: field.multiValue,
            readOnly: !!field.disabled || !!field.readOnly,
            maxlength: field.maxLength,
            interactions: field.interactions,
            dataSpecialization: field.dataSpecialization,
            description: field.description || '',
            tooltip: field.tooltip,
            tooltipPosition: field.tooltipPosition,
            customControl: field.customControl,
            customControlConfig: field.customControlConfig
        };
        // TODO: getControlOptions should always return the correct format
        var optionsConfig = this.getControlOptions(field, http, config);
        if (Array.isArray(optionsConfig) && !(type === 'chips' || type === 'picker')) {
            controlConfig.options = optionsConfig;
        }
        else if (Array.isArray(optionsConfig) && (type === 'chips' || type === 'picker')) {
            controlConfig.config = {
                options: optionsConfig
            };
        }
        else if (optionsConfig) {
            controlConfig.config = optionsConfig;
        }
        if (type === 'year') {
            controlConfig.maxlength = 4;
        }
        // TODO: Overrides should be an iterable of all properties (potentially a private method)
        var overrideResultsTemplate;
        var overridePreviewTemplate;
        if (overrides && overrides[field.name]) {
            if (overrides[field.name].resultsTemplate) {
                overrideResultsTemplate = overrides[field.name].resultsTemplate;
                controlConfig.config.resultsTemplate = overrideResultsTemplate;
                delete overrides[field.name].resultsTemplate;
            }
            if (overrides[field.name].overridePreviewTemplate) {
                overrideResultsTemplate = overrides[field.name].overridePreviewTemplate;
                controlConfig.config.overridePreviewTemplate = overrideResultsTemplate;
                delete overrides[field.name].overridePreviewTemplate;
            }
            if (overrides[field.name].pickerCallback) {
                controlConfig.config.callback = overrides[field.name].pickerCallback;
            }
            Object.assign(controlConfig, overrides[field.name]);
        }
        switch (type) {
            case 'entitychips':
                // TODO: This doesn't belong in this codebase
                controlConfig.multiple = true;
                controlConfig.config.resultsTemplate = overrideResultsTemplate || EntityPickerResults_1.EntityPickerResults;
                controlConfig.config.previewTemplate = overridePreviewTemplate || EntityPickerResults_1.EntityPickerResult;
                // TODO: When appendToBody picker works better in table/form
                control = forTable ? new FormControls_1.PickerControl(controlConfig) : new FormControls_1.PickerControl(controlConfig);
                break;
            case 'chips':
                controlConfig.multiple = true;
                // TODO: When appendToBody picker works better in table/form
                control = forTable ? new FormControls_1.PickerControl(controlConfig) : new FormControls_1.PickerControl(controlConfig);
                break;
            case 'entitypicker':
                // TODO: This doesn't belong in this codebase
                controlConfig.config.resultsTemplate = overrideResultsTemplate || EntityPickerResults_1.EntityPickerResults;
                // TODO: When appendToBody picker works better in table/form
                control = forTable ? new FormControls_1.PickerControl(controlConfig) : new FormControls_1.PickerControl(controlConfig);
                break;
            case 'picker':
                // TODO: When appendToBody picker works better in table/form
                control = forTable ? new FormControls_1.PickerControl(controlConfig) : new FormControls_1.PickerControl(controlConfig);
                break;
            case 'datetime':
                controlConfig.military = config ? !!config.military : false;
                control = new FormControls_1.DateTimeControl(controlConfig);
                break;
            case 'date':
                controlConfig.military = config ? !!config.military : false;
                control = new FormControls_1.DateControl(controlConfig);
                break;
            case 'time':
                controlConfig.military = config ? !!config.military : false;
                control = new FormControls_1.TimeControl(controlConfig);
                break;
            case 'currency':
            case 'money':
            case 'email':
            case 'percentage':
            case 'float':
            case 'number':
            case 'year':
                // TODO: Only types from `determineInputType` should be used in this class
                if (type === 'money') {
                    type = 'currency';
                }
                controlConfig.type = type;
                control = new FormControls_1.TextBoxControl(controlConfig);
                break;
            case 'text':
                control = new FormControls_1.TextBoxControl(controlConfig);
                break;
            case 'textarea':
                control = new FormControls_1.TextAreaControl(controlConfig);
                break;
            case 'editor':
                control = new FormControls_1.EditorControl(controlConfig);
                break;
            case 'editor-minimal':
                control = new FormControls_1.EditorControl(controlConfig);
                control.minimal = true;
                break;
            case 'tiles':
                control = new FormControls_1.TilesControl(controlConfig);
                break;
            case 'checkbox':
                control = new FormControls_1.CheckboxControl(controlConfig);
                break;
            case 'checklist':
                control = new FormControls_1.CheckListControl(controlConfig);
                break;
            case 'radio':
                control = new FormControls_1.RadioControl(controlConfig);
                break;
            case 'select':
                control = new FormControls_1.SelectControl(controlConfig);
                break;
            case 'address':
                if (field.fields && field.fields.length) {
                    for (var _i = 0, _a = field.fields; _i < _a.length; _i++) {
                        var subfield = _a[_i];
                        if (subfield.defaultValue) {
                            if (Helpers_1.Helpers.isBlank(controlConfig.value)) {
                                controlConfig.value = {};
                            }
                            controlConfig.value[subfield.name] = subfield.defaultValue;
                        }
                        else if (subfield.name === 'countryID') {
                            if (Helpers_1.Helpers.isBlank(controlConfig.value)) {
                                controlConfig.value = {};
                            }
                            controlConfig.value[subfield.name] = 1;
                        }
                    }
                }
                control = new FormControls_1.AddressControl(controlConfig);
                break;
            case 'file':
                control = new FormControls_1.FileControl(controlConfig);
                break;
            default:
                control = new FormControls_1.TextBoxControl(controlConfig);
                break;
        }
        return control;
    };
    FormUtils.prototype.toControls = function (meta, currencyFormat, http, config, overrides, forTable) {
        var _this = this;
        if (forTable === void 0) { forTable = false; }
        var controls = [];
        if (meta && meta.fields) {
            var fields = meta.fields;
            fields.forEach(function (field) {
                if (field.name !== 'id' && (field.dataSpecialization !== 'SYSTEM' || ['address', 'billingAddress', 'secondaryAddress'].indexOf(field.name) !== -1) && !field.readOnly) {
                    var control = _this.getControlForField(field, http, config, overrides, forTable);
                    // Set currency format
                    if (control.subType === 'currency') {
                        control.currencyFormat = currencyFormat;
                    }
                    // Add to controls
                    controls.push(control);
                }
            });
        }
        return controls;
    };
    FormUtils.prototype.toTableControls = function (meta, currencyFormat, http, config, overrides) {
        var controls = this.toControls(meta, currencyFormat, http, config, overrides, true);
        var ret = {};
        controls.forEach(function (control) {
            ret[control.key] = {
                editorType: control.__type,
                editorConfig: control.__config
            };
        });
        return ret;
    };
    FormUtils.prototype.toFieldSets = function (meta, currencyFormat, http, config, overrides) {
        var _this = this;
        var fieldsets = [];
        var ranges = [];
        if (meta && meta.fields) {
            var fields = meta.fields.map(function (field) {
                if (!field.hasOwnProperty('sortOrder')) {
                    field.sortOrder = Number.MAX_SAFE_INTEGER - 1;
                }
                return field;
            }).sort(Helpers_1.Helpers.sortByField(['sortOrder', 'name']));
            if (meta.sectionHeaders && meta.sectionHeaders.length) {
                meta.sectionHeaders.sort(Helpers_1.Helpers.sortByField(['sortOrder', 'name']));
                meta.sectionHeaders.forEach(function (item, i) {
                    if (item.enabled) {
                        if (item.sortOrder > 0 && fieldsets.length === 0) {
                            fieldsets.push({
                                controls: []
                            });
                            ranges.push({
                                min: 0,
                                max: item.sortOrder - 1,
                                fieldsetIdx: 0
                            });
                        }
                        fieldsets.push({
                            title: item.label,
                            icon: item.icon || 'bhi-section',
                            controls: []
                        });
                        ranges.push({
                            min: item.sortOrder,
                            max: Number.MAX_SAFE_INTEGER,
                            fieldsetIdx: fieldsets.length - 1
                        });
                        if (i > 0 && fieldsets.length > 1) {
                            ranges[fieldsets.length - 2].max = item.sortOrder - 1;
                        }
                    }
                });
            }
            else {
                fieldsets.push({
                    controls: []
                });
                ranges.push({
                    min: 0,
                    max: Number.MAX_SAFE_INTEGER,
                    fieldsetIdx: 0
                });
            }
            fields.forEach(function (field) {
                if (field.name !== 'id' && (field.dataSpecialization !== 'SYSTEM' || ['address', 'billingAddress', 'secondaryAddress'].indexOf(field.name) !== -1) && !field.readOnly) {
                    var control = _this.getControlForField(field, http, config, overrides);
                    // Set currency format
                    if (control.subType === 'currency') {
                        control.currencyFormat = currencyFormat;
                    }
                    var location_1 = ranges.find(function (item) {
                        return (item.min <= field.sortOrder && field.sortOrder <= item.max) || (item.min <= field.sortOrder && item.min === item.max);
                    });
                    if (location_1) {
                        // Add to controls
                        fieldsets[location_1.fieldsetIdx].controls.push(control);
                    }
                }
            });
        }
        if (fieldsets.length > 0) {
            return fieldsets;
        }
        else {
            return [{
                    controls: this.toControls(meta, currencyFormat, http, config)
                }];
        }
    };
    FormUtils.prototype.getControlOptions = function (field, http, config) {
        // TODO: The token property of config is the only property used; just pass in `token: string`
        if (field.dataType === 'Boolean' && !field.options) {
            // TODO: dataType should only be determined by `determineInputType` which doesn't ever return 'Boolean' it
            // TODO: (cont.) returns `tiles`
            return [
                { value: false, label: 'No' },
                { value: true, label: 'Yes' }
            ];
        }
        else if (field.optionsUrl) {
            return {
                field: 'value',
                format: '$label',
                options: function (query) {
                    // TODO: should return Observable
                    return new Promise(function (resolve, reject) {
                        if (query && query.length) {
                            http.get(field.optionsUrl + "?filter=" + (query || '') + "&BhRestToken=" + config.token)
                                .map(function (response) { return response.json().data; })
                                .subscribe(resolve, reject);
                        }
                        else {
                            resolve([]);
                        }
                    });
                }
            };
        }
        else if (Array.isArray(field.options) && field.type === 'chips') {
            var options = field.options;
            return {
                field: 'value',
                format: '$label',
                options: options
            };
        }
        else if (field.options) {
            return field.options;
        }
        return null;
    };
    FormUtils.prototype.setInitialValues = function (controls, values, keepClean, keyOverride) {
        for (var i = 0; i < controls.length; i++) {
            var control = controls[i];
            var key = keyOverride ? control.key.replace(keyOverride, '') : control.key;
            var value = values[key];
            if (Helpers_1.Helpers.isBlank(value)) {
                continue;
            }
            if (Array.isArray(value) && value.length === 0) {
                continue;
            }
            if (Array.isArray(value) && value.length > 0) {
                value = value.filter(function (val) { return !(Object.keys(val).length === 0 && val.constructor === Object); });
                if (value.length === 0) {
                    continue;
                }
            }
            if (value.data && value.data.length === 0) {
                continue;
            }
            if (Object.keys(value).length === 0 && value.constructor === Object) {
                continue;
            }
            control.value = value;
            // TODO: keepClean is not required, but is always used. It should default (to true?)
            control.dirty = !keepClean;
        }
    };
    FormUtils.prototype.setInitialValuesFieldsets = function (fieldsets, values, keepClean) {
        var _this = this;
        fieldsets.forEach(function (fieldset) {
            _this.setInitialValues(fieldset.controls, values, keepClean);
        });
    };
    FormUtils.prototype.forceShowAllControls = function (controls) {
        controls.forEach(function (control) {
            control.hidden = false;
        });
    };
    FormUtils.prototype.forceShowAllControlsInFieldsets = function (fieldsets) {
        fieldsets.forEach(function (fieldset) {
            fieldset.controls.forEach(function (control) {
                control.hidden = false;
            });
        });
    };
    FormUtils.prototype.forceValidation = function (form) {
        Object.keys(form.controls).forEach(function (key) {
            var control = form.controls[key];
            if (control.required && Helpers_1.Helpers.isBlank(form.value[control.key])) {
                control.markAsDirty();
                control.markAsTouched();
            }
        });
    };
    return FormUtils;
}());
FormUtils.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
FormUtils.ctorParameters = function () { return []; };
exports.FormUtils = FormUtils;
//# sourceMappingURL=FormUtils.js.map