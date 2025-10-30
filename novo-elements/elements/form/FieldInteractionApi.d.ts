import { HttpClient } from '@angular/common/http';
import { NovoModalService } from 'novo-elements/elements/modal';
import { NovoToastService, ToastOptions } from 'novo-elements/elements/toast';
import { NovoLabelService } from 'novo-elements/services';
import { AppBridge } from 'novo-elements/utils';
import { FormUtils } from './utils/FormUtils';
import { ModifyPickerConfigArgs, OptionsFunction } from './FieldInteractionApiTypes';
import { NovoFieldset, ResultsTemplateType } from './FormInterfaces';
import { NovoFormControl } from './NovoFormControl';
import { NovoFormGroup } from './NovoFormGroup';
import * as i0 from "@angular/core";
export declare class FieldInteractionApi {
    private toaster;
    private modalService;
    private formUtils;
    private http;
    private labels;
    private _globals;
    form: NovoFormGroup | any;
    private _currentKey;
    appBridge: AppBridge;
    private asyncBlockTimeout;
    private _isInvokedOnInit;
    static FIELD_POSITIONS: {
        ABOVE_FIELD: string;
        BELOW_FIELD: string;
        TOP_OF_FORM: string;
        BOTTOM_OF_FORM: string;
    };
    constructor(toaster: NovoToastService, modalService: NovoModalService, formUtils: FormUtils, http: HttpClient, labels: NovoLabelService);
    get associations(): object;
    get currentEntity(): string;
    get currentEntityId(): string;
    get isEdit(): boolean;
    get isAdd(): boolean;
    set globals(globals: any);
    get globals(): any;
    set currentKey(key: string);
    get currentKey(): string;
    set isInvokedOnInit(isOnInit: boolean);
    get isInvokedOnInit(): boolean;
    isActiveControlValid(): boolean;
    getActiveControl(): NovoFormControl;
    getActiveKey(): string;
    getActiveValue(): any;
    getActiveInitialValue(): any;
    getFieldSet(key: string, otherForm?: NovoFormGroup): NovoFieldset;
    getControl(key: string, otherForm?: NovoFormGroup): NovoFormControl;
    getFormGroupArray(key: string, otherForm?: NovoFormGroup): NovoFormGroup[];
    getValue(key: string, otherForm?: NovoFormGroup): any;
    getRawValue(key: string, otherForm?: NovoFormGroup): any;
    getInitialValue(key: string, otherForm?: NovoFormGroup): any;
    setValue(key: string, value: any, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }, otherForm?: NovoFormGroup): void;
    patchValue(key: string, value: any, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }, otherForm?: NovoFormGroup): void;
    setReadOnly(key: string, isReadOnly: boolean, otherForm?: NovoFormGroup): void;
    setRequired(key: string, required: boolean, otherForm?: NovoFormGroup): void;
    setDescription(key: string, description: string, otherForm?: NovoFormGroup): void;
    highlight(key: string, isHighlighted: boolean, otherForm?: NovoFormGroup): void;
    hide(key: string, clearValue?: boolean, otherForm?: NovoFormGroup): NovoFormControl;
    show(key: string, otherForm?: NovoFormGroup): void;
    hideFieldSetHeader(key: string): void;
    showFieldSetHeader(key: string): void;
    disable(key: string, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }, otherForm?: NovoFormGroup): void;
    enable(key: string, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }, otherForm?: NovoFormGroup): void;
    markAsInvalid(key: string, validationMessage?: string, otherForm?: NovoFormGroup): void;
    markAsValid(key: string, otherForm?: NovoFormGroup): void;
    markAsDirty(key: string, options?: {
        onlySelf?: boolean;
    }, otherForm?: NovoFormGroup): void;
    markAsPending(key: string, options?: {
        onlySelf?: boolean;
    }, otherForm?: NovoFormGroup): void;
    markAsPristine(key: string, options?: {
        onlySelf?: boolean;
    }, otherForm?: NovoFormGroup): void;
    markAsTouched(key: string, options?: {
        onlySelf?: boolean;
    }, otherForm?: NovoFormGroup): void;
    markAsUntouched(key: string, options?: {
        onlySelf?: boolean;
    }, otherForm?: NovoFormGroup): void;
    updateValueAndValidity(key: string, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }, otherForm?: NovoFormGroup): void;
    displayToast(toastConfig: ToastOptions): void;
    displayTip(key: string, tip: string, icon?: string, allowDismiss?: boolean, sanitize?: boolean, otherForm?: NovoFormGroup): void;
    clearTip(key: string, otherForm?: NovoFormGroup): void;
    setTooltip(key: string, tooltip: string, otherForm?: NovoFormGroup): void;
    setPopOver(key: string, popover: {
        title?: string;
        content?: string;
        htmlContent?: string;
        placement?: 'left' | 'right' | 'top' | 'bottom';
        onHover?: boolean;
        always?: boolean;
        disabled?: boolean;
        animation?: boolean;
        dismissTimeout?: number;
    }, otherForm?: NovoFormGroup): void;
    confirmChanges(key: string, message?: string): Promise<boolean>;
    promptUser(key: string, changes: string[]): Promise<boolean>;
    setProperty(key: string, prop: string, value: any, otherForm?: NovoFormGroup): void;
    getProperty(key: string, prop: string, otherForm?: NovoFormGroup): any;
    isValueEmpty(key: string): boolean;
    isValueBlank(key: string): boolean;
    hasField(key: string, otherForm?: NovoFormGroup): boolean;
    addStaticOption(key: string, newOption: any, otherForm?: NovoFormGroup): void;
    removeStaticOption(key: string, optionToRemove: any, otherForm?: NovoFormGroup): void;
    modifyPickerConfig(key: string, config: {
        format?: string;
        optionsUrl?: string;
        optionsUrlBuilder?: Function;
        optionsPromise?: any;
        options?: any[];
        resultsTemplateType?: ResultsTemplateType;
    }, mapper?: any): void;
    mutatePickerConfig(key: string, args: ModifyPickerConfigArgs, mapper?: (item: unknown) => unknown, otherForm?: NovoFormGroup): void;
    addPropertiesToPickerConfig(key: string, properties: {
        [key: string]: unknown;
    }, otherForm?: NovoFormGroup): void;
    getOptionsConfig: (args: ModifyPickerConfigArgs, mapper?: (item: unknown) => unknown, filteredOptionsCreator?: (where: string) => (query: string) => Promise<unknown[]>, pickerConfigFormat?: string) => undefined | {
        options: unknown[];
    } | {
        options: OptionsFunction;
        format?: string;
    };
    private getAppropriateResultsTemplate;
    createOptionsFunction: (config: ModifyPickerConfigArgs, mapper?: (item: unknown) => unknown, filteredOptionsCreator?: (where?: string) => (query: string, page?: number) => Promise<unknown[]>) => ((query: string) => Promise<unknown[]>);
    setLoading(key: string, loading: boolean, otherForm?: NovoFormGroup): void;
    addControl(key: string, metaForNewField: {
        key?: string;
        type?: string;
        name?: string;
        label?: string;
        interactions?: Array<{
            event?: string;
            invokeOnInit?: boolean;
            script?: any;
        }>;
    }, position?: string, initialValue?: any, otherForm?: NovoFormGroup): void;
    removeControl(key: string, otherForm?: NovoFormGroup): void;
    debounce(func: () => void, wait?: number): void;
    /**
     * Allows traversing nested forms by accessing the parent form.
     *
     * @param otherForm optional parameter for getting the parent of a different form.
     * If not provided will default to the parent of the current form.
     */
    getParent(otherForm?: NovoFormGroup): any;
    /**
     * The index is assigned as a property on the form's associations object when the form is part of a NovoControlGroup array.
     *
     * @param otherForm optional parameter for getting the index of a different form. If not provided will default to the current form.
     * @returns the index if it exists for the current or form, or null otherwise.
     */
    getIndex(otherForm?: NovoFormGroup): any;
    private triggerEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldInteractionApi, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FieldInteractionApi>;
}
