// NG2
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// APP
import { NovoFormControl } from './NovoFormControl';
import { NovoControlConfig } from './FormControls';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { NovoToastService } from '../toast/ToastService';
import { NovoModalService } from '../modal/ModalService';
import { ControlConfirmModal } from './ControlConfirmModal';
import { Helpers } from '../../utils/Helpers';
import { AppBridge } from '../../utils/app-bridge/AppBridge';
import { NovoLabelService } from '../../services/novo-label-service';

@Injectable()
export class FieldInteractionApi {
    private _globals: any;
    private _form: any;
    private _currentKey: string;
    private _appBridge: AppBridge;
    private asyncBlockTimeout: any;

    public static FIELD_POSITIONS = {
        ABOVE_FIELD: 'ABOVE_FIELD',
        BELOW_FIELD: 'BELOW_FIELD',
        TOP_OF_FORM: 'TOP_OF_FORM',
        BOTTOM_OF_FORM: 'BOTTOM_OF_FORM'
    };

    constructor(private toaster: NovoToastService, private modalService: NovoModalService,
        private formUtils: FormUtils, private http: Http, private labels: NovoLabelService) {
    }

    set form(form: any) {
        this._form = form;
    }

    get form(): any {
        return this._form;
    }

    set globals(globals: any) {
        this._globals = globals;
    }

    get globals(): any {
        return this._globals;
    }

    set currentKey(key: string) {
        this._currentKey = key;
    }

    get currentKey(): string {
        return this._currentKey;
    }

    set appBridge(appBridge: AppBridge) {
        this._appBridge = appBridge;
    }

    get appBridge(): AppBridge {
        return this._appBridge;
    }

    public isActiveControlValid(): boolean {
        return !!this.getValue(this.currentKey);
    }

    public getActiveControl(): NovoFormControl {
        return this.getControl(this.currentKey);
    }

    public getActiveKey(): string {
        return this.currentKey;
    }

    public getActiveValue(): any {
        return this.getValue(this.currentKey);
    }

    public getActiveInitialValue(): any {
        return this.getInitialValue(this.currentKey);
    }

    public getControl(key: string): NovoFormControl {
        if (!key) {
            console.error('[FieldInteractionAPI] - invalid or missing "key"'); // tslint:disable-line
            return null;
        }

        let control = this.form.controls[key];
        if (!control) {
            console.error('[FieldInteractionAPI] - could not find a control in the form by the key --', key); // tslint:disable-line
            return null;
        }

        return (control as NovoFormControl);
    }

    public getValue(key: string): any {
        let control = this.getControl(key);
        if (control) {
            return control.value;
        }
        return null;
    }

    public getInitialValue(key: string): any {
        let control = this.getControl(key);
        if (control) {
            return control.initialValue;
        }
        return null;
    }

    public setValue(key: string, value: any, options?: {
        onlySelf?: boolean,
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
        emitViewToModelChange?: boolean
    }): void {
        let control = this.getControl(key);
        if (control) {
            control.setValue(value, options);
        }
    }

    public patchValue(key: string, value: any, options?: {
        onlySelf?: boolean,
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
        emitViewToModelChange?: boolean
    }): void {
        let control = this.getControl(key);
        if (control) {
            control.setValue(value, options);
        }
    }

    public setReadOnly(key: string, isReadOnly: boolean): void {
        let control = this.getControl(key);
        if (control) {
            control.setReadOnly(isReadOnly);
        }
    }

    public setRequired(key: string, required: boolean): void {
        let control = this.getControl(key);
        if (control) {
            control.setRequired(required);
        }
    }

    public hide(key: string, clearValue: boolean = true): void {
        let control = this.getControl(key);
        if (control) {
            control.hide(clearValue);
        }
    }

    public show(key: string): void {
        let control = this.getControl(key);
        if (control) {
            control.show();
        }
    }

    public disable(key: string, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
        let control = this.getControl(key);
        if (control) {
            control.disable(options);
        }
    }

    public enable(key: string, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
        let control = this.getControl(key);
        if (control) {
            control.enable(options);
        }
    }

    public markAsInvalid(key: string, validationMessage?: string): void {
        let control = this.getControl(key);
        if (control) {
            if (control) {
                control.markAsInvalid(validationMessage);
            }
        }
    }

