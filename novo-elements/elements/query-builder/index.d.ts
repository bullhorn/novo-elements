import * as i0 from '@angular/core';
import { TemplateRef, ViewContainerRef, OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy, ElementRef, ChangeDetectorRef, SimpleChanges, QueryList, InputSignal, Signal, AfterContentChecked, InjectionToken } from '@angular/core';
import * as i15 from '@angular/forms';
import { FormGroup, FormControl, ControlContainer, FormControlName, UntypedFormGroup, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { Subject, Subscription } from 'rxjs';
import { Day } from 'date-fns';
import * as i25 from 'novo-elements/elements/field';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import * as i18 from 'novo-elements/elements/places';
import { PlacesListComponent } from 'novo-elements/elements/places';
import * as i23 from 'novo-elements/elements/select';
import { NovoSelectElement } from 'novo-elements/elements/select';
import * as i28 from 'novo-elements/elements/tabbed-group-picker';
import { NovoTabbedGroupPickerElement, TabbedGroupPickerTab, TabbedGroupPickerButtonConfig } from 'novo-elements/elements/tabbed-group-picker';
import * as i14 from '@angular/common';
import * as i16 from '@angular/cdk/drag-drop';
import * as i17 from '@angular/cdk/table';
import * as i19 from 'novo-elements/elements/autocomplete';
import * as i20 from 'novo-elements/elements/button';
import * as i21 from 'novo-elements/elements/common';
import * as i22 from 'novo-elements/elements/form';
import * as i24 from 'novo-elements/elements/non-ideal-state';
import * as i26 from 'novo-elements/elements/flex';
import * as i27 from 'novo-elements/elements/tabs';
import * as i29 from 'novo-elements/elements/loading';
import * as i30 from 'novo-elements/elements/card';
import * as i31 from 'novo-elements/elements/date-picker';
import * as i32 from 'novo-elements/elements/date-time-picker';
import * as i33 from 'novo-elements/elements/icon';
import * as i34 from 'novo-elements/elements/radio';
import * as i35 from 'novo-elements/elements/search';
import * as i36 from 'novo-elements/elements/switch';
import * as i37 from 'novo-elements/elements/chips';
import * as i38 from 'novo-elements/elements/select-search';
import * as i39 from 'novo-elements/elements/dropdown';
import * as i40 from 'novo-elements/elements/tooltip';

/** Base interface for a condidation template directives. */
interface ConditionDef {
    template: TemplateRef<any>;
}
/**
 * Contained within a novoConditionField definition describing what input should be
 * used to capture the compare value of the Condtion
 */
declare class NovoConditionInputDef implements ConditionDef {
    template: TemplateRef<any>;
    constructor(/** @docs-private */ template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoConditionInputDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoConditionInputDef, "[novoConditionInputDef]", never, {}, {}, never, never, false, never>;
}
/**
 * Contained within a novoConditionField definition describing what operators should be available.
 */
declare class NovoConditionOperatorsDef implements ConditionDef {
    template: TemplateRef<any>;
    constructor(/** @docs-private */ template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoConditionOperatorsDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoConditionOperatorsDef, "[novoConditionOperatorsDef]", never, {}, {}, never, never, false, never>;
}
/**
 * Field Field definition for the QueryBuilder.
 * Defines the inputType and operators to use for the query builder.
 */
declare class BaseConditionFieldDef {
    /** Unique name for this field. */
    get name(): string;
    set name(name: string);
    protected _name: string;
    fieldInput: NovoConditionInputDef;
    fieldOperators: NovoConditionOperatorsDef;
    /**
     * Transformed version of the column name that can be used as part of a CSS classname. Excludes
     * all non-alphanumeric characters and the special characters '-' and '_'. Any characters that
     * do not match are replaced by the '-' character.
     */
    cssClassFriendlyName: string;
    _fieldCssClassName: string[];
    defaultOperator: string;
    constructor();
    /**
     * Overridable method that sets the css classes that will be added to every cell in this
     * column.
     * In the future, columnCssClassName will change from type string[] to string and this
     * will set a single string value.
     * @docs-private
     */
    protected _updateFieldCssClassName(): void;
    protected _setNameInput(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseConditionFieldDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseConditionFieldDef, never, never, { "name": { "alias": "novoFilterFieldDef"; "required": false; }; }, {}, ["fieldInput", "fieldOperators"], never, true, never>;
}
declare class NovoConditionFieldDef extends BaseConditionFieldDef {
    private qbs;
    constructor(qbs: QueryBuilderService);
    register(): void;
    unregister(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoConditionFieldDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoConditionFieldDef, "[novoConditionFieldDef]", never, {}, {}, never, never, false, never>;
}

declare enum Conjunction {
    AND = "and",
    OR = "or",
    NOT = "not"
}
type ConditionType = '$and' | '$or' | '$not';
type ConditionGroup = {
    [K in Conjunction as `$${K}`]?: Condition[];
};
type NestedConditionGroup = {
    [K in Conjunction as `$${K}`]?: ConditionOrConditionGroup[];
};
type ConditionOrConditionGroup = Condition | NestedConditionGroup;
declare enum Operator {
    after = "after",
    before = "before",
    beginsWith = "beginsWith",
    between = "between",
    equalTo = "equalTo",
    exclude = "exclude",
    excludeAny = "excludeAny",
    greaterThan = "greaterThan",
    include = "include",
    includeAll = "includeAll",
    includeAny = "includeAny",
    insideRadius = "insideRadius",
    isEmpty = "isEmpty",
    isNull = "isNull",
    lessThan = "lessThan",
    outsideRadius = "outsideRadius",
    radius = "radius",
    within = "within"
}
type OperatorName = keyof typeof Operator;
interface Condition {
    conditionType?: ConditionType;
    field: string;
    operator: OperatorName | string;
    scope?: string;
    value: any;
    supportingValue?: any;
    entity?: string;
    warnOnDelete?: () => Promise<boolean>;
}
interface Criteria {
    criteria: ConditionGroup[];
}
interface NestedCriteria {
    criteria: NestedConditionGroup[];
}
interface BaseFieldDef {
    name: string;
    label?: string;
    type: string;
    dataSpecialization?: string;
    optional?: boolean;
    multiValue?: boolean;
    inputType?: string;
    options?: {
        value: string | number;
        label: string;
        readOnly?: boolean;
    }[];
    optionsUrl?: string;
    optionsType?: string;
    dataType?: string;
    icon?: string;
}
interface FieldConfig<T extends BaseFieldDef> {
    value: string;
    label: string;
    options: T[];
    search: (term: string) => T[];
    find: (name: string) => T;
}
interface AddressData {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: AddressGeometry;
    name?: string;
    place_id: string;
    radius?: AddressRadius;
    postal_codes?: string[];
    types?: string[];
}
interface AddressRadius {
    value: number;
    units: AddressRadiusUnitsName;
    operator?: string;
}
interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}
interface AddressGeometry {
    location: AddressGeometryLocation;
    viewport: AddressGeometryViewport;
}
interface AddressGeometryLocation {
    lat: number;
    lng: number;
}
interface AddressGeometryViewport {
    north: number;
    south: number;
    east: number;
    west: number;
}
declare enum RadiusUnits {
    miles = "miles",
    km = "km"
}
type AddressRadiusUnitsName = keyof typeof RadiusUnits;
/** All options that can be used to override the defaults for the address criteria */
type AddressCriteriaConfig = {
    radiusEnabled?: boolean;
    radiusUnits?: AddressRadiusUnitsName;
};
/** All options that can be used to configure date pickers */
type DateCriteriaConfig = {
    weekStart?: Day;
};
/** Interface used to provide an outlet for rows to be inserted into. */
interface QueryFilterOutlet {
    viewContainer: ViewContainerRef;
}

interface QueryBuilderConfig {
    fields: FieldConfig<BaseFieldDef>[];
    staticFieldSelection?: string;
}
declare class QueryBuilderService {
    private labels;
    private _customFieldDefs;
    private _fieldDefsByName;
    scopes: i0.WritableSignal<any[]>;
    hasMultipleScopes: i0.Signal<boolean>;
    /**
     * Will dispatch when properties changes, subscribe to this if component should
     * re-render when props are updated
     */
    readonly stateChanges: Subject<void>;
    /**
     * Function to determine operator and input templates for a field.  Value passed
     * through the criteria builder Input.
     */
    get editTypeFn(): (field: BaseFieldDef) => string;
    set editTypeFn(value: (field: BaseFieldDef) => string);
    private _editTypeFn;
    /**
     * The field configuration to control which types of fields are available to select
     * within the Condition Builder.
     */
    get config(): QueryBuilderConfig;
    set config(value: QueryBuilderConfig);
    private _config;
    /**
     * The configuration to control which types of conjuntions can be used in the query builder.
     * Value passed through the criteria builder Input
     * eg. and, or, not
     */
    get allowedGroupings(): Conjunction[];
    set allowedGroupings(value: Conjunction[]);
    private _allowedGroupings;
    componentHost: any;
    constructor(labels: NovoLabelService);
    /** Adds a field definition that was not included as part of the content children. */
    registerFieldDef(fieldDef: BaseConditionFieldDef): void;
    /** Removes a field definition that was not included as part of the content children. */
    unregisterFieldDef(fieldDef: BaseConditionFieldDef): void;
    getFieldDefsByName(): Map<string, BaseConditionFieldDef>;
    getConjunctionLabel(conjunction: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<QueryBuilderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QueryBuilderService>;
}

/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
declare class ConditionInputOutlet implements QueryFilterOutlet {
    viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    constructor(viewContainer: ViewContainerRef, elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConditionInputOutlet, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ConditionInputOutlet, "[conditionInputOutlet]", never, {}, {}, never, never, false, never>;
}
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
declare class ConditionOperatorOutlet implements QueryFilterOutlet {
    viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    constructor(viewContainer: ViewContainerRef, elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConditionOperatorOutlet, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ConditionOperatorOutlet, "[conditionOperatorOutlet]", never, {}, {}, never, never, false, never>;
}
declare class ConditionBuilderComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy {
    labels: NovoLabelService;
    private cdr;
    private queryBuilderService;
    private controlContainer;
    _operatorOutlet: ConditionOperatorOutlet;
    _inputOutlet: ConditionInputOutlet;
    label: any;
    scope: string;
    andIndex: number;
    groupIndex: number;
    addressConfig: AddressCriteriaConfig;
    dateConfig: DateCriteriaConfig;
    allowEmptyField: boolean;
    hideOperator: i0.InputSignal<boolean>;
    conditionType: i0.InputSignal<unknown>;
    inputConfig: i0.InputSignal<QueryBuilderConfig>;
    inputEditTypeFn: i0.InputSignal<(field: BaseFieldDef) => string>;
    private config;
    private editTypeFn;
    parentForm: FormGroup;
    fieldConfig: FieldConfig<BaseFieldDef>;
    searches: Subscription;
    results$: Promise<any[]>;
    searchTerm: FormControl;
    fieldDisplayWith: any;
    displayIcon: string;
    staticFieldSelection: i0.Signal<string>;
    private _lastContext;
    isConditionHost: boolean;
    gridColumns: i0.Signal<string>;
    /** Subject that emits when the component has been destroyed. */
    private readonly _onDestroy;
    constructor(labels: NovoLabelService, cdr: ChangeDetectorRef, queryBuilderService: QueryBuilderService, controlContainer: ControlContainer);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Updates the Conditions "Field" Options to Change base on new Scope
     * @param fieldConfig
     */
    changeFieldOptions(fieldConfig: FieldConfig<BaseFieldDef>): void;
    /**
     * Resets the input and operator view containers and marks the component for change detection.
     *
     * Use this method after updating form controls to reinitialize the input and
     * operator fields so that the view reflects the latest form control changes.
     *
     * @param recreateTemplates - If true (default), regenerates the field templates.
     *                           If false, only clears the outlets without recreating templates.
     * @returns void
     */
    resetInputAndOperator(recreateTemplates?: boolean): void;
    /**
     * Clears the entire condition (field, operator, value) and resets the condition builder UI.
     *
     * This method performs a complete reset of the condition builder:
     * - Clears all form values (field, operator, value, supportingValue)
     * - Allows empty field selection (prevents auto-restoration to default)
     * - Resets the field search term
     * - Clears internal state (_lastContext) to force re-detection of field changes
     * - Updates field selection and clears UI outlets
     *
     * Use this method when you need to completely clear a condition and start fresh,
     * such as when toggling a filter off or resetting a form group.
     *
     * @returns void
     */
    clearCondition(): void;
    getField(): BaseFieldDef;
    getDefaultField(): string;
    updateFieldSelection(): void;
    updateConditionType(): void;
    private findDefinitionForField;
    private doesFieldQualifyAsBinary;
    private createFieldTemplates;
    private createFieldOperators;
    private createFieldInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConditionBuilderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConditionBuilderComponent, "novo-condition-builder", never, { "label": { "alias": "label"; "required": false; }; "scope": { "alias": "scope"; "required": false; }; "andIndex": { "alias": "andIndex"; "required": false; }; "groupIndex": { "alias": "groupIndex"; "required": false; }; "addressConfig": { "alias": "addressConfig"; "required": false; }; "dateConfig": { "alias": "dateConfig"; "required": false; }; "allowEmptyField": { "alias": "allowEmptyField"; "required": false; }; "hideOperator": { "alias": "hideOperator"; "required": false; "isSignal": true; }; "conditionType": { "alias": "conditionType"; "required": false; "isSignal": true; }; "inputConfig": { "alias": "config"; "required": false; "isSignal": true; }; "inputEditTypeFn": { "alias": "editTypeFn"; "required": false; "isSignal": true; }; }, {}, never, ["*"], false, never>;
}

declare abstract class AbstractConditionFieldDef implements OnDestroy, OnInit, AfterViewInit {
    labels: NovoLabelService;
    /** Column name that should be used to reference this column. */
    get name(): string;
    set name(name: string);
    _name: string;
    defaultOperator: Operator | string;
    protected _previousOperatorValue: Operator;
    protected operatorEditGroups: Set<Operator>[];
    fieldDef: NovoConditionFieldDef;
    formControlsByName: QueryList<FormControlName>;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    frameAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Define an edit group of operators. Once defined, if the user switches from one of these operators to another,
     * then the condition value will not be cleared. This makes sense if both operators use the same UI controls for editing.
     * @param operators The set of Operator values intended to share UI controls.
     */
    protected defineOperatorEditGroup(...operators: Operator[]): void;
    onOperatorSelect(formGroup: UntypedFormGroup): void;
    /** Synchronizes the column definition name with the text column name. */
    private _syncFieldDefName;
    private _syncFieldDefOperatorValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<AbstractConditionFieldDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AbstractConditionFieldDef, never, never, { "name": { "alias": "name"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * Handle selection of field values when a list of options is provided.
 */
declare class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef implements OnDestroy {
    overlayChildren: QueryList<NovoPickerToggleElement>;
    inputChildren: QueryList<ElementRef>;
    placesPicker: PlacesListComponent;
    addressSideTest: any;
    defaults: AddressCriteriaConfig;
    config: InputSignal<AddressCriteriaConfig>;
    radiusUnits: Signal<AddressRadiusUnitsName>;
    radiusEnabled: Signal<boolean>;
    unitsLabel: Signal<string>;
    defaultOperator: Operator;
    chipListModel: any;
    term: string;
    private _addressChangesSubscription;
    element: ElementRef<any>;
    constructor(labelService: NovoLabelService);
    ngOnDestroy(): void;
    onKeyup(event: any, viewIndex: any): void;
    onKeydown(event: any, viewIndex: any): void;
    getValue(formGroup: AbstractControl): AddressData[];
    getCurrentOverlay(viewIndex: string): NovoPickerToggleElement;
    getCurrentInput(viewIndex: string): ElementRef;
    openPlacesList(viewIndex: any): void;
    closePlacesList(viewIndex: any): void;
    selectPlace(event: any, formGroup: AbstractControl, viewIndex: string): void;
    remove(valueToRemove: AddressData, formGroup: AbstractControl, viewIndex: string): void;
    onOperatorSelect(formGroup: UntypedFormGroup): void;
    onRadiusSelect(formGroup: AbstractControl, event: any): void;
    private updateRadiusInValues;
    private getRadiusData;
    private isRadiusOperatorSelected;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultAddressConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultAddressConditionDef, "novo-address-condition-def", never, { "config": { "alias": "config"; "required": false; "isSignal": true; }; }, {}, never, never, false, never>;
}

/**
 * When constructing a query using a field that is a boolean with only true/false as possible values.
 */
declare class NovoDefaultBooleanConditionDef extends AbstractConditionFieldDef {
    defaultOperator: Operator;
    constructor(labelService: NovoLabelService);
    optIdentify(option: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultBooleanConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultBooleanConditionDef, "novo-boolean-condition-def", never, {}, {}, never, never, false, never>;
}

/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
declare class NovoDefaultDateConditionDef extends AbstractConditionFieldDef {
    overlayChildren: QueryList<NovoPickerToggleElement>;
    defaultOperator: Operator;
    config: InputSignal<DateCriteriaConfig>;
    constructor(labelService: NovoLabelService);
    closePanel(event: any, viewIndex: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultDateConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultDateConditionDef, "novo-date-condition-def", never, { "config": { "alias": "config"; "required": false; "isSignal": true; }; }, {}, never, never, false, never>;
}

/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
declare class NovoDefaultDateTimeConditionDef extends AbstractConditionFieldDef {
    overlayChildren: QueryList<NovoPickerToggleElement>;
    defaultOperator: Operator;
    config: InputSignal<DateCriteriaConfig>;
    constructor(labelService: NovoLabelService);
    closePanel(event: any, viewIndex: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultDateTimeConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultDateTimeConditionDef, "novo-date-time-condition-def", never, { "config": { "alias": "config"; "required": false; "isSignal": true; }; }, {}, never, never, false, never>;
}

/**
 * Any condition that has a type of ID usually only is queried by ID.
 */
declare class NovoDefaultIdConditionDef extends AbstractConditionFieldDef {
    defaultOperator: Operator;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultIdConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultIdConditionDef, "novo-id-condition-def", never, {}, {}, never, ["*"], false, never>;
}

/**
 * When constructing a query using a field that is an Int, Double, Number ...etc.
 * TODO: Do we implement currency formation here potentially?
 */
declare class NovoDefaultNumberConditionDef extends AbstractConditionFieldDef {
    defaultOperator: Operator;
    constructor(labelService: NovoLabelService);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultNumberConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultNumberConditionDef, "novo-number-condition-def", never, {}, {}, never, never, false, never>;
}

type FieldOption = BaseFieldDef['options'][number];
/**
 * Handle selection of field values when a list of options is provided.
 */
declare class NovoDefaultPickerConditionDef extends AbstractConditionFieldDef {
    defaultOperator: Operator;
    constructor(labelService: NovoLabelService);
    onOperatorSelect(formGroup: UntypedFormGroup): void;
    showAddOption(meta: any, select: any, filterValue: string): boolean;
    optionTracker(option: FieldOption): string;
    hideOption(option: FieldOption, filterValue: string): boolean;
    customOptions(options: FieldOption[], select: NovoSelectElement): FieldOption[];
    applyCustomItem(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultPickerConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultPickerConditionDef, "novo-picker-condition-def", never, {}, {}, never, never, false, never>;
}

/**
 * Constructing filters against String fields can be complex. Each "chip" added to the
 * condition can be independently used to query a database.  Not all systems support
 * querying within a text column, ie sql unless LIKE is enabled. This could result in a
 * performance penalty.
 */
declare class NovoDefaultStringConditionDef extends AbstractConditionFieldDef {
    defaultOperator: Operator;
    constructor(labelService: NovoLabelService);
    getValue(formGroup: AbstractControl): any[];
    add(event: any, formGroup: AbstractControl): void;
    remove(valueToRemove: string, formGroup: AbstractControl): void;
    private setFormValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultStringConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultStringConditionDef, "novo-string-condition-def", never, {}, {}, never, never, false, never>;
}

declare class NovoConditionTemplatesComponent {
    addressConfig: AddressCriteriaConfig;
    dateConfig: DateCriteriaConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoConditionTemplatesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoConditionTemplatesComponent, "novo-condition-templates", never, { "addressConfig": { "alias": "addressConfig"; "required": false; }; "dateConfig": { "alias": "dateConfig"; "required": false; }; }, {}, never, never, false, never>;
}

declare class ConditionGroupComponent implements OnInit, OnDestroy {
    qbs: QueryBuilderService;
    labels: NovoLabelService;
    private controlContainer;
    private formBuilder;
    private cdr;
    controlName: string;
    groupIndex: number;
    hideFirstOperator: boolean;
    canBeEmpty: boolean;
    formGroupName: any;
    scope: string;
    entity: string;
    parentForm: UntypedFormGroup;
    /** Subject that emits when the component has been destroyed. */
    private readonly _onDestroy;
    constructor(qbs: QueryBuilderService, labels: NovoLabelService, controlContainer: ControlContainer, formBuilder: FormBuilder, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    updateGroupScopeAndEntity(): void;
    updateControlName(value: string): void;
    private sanitizeCondition;
    get root(): FormArray;
    addCondition(data?: any): void;
    removeCondition(index: number): Promise<void>;
    newCondition({ field, operator, scope, value, supportingValue, entity, warnOnDelete }?: Condition): UntypedFormGroup;
    cantRemoveRow(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConditionGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConditionGroupComponent, "novo-condition-group", never, { "controlName": { "alias": "controlName"; "required": false; }; "groupIndex": { "alias": "groupIndex"; "required": false; }; "hideFirstOperator": { "alias": "hideFirstOperator"; "required": false; }; "canBeEmpty": { "alias": "canBeEmpty"; "required": false; }; "formGroupName": { "alias": "formGroupName"; "required": false; }; }, {}, never, never, false, never>;
}

declare class CriteriaBuilderComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewInit {
    private controlContainer;
    private formBuilder;
    private cdr;
    qbs: QueryBuilderService;
    labels: NovoLabelService;
    config: any;
    controlName: string;
    allowedGroupings: Conjunction[];
    editTypeFn: (field: BaseFieldDef) => string;
    addressConfig: AddressCriteriaConfig;
    dateConfig: DateCriteriaConfig;
    canBeEmpty: boolean;
    set HideFirstOperator(hide: boolean);
    get hideFirstOperator(): boolean;
    private _hideFirstOperator;
    _contentFieldDefs: QueryList<NovoConditionFieldDef>;
    scopedFieldPicker: i0.Signal<NovoTabbedGroupPickerElement>;
    conditionGroups: i0.Signal<readonly ConditionGroupComponent[]>;
    parentForm: UntypedFormGroup;
    innerForm: UntypedFormGroup;
    tabbedGroupPickerTabs: i0.Signal<TabbedGroupPickerTab[]>;
    addButtonConfig: TabbedGroupPickerButtonConfig;
    /** Subject that emits when the component has been destroyed. */
    private readonly _onDestroy;
    constructor(controlContainer: ControlContainer, formBuilder: FormBuilder, cdr: ChangeDetectorRef, qbs: QueryBuilderService, labels: NovoLabelService);
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private isConditionGroup;
    private setInitialValue;
    get root(): FormArray;
    addConditionGroup(data?: any): void;
    newConditionGroup(data: ConditionGroup): UntypedFormGroup;
    newCondition({ field, operator, scope, value, supportingValue, warnOnDelete }?: Condition): UntypedFormGroup;
    getFieldEntity(fieldConfigs: any, scope: any): any;
    removeConditionGroupAt(index: number): void;
    clearAllConditions(): void;
    onFieldSelect(field: any): void;
    private _configureQueryBuilderService;
    private _registerFieldDefs;
    static ɵfac: i0.ɵɵFactoryDeclaration<CriteriaBuilderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CriteriaBuilderComponent, "novo-criteria-builder", never, { "config": { "alias": "config"; "required": false; }; "controlName": { "alias": "controlName"; "required": false; }; "allowedGroupings": { "alias": "allowedGroupings"; "required": false; }; "editTypeFn": { "alias": "editTypeFn"; "required": false; }; "addressConfig": { "alias": "addressConfig"; "required": false; }; "dateConfig": { "alias": "dateConfig"; "required": false; }; "canBeEmpty": { "alias": "canBeEmpty"; "required": false; }; "HideFirstOperator": { "alias": "hideFirstOperator"; "required": false; }; }, {}, ["_contentFieldDefs"], never, false, never>;
}

declare class NovoQueryBuilderModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoQueryBuilderModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoQueryBuilderModule, [typeof CriteriaBuilderComponent, typeof ConditionBuilderComponent, typeof ConditionInputOutlet, typeof ConditionOperatorOutlet, typeof ConditionGroupComponent, typeof NovoDefaultAddressConditionDef, typeof NovoDefaultBooleanConditionDef, typeof NovoDefaultDateConditionDef, typeof NovoDefaultDateTimeConditionDef, typeof NovoConditionOperatorsDef, typeof NovoConditionInputDef, typeof NovoConditionFieldDef, typeof NovoDefaultStringConditionDef, typeof NovoDefaultNumberConditionDef, typeof NovoDefaultIdConditionDef, typeof NovoDefaultPickerConditionDef, typeof NovoConditionTemplatesComponent], [typeof i14.CommonModule, typeof i15.FormsModule, typeof i15.ReactiveFormsModule, typeof i16.DragDropModule, typeof i17.CdkTableModule, typeof i18.GooglePlacesModule, typeof i19.NovoAutoCompleteModule, typeof i20.NovoButtonModule, typeof i21.NovoCommonModule, typeof i22.NovoFormModule, typeof i23.NovoSelectModule, typeof i24.NovoNonIdealStateModule, typeof i25.NovoFieldModule, typeof i21.NovoOptionModule, typeof i26.NovoFlexModule, typeof i27.NovoTabModule, typeof i28.NovoTabbedGroupPickerModule, typeof i29.NovoLoadingModule, typeof i30.NovoCardModule, typeof i31.NovoDatePickerModule, typeof i32.NovoDateTimePickerModule, typeof i33.NovoIconModule, typeof i21.NovoOverlayModule, typeof i34.NovoRadioModule, typeof i35.NovoSearchBoxModule, typeof i36.NovoSwitchModule, typeof i37.NovoChipsModule, typeof i38.NovoSelectSearchModule, typeof i39.NovoDropdownModule, typeof i22.NovoFormExtrasModule, typeof i40.NovoTooltipModule], [typeof CriteriaBuilderComponent, typeof ConditionBuilderComponent, typeof NovoDefaultAddressConditionDef, typeof NovoDefaultBooleanConditionDef, typeof NovoDefaultDateConditionDef, typeof NovoDefaultDateTimeConditionDef, typeof NovoConditionOperatorsDef, typeof NovoConditionInputDef, typeof NovoConditionFieldDef, typeof NovoDefaultStringConditionDef, typeof NovoDefaultNumberConditionDef, typeof NovoDefaultIdConditionDef, typeof NovoDefaultPickerConditionDef, typeof NovoConditionTemplatesComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoQueryBuilderModule>;
}

declare const NOVO_QUERY_BUILDER: InjectionToken<any>;
declare const NOVO_CRITERIA_BUILDER: InjectionToken<any>;
declare const NOVO_CONDITION_BUILDER: InjectionToken<any>;

export { AbstractConditionFieldDef, BaseConditionFieldDef, ConditionBuilderComponent, ConditionInputOutlet, ConditionOperatorOutlet, Conjunction, CriteriaBuilderComponent, NOVO_CONDITION_BUILDER, NOVO_CRITERIA_BUILDER, NOVO_QUERY_BUILDER, NovoConditionFieldDef, NovoConditionInputDef, NovoConditionOperatorsDef, NovoConditionTemplatesComponent, NovoDefaultAddressConditionDef, NovoDefaultBooleanConditionDef, NovoDefaultDateConditionDef, NovoDefaultDateTimeConditionDef, NovoDefaultIdConditionDef, NovoDefaultNumberConditionDef, NovoDefaultPickerConditionDef, NovoDefaultStringConditionDef, NovoQueryBuilderModule, Operator, RadiusUnits };
export type { AddressComponent, AddressCriteriaConfig, AddressData, AddressGeometry, AddressGeometryLocation, AddressGeometryViewport, AddressRadius, AddressRadiusUnitsName, BaseFieldDef, Condition, ConditionDef, ConditionGroup, ConditionOrConditionGroup, ConditionType, Criteria, DateCriteriaConfig, FieldConfig, NestedConditionGroup, NestedCriteria, OperatorName, QueryBuilderConfig, QueryFilterOutlet };
