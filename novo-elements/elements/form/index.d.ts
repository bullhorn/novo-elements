import * as i0 from '@angular/core';
import { EventEmitter, AfterContentInit, OnChanges, OnDestroy, TemplateRef, ChangeDetectorRef, SimpleChanges, ElementRef, OnInit, AfterViewInit, QueryList, DoCheck, ViewContainerRef } from '@angular/core';
import { NovoLabelService, OptionsService, DateFormatService, NovoTemplateService, GlobalRef } from 'novo-elements/services';
import { AppBridge, OutsideClick } from 'novo-elements/utils';
import { Subscription, Observable } from 'rxjs';
import { MaskedOptions } from 'imask';
import { HttpClient } from '@angular/common/http';
import * as i26 from 'novo-elements/elements/modal';
import { NovoModalService, NovoModalParams, NovoModalRef } from 'novo-elements/elements/modal';
import { NovoToastService, ToastOptions } from 'novo-elements/elements/toast';
import { BooleanInput } from '@angular/cdk/coercion';
import * as i5 from '@angular/forms';
import { UntypedFormGroup, FormBuilder, FormControl, ControlValueAccessor, NgForm, FormGroupDirective, NgControl, FormGroup } from '@angular/forms';
import * as i30 from 'novo-elements/elements/common';
import { NovoTemplate, CanUpdateErrorStateCtor, ErrorStateMatcher } from 'novo-elements/elements/common';
import { FocusKeyManager } from '@angular/cdk/a11y';
import * as i13 from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as i15 from 'novo-elements/elements/field';
import { NovoFieldControl } from 'novo-elements/elements/field';
import * as i4 from '@angular/common';
import * as i6 from 'novo-elements/pipes';
import * as i7 from 'novo-elements/elements/button';
import * as i8 from 'novo-elements/elements/select';
import * as i9 from 'novo-elements/elements/picker';
import * as i10 from 'novo-elements/elements/loading';
import * as i11 from 'novo-elements/elements/tooltip';
import * as i12 from 'novo-elements/elements/checkbox';
import * as i14 from 'novo-elements/elements/flex';
import * as i8$1 from '@angular/cdk/overlay';
import * as i10$1 from 'novo-elements/elements/radio';
import * as i11$1 from 'novo-elements/elements/tiles';
import * as i14$1 from 'novo-elements/elements/chips';
import * as i15$1 from 'novo-elements/elements/date-picker';
import * as i16 from 'novo-elements/elements/time-picker';
import * as i17 from 'novo-elements/elements/date-time-picker';
import * as i18 from 'novo-elements/addons/ckeditor';
import * as i20 from 'novo-elements/elements/quick-note';
import * as i21 from 'novo-elements/elements/header';
import * as i23 from 'novo-elements/elements/popover';
import * as i24 from 'angular-imask';
import * as i25 from 'novo-elements/elements/tip-well';
import * as i28 from 'novo-elements/addons/ace-editor';
import * as i29 from 'novo-elements/addons/code-editor';
import * as i32 from 'novo-elements/elements/icon';
import * as i33 from 'novo-elements/elements/switch';

interface NovoFieldset {
    title?: string;
    icon?: string;
    key?: string;
    controls: any[];
    isEmbedded?: boolean;
    isInlineEmbedded?: boolean;
    hidden?: boolean;
}
interface IFieldInteractionEvent {
    controlKey: string;
    prop: string;
    value: any;
}
interface FormField {
    dataSpecialization: string;
    inputType: string;
    options: string;
    multiValue: boolean;
    dataType: string;
    type: string;
    associatedEntity?: {
        entity: string;
    };
    optionsUrl?: string;
    optionsType?: string;
    parentEntity?: string;
}
type ResultsTemplateType = 'entity-picker';

declare class NovoFormGroup extends UntypedFormGroup {
    fieldInteractionEvents: EventEmitter<IFieldInteractionEvent>;
    layout: string;
    edit: boolean;
    currentEntity: string;
    currentEntityId: string;
    associations: object;
    fieldsets: any[];
    _value: any;
    controls: {
        [key: string]: any;
    };
    novoControls: any[];
    enableAllControls(): void;
    disableAllControls(): void;
}