    public markAsDirty(key: string, options?: {
        onlySelf?: boolean;
    }): void {
        let control = this.getControl(key);
        if (control) {
            control.markAsDirty(options);
        }
    }

    public markAsPending(key: string, options?: {
        onlySelf?: boolean;
    }): void {
        let control = this.getControl(key);
        if (control) {
            control.markAsPending(options);
        }
    }

    public markAsPristine(key: string, options?: {
        onlySelf?: boolean;
    }): void {
        let control = this.getControl(key);
        if (control) {
            control.markAsPristine(options);
        }
    }

    public markAsTouched(key: string, options?: {
        onlySelf?: boolean;
    }): void {
        let control = this.getControl(key);
        if (control) {
            control.markAsTouched(options);
        }
    }

    public markAsUntouched(key: string, options?: {
        onlySelf?: boolean;
    }): void {
        let control = this.getControl(key);
        if (control) {
            control.markAsUntouched(options);
        }
    }

    public updateValueAndValidity(key: string, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
        let control = this.getControl(key);
        if (control) {
            control.updateValueAndValidity(options);
        }
    }

    public displayToast(toastConfig: {
        message: string,
        title?: string,
        hideDelay?: number,
        icon?: string,
        theme?: string,
        position?: string,
        isCloseable?: boolean,
        customClass?: string
    }): void {
        if (this.toaster) {
            this.toaster.alert(toastConfig);
        }
    }

    public displayTip(key: string, tip: string, icon?: string, allowDismiss?: boolean): void {
        let control = this.getControl(key);
        if (control) {
            control.tipWell = {
                tip: tip,
                icon: icon,
                button: allowDismiss
            };
        }
    }

    public confirmChanges(key: string, message?: string): Promise<boolean> {
        let history = this.getProperty(key, 'valueHistory');
        let oldValue = history[history.length - 2];
        let newValue = this.getValue(key);
        let label = this.getProperty(key, 'label');
        return this.modalService.open(ControlConfirmModal, { oldValue, newValue, label, message, key }).onClosed.then(result => {
            if (!result) {
                this.setValue(key, oldValue, { emitEvent: false });
            }
        });
    }

    public setProperty(key: string, prop: string, value: any): void {
        let control = this.getControl(key);
        if (control) {
            control[prop] = value;
        }
    }

    public getProperty(key: string, prop: string): any {
        let control = this.getControl(key);
        if (control) {
            return control[prop];
        }
        return null;
    }

    public isValueEmpty(key: string): boolean {
        let value = this.getValue(key);
        return Helpers.isEmpty(value);
    }

    public isValueBlank(key: string): boolean {
        let value = this.getValue(key);
        return Helpers.isBlank(value);
    }

    public hasField(key: string): boolean {
        return !!this.form.controls[key];
    }

    public addStaticOption(key: string, newOption: any): void {
        let control = this.getControl(key);
        let optionToAdd = newOption;
        if (control) {
            let currentOptions = this.getProperty(key, 'options');
            if (!currentOptions || !currentOptions.length) {
                let config = this.getProperty(key, 'config');
                if (config) {
                    currentOptions = config.options;
                    if (currentOptions && Array.isArray(currentOptions)) {
                        if (currentOptions[0].value && !optionToAdd.value) {
                            optionToAdd = { value: newOption, label: newOption };
                        }
                        config.options = [...currentOptions, optionToAdd];
                        this.setProperty(key, 'config', config);
                    }
                }
            } else {
                if (currentOptions[0].value && !optionToAdd.value) {
                    optionToAdd = { value: newOption, label: newOption };
                }
                this.setProperty(key, 'options', [...currentOptions, optionToAdd]);
            }
        }
    }

