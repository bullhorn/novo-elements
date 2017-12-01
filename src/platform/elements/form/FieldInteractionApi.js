"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
// Vendor
require("rxjs/add/operator/map");
// APP
var NovoFormControl_1 = require("./NovoFormControl");
var FormUtils_1 = require("../../utils/form-utils/FormUtils");
var ToastService_1 = require("../toast/ToastService");
var ModalService_1 = require("../modal/ModalService");
var FieldInteractionModals_1 = require("./FieldInteractionModals");
var Helpers_1 = require("../../utils/Helpers");
var novo_label_service_1 = require("../../services/novo-label-service");
var FieldInteractionApi = (function () {
    function FieldInteractionApi(toaster, modalService, formUtils, http, labels) {
        this.toaster = toaster;
        this.modalService = modalService;
        this.formUtils = formUtils;
        this.http = http;
        this.labels = labels;
    }
    Object.defineProperty(FieldInteractionApi.prototype, "form", {
        get: function () {
            return this._form;
        },
        set: function (form) {
            this._form = form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldInteractionApi.prototype, "associations", {
        get: function () {
            return this.form.hasOwnProperty('associations') ? this.form.associations : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldInteractionApi.prototype, "currentEntity", {
        get: function () {
            return this.form.hasOwnProperty('currentEntity') ? this.form.currentEntity : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldInteractionApi.prototype, "currentEntityId", {
        get: function () {
            return this.form.hasOwnProperty('currentEntityId') ? this.form.currentEntityId : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldInteractionApi.prototype, "isEdit", {
        get: function () {
            return this.form.hasOwnProperty('edit') ? this.form.edit : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldInteractionApi.prototype, "isAdd", {
        get: function () {
            return this.form.hasOwnProperty('edit') ? !this.form.edit : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldInteractionApi.prototype, "globals", {
        get: function () {
            return this._globals;
        },
        set: function (globals) {
            this._globals = globals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldInteractionApi.prototype, "currentKey", {
        get: function () {
            return this._currentKey;
        },
        set: function (key) {
            this._currentKey = key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldInteractionApi.prototype, "appBridge", {
        get: function () {
            return this._appBridge;
        },
        set: function (appBridge) {
            this._appBridge = appBridge;
        },
        enumerable: true,
        configurable: true
    });
    FieldInteractionApi.prototype.isActiveControlValid = function () {
        return !!this.getValue(this.currentKey);
    };
    FieldInteractionApi.prototype.getActiveControl = function () {
        return this.getControl(this.currentKey);
    };
    FieldInteractionApi.prototype.getActiveKey = function () {
        return this.currentKey;
    };
    FieldInteractionApi.prototype.getActiveValue = function () {
        return this.getValue(this.currentKey);
    };
    FieldInteractionApi.prototype.getActiveInitialValue = function () {
        return this.getInitialValue(this.currentKey);
    };
    FieldInteractionApi.prototype.getControl = function (key) {
        if (!key) {
            console.error('[FieldInteractionAPI] - invalid or missing "key"'); // tslint:disable-line
            return null;
        }
        var control = this.form.controls[key];
        if (!control) {
            console.error('[FieldInteractionAPI] - could not find a control in the form by the key --', key); // tslint:disable-line
            return null;
        }
        return control;
    };
    FieldInteractionApi.prototype.getValue = function (key) {
        var control = this.getControl(key);
        if (control) {
            return control.value;
        }
        return null;
    };
    FieldInteractionApi.prototype.getRawValue = function (key) {
        var control = this.getControl(key);
        if (control) {
            return control.rawValue;
        }
        return null;
    };
    FieldInteractionApi.prototype.getInitialValue = function (key) {
        var control = this.getControl(key);
        if (control) {
            return control.initialValue;
        }
        return null;
    };
    FieldInteractionApi.prototype.setValue = function (key, value, options) {
        var control = this.getControl(key);
        if (control) {
            control.setValue(value, options);
        }
    };
    FieldInteractionApi.prototype.patchValue = function (key, value, options) {
        var control = this.getControl(key);
        if (control) {
            control.setValue(value, options);
        }
    };
    FieldInteractionApi.prototype.setReadOnly = function (key, isReadOnly) {
        var control = this.getControl(key);
        if (control) {
            control.setReadOnly(isReadOnly);
        }
    };
    FieldInteractionApi.prototype.setRequired = function (key, required) {
        var control = this.getControl(key);
        if (control) {
            control.setRequired(required);
        }
    };
    FieldInteractionApi.prototype.hide = function (key, clearValue) {
        if (clearValue === void 0) { clearValue = true; }
        var control = this.getControl(key);
        if (control) {
            control.hide(clearValue);
            this.disable(key, { emitEvent: false });
        }
    };
    FieldInteractionApi.prototype.show = function (key) {
        var control = this.getControl(key);
        if (control) {
            control.show();
            this.enable(key, { emitEvent: false });
        }
    };
    FieldInteractionApi.prototype.disable = function (key, options) {
        var control = this.getControl(key);
        if (control) {
            control.disable(options);
        }
    };
    FieldInteractionApi.prototype.enable = function (key, options) {
        var control = this.getControl(key);
        if (control) {
            control.enable(options);
        }
    };
    FieldInteractionApi.prototype.markAsInvalid = function (key, validationMessage) {
        var control = this.getControl(key);
        if (control) {
            if (control) {
                control.markAsInvalid(validationMessage);
            }
        }
    };
    FieldInteractionApi.prototype.markAsDirty = function (key, options) {
        var control = this.getControl(key);
        if (control) {
            control.markAsDirty(options);
        }
    };
    FieldInteractionApi.prototype.markAsPending = function (key, options) {
        var control = this.getControl(key);
        if (control) {
            control.markAsPending(options);
        }
    };
    FieldInteractionApi.prototype.markAsPristine = function (key, options) {
        var control = this.getControl(key);
        if (control) {
            control.markAsPristine(options);
        }
    };
    FieldInteractionApi.prototype.markAsTouched = function (key, options) {
        var control = this.getControl(key);
        if (control) {
            control.markAsTouched(options);
        }
    };
    FieldInteractionApi.prototype.markAsUntouched = function (key, options) {
        var control = this.getControl(key);
        if (control) {
            control.markAsUntouched(options);
        }
    };
    FieldInteractionApi.prototype.updateValueAndValidity = function (key, options) {
        var control = this.getControl(key);
        if (control) {
            control.updateValueAndValidity(options);
        }
    };
    FieldInteractionApi.prototype.displayToast = function (toastConfig) {
        if (this.toaster) {
            this.toaster.alert(toastConfig);
        }
    };
    FieldInteractionApi.prototype.displayTip = function (key, tip, icon, allowDismiss) {
        var control = this.getControl(key);
        if (control) {
            control.tipWell = {
                tip: tip,
                icon: icon,
                button: allowDismiss
            };
        }
    };
    FieldInteractionApi.prototype.confirmChanges = function (key, message) {
        var _this = this;
        var history = this.getProperty(key, 'valueHistory');
        var oldValue = history[history.length - 2];
        var newValue = this.getValue(key);
        var label = this.getProperty(key, 'label');
        document.activeElement.blur();
        return this.modalService.open(FieldInteractionModals_1.ControlConfirmModal, { oldValue: oldValue, newValue: newValue, label: label, message: message, key: key }).onClosed.then(function (result) {
            if (!result) {
                _this.setValue(key, oldValue, { emitEvent: false });
            }
        });
    };
    FieldInteractionApi.prototype.promptUser = function (key, changes) {
        var showYes = true;
        document.activeElement.blur();
        return this.modalService.open(FieldInteractionModals_1.ControlPromptModal, { changes: changes }).onClosed;
    };
    FieldInteractionApi.prototype.setProperty = function (key, prop, value) {
        var control = this.getControl(key);
        if (control) {
            control[prop] = value;
        }
    };
    FieldInteractionApi.prototype.getProperty = function (key, prop) {
        var control = this.getControl(key);
        if (control) {
            return control[prop];
        }
        return null;
    };
    FieldInteractionApi.prototype.isValueEmpty = function (key) {
        var value = this.getValue(key);
        return Helpers_1.Helpers.isEmpty(value);
    };
    FieldInteractionApi.prototype.isValueBlank = function (key) {
        var value = this.getValue(key);
        return Helpers_1.Helpers.isBlank(value);
    };
    FieldInteractionApi.prototype.hasField = function (key) {
        return !!this.form.controls[key];
    };
    FieldInteractionApi.prototype.addStaticOption = function (key, newOption) {
        var control = this.getControl(key);
        var optionToAdd = newOption;
        if (control) {
            var currentOptions = this.getProperty(key, 'options');
            if (!currentOptions || !currentOptions.length) {
                var config = this.getProperty(key, 'config');
                if (config) {
                    currentOptions = config.options;
                    if (currentOptions && Array.isArray(currentOptions)) {
                        if (currentOptions[0].value && !optionToAdd.value) {
                            optionToAdd = { value: newOption, label: newOption };
                        }
                        config.options = currentOptions.concat([optionToAdd]);
                        this.setProperty(key, 'config', config);
                    }
                }
            }
            else {
                if (currentOptions[0].value && !optionToAdd.value) {
                    optionToAdd = { value: newOption, label: newOption };
                }
                this.setProperty(key, 'options', currentOptions.concat([optionToAdd]));
            }
        }
    };
    FieldInteractionApi.prototype.removeStaticOption = function (key, optionToRemove) {
        var control = this.getControl(key);
        if (control) {
            var currentOptions = this.getProperty(key, 'options');
            if (!currentOptions || !currentOptions.length) {
                var config = this.getProperty(key, 'config');
                if (config) {
                    currentOptions = config.options;
                    if (currentOptions && Array.isArray(currentOptions)) {
                        var index_1 = -1;
                        currentOptions.forEach(function (opt, i) {
                            if (opt.value || opt.label) {
                                if (opt.value === optionToRemove || opt.label === optionToRemove) {
                                    index_1 = i;
                                }
                            }
                            else {
                                if (opt === optionToRemove) {
                                    index_1 = i;
                                }
                            }
                        });
                        if (index_1 !== -1) {
                            currentOptions.splice(index_1, 1);
                        }
                        config.options = currentOptions.slice();
                        this.setProperty(key, 'config', config);
                    }
                }
            }
            else {
                var index_2 = -1;
                currentOptions.forEach(function (opt, i) {
                    if (opt.value || opt.label) {
                        if (opt.value === optionToRemove || opt.label === optionToRemove) {
                            index_2 = i;
                        }
                    }
                    else {
                        if (opt === optionToRemove) {
                            index_2 = i;
                        }
                    }
                });
                if (index_2 !== -1) {
                    currentOptions.splice(index_2, 1);
                }
                this.setProperty(key, 'options', currentOptions.slice());
            }
        }
    };
    FieldInteractionApi.prototype.modifyPickerConfig = function (key, config, mapper) {
        var _this = this;
        var control = this.getControl(key);
        if (control) {
            var newConfig = Object.assign({}, control.config);
            if (config.optionsUrl || config.optionsUrlBuilder || config.optionsPromise) {
                newConfig = {
                    format: config.format,
                    options: function (query) {
                        if (config.optionsPromise) {
                            return config.optionsPromise(query, _this.http);
                        }
                        return new Promise(function (resolve, reject) {
                            var url = config.optionsUrlBuilder ? config.optionsUrlBuilder(query) : config.optionsUrl + "?filter=" + (query || '');
                            if (query && query.length) {
                                _this.http
                                    .get(url)
                                    .map(function (res) {
                                    if (res.json) {
                                        return res.json();
                                    }
                                    return res;
                                })
                                    .map(function (results) {
                                    if (mapper) {
                                        return results.map(mapper);
                                    }
                                    return results;
                                })
                                    .subscribe(resolve, reject);
                            }
                            else {
                                resolve([]);
                            }
                        });
                    }
                };
            }
            else if (config.options) {
                newConfig.options = config.options.slice();
            }
            this.setProperty(key, 'config', newConfig);
        }
    };
    FieldInteractionApi.prototype.setLoading = function (key, loading) {
        var _this = this;
        var control = this.getControl(key);
        if (control) {
            if (loading) {
                this.form.controls[key].fieldInteractionloading = true;
                control.setErrors({ 'loading': true });
                // History
                clearTimeout(this.asyncBlockTimeout);
                this.asyncBlockTimeout = setTimeout(function () {
                    _this.setLoading(key, false);
                    _this.displayTip(key, _this.labels.asyncFailure, 'info', false);
                    _this.setProperty(key, '_displayedAsyncFailure', true);
                }, 10000);
            }
            else {
                this.form.controls[key].fieldInteractionloading = false;
                clearTimeout(this.asyncBlockTimeout);
                control.setErrors({ 'loading': null });
                control.updateValueAndValidity({ emitEvent: false });
                if (this.getProperty(key, '_displayedAsyncFailure')) {
                    this.setProperty(key, 'tipWell', null);
                }
            }
        }
    };
    FieldInteractionApi.prototype.addControl = function (key, metaForNewField, position, initialValue) {
        if (position === void 0) { position = FieldInteractionApi.FIELD_POSITIONS.ABOVE_FIELD; }
        if (!metaForNewField.key && !metaForNewField.name) {
            console.error('[FieldInteractionAPI] - missing "key" in meta for new field'); // tslint:disable-line
            return null;
        }
        if (!metaForNewField.key) {
            // If key is not explicitly declared, use name as key
            metaForNewField.key = metaForNewField.name;
        }
        if (this.form.controls[metaForNewField.key]) {
            // Field is already on the form
            return null;
        }
        var control = this.form.controls[key];
        var fieldsetIndex, controlIndex;
        if (control) {
            fieldsetIndex = -1;
            controlIndex = -1;
            this.form.fieldsets.forEach(function (fieldset, fi) {
                fieldset.controls.forEach(function (fieldsetControl, ci) {
                    if (fieldsetControl.key === key) {
                        fieldsetIndex = fi;
                        controlIndex = ci;
                    }
                });
            });
            // Change the position of the newly added field
            switch (position) {
                case FieldInteractionApi.FIELD_POSITIONS.ABOVE_FIELD:
                    // Adding field above active field
                    // index can stay the same
                    break;
                case FieldInteractionApi.FIELD_POSITIONS.BELOW_FIELD:
                    // Adding field below active field
                    controlIndex += 1;
                    break;
                case FieldInteractionApi.FIELD_POSITIONS.TOP_OF_FORM:
                    // Adding field to the top of the form
                    controlIndex = 0;
                    fieldsetIndex = 0;
                    break;
                case FieldInteractionApi.FIELD_POSITIONS.BOTTOM_OF_FORM:
                    // Adding field to the bottom of the form
                    fieldsetIndex = this.form.fieldsets.length - 1;
                    controlIndex = this.form.fieldsets[fieldsetIndex].controls.length;
                    break;
                default:
                    break;
            }
            if (fieldsetIndex !== -1 && controlIndex !== -1) {
                var novoControl = this.formUtils.getControlForField(metaForNewField, this.http, {});
                novoControl.hidden = false;
                var formControl = new NovoFormControl_1.NovoFormControl(initialValue, novoControl);
                this.form.addControl(novoControl.key, formControl);
                this.form.fieldsets[fieldsetIndex].controls.splice(controlIndex, 0, novoControl);
            }
        }
    };
    FieldInteractionApi.prototype.removeControl = function (key) {
        if (!this.form.controls[key]) {
            // Field is not on the form
            return null;
        }
        var control = this.getControl(key);
        if (control) {
            var fieldsetIndex_1 = -1;
            var controlIndex_1 = -1;
            this.form.fieldsets.forEach(function (fieldset, fi) {
                fieldset.controls.forEach(function (fieldsetControl, ci) {
                    if (fieldsetControl.key === key) {
                        fieldsetIndex_1 = fi;
                        controlIndex_1 = ci;
                    }
                });
            });
            if (fieldsetIndex_1 !== -1 && controlIndex_1 !== -1) {
                this.form.removeControl(key);
                this.form.fieldsets[fieldsetIndex_1].controls.splice(controlIndex_1, 1);
            }
        }
    };
    FieldInteractionApi.prototype.debounce = function (func, wait) {
        if (wait === void 0) { wait = 50; }
        var h;
        clearTimeout(h);
        h = setTimeout(function () { return func(); }, wait);
    };
    return FieldInteractionApi;
}());
FieldInteractionApi.FIELD_POSITIONS = {
    ABOVE_FIELD: 'ABOVE_FIELD',
    BELOW_FIELD: 'BELOW_FIELD',
    TOP_OF_FORM: 'TOP_OF_FORM',
    BOTTOM_OF_FORM: 'BOTTOM_OF_FORM'
};
FieldInteractionApi.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
FieldInteractionApi.ctorParameters = function () { return [
    { type: ToastService_1.NovoToastService, },
    { type: ModalService_1.NovoModalService, },
    { type: FormUtils_1.FormUtils, },
    { type: http_1.Http, },
    { type: novo_label_service_1.NovoLabelService, },
]; };
exports.FieldInteractionApi = FieldInteractionApi;
//# sourceMappingURL=FieldInteractionApi.js.map