interface NovoControlGroupAddConfig {
    label: string;
}
declare enum EditState {
    EDITING = "editing",
    NOT_EDITING = "notediting"
}
interface NovoControlGroupRowConfig {
    edit: boolean;
    remove: boolean;
    state: EditState;
}
declare class NovoControlGroup implements AfterContentInit, OnChanges, OnDestroy {
    private formUtils;
    private fb;
    private ref;
    set appearance(value: 'none' | 'card');
    get appearance(): "none" | "card";
    private _appearance;
    set vertical(v: boolean);
    get vertical(): boolean;
    private _vertical;
    set stacked(v: boolean);
    get stacked(): boolean;
    private _stacked;
    add: NovoControlGroupAddConfig;
    set remove(v: boolean);
    get remove(): boolean;
    private _remove;
    set edit(v: boolean);
    get edit(): boolean;
    private _edit;
    set collapsible(v: boolean);
    get collapsible(): boolean;
    private _collapsible;
    form: NovoFormGroup;
    controls: BaseControl[];
    key: string;
    label: string;
    description: string;
    emptyMessage: string;
    set icon(v: string);
    get icon(): string;
    private _icon;
    editIcon: string;
    removeIcon: string;
    initialValue: {}[];
    canEdit: Function;
    canRemove: Function;
    shouldRemove: (number: any) => Promise<boolean>;
    rowTemplate: TemplateRef<any>;
    columnLabelTemplate: TemplateRef<any>;
    onRemove: EventEmitter<{
        value: any;
        index: any;
    }>;
    onEdit: EventEmitter<{
        value: any;
        index: any;
    }>;
    onAdd: EventEmitter<any>;
    change: EventEmitter<any>;
    controlLabels: {
        value: string;
        width: number;
        required: boolean;
        hidden?: boolean;
        key: string;
    }[];
    toggled: boolean;
    disabledArray: NovoControlGroupRowConfig[];
    editState: EditState;
    currentIndex: number;
    constructor(formUtils: FormUtils, fb: FormBuilder, ref: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onChange(): void;
    onClickAdd(): void;
    onClickCancel(): void;
    onClickSave(): void;
    resetAddRemove(): void;
    addNewControl(value?: {}): void;
    /**
     * Will remove the control, and optionally, if the event is to be publicized (emitEvent = true) and there is a
     * shouldRemove callback, then call the shouldRemove() callback to determine if the doRemoveControl should be called.
     */
    removeControl(index: number, emitEvent?: boolean): void;
    private doRemoveControl;
    editControl(index: number): void;
    toggle(event: MouseEvent): void;
    private buildNestedFormGroup;
    private clearControls;
    private checkCanEdit;
    private checkCanRemove;
    private getNewControls;
    private assignIndexes;
    private onFieldInteractionEvent;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_stacked: BooleanInput;
    static ngAcceptInputType_vertical: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoControlGroup, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoControlGroup, "novo-control-group", never, { "appearance": { "alias": "appearance"; "required": false; }; "vertical": { "alias": "vertical"; "required": false; }; "stacked": { "alias": "stacked"; "required": false; }; "add": { "alias": "add"; "required": false; }; "remove": { "alias": "remove"; "required": false; }; "edit": { "alias": "edit"; "required": false; }; "collapsible": { "alias": "collapsible"; "required": false; }; "form": { "alias": "form"; "required": false; }; "controls": { "alias": "controls"; "required": false; }; "key": { "alias": "key"; "required": false; }; "label": { "alias": "label"; "required": false; }; "description": { "alias": "description"; "required": false; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "editIcon": { "alias": "editIcon"; "required": false; }; "removeIcon": { "alias": "removeIcon"; "required": false; }; "initialValue": { "alias": "initialValue"; "required": false; }; "canEdit": { "alias": "canEdit"; "required": false; }; "canRemove": { "alias": "canRemove"; "required": false; }; "shouldRemove": { "alias": "shouldRemove"; "required": false; }; "rowTemplate": { "alias": "rowTemplate"; "required": false; }; "columnLabelTemplate": { "alias": "columnLabelTemplate"; "required": false; }; }, { "onRemove": "onRemove"; "onEdit": "onEdit"; "onAdd": "onAdd"; "change": "change"; }, never, never, false, never>;
}

interface NovoGroupedControlConfig {
    label?: string;
    icon?: string;
    add?: NovoControlGroupAddConfig;
    remove?: boolean;
    key: string;
    initialValue?: {}[];
}
declare class ControlConfig {
    alwaysActive?: Boolean;
    allowInvalidDate?: boolean;
    appendToBody: boolean;
    associatedEntity: string;
    asyncValidators?: Array<any>;
    checkboxLabel: string;
    closeOnSelect: boolean;
    config: any;
    controlType: string;
    currencyFormat: string;
    customControl?: any;
    customControlConfig?: any;
    dataSpecialization: string;
    dataType: string;
    dateFormat?: string;
    description?: string;
    dirty: boolean;
    disabled: boolean;
    enabled: boolean;
    encrypted: boolean;
    endDate?: Date | Number;
    fileBrowserImageUploadUrl?: string;
    forceClear: EventEmitter<any>;
    headerConfig: any;
    hidden: boolean;
    interactions: Array<{
        event?: 'change' | 'focus' | string;
        invokeOnInit?: boolean;
        script?: any;
    }>;
    isEmpty?: Function;
    key: string;
    label: string;
    maskOptions?: IMaskOptions;
    maxlength: number;
    metaType: string;
    military?: boolean;
    minimal?: boolean;
    minlength: number;
    multiple: boolean;
    name: string;
    options: Array<any>;
    optionsType: string;
    parentScrollSelector: string;
    placeholder: string;
    popoverAlways?: boolean;
    popoverAnimation?: boolean;
    popoverContent?: string;
    popoverDisabled?: boolean;
    popoverDismissTimeout?: number;
    popoverHtmlContent?: string;
    popoverOnHover?: boolean;
    popoverPlacement?: 'left' | 'right' | 'top' | 'bottom';
    popoverTitle?: string;
    readOnly: boolean;
    removeTooltipArrow?: boolean;
    required: boolean;
    restrictFieldInteractions?: boolean;
    sortOrder: number;
    startDate?: Date | Number;
    startupFocus?: boolean;
    subType?: string;
    template?: any;
    textMaskEnabled?: boolean;
    tooltip?: string;
    tooltipAutoPosition?: boolean;
    tooltipPosition?: string;
    tooltipPreline?: boolean;
    tooltipSize?: string;
    type: string;
    validators: Array<any>;
    value: any;
    warning?: string;
    width: number;
    layoutOptions?: {
        customActions?: boolean;
        download?: boolean;
        draggable?: boolean;
        edit?: boolean;
        iconStyle?: string;
        labelStyle?: string;
        order?: string;
        removable?: boolean;
        customValidation?: {
            action: string;
            fn: Function;
        }[];
        removableWhenNew?: boolean;
    };
    tipWell?: {
        button?: boolean;
        icon?: string;
        tip: string;
    };
    isEmbedded: boolean;
    isInlineEmbedded: boolean;
    weekStart?: number;
    highlighted: boolean;
    disabledDateMessage?: string;
}
type NovoControlConfig = Partial<ControlConfig>;
declare class BaseControl extends ControlConfig {
    __type: string;
    __config: NovoControlConfig;
    constructor(type?: string, config?: NovoControlConfig);
}

declare class AceEditorControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class AddressControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class CheckListControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class CheckboxControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class ControlFactory {
    static create(type: string, config: BaseControl): BaseControl;
}

declare class CustomControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class DateTimeControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class DateControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class EditorControl extends BaseControl {
    controlType: string;
    minimal: boolean;
    constructor(config: NovoControlConfig);
}

declare class FileControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class GroupedControl implements NovoGroupedControlConfig {
    __type: string;
    key: string;
    constructor(config: NovoGroupedControlConfig);
}

declare class NativeSelectControl extends BaseControl {
    controlType: string;
    options: any[];
    constructor(config: NovoControlConfig);
}

declare class PickerControl extends BaseControl {
    controlType: string;
    options: any[];
    constructor(config: NovoControlConfig);
}
declare class TablePickerControl extends PickerControl {
    constructor(config: NovoControlConfig);
}

declare class QuickNoteControl extends BaseControl {
    controlType: string;
    options: any[];
    constructor(config: NovoControlConfig);
}

declare class RadioControl extends BaseControl {
    controlType: string;
    options: any[];
    constructor(config: NovoControlConfig);
}

declare class ReadOnlyControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class SelectControl extends BaseControl {
    controlType: string;
    options: any[];
    constructor(config: NovoControlConfig);
}

declare class SwitchControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class TextAreaControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class TextBoxControl extends BaseControl {
    controlType: string;
    type: string;
    subType: string;
    constructor(config: NovoControlConfig);
    setValidators(type: any): void;
    getTextboxType(type: any): any;
}

declare class TilesControl extends BaseControl {
    controlType: string;
    options: any[];
    constructor(config: NovoControlConfig);
}

declare class TimeControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class TimezoneControl extends BaseControl {
    controlType: string;
    options: any[];
    constructor(config: NovoControlConfig);
    private buildTimezones;
}

declare class FormUtils {
    labels: NovoLabelService;
    optionsService: OptionsService;
    ASSOCIATED_ENTITY_LIST: string[];
    ENTITY_PICKER_LIST: string[];
    constructor(labels: NovoLabelService, optionsService: OptionsService);
    toFormGroup(controls: Array<any>): NovoFormGroup;
    emptyFormGroup(): NovoFormGroup;
    addControls(formGroup: NovoFormGroup, controls: Array<NovoControlConfig>): void;
    removeControls(formGroup: NovoFormGroup, controls: Array<NovoControlConfig>): void;
    toFormGroupFromFieldset(fieldsets: Array<NovoFieldset>): NovoFormGroup;
    hasAssociatedEntity(field: FormField): boolean;
    determineInputType(field: FormField): string;
    isFieldEncrypted(key: string): boolean;
    getControlForField(field: any, http: any, config: {
        token?: string;
        restUrl?: string;
        military?: boolean;
        weekStart?: number;
    }, overrides?: any, forTable?: boolean, fieldData?: any): any;
    private shouldCreateControl;
    toControls(meta: any, currencyFormat: any, http: any, config: {
        token?: string;
        restUrl?: string;
        military?: boolean;
        weekStart?: number;
    }, overrides?: any, forTable?: boolean): any[];
    toTableControls(meta: any, currencyFormat: any, http: any, config: {
        token?: string;
        restUrl?: string;
        military?: boolean;
    }, overrides?: any): {};
    toFieldSets(meta: any, currencyFormat: any, http: any, config: {
        token?: string;
        restUrl?: string;
        military?: boolean;
        weekStart?: number;
    }, overrides?: any, data?: {
        [key: string]: any;
    }): NovoFieldset[];
    private isEmbeddedField;
    private createControl;
    private isEmbeddedFieldData;
    private getFieldData;
    private getEmbeddedFieldData;
    private getFormFields;
    private getInlineEmbeddedFields;
    private getAssociatedFieldsForInlineEmbedded;
    private getEmbeddedFields;
    private isHeader;
    private insertHeaderToFieldsets;
    private markControlAsEmbedded;
    getControlOptions(field: any, http: any, config: {
        token?: string;
        restUrl?: string;
        military?: boolean;
    }, fieldData?: any): any;
    private getWorkflowOptions;
    setInitialValues(controls: Array<NovoControlConfig>, values: any, keepClean?: boolean, keyOverride?: string): void;
    setInitialValuesFieldsets(fieldsets: Array<NovoFieldset>, values: any, keepClean?: boolean): void;
    forceShowAllControls(controls: Array<NovoControlConfig>): void;
    forceShowAllControlsInFieldsets(fieldsets: Array<NovoFieldset>): void;
    forceValidation(form: NovoFormGroup): void;
    isAddressEmpty(control: any): boolean;
    private getStartDateFromRange;
    private getEndDateFromRange;
    /**
     * Get the min start date and max end date of a Date base on field data.
     */
    private inferDateRange;
    inflateEmbeddedProperties(data: object): object;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormUtils, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormUtils>;
}

type OptionsFunctionConfig = {
    format?: string;
} & ({
    where: string;
    emptyPickerMessage?: string;
} | {
    optionsPromise: (query: string, http: CustomHttp, page?: number) => Promise<unknown[]>;
} | {
    optionsUrl: string;
} | {
    optionsUrlBuilder: (query: string) => string;
});
type ModifyPickerConfigArgs = {
    options: unknown[];
} | {
    resultsTemplateType: ResultsTemplateType;
} | OptionsFunctionConfig;
type OptionsFunction = (query: string, page?: number) => Promise<unknown[]>;
interface CustomHttp<T = any> {
    url: string;
    options: any;
    mapFn: (o: unknown) => T;
    get(url: string, options?: any): CustomHttp;
    map(mapFn: (o: unknown) => T): CustomHttp;
    subscribe(resolve: any, reject?: any): Subscription;
}

declare class NovoFormControl extends FormControl {
    displayValueChanges: EventEmitter<any>;
    hidden: boolean;
    encrypted: boolean;
    key: string;
    required: boolean;
    readOnly: boolean;
    hasRequiredValidator: boolean;
    label: string;
    tooltip: string;
    tooltipPosition: string;
    tooltipSize?: string;
    tooltipPreline?: boolean;
    tooltipIsHTML?: boolean;
    popoverContent?: string;
    popoverHtmlContent?: string;
    popoverTitle?: string;
    popoverPlacement?: 'left' | 'right' | 'top' | 'bottom';
    popoverOnHover?: boolean;
    popoverAlways?: boolean;
    popoverDisabled?: boolean;
    popoverAnimation?: boolean;
    popoverDismissTimeout?: number;
    removeTooltipArrow?: boolean;
    tooltipAutoPosition?: boolean;
    initialValue: any;
    valueHistory: any[];
    validators: any;
    config: any;
    sortOrder: number;
    controlType: string;
    placeholder: string;
    minimal: boolean;
    multiple: boolean;
    headerConfig: any;
    optionsType: string;
    maxlength: number;
    minlength: number;
    options: Array<any>;
    type: string;
    subType: string;
    name: string;
    closeOnSelect: boolean;
    interactions: Array<Object>;
    appendToBody: boolean;
    parentScrollSelector: string;
    description?: string;
    layoutOptions?: {
        order?: string;
        download?: boolean;
        labelStyle?: string;
        draggable?: boolean;
        iconStyle?: string;
    };
    military?: boolean;
    dateFormat?: string;
    currencyFormat?: string;
    startDate?: Date | Number;
    endDate?: Date | Number;
    weekStart?: number;
    textMaskEnabled?: boolean;
    maskOptions: IMaskOptions;
    allowInvalidDate?: boolean;
    tipWell?: {
        tip: string;
        icon?: string;
        button?: boolean;
        sanitize?: boolean;
    };
    rawValue?: any;
    customControlConfig?: any;
    checkboxLabel?: string;
    restrictFieldInteractions?: boolean;
    warning?: string;
    highlighted?: boolean;
    disabledDateMessage?: string;
    private historyTimeout;
    constructor(value: any, control: NovoControlConfig);
    /**
     * @param clearValue - flag to reset the control's value
     */
    hide(clearValue?: boolean): void;
    show(): void;
    setRequired(isRequired: boolean): void;
    setValue(value: any, { onlySelf, emitEvent, emitModelToViewChange, emitViewToModelChange, }?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void;
    setReadOnly(isReadOnly: boolean): void;
    /**
     * Disables the control. This means the control will be exempt from validation checks and
     * excluded from the aggregate value of any parent. Its status is `DISABLED`.
     *
     * If the control has children, all children will be disabled to maintain the model.
     */
    disable(opts?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    enable(opts?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    markAsInvalid(message: string): void;
    markAsValid(): void;
}

declare class FieldInteractionApi {
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

interface IMaskOptions {
    mask: MaskedOptions['mask'];
    keepCharPositions: boolean;
    guide: boolean;
}
declare class NovoAutoSize implements AfterContentInit {
    element: ElementRef;
    onInput(textArea: HTMLTextAreaElement): void;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    adjust(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAutoSize, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoAutoSize, "textarea[autosize]", never, {}, {}, never, never, false, never>;
}
declare class NovoControlElement extends OutsideClick implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
    labels: NovoLabelService;
    private dateFormatService;
    private fieldInteractionApi;
    private templateService;
    private changeDetectorRef;
    locale: string;
    control: any;
    form: any;
    condensed: boolean;
    autoFocus: boolean;
    change: EventEmitter<any>;
    edit: EventEmitter<any>;
    save: EventEmitter<any>;
    delete: EventEmitter<any>;
    upload: EventEmitter<any>;
    get onBlur(): Observable<FocusEvent>;
    get onFocus(): Observable<FocusEvent>;
    maxLength: number;
    focusedField: string;
    formattedValue: string;
    percentValue: number;
    maxLengthMet: boolean;
    itemCount: number;
    maskOptions: IMaskOptions;
    private _blurEmitter;
    private _focusEmitter;
    private _focused;
    private _enteredText;
    private forceClearSubscription;
    private percentChangeSubscription;
    private valueChangeSubscription;
    private dateChangeSubscription;
    private _showCount;
    private characterCountField;
    private maxLengthMetErrorfields;
    private statusChangeSubscription;
    templates: any;
    templateContext: any;
    loading: boolean;
    constructor(element: ElementRef, labels: NovoLabelService, dateFormatService: DateFormatService, fieldInteractionApi: FieldInteractionApi, templateService: NovoTemplateService, changeDetectorRef: ChangeDetectorRef, locale?: string);
    get maxlengthMetField(): string;
    get maxlengthErrorField(): string;
    get showFieldMessage(): boolean;
    get showMaxLengthMetMessage(): boolean;
    get showErrorState(): any;
    get showCount(): boolean;
    set showCount(value: boolean);
    get showMessages(): boolean;
    get decimalSeparator(): string;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    get errors(): any;
    get isValid(): any;
    get isDirty(): any;
    get hasValue(): boolean;
    get focused(): boolean;
    get tooltip(): any;
    get tooltipPosition(): any;
    get tooltipSize(): any;
    get tooltipPreline(): any;
    get removeTooltipArrow(): any;
    get alwaysActive(): boolean;
    get requiresExtraSpacing(): boolean;
    executeInteraction(interaction: any, isInvokedOnInit?: boolean): void;
    handleTyping(event: any): void;
    handleAccept(value: string): void;
    handleFocus(event: FocusEvent, field?: any): void;
    handleBlur(event: FocusEvent): void;
    clearValue(): void;
    handleTextAreaInput(event: KeyboardEvent & {
        target: HTMLInputElement;
    }): void;
    checkMaxLength(value: string): void;
    modelChangeWithRaw(event: any): void;
    modelChange(value: any): void;
    validateNumberOnBlur(event: FocusEvent): void;
    validateIntegerInput(): void;
    restrictKeys(event: KeyboardEvent): void;
    handlePercentChange(event: KeyboardEvent): void;
    handleTabForPickers(event: any): void;
    emitChange(event: Date | (Event & {
        target: HTMLInputElement;
    }) | string): void;
    handleEdit(value: any): void;
    handleSave(value: any): void;
    handleDelete(value: any): void;
    handleUpload(value: any): void;
    handleAddressChange(data: any): void;
    updateValidity(shouldEventBeEmitted: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoControlElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoControlElement, "novo-control", never, { "control": { "alias": "control"; "required": false; }; "form": { "alias": "form"; "required": false; }; "condensed": { "alias": "condensed"; "required": false; }; "autoFocus": { "alias": "autoFocus"; "required": false; }; }, { "change": "change"; "edit": "edit"; "save": "save"; "delete": "delete"; "upload": "upload"; "onBlur": "blur"; "onFocus": "focus"; }, never, never, false, never>;
}

declare class CodeEditorControl extends BaseControl {
    controlType: string;
    constructor(config: NovoControlConfig);
}

declare class NovoControlTemplates implements AfterViewInit {
    private templates;
    defaultTemplates: QueryList<NovoTemplate>;
    constructor(templates: NovoTemplateService);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoControlTemplates, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoControlTemplates, "novo-control-templates", never, {}, {}, never, never, false, never>;
}

declare class NovoFieldsetHeaderElement {
    title: string;
    icon: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldsetHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFieldsetHeaderElement, "novo-fieldset-header", never, { "title": { "alias": "title"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; }, {}, never, never, false, never>;
}
declare class NovoFieldsetElement {
    controls: Array<any>;
    form: any;
    title: string;
    icon: string;
    index: number;
    autoFocus: boolean;
    isEmbedded: boolean;
    isInlineEmbedded: boolean;
    hidden: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldsetElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFieldsetElement, "novo-fieldset", never, { "controls": { "alias": "controls"; "required": false; }; "form": { "alias": "form"; "required": false; }; "title": { "alias": "title"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "index": { "alias": "index"; "required": false; }; "autoFocus": { "alias": "autoFocus"; "required": false; }; "isEmbedded": { "alias": "isEmbedded"; "required": false; }; "isInlineEmbedded": { "alias": "isInlineEmbedded"; "required": false; }; "hidden": { "alias": "hidden"; "required": false; }; }, {}, never, never, false, never>;
}
declare class NovoDynamicFormElement implements OnChanges, OnInit, AfterContentInit {
    private element;
    private templates;
    controls: Array<any>;
    fieldsets: Array<NovoFieldset>;
    form: NovoFormGroup;
    layout: string;
    hideNonRequiredFields: boolean;
    autoFocusFirstField: boolean;
    customTemplates: QueryList<NovoTemplate>;
    private fieldsAlreadyHidden;
    allFieldsRequired: boolean;
    allFieldsNotRequired: boolean;
    showingAllFields: boolean;
    showingRequiredFields: boolean;
    numControls: number;
    constructor(element: ElementRef, templates: NovoTemplateService);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    ngAfterContentInit(): void;
    showAllFields(): void;
    showOnlyRequired(hideRequiredWithValue: any): void;
    get values(): any;
    get isValid(): boolean;
    updatedValues(): any;
    forceValidation(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDynamicFormElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDynamicFormElement, "novo-dynamic-form", never, { "controls": { "alias": "controls"; "required": false; }; "fieldsets": { "alias": "fieldsets"; "required": false; }; "form": { "alias": "form"; "required": false; }; "layout": { "alias": "layout"; "required": false; }; "hideNonRequiredFields": { "alias": "hideNonRequiredFields"; "required": false; }; "autoFocusFirstField": { "alias": "autoFocusFirstField"; "required": false; }; }, {}, ["customTemplates"], ["form-title", "form-subtitle"], false, never>;
}

interface NovoAddressSubfieldConfig {
    label: string;
    required: boolean;
    maxlength: number;
    pickerConfig?: any;
    hidden: boolean;
    updated?: boolean;
    readOnly?: boolean;
}
interface NovoAddressConfig {
    required?: boolean;
    readOnly?: boolean;
    address1?: NovoAddressSubfieldConfig;
    address2?: NovoAddressSubfieldConfig;
    city?: NovoAddressSubfieldConfig;
    state?: NovoAddressSubfieldConfig;
    zip?: NovoAddressSubfieldConfig;
    countryID?: NovoAddressSubfieldConfig;
}
declare class NovoAddressElement implements ControlValueAccessor, OnInit, DoCheck {
    labels: NovoLabelService;
    config: NovoAddressConfig;
    private _readOnly;
    set readOnly(readOnly: boolean);
    get readOnly(): boolean;
    private previousRequiredState;
    states: Array<any>;
    fieldList: Array<string>;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    focused: any;
    invalid: any;
    disabled: any;
    invalidMaxlength: any;
    valid: any;
    stateOptions: any;
    tooltip: any;
    initComplete: boolean;
    change: EventEmitter<any>;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    validityChange: EventEmitter<any>;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    initConfig(): void;
    ngDoCheck(): void;
    isValid(field: string): void;
    isInvalid(field: string): void;
    onInput(event: Event, field: string): void;
    isFocused(event: Event, field: string): void;
    isBlurred(event: Event, field: string): void;
    onCountryChange(evt: any): void;
    onStateChange(evt: any): void;
    setStateLabel(model: any): void;
    updateStates(): void;
    getStateOptions(filter: string, countryID: number): string[];
    updateControl(): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    private getDefaultStateConfig;
    private getDefaultCountryConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAddressElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAddressElement, "novo-address", never, { "config": { "alias": "config"; "required": false; }; "readOnly": { "alias": "readOnly"; "required": false; }; }, { "change": "change"; "focus": "focus"; "blur": "blur"; "validityChange": "validityChange"; }, never, never, false, never>;
}

declare class NovoFile {
    name: string;
    file: any;
    type: any;
    contentType: string;
    lastModified: number;
    size: number;
    loaded: boolean;
    fileContents: string;
    dataURL: string;
    reader: FileReader;
    readPromise: Function;
    constructor(file: any);
    read(): Promise<unknown>;
    toJSON(): {
        name: string;
        contentType: any;
        lastModified: number;
        size: number;
        fileContents: string;
    };
}

declare class NovoFileInputBase {
    _defaultErrorStateMatcher: ErrorStateMatcher;
    _parentForm: NgForm;
    _parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(_defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
declare const NovoFileInputMixins: CanUpdateErrorStateCtor & typeof NovoFileInputBase;
declare class NovoFileInputElement extends NovoFileInputMixins implements NovoFieldControl<any>, ControlValueAccessor, OnInit {
    labels: NovoLabelService;
    private globalRef;
    private _uniqueId;
    /** The aria-describedby attribute on the chip list for improved a11y. */
    _ariaDescribedby: string;
    /** Tab index for the chip list. */
    _tabIndex: number;
    /** User defined tab index. */
    _userTabIndex: number | null;
    /** The FocusKeyManager which handles focus. */
    _keyManager: FocusKeyManager<NovoFileInputElement>;
    readonly controlType: string;
    /** @docs-private Implemented as part of NovoFieldControl. */
    lastKeyValue: string;
    /** @docs-private Implemented as part of NovoFieldControl.*/
    lastCaretPosition: number | null;
    id: string;
    tabindex: number;
    /** An object used to control when error messages are shown. */
    errorStateMatcher: ErrorStateMatcher;
    fileInput: TemplateRef<any>;
    fileOutput: TemplateRef<any>;
    container: ViewContainerRef;
    inputElement: ElementRef<HTMLInputElement>;
    multiple: boolean;
    layoutOptions: {
        order?: string;
        download?: boolean;
        edit?: boolean;
        labelStyle?: string;
        draggable?: boolean;
        customActions?: boolean;
        removable?: boolean;
        customValidation?: {
            action: string;
            fn: Function;
        }[];
        removableWhenNew?: boolean;
    };
    value: Array<any>;
    dataFeatureId: string;
    edit: EventEmitter<any>;
    save: EventEmitter<any>;
    delete: EventEmitter<any>;
    upload: EventEmitter<any>;
    files: NovoFile[];
    model: any;
    active: boolean;
    commands: any;
    visible: boolean;
    target: any;
    fileOutputBag: string;
    onModelChange: Function;
    onModelTouched: Function;
    get name(): string;
    set name(value: string);
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required(): boolean;
    set required(value: boolean);
    /** Implemented as part of NovoFieldControl. */
    get placeholder(): string;
    set placeholder(value: string);
    protected _name: string;
    protected _value: boolean;
    protected _required: boolean;
    protected _disabled: boolean;
    protected _placeholder: string;
    constructor(labels: NovoLabelService, globalRef: GlobalRef, _defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, _ngControl: NgControl);
    ngOnInit(): void;
    updateLayout(): void;
    insertTemplatesBasedOnLayout(): any;
    get outputFileDraggingDisabled(): boolean;
    private setInitialFileList;
    dragEnterHandler(event: any): void;
    dragLeaveHandler(event: any): void;
    dragOverHandler(event: any): void;
    dropHandler(event: any): void;
    dropOutputItem(event: CdkDragDrop<NovoFile[]>): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    check(event: any): void;
    validate(files: any): boolean;
    private process;
    download(file: any): void;
    remove(file: any): void;
    private readFile;
    customEdit(file: any): void;
    customSave(file: any): void;
    customDelete(file: any): void;
    customCheck(event: any): void;
    setDisabledState(disabled: boolean): void;
    /** Whether any radio buttons has focus. */
    get focused(): boolean;
    /** Implemented as part of NovoFieldControl. */
    get empty(): boolean;
    /** Implemented as part of NovoFieldControl. */
    get shouldLabelFloat(): boolean;
    /** Implemented as part of NovoFieldControl. */
    setDescribedByIds(ids: string[]): void;
    /** Implemented as part of NovoFieldControl. */
    onContainerClick(event: MouseEvent): void;
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    focus(options?: FocusOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFileInputElement, [null, null, null, { optional: true; }, { optional: true; }, { optional: true; self: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFileInputElement, "novo-file-input", never, { "id": { "alias": "id"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "layoutOptions": { "alias": "layoutOptions"; "required": false; }; "value": { "alias": "value"; "required": false; }; "dataFeatureId": { "alias": "dataFeatureId"; "required": false; }; "name": { "alias": "name"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; }, { "edit": "edit"; "save": "save"; "delete": "delete"; "upload": "upload"; }, never, never, false, never>;
}

declare class NumberRangeComponent implements OnInit, OnDestroy, ControlValueAccessor {
    labels: NovoLabelService;
    private formBuilder;
    rangeForm: FormGroup;
    _onChange: (value: any) => void;
    _onTouched: () => void;
    private _destroyed;
    constructor(labels: NovoLabelService, formBuilder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    minLessThanMaxValidator(group: FormGroup): {
        [key: string]: boolean;
    } | null;
    writeValue(value: {
        min: number;
        max: number;
    }): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumberRangeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NumberRangeComponent, "novo-number-range", never, {}, {}, never, never, false, never>;
}

declare class NovoFormExtrasModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFormExtrasModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoFormExtrasModule, [typeof NovoAddressElement, typeof NovoFileInputElement, typeof NumberRangeComponent], [typeof i4.CommonModule, typeof i5.FormsModule, typeof i6.NovoPipesModule, typeof i7.NovoButtonModule, typeof i8.NovoSelectModule, typeof i9.NovoPickerModule, typeof i10.NovoLoadingModule, typeof i11.NovoTooltipModule, typeof i12.NovoCheckboxModule, typeof i13.DragDropModule, typeof i14.NovoFlexModule, typeof i15.NovoFieldModule, typeof i5.ReactiveFormsModule], [typeof NovoAddressElement, typeof NovoFileInputElement, typeof NumberRangeComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoFormExtrasModule>;
}

declare class ControlConfirmModal {
    private modalRef;
    params: NovoModalParams;
    labels: NovoLabelService;
    constructor(modalRef: NovoModalRef, params: NovoModalParams, labels: NovoLabelService);
    close(result: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlConfirmModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlConfirmModal, "control-confirm-modal", never, {}, {}, never, never, false, never>;
}
declare class ControlPromptModal {
    private modalRef;
    params: NovoModalParams;
    labels: NovoLabelService;
    constructor(modalRef: NovoModalRef, params: NovoModalParams, labels: NovoLabelService);
    close(result: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlPromptModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlPromptModal, "control-prompt-modal", never, {}, {}, never, never, false, never>;
}

declare class NovoFormElement implements AfterContentInit, OnInit {
    private templates;
    form: NovoFormGroup;
    layout: string;
    hideHeader: boolean;
    customTemplates: QueryList<NovoTemplate>;
    showingAllFields: boolean;
    showingRequiredFields: boolean;
    constructor(templates: NovoTemplateService);
    get value(): any;
    get isValid(): boolean;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    showAllFields(): void;
    showOnlyRequired(hideRequiredWithValue: any): void;
    forceValidation(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFormElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFormElement, "novo-form", never, { "form": { "alias": "form"; "required": false; }; "layout": { "alias": "layout"; "required": false; }; "hideHeader": { "alias": "hideHeader"; "required": false; }; }, {}, ["customTemplates"], ["form-title", "form-subtitle", "*"], false, never>;
}

declare class NovoFormModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFormModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoFormModule, [typeof NovoAutoSize, typeof NovoControlElement, typeof NovoDynamicFormElement, typeof NovoFormElement, typeof NovoFieldsetElement, typeof NovoFieldsetHeaderElement, typeof ControlConfirmModal, typeof ControlPromptModal, typeof NovoControlGroup, typeof NovoControlTemplates], [typeof i4.CommonModule, typeof i8$1.OverlayModule, typeof i5.ReactiveFormsModule, typeof i10$1.NovoRadioModule, typeof i11$1.NovoTilesModule, typeof i8.NovoSelectModule, typeof i9.NovoPickerModule, typeof i14$1.NovoChipsModule, typeof i15$1.NovoDatePickerModule, typeof i16.NovoTimePickerModule, typeof i17.NovoDateTimePickerModule, typeof i18.NovoNovoCKEditorModule, typeof NovoFormExtrasModule, typeof i20.NovoQuickNoteModule, typeof i17.NovoDateTimePickerModule, typeof i21.NovoHeaderModule, typeof i11.NovoTooltipModule, typeof i23.NovoPopOverModule, typeof i24.IMaskModule, typeof i25.NovoTipWellModule, typeof i26.NovoModalModule, typeof i7.NovoButtonModule, typeof i28.NovoAceEditorModule, typeof i29.NovoCodeEditorModule, typeof i30.NovoCommonModule, typeof i12.NovoCheckboxModule, typeof i32.NovoIconModule, typeof i10$1.NovoRadioModule, typeof i33.NovoSwitchModule], [typeof NovoAutoSize, typeof NovoDynamicFormElement, typeof NovoControlElement, typeof NovoFormElement, typeof NovoFieldsetHeaderElement, typeof NovoControlGroup, typeof NovoControlTemplates]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoFormModule>;
}

declare class FormValidators {
    private showStateRequiredFlag;
    static maxInteger(control: any): {
        integerTooLarge: boolean;
    };
    static minYear(control: any): {
        minYear: boolean;
    };
    static maxDouble(control: any): {
        doubleTooLarge: boolean;
    };
    static isEmail(control: any): {
        invalidEmail: boolean;
    };
    static isValidAddress(control: any): {
        invalidAddress?: boolean;
        invalidAddressFields?: string[];
        invalidAddressForForm?: boolean;
        maxlength?: boolean;
        maxlengthFields?: string[];
    };
}

export { AceEditorControl, AddressControl, BaseControl, CheckListControl, CheckboxControl, CodeEditorControl, ControlConfirmModal, ControlFactory, ControlPromptModal, CustomControl, DateControl, DateTimeControl, EditState, EditorControl, FieldInteractionApi, FileControl, FormUtils, FormValidators, GroupedControl, NativeSelectControl, NovoAddressElement, NovoAutoSize, NovoControlElement, NovoControlGroup, NovoControlTemplates, NovoDynamicFormElement, NovoFieldsetElement, NovoFieldsetHeaderElement, NovoFile, NovoFileInputElement, NovoFormControl, NovoFormElement, NovoFormExtrasModule, NovoFormGroup, NovoFormModule, NumberRangeComponent, PickerControl, QuickNoteControl, RadioControl, ReadOnlyControl, SelectControl, SwitchControl, TablePickerControl, TextAreaControl, TextBoxControl, TilesControl, TimeControl, TimezoneControl };
export type { CustomHttp, FormField, IFieldInteractionEvent, IMaskOptions, ModifyPickerConfigArgs, NovoAddressConfig, NovoAddressSubfieldConfig, NovoControlConfig, NovoControlGroupAddConfig, NovoControlGroupRowConfig, NovoFieldset, NovoGroupedControlConfig, OptionsFunction, ResultsTemplateType };