    public removeStaticOption(key: string, optionToRemove: string): void {
        let control = this.getControl(key);
        if (control) {
            let currentOptions = this.getProperty(key, 'options');
            if (!currentOptions || !currentOptions.length) {
                let config = this.getProperty(key, 'config');
                if (config) {
                    currentOptions = config.options;
                    if (currentOptions && Array.isArray(currentOptions)) {
                        let index = -1;
                        currentOptions.forEach((opt, i) => {
                            if (opt.value || opt.label) {
                                if (opt.value === optionToRemove || opt.label === optionToRemove) {
                                    index = i;
                                }
                            } else {
                                if (opt === optionToRemove) {
                                    index = i;
                                }
                            }
                        });
                        if (index !== -1) {
                            currentOptions.splice(index, 1);
                        }
                        config.options = [...currentOptions];
                        this.setProperty(key, 'config', config);
                    }
                }
            } else {
                let index = -1;
                currentOptions.forEach((opt, i) => {
                    if (opt.value || opt.label) {
                        if (opt.value === optionToRemove || opt.label === optionToRemove) {
                            index = i;
                        }
                    } else {
                        if (opt === optionToRemove) {
                            index = i;
                        }
                    }
                });
                if (index !== -1) {
                    currentOptions.splice(index, 1);
                }
                this.setProperty(key, 'options', [...currentOptions]);
            }
        }
    }

    public modifyPickerConfig(key: string, config: { format?: string, optionsUrl?: string, optionsUrlBuilder?: Function, optionsPromise?: any, options?: any[] }, mapper?: Function): void {
        let control = this.getControl(key);
        if (control) {
            let newConfig: any = Object.assign({}, control.config);
            if (config.optionsUrl || config.optionsUrlBuilder || config.optionsPromise) {
                newConfig = {
                    format: config.format,
                    options: (query) => {
                        if (config.optionsPromise) {
                            return config.optionsPromise(query, this.http);
                        }
                        return new Promise((resolve, reject) => {
                            let url = config.optionsUrlBuilder ? config.optionsUrlBuilder(query) : `${config.optionsUrl}?filter=${query || ''}`;
                            if (query && query.length) {
                                this.http
                                    .get(url)
                                    .map(res => {
                                        if (res.json) {
                                            return res.json();
                                        }
                                        return res;
                                    })
                                    .map(results => {
                                        if (mapper) {
                                            return results.map(mapper);
                                        }
                                        return results;
                                    })
                                    .subscribe(resolve, reject);
                            } else {
                                resolve([]);
                            }
                        });
                    }
                };
            } else if (config.options) {
                newConfig.options = [...config.options];
            }
            this.setProperty(key, 'config', newConfig);
        }
    }

    public setLoading(key: string, loading: boolean) {
        let control = this.getControl(key);
        if (control) {
            if (loading) {
                control.setErrors({ 'loading': true });
                // History
                clearTimeout(this.asyncBlockTimeout);
                this.asyncBlockTimeout = setTimeout(() => {
                    this.setLoading(key, false);
                    this.displayTip(key, this.labels.asyncFailure, 'info', false);
                    this.setProperty(key, '_displayedAsyncFailure', true);
                }, 10000);
            } else {
                clearTimeout(this.asyncBlockTimeout);
                control.setErrors({ 'loading': null });
                control.updateValueAndValidity({ emitEvent: false });
                if (this.getProperty(key, '_displayedAsyncFailure')) {
                    this.setProperty(key, 'tipWell', null);
                }
            }
        }
    }

    public addControl(key: string, metaForNewField: any, position: string = FieldInteractionApi.FIELD_POSITIONS.ABOVE_FIELD, initialValue?: any): void {
        let control = this.getControl(key);
        if (control) {
            let fieldsetIndex = -1;
            let controlIndex = -1;

            this.form.fieldsets.forEach((fieldset, fi) => {
                fieldset.controls.forEach((fieldsetControl, ci) => {
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
                let novoControl = this.formUtils.getControlForField(metaForNewField, this.http, {});
                novoControl.hidden = false;
                let formControl = new NovoFormControl(initialValue, novoControl);
                this.form.addControl(novoControl.key, formControl);
                this.form.fieldsets[fieldsetIndex].controls.splice(controlIndex, 0, novoControl);
            }
        }
    }

    public removeControl(key: string): void {
        let control = this.getControl(key);
        if (control) {
            let fieldsetIndex = -1;
            let controlIndex = -1;

            this.form.fieldsets.forEach((fieldset, fi) => {
                fieldset.controls.forEach((fieldsetControl, ci) => {
                    if (fieldsetControl.key === key) {
                        fieldsetIndex = fi;
                        controlIndex = ci;
                    }
                });
            });

            if (fieldsetIndex !== -1 && controlIndex !== -1) {
                this.form.removeControl(key);
                this.form.fieldsets[fieldsetIndex].controls.splice(controlIndex, 1);
            }
        }
    }
}
