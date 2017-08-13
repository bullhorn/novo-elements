// NG2
import { Http } from '@angular/http';
// APP
import { NovoFormControl } from './NovoFormControl';
import { NovoControlConfig } from './FormControls';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { NovoToastService } from '../toast/ToastService';
import { Helpers } from '../../utils/Helpers';

export class FieldInteractionApi {
    private _globals: any;
    private _form: any;
    private _currentKey: string;

    constructor(private toaster: NovoToastService, private formUtils: FormUtils, private http: Http) { }

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
            console.error(`[FieldInteractionAPI] - could not find a control in the form by the key -- ${key}`); // tslint:disable-line
            return null;
        }

        return (control as NovoFormControl);
    }

    public getValue(key: string): any {
        let control = this.getControl(key);
        return control.value;
    }

    public getInitialValue(key: string): any {
        let control = this.getControl(key);
        return control.initialValue;
    }

    public setValue(key: string, value: any, options?: {
        onlySelf?: boolean,
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
        emitViewToModelChange?: boolean
    }): void {
        let control = this.getControl(key);
        control.setValue(value, options);
    }

    public patchValue(key: string, value: any, options?: {
        onlySelf?: boolean,
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
        emitViewToModelChange?: boolean
    }): void {
        let control = this.getControl(key);
        control.setValue(value, options);
    }

    public setReadOnly(key: string, isReadOnly: boolean): void {
        let control = this.getControl(key);
        control.setReadOnly(isReadOnly);
    }

    public setRequired(key: string, required: boolean): void {
        let control = this.getControl(key);
        control.setRequired(required);
    }

    public hide(key: string, clearValue: boolean = true): void {
        let control = this.getControl(key);
        control.hide(clearValue);
    }

    public show(key: string): void {
        let control = this.getControl(key);
        control.show();
    }

    public disable(key: string, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
        let control = this.getControl(key);
        control.disable(options);
    }

    public enable(key: string, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
        let control = this.getControl(key);
        control.enable(options);
    }

    public markAsInvalid(key: string, validationMessage?: string): void {
        let control = this.getControl(key);
        control.markAsInvalid(validationMessage);
    }

    public markAsDirty(key: string, options?: {
        onlySelf?: boolean;
    }): void {
        let control = this.getControl(key);
        control.markAsDirty(options);
    }

    public markAsPending(key: string, options?: {
        onlySelf?: boolean;
    }): void {
        let control = this.getControl(key);
        control.markAsPending(options);
    }

    public markAsPristine(key: string, options?: {
        onlySelf?: boolean;
    }): void {
        let control = this.getControl(key);
        control.markAsPristine(options);
    }

    public markAsTouched(key: string, options?: {
        onlySelf?: boolean;
    }): void {
        let control = this.getControl(key);
        control.markAsTouched(options);
    }

    public markAsUntouched(key: string, options?: {
        onlySelf?: boolean;
    }): void {
        let control = this.getControl(key);
        control.markAsUntouched(options);
    }

    public updateValueAndValidity(key: string, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
        let control = this.getControl(key);
        control.updateValueAndValidity(options);
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
        this.toaster.alert(toastConfig);
    }

    public setProperty(key: string, prop: string, value: any): void {
        let control = this.getControl(key);
        control[prop] = value;
    }

    public getProperty(key: string, prop: string): any {
        let control = this.getControl(key);
        return control[prop];
    }

    public isValueEmpty(key: string) {
        let value = this.getValue(key);
        return Helpers.isEmpty(value);
    }

    public isValueBlank(key: string) {
        let value = this.getValue(key);
        return Helpers.isBlank(value);
    }

    public hasField(key: string) {
        return !!this.form.controls[key];
    }

    public addControl(control: NovoControlConfig) {
        this.formUtils.addControls(this.form, [control]);
    }

    public addStaticOption(key: string, newOption: any): void {
        let currentOptions = this.getProperty(key, 'options');
        if (!currentOptions || !currentOptions.length) {
            let config = this.getProperty(key, 'config');
            if (config) {
                currentOptions = config.options;
                config.options = [...currentOptions, newOption];
                this.setProperty(key, 'config', config);
            }
        } else {
            this.setProperty(key, 'options', [...currentOptions, newOption]);
        }
    }

    public removeStaticOption(key: string, optionToRemove: any): void {
        let currentOptions = this.getProperty(key, 'options');
        if (!currentOptions || !currentOptions.length) {
            let config = this.getProperty(key, 'config');
            if (config) {
                currentOptions = config.options;
                let index = currentOptions.indexOf(optionToRemove);
                if (index !== -1) {
                    currentOptions.splice(index, 1);
                }
                config.options = [...currentOptions];
                this.setProperty(key, 'config', config);
            }
        } else {
            let index = currentOptions.indexOf(optionToRemove);
            if (index !== -1) {
                currentOptions.splice(index, 1);
            }
            this.setProperty(key, 'options', [...currentOptions]);
        }
    }

    public modifyPickerConfig(key: string, config: { format?: string, optionsUrl?: string, options?: any[] }) {
        let control = this.getControl(key);
        if (config.optionsUrl) {
            let c = {
                format: config.format,
                options: (query) => {
                    return new Promise((resolve, reject) => {
                        if (query && query.length) {
                            this.http
                                .get(`${config.optionsUrl}?filter=${query || ''}`)
                                .map(res => res.json())
                                .subscribe(resolve, reject);
                        } else {
                            resolve([]);
                        }
                    });
                }
            };
            this.setProperty(key, 'config', c);
        } else {
            control.config.options = [...config.options];
        }
    }
}
