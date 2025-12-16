import * as i0 from '@angular/core';
import { signal, computed, Injectable, InjectionToken, Directive, ContentChild, Input, ViewChildren, ViewChild, input, inject, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, Component, SkipSelf, Optional, HostBinding, forwardRef, viewChild, viewChildren, ContentChildren, NgModule } from '@angular/core';
import * as i3 from '@angular/forms';
import { FormControlName, FormControl, Validators, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i1 from 'novo-elements/services';
import { NovoLabelService } from 'novo-elements/services';
import { Subject, Subscription, merge, interval } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, startWith, filter, debounce } from 'rxjs/operators';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from 'novo-elements/elements/common';
import { NovoCommonModule, NovoOptionModule, NovoOverlayModule } from 'novo-elements/elements/common';
import * as i5$1 from 'novo-elements/elements/select';
import { NovoSelectElement, NovoSelectModule } from 'novo-elements/elements/select';
import * as i6 from 'novo-elements/elements/field';
import { NovoPickerToggleElement, NovoFieldModule } from 'novo-elements/elements/field';
import * as i8 from 'novo-elements/elements/flex';
import { NovoFlexModule } from 'novo-elements/elements/flex';
import * as i9$3 from 'novo-elements/elements/loading';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import * as i9$2 from 'novo-elements/elements/select-search';
import { NovoSelectSearchModule } from 'novo-elements/elements/select-search';
import * as i4 from 'novo-elements/elements/places';
import { GooglePlacesModule } from 'novo-elements/elements/places';
import * as i9 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i10 from 'novo-elements/elements/chips';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import * as i11 from 'novo-elements/elements/tooltip';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import * as i9$1 from 'novo-elements/elements/radio';
import { NovoRadioModule } from 'novo-elements/elements/radio';
import * as i7 from 'novo-elements/elements/date-picker';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import * as i8$1 from 'novo-elements/elements/date-time-picker';
import { NovoDateTimePickerModule } from 'novo-elements/elements/date-time-picker';
import * as i4$1 from 'novo-elements/elements/autocomplete';
import { NovoAutoCompleteModule } from 'novo-elements/elements/autocomplete';
import * as i8$2 from 'novo-elements/elements/form';
import { NovoFormModule, NovoFormExtrasModule } from 'novo-elements/elements/form';
import * as i7$1 from 'novo-elements/elements/tabbed-group-picker';
import { NovoTabbedGroupPickerElement, NovoTabbedGroupPickerModule } from 'novo-elements/elements/tabbed-group-picker';
import { Helpers } from 'novo-elements/utils';
import * as i5$2 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i8$3 from 'novo-elements/elements/dropdown';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { NovoCardModule } from 'novo-elements/elements/card';
import { NovoNonIdealStateModule } from 'novo-elements/elements/non-ideal-state';
import { NovoSearchBoxModule } from 'novo-elements/elements/search';
import { NovoSwitchModule } from 'novo-elements/elements/switch';
import { NovoTabModule } from 'novo-elements/elements/tabs';

var Conjunction;
(function (Conjunction) {
    Conjunction["AND"] = "and";
    Conjunction["OR"] = "or";
    Conjunction["NOT"] = "not";
})(Conjunction || (Conjunction = {}));
var Operator;
(function (Operator) {
    Operator["after"] = "after";
    Operator["before"] = "before";
    Operator["beginsWith"] = "beginsWith";
    Operator["between"] = "between";
    Operator["equalTo"] = "equalTo";
    Operator["exclude"] = "exclude";
    Operator["excludeAny"] = "excludeAny";
    Operator["greaterThan"] = "greaterThan";
    Operator["include"] = "include";
    Operator["includeAll"] = "includeAll";
    Operator["includeAny"] = "includeAny";
    Operator["insideRadius"] = "insideRadius";
    Operator["isEmpty"] = "isEmpty";
    Operator["isNull"] = "isNull";
    Operator["lessThan"] = "lessThan";
    Operator["outsideRadius"] = "outsideRadius";
    Operator["radius"] = "radius";
    Operator["within"] = "within";
})(Operator || (Operator = {}));
var RadiusUnits;
(function (RadiusUnits) {
    RadiusUnits["miles"] = "miles";
    RadiusUnits["km"] = "km";
})(RadiusUnits || (RadiusUnits = {}));

const defaultEditTypeFn = (field) => {
    return field.inputType || field.dataType || field.type;
};
class QueryBuilderService {
    /**
     * Function to determine operator and input templates for a field.  Value passed
     * through the criteria builder Input.
     */
    get editTypeFn() {
        return this._editTypeFn;
    }
    set editTypeFn(value) {
        this._editTypeFn = value ?? defaultEditTypeFn;
        this.stateChanges.next();
    }
    /**
     * The field configuration to control which types of fields are available to select
     * within the Condition Builder.
     */
    get config() {
        return this._config;
    }
    set config(value) {
        this._config = value;
        this.stateChanges.next();
    }
    /**
     * The configuration to control which types of conjuntions can be used in the query builder.
     * Value passed through the criteria builder Input
     * eg. and, or, not
     */
    get allowedGroupings() {
        return this._allowedGroupings;
    }
    set allowedGroupings(value) {
        this._allowedGroupings = value;
        this.stateChanges.next();
    }
    constructor(labels) {
        this.labels = labels;
        this._customFieldDefs = new Set();
        this._fieldDefsByName = new Map();
        this.scopes = signal([]);
        this.hasMultipleScopes = computed(() => this.scopes()?.length > 1);
        /**
         * Will dispatch when properties changes, subscribe to this if component should
         * re-render when props are updated
         */
        this.stateChanges = new Subject();
        this._editTypeFn = defaultEditTypeFn;
        this._config = {
            fields: [],
            staticFieldSelection: null
        };
    }
    /** Adds a field definition that was not included as part of the content children. */
    registerFieldDef(fieldDef) {
        this._customFieldDefs.add(fieldDef);
        this._fieldDefsByName.set(fieldDef.name, fieldDef);
    }
    /** Removes a field definition that was not included as part of the content children. */
    unregisterFieldDef(fieldDef) {
        this._customFieldDefs.delete(fieldDef);
        this._fieldDefsByName.delete(fieldDef.name);
    }
    getFieldDefsByName() {
        return this._fieldDefsByName;
    }
    getConjunctionLabel(conjunction) {
        switch (conjunction.replace('$', '').toLowerCase()) {
            case Conjunction.OR:
                return this.labels.or;
            case Conjunction.NOT:
                return this.labels.not;
            case Conjunction.AND:
            default:
                return this.labels.and;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: QueryBuilderService, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: QueryBuilderService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: QueryBuilderService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.NovoLabelService }] });

const NOVO_QUERY_BUILDER = new InjectionToken('NOVO_QUERY_BUILDER');
const NOVO_CRITERIA_BUILDER = new InjectionToken('NOVO_CRITERIA_BUILDER');
const NOVO_CONDITION_BUILDER = new InjectionToken('NOVO_CONDITION_BUILDER');

/**
 * Contained within a novoConditionField definition describing what input should be
 * used to capture the compare value of the Condtion
 */
class NovoConditionInputDef {
    constructor(/** @docs-private */ template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoConditionInputDef, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoConditionInputDef, isStandalone: false, selector: "[novoConditionInputDef]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoConditionInputDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoConditionInputDef]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });
/**
 * Contained within a novoConditionField definition describing what operators should be available.
 */
class NovoConditionOperatorsDef {
    constructor(/** @docs-private */ template) {
        this.template = template;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoConditionOperatorsDef, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoConditionOperatorsDef, isStandalone: false, selector: "[novoConditionOperatorsDef]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoConditionOperatorsDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoConditionOperatorsDef]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });
/**
 * Field Field definition for the QueryBuilder.
 * Defines the inputType and operators to use for the query builder.
 */
class BaseConditionFieldDef {
    /** Unique name for this field. */
    get name() {
        return this._name;
    }
    set name(name) {
        this._setNameInput(name);
    }
    constructor() { }
    /**
     * Overridable method that sets the css classes that will be added to every cell in this
     * column.
     * In the future, columnCssClassName will change from type string[] to string and this
     * will set a single string value.
     * @docs-private
     */
    _updateFieldCssClassName() {
        this._fieldCssClassName = [`novo-filter-field-${this.cssClassFriendlyName}`];
    }
    _setNameInput(value) {
        // If the directive is set without a name (updated programmatically), then this setter will
        // trigger with an empty string and should not overwrite the programmatically set value.
        if (value) {
            this._name = value;
            this.cssClassFriendlyName = value.replace(/[^a-z0-9_-]/gi, '-');
            this._updateFieldCssClassName();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BaseConditionFieldDef, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: BaseConditionFieldDef, isStandalone: true, inputs: { name: ["novoFilterFieldDef", "name"] }, queries: [{ propertyName: "fieldInput", first: true, predicate: NovoConditionInputDef, descendants: true }, { propertyName: "fieldOperators", first: true, predicate: NovoConditionOperatorsDef, descendants: true }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BaseConditionFieldDef, decorators: [{
            type: Directive
        }], ctorParameters: () => [], propDecorators: { name: [{
                type: Input,
                args: ['novoFilterFieldDef']
            }], fieldInput: [{
                type: ContentChild,
                args: [NovoConditionInputDef]
            }], fieldOperators: [{
                type: ContentChild,
                args: [NovoConditionOperatorsDef]
            }] } });
class NovoConditionFieldDef extends BaseConditionFieldDef {
    constructor(qbs) {
        super();
        this.qbs = qbs;
    }
    register() {
        this.qbs.registerFieldDef(this);
    }
    unregister() {
        this.qbs.unregisterFieldDef(this);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoConditionFieldDef, deps: [{ token: QueryBuilderService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoConditionFieldDef, isStandalone: false, selector: "[novoConditionFieldDef]", usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoConditionFieldDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoConditionFieldDef]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: QueryBuilderService }] });

class AbstractConditionFieldDef {
    /** Column name that should be used to reference this column. */
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
        // With Ivy, inputs can be initialized before static query results are
        // available. In that case, we defer the synchronization until "ngOnInit" fires.
        this._syncFieldDefName();
    }
    constructor(labels) {
        this.labels = labels;
        this.operatorEditGroups = [];
    }
    ngOnInit() {
        this._syncFieldDefName();
        this._syncFieldDefOperatorValue();
        this._previousOperatorValue = this.defaultOperator;
        // Need to add self to FilterBuilder because "ContentChildren won't find it"
        this.fieldDef?.register();
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.frameAfterViewInit();
        });
    }
    frameAfterViewInit() {
        const operatorField = this.formControlsByName.find(formControlDirective => formControlDirective.name === 'operator')?.control;
        if (operatorField) {
            this._previousOperatorValue = operatorField.value;
        }
    }
    ngOnDestroy() {
        this.fieldDef?.unregister();
    }
    /**
     * Define an edit group of operators. Once defined, if the user switches from one of these operators to another,
     * then the condition value will not be cleared. This makes sense if both operators use the same UI controls for editing.
     * @param operators The set of Operator values intended to share UI controls.
     */
    defineOperatorEditGroup(...operators) {
        this.operatorEditGroups.push(new Set(operators));
    }
    onOperatorSelect(formGroup) {
        let clearVal = true;
        if (this._previousOperatorValue && this.operatorEditGroups?.length) {
            const previousOperatorGroupIndex = this.operatorEditGroups.findIndex(grp => grp.has(this._previousOperatorValue));
            const newOperatorValue = formGroup.get('operator').getRawValue();
            const newOperatorGroupIndex = this.operatorEditGroups.findIndex(grp => grp.has(newOperatorValue));
            if (previousOperatorGroupIndex !== -1 && newOperatorGroupIndex !== -1 && previousOperatorGroupIndex === newOperatorGroupIndex) {
                clearVal = false;
            }
        }
        this._previousOperatorValue = formGroup.get('operator').value;
        if (clearVal) {
            formGroup.get('value').setValue(null);
        }
    }
    /** Synchronizes the column definition name with the text column name. */
    _syncFieldDefName() {
        if (this.fieldDef) {
            this.fieldDef.name = this.name;
        }
    }
    _syncFieldDefOperatorValue() {
        if (this.fieldDef) {
            this.fieldDef.defaultOperator = this.defaultOperator;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AbstractConditionFieldDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: AbstractConditionFieldDef, isStandalone: true, inputs: { name: "name" }, viewQueries: [{ propertyName: "fieldDef", first: true, predicate: NovoConditionFieldDef, descendants: true, static: true }, { propertyName: "formControlsByName", predicate: FormControlName, descendants: true }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AbstractConditionFieldDef, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i1.NovoLabelService }], propDecorators: { name: [{
                type: Input
            }], fieldDef: [{
                type: ViewChild,
                args: [NovoConditionFieldDef, { static: true }]
            }], formControlsByName: [{
                type: ViewChildren,
                args: [FormControlName]
            }] } });

/**
 * Handle selection of field values when a list of options is provided.
 */
class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        // Overridable defaults
        this.defaults = {
            radiusEnabled: false,
            radiusUnits: 'miles',
        };
        this.config = input();
        this.radiusUnits = computed(() => this.config()?.radiusUnits || this.defaults.radiusUnits);
        this.radiusEnabled = computed(() => this.config()?.radiusEnabled || this.defaults.radiusEnabled);
        this.unitsLabel = computed(() => this.radiusUnits() === RadiusUnits.miles ? this.labels.miles : this.labels.km);
        this.defaultOperator = Operator.includeAny;
        this.chipListModel = '';
        this.term = '';
        this._addressChangesSubscription = Subscription.EMPTY;
        this.element = inject(ElementRef);
        this.defineOperatorEditGroup(Operator.includeAny, Operator.excludeAny, Operator.insideRadius, Operator.outsideRadius);
    }
    ngOnDestroy() {
        this._addressChangesSubscription.unsubscribe();
    }
    onKeyup(event, viewIndex) {
        if (!["Escape" /* Key.Escape */, "Enter" /* Key.Enter */].includes(event.key)) {
            this.openPlacesList(viewIndex);
        }
        this.term = event.target.value;
    }
    onKeydown(event, viewIndex) {
        if (!this.placesPicker.dropdownOpen) {
            this.openPlacesList(viewIndex);
            this.placesPicker.dropdownOpen = true;
        }
        if (["Escape" /* Key.Escape */, "Tab" /* Key.Tab */].includes(event.key)) {
            this.closePlacesList(viewIndex);
        }
        else {
            this.placesPicker.onKeyDown(event);
        }
    }
    getValue(formGroup) {
        return formGroup.value.value || [];
    }
    getCurrentOverlay(viewIndex) {
        return this.overlayChildren?.find(item => item.overlayId === viewIndex);
    }
    getCurrentInput(viewIndex) {
        return this.inputChildren?.find(item => item.nativeElement.id === viewIndex);
    }
    openPlacesList(viewIndex) {
        this.getCurrentOverlay(viewIndex)?.openPanel();
    }
    closePlacesList(viewIndex) {
        this.getCurrentOverlay(viewIndex)?.closePanel();
    }
    selectPlace(event, formGroup, viewIndex) {
        const valueToAdd = {
            address_components: event.address_components,
            formatted_address: event.formatted_address,
            geometry: event.geometry,
            name: event.name,
            postal_codes: event.postal_codes,
            place_id: event.place_id,
            types: event.types,
        };
        const current = this.getValue(formGroup);
        const updated = Array.isArray(current) ? [...current, valueToAdd] : [valueToAdd];
        formGroup.get('value').setValue(this.updateRadiusInValues(formGroup, updated));
        this.inputChildren.forEach(input => {
            input.nativeElement.value = '';
        });
        this.getCurrentInput(viewIndex)?.nativeElement.focus();
        this.closePlacesList(viewIndex);
    }
    remove(valueToRemove, formGroup, viewIndex) {
        const current = this.getValue(formGroup);
        const index = current.indexOf(valueToRemove);
        if (index >= 0) {
            const oldValue = [...current];
            oldValue.splice(index, 1);
            formGroup.get('value').setValue(oldValue);
        }
        this.closePlacesList(viewIndex);
    }
    // Override abstract behavior - allow moving location from includeAny to radius, but when moving the opposite direction,
    // trim out radius information from the value
    onOperatorSelect(formGroup) {
        const previousOperator = this._previousOperatorValue;
        super.onOperatorSelect(formGroup);
        if ([previousOperator, formGroup.get('operator').getRawValue()].indexOf(Operator.insideRadius) !== -1 &&
            formGroup.get('value').getRawValue() != null) {
            formGroup.get('value').setValue(this.updateRadiusInValues(formGroup, this.getValue(formGroup)));
        }
    }
    onRadiusSelect(formGroup, event) {
        const maxLengthRadius = event.target.value.slice(0, 4);
        event.target.value = maxLengthRadius;
        formGroup.get('supportingValue').setValue(maxLengthRadius);
        // We must dirty the form explicitly to show up as a user modification when it was done programmatically
        formGroup.get('value').setValue(this.updateRadiusInValues(formGroup, this.getValue(formGroup)));
        formGroup.markAsDirty();
    }
    updateRadiusInValues(formGroup, values) {
        return values.map(val => ({
            ...val,
            radius: this.isRadiusOperatorSelected(formGroup) ? this.getRadiusData(formGroup) : undefined,
        }));
    }
    getRadiusData(formGroup) {
        return {
            value: formGroup.value.supportingValue,
            units: this.radiusUnits(),
            operator: formGroup.value.operator,
        };
    }
    isRadiusOperatorSelected(formGroup) {
        return ['insideRadius', 'outsideRadius'].includes(formGroup.get('operator')?.value) && formGroup.value?.supportingValue !== null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultAddressConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.15", type: NovoDefaultAddressConditionDef, isStandalone: false, selector: "novo-address-condition-def", inputs: { config: { classPropertyName: "config", publicName: "config", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "placesPicker", first: true, predicate: ["placesPicker"], descendants: true }, { propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }, { propertyName: "inputChildren", predicate: ["addressInput"], descendants: true }, { propertyName: "addressSideTest", predicate: NovoSelectElement, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="insideRadius" *ngIf="radiusEnabled()">{{ labels.insideRadius }}</novo-option>
          <novo-option value="outsideRadius" *ngIf="radiusEnabled()">{{ labels.outsideRadius }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex; fieldMeta as meta" [formGroup]="formGroup">
        <novo-flex justify="space-between" align="end">
          <novo-field #input *ngIf="['radius', 'insideRadius', 'outsideRadius'].includes(formGroup.value.operator)" class="address-radius">
            <input
              novoInput
              paddingLeft="3px"
              type="number"
              min="1"
              max="9999"
              step="1"
              formControlName="supportingValue"
              #distanceInput
              (input)="onRadiusSelect(formGroup, $event)"
            />
            <span marginLeft="2px" marginRight="4px" paddingTop="3px">{{ unitsLabel() }}</span>
          </novo-field>
          <novo-field #novoField class="address-location">
            <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }" (click)="openPlacesList(viewIndex)">
              <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup, viewIndex)">
                <novo-text ellipsis [tooltip]="item.formatted_address" tooltipOnOverflow>{{ item.formatted_address }}</novo-text>
                <novo-icon novoChipRemove>close</novo-icon>
              </novo-chip>
              <input
                novoChipInput
                [id]="viewIndex"
                [placeholder]="labels.location"
                (keyup)="onKeyup($event, viewIndex)"
                (keydown)="onKeydown($event, viewIndex)"
                [picker]="placesPicker"
                #addressInput/>
            </novo-chip-list>
            <novo-picker-toggle [overlayId]="viewIndex" icon="location" novoSuffix>
              <google-places-list
                [term]="term"
                (select)="selectPlace($event, formGroup, viewIndex)"
                formControlName="value"
                #placesPicker/>
            </novo-picker-toggle>
          </novo-field>
        </novo-flex>
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.MinValidator, selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]", inputs: ["min"] }, { kind: "directive", type: i3.MaxValidator, selector: "input[type=number][max][formControlName],input[type=number][max][formControl],input[type=number][max][ngModel]", inputs: ["max"] }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.PlacesListComponent, selector: "google-places-list", inputs: ["userSettings"], outputs: ["termChange", "select"] }, { kind: "component", type: i5.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { kind: "directive", type: i5.MarginDirective, selector: "[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]", inputs: ["margin", "m", "marginLeft", "ml", "marginRight", "mr", "marginTop", "mt", "marginBottom", "mb", "marginX", "mx", "marginY", "my"] }, { kind: "directive", type: i5.PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: ["padding", "p", "paddingLeft", "pl", "paddingRight", "pr", "paddingTop", "pt", "paddingBottom", "pb", "paddingX", "px", "paddingY", "py"] }, { kind: "component", type: i5$1.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "directive", type: i6.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "component", type: i6.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { kind: "directive", type: i6.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i8.NovoFlexElement, selector: "novo-flex,novo-row", inputs: ["direction", "align", "justify", "wrap", "gap"] }, { kind: "component", type: i9.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i10.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { kind: "directive", type: i10.NovoChipRemove, selector: "[novoChipRemove]" }, { kind: "directive", type: i10.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }, { kind: "component", type: i10.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "chipsToggleable", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { kind: "directive", type: i11.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }, { kind: "directive", type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultAddressConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-address-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="insideRadius" *ngIf="radiusEnabled()">{{ labels.insideRadius }}</novo-option>
          <novo-option value="outsideRadius" *ngIf="radiusEnabled()">{{ labels.outsideRadius }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex; fieldMeta as meta" [formGroup]="formGroup">
        <novo-flex justify="space-between" align="end">
          <novo-field #input *ngIf="['radius', 'insideRadius', 'outsideRadius'].includes(formGroup.value.operator)" class="address-radius">
            <input
              novoInput
              paddingLeft="3px"
              type="number"
              min="1"
              max="9999"
              step="1"
              formControlName="supportingValue"
              #distanceInput
              (input)="onRadiusSelect(formGroup, $event)"
            />
            <span marginLeft="2px" marginRight="4px" paddingTop="3px">{{ unitsLabel() }}</span>
          </novo-field>
          <novo-field #novoField class="address-location">
            <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }" (click)="openPlacesList(viewIndex)">
              <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup, viewIndex)">
                <novo-text ellipsis [tooltip]="item.formatted_address" tooltipOnOverflow>{{ item.formatted_address }}</novo-text>
                <novo-icon novoChipRemove>close</novo-icon>
              </novo-chip>
              <input
                novoChipInput
                [id]="viewIndex"
                [placeholder]="labels.location"
                (keyup)="onKeyup($event, viewIndex)"
                (keydown)="onKeydown($event, viewIndex)"
                [picker]="placesPicker"
                #addressInput/>
            </novo-chip-list>
            <novo-picker-toggle [overlayId]="viewIndex" icon="location" novoSuffix>
              <google-places-list
                [term]="term"
                (select)="selectPlace($event, formGroup, viewIndex)"
                formControlName="value"
                #placesPicker/>
            </novo-picker-toggle>
          </novo-field>
        </novo-flex>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }], propDecorators: { overlayChildren: [{
                type: ViewChildren,
                args: [NovoPickerToggleElement]
            }], inputChildren: [{
                type: ViewChildren,
                args: ['addressInput']
            }], placesPicker: [{
                type: ViewChild,
                args: ['placesPicker']
            }], addressSideTest: [{
                type: ViewChildren,
                args: [NovoSelectElement]
            }] } });

/**
 * When constructing a query using a field that is a boolean with only true/false as possible values.
 */
class NovoDefaultBooleanConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        this.defaultOperator = Operator.include;
        this.defineOperatorEditGroup(Operator.include, Operator.exclude, Operator.isNull);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultBooleanConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDefaultBooleanConditionDef, isStandalone: false, selector: "novo-boolean-condition-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="include">{{ labels.equals }}</novo-option>
          <novo-option value="exclude">{{ labels.doesNotEqual }}</novo-option>
          <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [style.width.px]="125" [formGroup]="formGroup">
        <novo-radio-group formControlName="value">
          <novo-radio [value]="true">{{ formGroup.value.operator === 'isNull' ? labels.yes : labels.true }}</novo-radio>
          <novo-radio [value]="false">{{ formGroup.value.operator === 'isNull' ? labels.no : labels.false }}</novo-radio>
        </novo-radio-group>
      </novo-field>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i5$1.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i9$1.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i9$1.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "directive", type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultBooleanConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-boolean-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="include">{{ labels.equals }}</novo-option>
          <novo-option value="exclude">{{ labels.doesNotEqual }}</novo-option>
          <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [style.width.px]="125" [formGroup]="formGroup">
        <novo-radio-group formControlName="value">
          <novo-radio [value]="true">{{ formGroup.value.operator === 'isNull' ? labels.yes : labels.true }}</novo-radio>
          <novo-radio [value]="false">{{ formGroup.value.operator === 'isNull' ? labels.no : labels.false }}</novo-radio>
        </novo-radio-group>
      </novo-field>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }] });

/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
class NovoDefaultDateConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        this.defaultOperator = Operator.within;
        this.config = input();
        this.defineOperatorEditGroup(Operator.before, Operator.after, Operator.equalTo);
    }
    closePanel(event, viewIndex) {
        const overlay = this.overlayChildren.find(item => item.overlayId === viewIndex);
        overlay.closePanel(event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultDateConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.15", type: NovoDefaultDateConditionDef, isStandalone: false, selector: "novo-date-condition-def", inputs: { config: { classPropertyName: "config", publicName: "config", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">{{ labels.before }}</novo-option>
          <novo-option value="after">{{ labels.after }}</novo-option>
          <novo-option value="equalTo">{{ labels.equals }}</novo-option>
          <novo-option value="within">{{ labels.within }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
          <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['before', 'after', 'equalTo']">
          <input novoInput dateFormat="yyyy-mm-dd" [picker]="datepicker" formControlName="value"/>
          <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker #datepicker (onSelect)="closePanel($event, viewIndex)" [weekStart]="config()?.weekStart"></novo-date-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['between']">
          <input novoInput dateRangeFormat="date" [picker]="daterangepicker" formControlName="value"/>
          <novo-picker-toggle [for]="daterangepicker" triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker #daterangepicker (onSelect)="closePanel($event, viewIndex)" [weekStart]="config()?.weekStart" mode="range"
                              numberOfMonths="2"></novo-date-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['within']">
          <novo-select [placeholder]="labels.selectDateRange" formControlName="value">
            <novo-option value="future">{{ labels.future }}</novo-option>
            <novo-option value="-1">{{ labels.past1Day }}</novo-option>
            <novo-option value="-7">{{ labels.past7Days }}</novo-option>
            <novo-option value="-14">{{ labels.past14Days }}</novo-option>
            <novo-option value="-21">{{ labels.past21Days }}</novo-option>
            <novo-option value="-30">{{ labels.past30Days }}</novo-option>
            <novo-option value="-60">{{ labels.past60Days }}</novo-option>
            <novo-option value="-90">{{ labels.past90Days }}</novo-option>
            <novo-option value="-180">{{ labels.past180Days }}</novo-option>
            <novo-option value="-270">{{ labels.past270Days }}</novo-option>
            <novo-option value="-365">{{ labels.past1Year }}</novo-option>
            <novo-option value="1">{{ labels.next1Day }}</novo-option>
            <novo-option value="7">{{ labels.next7Days }}</novo-option>
            <novo-option value="14">{{ labels.next14Days }}</novo-option>
            <novo-option value="21">{{ labels.next21Days }}</novo-option>
            <novo-option value="30">{{ labels.next30Days }}</novo-option>
            <novo-option value="60">{{ labels.next60Days }}</novo-option>
            <novo-option value="90">{{ labels.next90Days }}</novo-option>
            <novo-option value="180">{{ labels.next180Days }}</novo-option>
            <novo-option value="270">{{ labels.next270Days }}</novo-option>
            <novo-option value="365">{{ labels.next1Year }}</novo-option>
          </novo-select>
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i5.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i5$1.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "directive", type: i6.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "directive", type: i6.NovoDateFormatDirective, selector: "input[dateFormat]", inputs: ["dateFormat"] }, { kind: "directive", type: i6.NovoDateRangeFormatDirective, selector: "input[dateRangeFormat]", inputs: ["dateRangeFormat"] }, { kind: "component", type: i6.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { kind: "directive", type: i6.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i7.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "hideToday", "disabledDateMessage", "dateForInitialView", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { kind: "component", type: i9$1.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i9$1.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "directive", type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultDateConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-date-condition-def',
                    template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">{{ labels.before }}</novo-option>
          <novo-option value="after">{{ labels.after }}</novo-option>
          <novo-option value="equalTo">{{ labels.equals }}</novo-option>
          <novo-option value="within">{{ labels.within }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
          <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['before', 'after', 'equalTo']">
          <input novoInput dateFormat="yyyy-mm-dd" [picker]="datepicker" formControlName="value"/>
          <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker #datepicker (onSelect)="closePanel($event, viewIndex)" [weekStart]="config()?.weekStart"></novo-date-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['between']">
          <input novoInput dateRangeFormat="date" [picker]="daterangepicker" formControlName="value"/>
          <novo-picker-toggle [for]="daterangepicker" triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker #daterangepicker (onSelect)="closePanel($event, viewIndex)" [weekStart]="config()?.weekStart" mode="range"
                              numberOfMonths="2"></novo-date-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['within']">
          <novo-select [placeholder]="labels.selectDateRange" formControlName="value">
            <novo-option value="future">{{ labels.future }}</novo-option>
            <novo-option value="-1">{{ labels.past1Day }}</novo-option>
            <novo-option value="-7">{{ labels.past7Days }}</novo-option>
            <novo-option value="-14">{{ labels.past14Days }}</novo-option>
            <novo-option value="-21">{{ labels.past21Days }}</novo-option>
            <novo-option value="-30">{{ labels.past30Days }}</novo-option>
            <novo-option value="-60">{{ labels.past60Days }}</novo-option>
            <novo-option value="-90">{{ labels.past90Days }}</novo-option>
            <novo-option value="-180">{{ labels.past180Days }}</novo-option>
            <novo-option value="-270">{{ labels.past270Days }}</novo-option>
            <novo-option value="-365">{{ labels.past1Year }}</novo-option>
            <novo-option value="1">{{ labels.next1Day }}</novo-option>
            <novo-option value="7">{{ labels.next7Days }}</novo-option>
            <novo-option value="14">{{ labels.next14Days }}</novo-option>
            <novo-option value="21">{{ labels.next21Days }}</novo-option>
            <novo-option value="30">{{ labels.next30Days }}</novo-option>
            <novo-option value="60">{{ labels.next60Days }}</novo-option>
            <novo-option value="90">{{ labels.next90Days }}</novo-option>
            <novo-option value="180">{{ labels.next180Days }}</novo-option>
            <novo-option value="270">{{ labels.next270Days }}</novo-option>
            <novo-option value="365">{{ labels.next1Year }}</novo-option>
          </novo-select>
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }], propDecorators: { overlayChildren: [{
                type: ViewChildren,
                args: [NovoPickerToggleElement]
            }] } });

/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
class NovoDefaultDateTimeConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        this.defaultOperator = Operator.within;
        this.config = input();
        this.defineOperatorEditGroup(Operator.before, Operator.after);
    }
    closePanel(event, viewIndex) {
        const overlay = this.overlayChildren.find(item => item.overlayId === viewIndex);
        overlay.closePanel(event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultDateTimeConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.15", type: NovoDefaultDateTimeConditionDef, isStandalone: false, selector: "novo-date-time-condition-def", inputs: { config: { classPropertyName: "config", publicName: "config", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }], usesInheritance: true, ngImport: i0, template: `
      <ng-container novoConditionFieldDef="DATE">
        <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
          <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
            <novo-option value="before">{{ labels.before }}</novo-option>
            <novo-option value="after">{{ labels.after }}</novo-option>
            <novo-option value="equalTo">{{ labels.equals }}</novo-option>
            <novo-option value="within">{{ labels.within }}</novo-option>
            <novo-option value="between">{{ labels.between }}</novo-option>
            <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
          </novo-select>
        </novo-field>
        <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
          <novo-field *novoSwitchCases="['after']">
            <input novoInput dateTimeFormat="iso8601" [picker]="datetimepicker" formControlName="value"/>
            <novo-picker-toggle triggerOnFocus [width]="-1" [overlayId]="viewIndex" novoSuffix icon="calendar">
              <novo-date-time-picker defaultTime="end" (onSelect)="closePanel($event, viewIndex)" #datetimepicker
                                     [weekStart]="config()?.weekStart"></novo-date-time-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['before']">
            <input novoInput dateTimeFormat="iso8601" [picker]="datetimepickerbefore" formControlName="value"/>
            <novo-picker-toggle triggerOnFocus [width]="-1" [overlayId]="viewIndex" novoSuffix icon="calendar">
              <novo-date-time-picker defaultTime="start" (onSelect)="closePanel($event, viewIndex)" #datetimepickerbefore
                                     [weekStart]="config()?.weekStart"></novo-date-time-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['equalTo']">
            <input novoInput dateFormat="yyyy-mm-dd" [picker]="datepicker" formControlName="value"/>
            <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
              <novo-date-picker (onSelect)="closePanel($event, viewIndex)" #datepicker [weekStart]="config()?.weekStart"></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['between']">
            <input novoInput dateRangeFormat="date" [picker]="daterangepicker" formControlName="value"/>
            <novo-picker-toggle [for]="daterangepicker" triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
              <novo-date-picker #daterangepicker (onSelect)="closePanel($event, viewIndex)" mode="range" numberOfMonths="2"
                                [weekStart]="config()?.weekStart"></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['within']">
            <novo-select [placeholder]="labels.selectDateRange" formControlName="value">
              <novo-option value="future">{{ labels.future }}</novo-option>
              <novo-option value="-1">{{ labels.past1Day }}</novo-option>
              <novo-option value="-7">{{ labels.past7Days }}</novo-option>
              <novo-option value="-14">{{ labels.past14Days }}</novo-option>
              <novo-option value="-21">{{ labels.past21Days }}</novo-option>
              <novo-option value="-30">{{ labels.past30Days }}</novo-option>
              <novo-option value="-60">{{ labels.past60Days }}</novo-option>
              <novo-option value="-90">{{ labels.past90Days }}</novo-option>
              <novo-option value="-180">{{ labels.past180Days }}</novo-option>
              <novo-option value="-270">{{ labels.past270Days }}</novo-option>
              <novo-option value="-365">{{ labels.past1Year }}</novo-option>
              <novo-option value="1">{{ labels.next1Day }}</novo-option>
              <novo-option value="7">{{ labels.next7Days }}</novo-option>
              <novo-option value="14">{{ labels.next14Days }}</novo-option>
              <novo-option value="21">{{ labels.next21Days }}</novo-option>
              <novo-option value="30">{{ labels.next30Days }}</novo-option>
              <novo-option value="60">{{ labels.next60Days }}</novo-option>
              <novo-option value="90">{{ labels.next90Days }}</novo-option>
              <novo-option value="180">{{ labels.next180Days }}</novo-option>
              <novo-option value="270">{{ labels.next270Days }}</novo-option>
              <novo-option value="365">{{ labels.next1Year }}</novo-option>
            </novo-select>
          </novo-field>
          <novo-field *novoSwitchCases="['isNull']">
            <novo-radio-group formControlName="value">
              <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
              <novo-radio [value]="false">{{ labels.no }}</novo-radio>
            </novo-radio-group>
          </novo-field>
        </ng-container>
      </ng-container>
    `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i5.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i5$1.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "directive", type: i6.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "directive", type: i6.NovoDateFormatDirective, selector: "input[dateFormat]", inputs: ["dateFormat"] }, { kind: "directive", type: i6.NovoDateRangeFormatDirective, selector: "input[dateRangeFormat]", inputs: ["dateRangeFormat"] }, { kind: "directive", type: i6.NovoDateTimeFormatDirective, selector: "input[dateTimeFormat]", inputs: ["military", "dateTimeFormat"] }, { kind: "component", type: i6.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { kind: "directive", type: i6.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i7.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "hideToday", "disabledDateMessage", "dateForInitialView", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { kind: "component", type: i8$1.NovoDateTimePickerElement, selector: "novo-date-time-picker", inputs: ["defaultTime", "minYear", "maxYear", "start", "end", "military", "weekStart", "disabledDateMessage"], outputs: ["onSelect"] }, { kind: "component", type: i9$1.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i9$1.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "directive", type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultDateTimeConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-date-time-condition-def',
                    template: `
      <ng-container novoConditionFieldDef="DATE">
        <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
          <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
            <novo-option value="before">{{ labels.before }}</novo-option>
            <novo-option value="after">{{ labels.after }}</novo-option>
            <novo-option value="equalTo">{{ labels.equals }}</novo-option>
            <novo-option value="within">{{ labels.within }}</novo-option>
            <novo-option value="between">{{ labels.between }}</novo-option>
            <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
          </novo-select>
        </novo-field>
        <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
          <novo-field *novoSwitchCases="['after']">
            <input novoInput dateTimeFormat="iso8601" [picker]="datetimepicker" formControlName="value"/>
            <novo-picker-toggle triggerOnFocus [width]="-1" [overlayId]="viewIndex" novoSuffix icon="calendar">
              <novo-date-time-picker defaultTime="end" (onSelect)="closePanel($event, viewIndex)" #datetimepicker
                                     [weekStart]="config()?.weekStart"></novo-date-time-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['before']">
            <input novoInput dateTimeFormat="iso8601" [picker]="datetimepickerbefore" formControlName="value"/>
            <novo-picker-toggle triggerOnFocus [width]="-1" [overlayId]="viewIndex" novoSuffix icon="calendar">
              <novo-date-time-picker defaultTime="start" (onSelect)="closePanel($event, viewIndex)" #datetimepickerbefore
                                     [weekStart]="config()?.weekStart"></novo-date-time-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['equalTo']">
            <input novoInput dateFormat="yyyy-mm-dd" [picker]="datepicker" formControlName="value"/>
            <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
              <novo-date-picker (onSelect)="closePanel($event, viewIndex)" #datepicker [weekStart]="config()?.weekStart"></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['between']">
            <input novoInput dateRangeFormat="date" [picker]="daterangepicker" formControlName="value"/>
            <novo-picker-toggle [for]="daterangepicker" triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
              <novo-date-picker #daterangepicker (onSelect)="closePanel($event, viewIndex)" mode="range" numberOfMonths="2"
                                [weekStart]="config()?.weekStart"></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['within']">
            <novo-select [placeholder]="labels.selectDateRange" formControlName="value">
              <novo-option value="future">{{ labels.future }}</novo-option>
              <novo-option value="-1">{{ labels.past1Day }}</novo-option>
              <novo-option value="-7">{{ labels.past7Days }}</novo-option>
              <novo-option value="-14">{{ labels.past14Days }}</novo-option>
              <novo-option value="-21">{{ labels.past21Days }}</novo-option>
              <novo-option value="-30">{{ labels.past30Days }}</novo-option>
              <novo-option value="-60">{{ labels.past60Days }}</novo-option>
              <novo-option value="-90">{{ labels.past90Days }}</novo-option>
              <novo-option value="-180">{{ labels.past180Days }}</novo-option>
              <novo-option value="-270">{{ labels.past270Days }}</novo-option>
              <novo-option value="-365">{{ labels.past1Year }}</novo-option>
              <novo-option value="1">{{ labels.next1Day }}</novo-option>
              <novo-option value="7">{{ labels.next7Days }}</novo-option>
              <novo-option value="14">{{ labels.next14Days }}</novo-option>
              <novo-option value="21">{{ labels.next21Days }}</novo-option>
              <novo-option value="30">{{ labels.next30Days }}</novo-option>
              <novo-option value="60">{{ labels.next60Days }}</novo-option>
              <novo-option value="90">{{ labels.next90Days }}</novo-option>
              <novo-option value="180">{{ labels.next180Days }}</novo-option>
              <novo-option value="270">{{ labels.next270Days }}</novo-option>
              <novo-option value="365">{{ labels.next1Year }}</novo-option>
            </novo-select>
          </novo-field>
          <novo-field *novoSwitchCases="['isNull']">
            <novo-radio-group formControlName="value">
              <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
              <novo-radio [value]="false">{{ labels.no }}</novo-radio>
            </novo-radio-group>
          </novo-field>
        </ng-container>
      </ng-container>
    `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }], propDecorators: { overlayChildren: [{
                type: ViewChildren,
                args: [NovoPickerToggleElement]
            }] } });

/**
 * Constructing filters against String fields can be complex. Each "chip" added to the
 * condition can be independently used to query a database.  Not all systems support
 * querying within a text column, ie sql unless LIKE is enabled. This could result in a
 * performance penalty.
 */
class NovoDefaultStringConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        this.defaultOperator = Operator.includeAny;
        this.defineOperatorEditGroup(Operator.includeAny, Operator.includeAll, Operator.excludeAny, Operator.beginsWith);
    }
    getValue(formGroup) {
        return formGroup.value?.value || [];
    }
    add(event, formGroup) {
        const input = event.input;
        input.value = '';
        const valueToAdd = event.value;
        if (valueToAdd !== '') {
            const current = this.getValue(formGroup);
            const newValue = Array.isArray(current) ? [...current, valueToAdd] : [valueToAdd];
            this.setFormValue(formGroup, newValue);
        }
    }
    remove(valueToRemove, formGroup) {
        const current = this.getValue(formGroup);
        const index = current.indexOf(valueToRemove);
        if (index >= 0) {
            const value = [...current];
            value.splice(index, 1);
            this.setFormValue(formGroup, value);
        }
    }
    setFormValue(formGroup, newValue) {
        formGroup.get('value').setValue(newValue);
        formGroup.markAsDirty();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultStringConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDefaultStringConditionDef, isStandalone: false, selector: "novo-string-condition-def", usesInheritance: true, ngImport: i0, template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoConditionFieldDef="STRING">
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll" *ngIf="!meta?.removeIncludeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="beginsWith" *ngIf="meta?.hasBeginsWith">{{ labels.beginsWith }}</novo-option>
          <novo-option value="isEmpty" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny', 'beginsWith']">
          <novo-chip-list #chipList aria-label="filter value" multiple="true" [chipsToggleable]="false" formControlName="value">
            <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
              <novo-text ellipsis [tooltip]="chip" tooltipOnOverflow>{{ chip }}</novo-text>
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [placeholder]="labels.typeToAddChips"
              autocomplete="off"
              (novoChipInputTokenEnd)="add($event, formGroup)"
            />
          </novo-chip-list>
          <novo-autocomplete></novo-autocomplete>
        </novo-field>
        <novo-field *novoSwitchCases="['isEmpty']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4$1.NovoAutocompleteElement, selector: "novo-autocomplete", inputs: ["tabIndex", "triggerOn", "displayWith", "aria-label", "multiple", "disabled", "makeFirstItemActive"], outputs: ["optionSelected", "optionActivated"], exportAs: ["novoAutocomplete"] }, { kind: "component", type: i5.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { kind: "directive", type: i5.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i5$1.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i9.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i9$1.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i9$1.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "component", type: i10.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { kind: "directive", type: i10.NovoChipRemove, selector: "[novoChipRemove]" }, { kind: "directive", type: i10.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }, { kind: "component", type: i10.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "chipsToggleable", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { kind: "directive", type: i11.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }, { kind: "directive", type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultStringConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-string-condition-def',
                    template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoConditionFieldDef="STRING">
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll" *ngIf="!meta?.removeIncludeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="beginsWith" *ngIf="meta?.hasBeginsWith">{{ labels.beginsWith }}</novo-option>
          <novo-option value="isEmpty" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny', 'beginsWith']">
          <novo-chip-list #chipList aria-label="filter value" multiple="true" [chipsToggleable]="false" formControlName="value">
            <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
              <novo-text ellipsis [tooltip]="chip" tooltipOnOverflow>{{ chip }}</novo-text>
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [placeholder]="labels.typeToAddChips"
              autocomplete="off"
              (novoChipInputTokenEnd)="add($event, formGroup)"
            />
          </novo-chip-list>
          <novo-autocomplete></novo-autocomplete>
        </novo-field>
        <novo-field *novoSwitchCases="['isEmpty']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    // Change detection is intentionally not set to OnPush. This component's template will be provided
                    // to the table to be inserted into its view. This is problematic when change detection runs since
                    // the bindings in this template will be evaluated _after_ the table's view is evaluated, which
                    // means the template in the table's view will not have the updated value (and in fact will cause
                    // an ExpressionChangedAfterItHasBeenCheckedError).
                    changeDetection: ChangeDetectionStrategy.Default,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }] });

/**
 * When constructing a query using a field that is an Int, Double, Number ...etc.
 * TODO: Do we implement currency formation here potentially?
 */
class NovoDefaultNumberConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        this.defaultOperator = Operator.equalTo;
        this.defineOperatorEditGroup(Operator.greaterThan, Operator.lessThan, Operator.equalTo);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultNumberConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDefaultNumberConditionDef, isStandalone: false, selector: "novo-number-condition-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="greaterThan">{{ labels.greaterThan }}</novo-option>
          <novo-option value="lessThan">{{ labels.lessThan }}</novo-option>
          <novo-option value="equalTo">{{ labels.equalTo }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['greaterThan', 'lessThan', 'equalTo']">
          <input novoInput type="number" formControlName="value"/>
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
        <ng-container *novoSwitchCases="['between']">
          <novo-number-range formControlName="value"/>
        </ng-container>
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i5.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i5$1.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i9$1.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i9$1.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "component", type: i8$2.NumberRangeComponent, selector: "novo-number-range" }, { kind: "directive", type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultNumberConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-number-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="greaterThan">{{ labels.greaterThan }}</novo-option>
          <novo-option value="lessThan">{{ labels.lessThan }}</novo-option>
          <novo-option value="equalTo">{{ labels.equalTo }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['greaterThan', 'lessThan', 'equalTo']">
          <input novoInput type="number" formControlName="value"/>
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
        <ng-container *novoSwitchCases="['between']">
          <novo-number-range formControlName="value"/>
        </ng-container>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }] });

/**
 * Any condition that has a type of ID usually only is queried by ID.
 */
class NovoDefaultIdConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = Operator.equalTo;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultIdConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDefaultIdConditionDef, isStandalone: false, selector: "novo-id-condition-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator">
          <novo-option value="equalTo">{{ labels.equalTo }}</novo-option>
          <ng-content></ng-content>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [formGroup]="formGroup">
        <input novoInput type="number" min="1" step="1" formControlName="value" />
      </novo-field>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.MinValidator, selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]", inputs: ["min"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i5$1.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "directive", type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultIdConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-id-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator">
          <novo-option value="equalTo">{{ labels.equalTo }}</novo-option>
          <ng-content></ng-content>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [formGroup]="formGroup">
        <input novoInput type="number" min="1" step="1" formControlName="value" />
      </novo-field>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                    standalone: false
                }]
        }] });

/**
 * Handle selection of field values when a list of options is provided.
 */
class NovoDefaultPickerConditionDef extends AbstractConditionFieldDef {
    constructor(labelService) {
        super(labelService);
        this.defaultOperator = Operator.includeAny;
        this.defineOperatorEditGroup(Operator.includeAny, Operator.includeAll, Operator.excludeAny);
    }
    showAddOption(meta, select, filterValue) {
        if (!(meta?.allowCustomFilterValues)) {
            return false;
        }
        filterValue = filterValue?.trim().toLowerCase();
        if (!filterValue) {
            return false;
        }
        if (select.value && select.value.find(selectValue => selectValue.trim().toLowerCase() === filterValue)) {
            return false;
        }
        return meta?.options && meta.options.find(opt => {
            const optionLabel = opt.label.trim().toLowerCase();
            return optionLabel === filterValue;
        }) == null;
    }
    optionTracker(option) {
        return `${option.value}~~~${option.label}`;
    }
    hideOption(option, filterValue) {
        return filterValue && (option.value.toString().indexOf(filterValue) === -1 &&
            !option.label.toLowerCase().includes(filterValue.toLowerCase()));
    }
    customOptions(options, select) {
        return select.value?.filter((selectedOption) => {
            return (!options || !(options.find(option => option.value === selectedOption)));
        }).map(value => ({
            value,
            label: value
        }));
    }
    applyCustomItem() {
        // Method to handle adding a new item when "Add Item" is selected
        // This is a placeholder for potential custom logic to add new items
        // Could be implemented to open a modal, trigger a service call, etc.
        console.warn('Custom item addition not implemented');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultPickerConditionDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: NovoDefaultPickerConditionDef, isStandalone: false, selector: "novo-picker-condition-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll" *ngIf="!meta?.removeIncludeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-select #select extupdatefix formControlName="value" [placeholder]="labels.select" [multiple]="true">
            <novo-option [disabled]="!meta?.allowCustomFilterValues" [hidden]="!meta?.allowCustomFilterValues">
              <novo-select-search #filterInput allowDeselectDuringFilter></novo-select-search>
            </novo-option>
            <!-- WHat about optionUrl/optionType -->
            @for (option of meta?.options; track optionTracker) {
              <novo-option [hidden]="hideOption(option, filterInput?.value)" [value]="option.value" [attr.data-automation-value]="option.label">
                {{ option.label}}
              </novo-option>
            }
            @for (option of customOptions(meta?.options, select); track optionTracker) {
              <novo-option [hidden]="hideOption(option, filterInput?.value)" [value]="option.value" [attr.data-automation-value]="option.label">
                {{ option.label}}
              </novo-option>
            }
            <novo-option class="add-option" *ngIf="showAddOption(meta, select, filterInput?.value)" [value]="filterInput?.value" [allowSelection]="false">
              {{filterInput.value}}
              <novo-icon class="add-icon" novoSuffix>add-thin</novo-icon>
            </novo-option>
          </novo-select>
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i5.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i5$1.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "directive", type: i5$1.NovoSelectExtUpdateFix, selector: "novo-select[extupdatefix]" }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i6.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i9.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i9$1.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i9$1.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "component", type: i9$2.NovoSelectSearchComponent, selector: "novo-select-search", inputs: ["name", "placeholderLabel", "type", "noEntriesFoundLabel", "indexAndLengthScreenReaderText", "clearSearchInput", "searching", "disableInitialFocus", "enableClearOnEscapePressed", "allowDeselectDuringFilter", "preventHomeEndKeyPropagation", "disableScrollToActiveOnOptionsChanged", "ariaLabel", "showToggleAllCheckbox", "toggleAllCheckboxChecked", "toggleAllCheckboxIndeterminate", "toggleAllCheckboxTooltipMessage", "toogleAllCheckboxTooltipPosition", "hideClearSearchButton", "alwaysRestoreSelectedOptionsMulti"], outputs: ["toggleAll"] }, { kind: "directive", type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDefaultPickerConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-picker-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll" *ngIf="!meta?.removeIncludeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-select #select extupdatefix formControlName="value" [placeholder]="labels.select" [multiple]="true">
            <novo-option [disabled]="!meta?.allowCustomFilterValues" [hidden]="!meta?.allowCustomFilterValues">
              <novo-select-search #filterInput allowDeselectDuringFilter></novo-select-search>
            </novo-option>
            <!-- WHat about optionUrl/optionType -->
            @for (option of meta?.options; track optionTracker) {
              <novo-option [hidden]="hideOption(option, filterInput?.value)" [value]="option.value" [attr.data-automation-value]="option.label">
                {{ option.label}}
              </novo-option>
            }
            @for (option of customOptions(meta?.options, select); track optionTracker) {
              <novo-option [hidden]="hideOption(option, filterInput?.value)" [value]="option.value" [attr.data-automation-value]="option.label">
                {{ option.label}}
              </novo-option>
            }
            <novo-option class="add-option" *ngIf="showAddOption(meta, select, filterInput?.value)" [value]="filterInput?.value" [allowSelection]="false">
              {{filterInput.value}}
              <novo-icon class="add-icon" novoSuffix>add-thin</novo-icon>
            </novo-option>
          </novo-select>
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }] });

class NovoConditionTemplatesComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoConditionTemplatesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoConditionTemplatesComponent, isStandalone: false, selector: "novo-condition-templates", inputs: { addressConfig: "addressConfig", dateConfig: "dateConfig" }, ngImport: i0, template: "<novo-id-condition-def name=\"ID\"/>\n<novo-date-condition-def name=\"DATE\" [config]=\"dateConfig\"/>\n<novo-date-time-condition-def name=\"TIMESTAMP\" [config]=\"dateConfig\"/>\n<novo-string-condition-def name=\"STRING\"/>\n<novo-number-condition-def name=\"FLOAT\"/>\n<novo-number-condition-def name=\"INTEGER\"/>\n<novo-number-condition-def name=\"BIGDECIMAL\"/>\n<novo-number-condition-def name=\"DOUBLE\"/>\n<novo-address-condition-def name=\"ADDRESS\" [config]=\"addressConfig\"/>\n<novo-boolean-condition-def name=\"BOOLEAN\"/>\n<novo-picker-condition-def name=\"SELECT\"/>\n<novo-string-condition-def name=\"DEFAULT\"/>\n", dependencies: [{ kind: "component", type: NovoDefaultAddressConditionDef, selector: "novo-address-condition-def", inputs: ["config"] }, { kind: "component", type: NovoDefaultBooleanConditionDef, selector: "novo-boolean-condition-def" }, { kind: "component", type: NovoDefaultDateConditionDef, selector: "novo-date-condition-def", inputs: ["config"] }, { kind: "component", type: NovoDefaultDateTimeConditionDef, selector: "novo-date-time-condition-def", inputs: ["config"] }, { kind: "component", type: NovoDefaultStringConditionDef, selector: "novo-string-condition-def" }, { kind: "component", type: NovoDefaultNumberConditionDef, selector: "novo-number-condition-def" }, { kind: "component", type: NovoDefaultIdConditionDef, selector: "novo-id-condition-def" }, { kind: "component", type: NovoDefaultPickerConditionDef, selector: "novo-picker-condition-def" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoConditionTemplatesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-condition-templates', standalone: false, template: "<novo-id-condition-def name=\"ID\"/>\n<novo-date-condition-def name=\"DATE\" [config]=\"dateConfig\"/>\n<novo-date-time-condition-def name=\"TIMESTAMP\" [config]=\"dateConfig\"/>\n<novo-string-condition-def name=\"STRING\"/>\n<novo-number-condition-def name=\"FLOAT\"/>\n<novo-number-condition-def name=\"INTEGER\"/>\n<novo-number-condition-def name=\"BIGDECIMAL\"/>\n<novo-number-condition-def name=\"DOUBLE\"/>\n<novo-address-condition-def name=\"ADDRESS\" [config]=\"addressConfig\"/>\n<novo-boolean-condition-def name=\"BOOLEAN\"/>\n<novo-picker-condition-def name=\"SELECT\"/>\n<novo-string-condition-def name=\"DEFAULT\"/>\n" }]
        }], propDecorators: { addressConfig: [{
                type: Input
            }], dateConfig: [{
                type: Input
            }] } });

/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
class ConditionInputOutlet {
    constructor(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ConditionInputOutlet, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: ConditionInputOutlet, isStandalone: false, selector: "[conditionInputOutlet]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ConditionInputOutlet, decorators: [{
            type: Directive,
            args: [{
                    selector: '[conditionInputOutlet]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }] });
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
class ConditionOperatorOutlet {
    constructor(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ConditionOperatorOutlet, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: ConditionOperatorOutlet, isStandalone: false, selector: "[conditionOperatorOutlet]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ConditionOperatorOutlet, decorators: [{
            type: Directive,
            args: [{
                    selector: '[conditionOperatorOutlet]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }] });
class ConditionBuilderComponent {
    constructor(labels, cdr, queryBuilderService, controlContainer) {
        this.labels = labels;
        this.cdr = cdr;
        this.queryBuilderService = queryBuilderService;
        this.controlContainer = controlContainer;
        this.hideOperator = input(true);
        this.conditionType = input();
        // This component can either be directly hosted as a host to a condition, or it can be part of a condition group within a criteria builder.
        // In the former case, config will come from inputs, and we will instantiate our own QueryBuilderService. In the latter, it comes from
        // the QueryBuilderService.
        this.inputConfig = input(null, { alias: 'config' });
        this.inputEditTypeFn = input(null, { alias: 'editTypeFn' });
        this.config = computed(() => {
            if (this.isConditionHost) {
                this.queryBuilderService.config = this.inputConfig();
            }
            return this.queryBuilderService.config;
        });
        this.editTypeFn = computed(() => {
            if (this.isConditionHost) {
                this.queryBuilderService.editTypeFn = this.inputEditTypeFn();
            }
            return this.queryBuilderService.editTypeFn;
        });
        this.searchTerm = new FormControl();
        this.staticFieldSelection = computed(() => this.config().staticFieldSelection);
        this._lastContext = {};
        this.isConditionHost = false;
        this.gridColumns = computed(() => {
            if (this.staticFieldSelection()) {
                return '13rem 1fr';
            }
            else {
                const firstColumnWidth = this.hideOperator() ? '20rem' : '16rem';
                return `${firstColumnWidth} 13rem 1fr`;
            }
        });
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new Subject();
        if (!queryBuilderService.componentHost) {
            queryBuilderService.componentHost = this;
            this.isConditionHost = true;
            this.groupIndex = 0;
            this.andIndex = 0;
        }
    }
    ngOnInit() {
        this.parentForm = this.controlContainer.control;
        this.parentForm.controls.field.valueChanges.subscribe((value) => {
            Promise.resolve().then(() => this.updateFieldSelection());
        });
    }
    ngOnChanges(changes) {
        if (changes.inputConfig?.previousValue?.staticFieldSelection &&
            changes.inputConfig.previousValue.staticFieldSelection !== changes.inputConfig.currentValue.staticFieldSelection) {
            this.parentForm.controls.field.setValue(changes.inputConfig.currentValue.staticFieldSelection);
        }
    }
    ngAfterContentInit() {
        const allFields = this.config()?.fields || [];
        const scopedFields = this.scope ? allFields.find((field) => field.value === this.scope) : allFields[0];
        allFields.length && this.changeFieldOptions(scopedFields);
        this.searches = this.searchTerm.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
            this.results$ = Promise.resolve(this.fieldConfig.options.filter((f) => f.name.toLowerCase().includes(term.toLowerCase()) || f.label?.toLowerCase().includes(term.toLowerCase())));
            this.cdr.markForCheck();
        });
    }
    ngAfterViewInit() {
        if (this.parentForm.value?.field !== null) {
            Promise.resolve().then(() => this.updateFieldSelection());
        }
    }
    ngOnDestroy() {
        this.searches.unsubscribe();
        // Clear all outlets and Maps
        [this._operatorOutlet.viewContainer, this._inputOutlet.viewContainer].forEach((def) => {
            def.clear();
        });
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Updates the Conditions "Field" Options to Change base on new Scope
     * @param fieldConfig
     */
    changeFieldOptions(fieldConfig) {
        this.fieldConfig = fieldConfig;
        this.searchTerm.setValue('');
        this.results$ = Promise.resolve(this.fieldConfig.options);
    }
    /**
     * Resets the input and operator view containers, regenerates the field templates,
     * and marks the component for change detection.
     *
     * Use this method after updating form controls to reinitialize the input and
     * operator fields so that the view reflects the latest form control changes.
     *
     * @returns void
     */
    resetInputAndOperator() {
        this._inputOutlet.viewContainer.clear();
        this._operatorOutlet.viewContainer.clear();
        this.createFieldTemplates();
        this.cdr.markForCheck();
    }
    getField() {
        const field = this.parentForm?.value?.field;
        if (!field)
            return null;
        return this.fieldConfig.find(field);
    }
    getDefaultField() {
        const fields = this.fieldConfig.options;
        if (fields?.length) {
            return fields[0].name;
        }
        return null;
    }
    updateFieldSelection() {
        const fieldConf = this.getField();
        if (!fieldConf) {
            this.parentForm.get('field').setValue(this.getDefaultField());
            return;
        }
        else {
            this.fieldDisplayWith = () => fieldConf.label || fieldConf.name;
            this.displayIcon = fieldConf.icon || null;
        }
        const { field } = this.parentForm.value;
        if (this._lastContext.field !== field) {
            if (this._lastContext.field) {
                // only clearing operator/value if field was previously defined so we can preload values onto the form
                this.parentForm.get('value').setValue(null);
                this.parentForm.get('operator').setValue(null);
            }
            this.createFieldTemplates();
        }
        setTimeout(() => this.updateConditionType());
        this._lastContext = { ...this.parentForm.value };
        this.cdr.markForCheck();
    }
    updateConditionType() {
        this.parentForm.get('conditionType')?.setValue(this.conditionType());
    }
    findDefinitionForField(field) {
        if (!field)
            return;
        const editType = this.editTypeFn()(field);
        // Don't look at dataSpecialization it is no good, this misses currency, and percent
        const { name } = field;
        const fieldDefsByName = this.queryBuilderService.getFieldDefsByName();
        // Check Fields by priority for match Field Definition
        const key = [name, editType?.toUpperCase(), 'DEFAULT'].find((it) => fieldDefsByName.has(it));
        return fieldDefsByName.get(key);
    }
    createFieldTemplates() {
        const definition = this.findDefinitionForField(this.getField());
        if (!this.parentForm.get('operator').value) {
            this.parentForm.get('operator').setValue(definition.defaultOperator);
        }
        this.createFieldOperators(definition);
        this.createFieldInput(definition);
    }
    createFieldOperators(definition) {
        this._operatorOutlet.viewContainer.clear();
        if (definition) {
            const context = { $implicit: this.parentForm, fieldMeta: this.getField() };
            this._operatorOutlet.viewContainer.createEmbeddedView(definition.fieldOperators.template, context);
        }
        this.cdr.markForCheck();
    }
    createFieldInput(definition) {
        this._inputOutlet.viewContainer.clear();
        if (definition) {
            const context = { $implicit: this.parentForm, fieldMeta: this.getField(), viewIndex: this.groupIndex.toString() + this.andIndex.toString() };
            this._inputOutlet.viewContainer.createEmbeddedView(definition.fieldInput.template, context);
        }
        this.cdr.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ConditionBuilderComponent, deps: [{ token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: QueryBuilderService }, { token: i3.ControlContainer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.15", type: ConditionBuilderComponent, isStandalone: false, selector: "novo-condition-builder", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: false, isRequired: false, transformFunction: null }, scope: { classPropertyName: "scope", publicName: "scope", isSignal: false, isRequired: false, transformFunction: null }, andIndex: { classPropertyName: "andIndex", publicName: "andIndex", isSignal: false, isRequired: false, transformFunction: null }, groupIndex: { classPropertyName: "groupIndex", publicName: "groupIndex", isSignal: false, isRequired: false, transformFunction: null }, addressConfig: { classPropertyName: "addressConfig", publicName: "addressConfig", isSignal: false, isRequired: false, transformFunction: null }, dateConfig: { classPropertyName: "dateConfig", publicName: "dateConfig", isSignal: false, isRequired: false, transformFunction: null }, hideOperator: { classPropertyName: "hideOperator", publicName: "hideOperator", isSignal: true, isRequired: false, transformFunction: null }, conditionType: { classPropertyName: "conditionType", publicName: "conditionType", isSignal: true, isRequired: false, transformFunction: null }, inputConfig: { classPropertyName: "inputConfig", publicName: "config", isSignal: true, isRequired: false, transformFunction: null }, inputEditTypeFn: { classPropertyName: "inputEditTypeFn", publicName: "editTypeFn", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class.condition-host": "this.isConditionHost" } }, providers: [{ provide: NOVO_CONDITION_BUILDER, useExisting: ConditionBuilderComponent },
            {
                provide: QueryBuilderService,
                deps: [NovoLabelService, [new SkipSelf(), new Optional(), QueryBuilderService]],
                useFactory: (labelService, queryBuilderService) => {
                    if (!queryBuilderService) {
                        queryBuilderService = new QueryBuilderService(labelService);
                    }
                    return queryBuilderService;
                }
            }
        ], viewQueries: [{ propertyName: "_operatorOutlet", first: true, predicate: ConditionOperatorOutlet, descendants: true, static: true }, { propertyName: "_inputOutlet", first: true, predicate: ConditionInputOutlet, descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<form [formGroup]=\"parentForm\">\n  <novo-grid gap=\"1rem\" [columns]=\"gridColumns()\" align=\"end\">\n    <novo-field class=\"condition-field\" *ngIf=\"!staticFieldSelection()\">\n      <novo-select\n        [placeholder]=\"labels.chooseAField\"\n        formControlName=\"field\"\n        (onSelect)=\"updateFieldSelection()\"\n        overlayWidth=\"24rem\"\n        overlayHeight=\"20rem\"\n        [displayWith]=\"fieldDisplayWith\"\n        [style.minWidth.px]=\"160\"\n        [style.maxWidth.px]=\"(hideOperator() || isConditionHost) ? 200 : 160\"\n        [displayIcon]=\"displayIcon\">\n        <novo-optgroup class=\"filter-search-results\">\n          <novo-option>\n            <novo-select-search [formControl]=\"searchTerm\" [clearSearchInput]=\"false\"></novo-select-search>\n          </novo-option>\n          <ng-container *ngIf=\"results$ | async as results; else loading\">\n            <ng-container *ngIf=\"results.length\">\n              <novo-option *ngFor=\"let field of results\" value=\"{{ field.name }}\"\n                [attr.data-automation-id]=\"field.name\">\n                {{ field.label || field.name }}\n              </novo-option>\n            </ng-container>\n          </ng-container>\n        </novo-optgroup>\n      </novo-select>\n    </novo-field>\n\n    <div class=\"condition-operator\">\n      <ng-container conditionOperatorOutlet></ng-container>\n    </div>\n\n    <div class=\"condition-input\">\n      <ng-container conditionInputOutlet></ng-container>\n    </div>\n  </novo-grid>\n  <ng-content></ng-content>\n</form>\n\n<novo-condition-templates *ngIf=\"isConditionHost\" [addressConfig]=\"addressConfig\" [dateConfig]=\"dateConfig\"/>\n\n<!-- LOADING TEMPLATE -->\n<ng-template #loading>\n  <novo-loading></novo-loading>\n</ng-template>\n", styles: [":host{position:relative;display:block;width:100%}:host.condition-host{padding:var(--spacing-md);margin-bottom:1rem}:host .condition-field{grid-template-columns:minmax(fit-content,1fr);width:100%;width:-webkit-fill-available}:host .condition-operator::ng-deep .novo-select{min-width:13rem}:host .condition-input::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(fit-content,1fr);width:-webkit-fill-available}:host .condition-input::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host .condition-input::ng-deep novo-field{width:fit-content}:host .condition-input::ng-deep novo-field.address-radius{width:100px;min-width:100px;max-width:100px;margin-right:1rem}:host .condition-input::ng-deep novo-field.address-radius novo-select{min-width:70px}:host .condition-input::ng-deep novo-field.address-location .novo-field-suffix{align-self:flex-end}:host .condition-input::ng-deep .novo-field-infix{white-space:nowrap;overflow:hidden}:host .condition-input::ng-deep novo-chip-list{flex-grow:1}:host .condition-input::ng-deep novo-chip-list novo-chip{max-width:min(33rem,100% - 9px)}:host .condition-input::ng-deep novo-chips{border-bottom:none!important}:host .condition-input::ng-deep novo-chips input{padding-left:0!important}:host .condition-input::ng-deep novo-radio-group{padding:0!important}:host .and-or-filter-button{box-sizing:border-box;background:#fff;border:1px solid #ddd;color:#5691f5;display:inline-block;position:relative;cursor:pointer;margin:.4rem auto;align-items:center;text-align:center;-webkit-user-select:none;user-select:none;outline:none;white-space:nowrap;text-transform:uppercase;overflow:hidden;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i5.GapDirective, selector: "[gap]", inputs: ["gap"] }, { kind: "component", type: i5$1.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i5.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { kind: "component", type: i8.NovoGridElement, selector: "novo-grid", inputs: ["direction", "align", "justify", "columns"] }, { kind: "component", type: i9$3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i9$2.NovoSelectSearchComponent, selector: "novo-select-search", inputs: ["name", "placeholderLabel", "type", "noEntriesFoundLabel", "indexAndLengthScreenReaderText", "clearSearchInput", "searching", "disableInitialFocus", "enableClearOnEscapePressed", "allowDeselectDuringFilter", "preventHomeEndKeyPropagation", "disableScrollToActiveOnOptionsChanged", "ariaLabel", "showToggleAllCheckbox", "toggleAllCheckboxChecked", "toggleAllCheckboxIndeterminate", "toggleAllCheckboxTooltipMessage", "toogleAllCheckboxTooltipPosition", "hideClearSearchButton", "alwaysRestoreSelectedOptionsMulti"], outputs: ["toggleAll"] }, { kind: "directive", type: ConditionInputOutlet, selector: "[conditionInputOutlet]" }, { kind: "directive", type: ConditionOperatorOutlet, selector: "[conditionOperatorOutlet]" }, { kind: "component", type: NovoConditionTemplatesComponent, selector: "novo-condition-templates", inputs: ["addressConfig", "dateConfig"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ConditionBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-condition-builder', providers: [{ provide: NOVO_CONDITION_BUILDER, useExisting: ConditionBuilderComponent },
                        {
                            provide: QueryBuilderService,
                            deps: [NovoLabelService, [new SkipSelf(), new Optional(), QueryBuilderService]],
                            useFactory: (labelService, queryBuilderService) => {
                                if (!queryBuilderService) {
                                    queryBuilderService = new QueryBuilderService(labelService);
                                }
                                return queryBuilderService;
                            }
                        }
                    ], changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<form [formGroup]=\"parentForm\">\n  <novo-grid gap=\"1rem\" [columns]=\"gridColumns()\" align=\"end\">\n    <novo-field class=\"condition-field\" *ngIf=\"!staticFieldSelection()\">\n      <novo-select\n        [placeholder]=\"labels.chooseAField\"\n        formControlName=\"field\"\n        (onSelect)=\"updateFieldSelection()\"\n        overlayWidth=\"24rem\"\n        overlayHeight=\"20rem\"\n        [displayWith]=\"fieldDisplayWith\"\n        [style.minWidth.px]=\"160\"\n        [style.maxWidth.px]=\"(hideOperator() || isConditionHost) ? 200 : 160\"\n        [displayIcon]=\"displayIcon\">\n        <novo-optgroup class=\"filter-search-results\">\n          <novo-option>\n            <novo-select-search [formControl]=\"searchTerm\" [clearSearchInput]=\"false\"></novo-select-search>\n          </novo-option>\n          <ng-container *ngIf=\"results$ | async as results; else loading\">\n            <ng-container *ngIf=\"results.length\">\n              <novo-option *ngFor=\"let field of results\" value=\"{{ field.name }}\"\n                [attr.data-automation-id]=\"field.name\">\n                {{ field.label || field.name }}\n              </novo-option>\n            </ng-container>\n          </ng-container>\n        </novo-optgroup>\n      </novo-select>\n    </novo-field>\n\n    <div class=\"condition-operator\">\n      <ng-container conditionOperatorOutlet></ng-container>\n    </div>\n\n    <div class=\"condition-input\">\n      <ng-container conditionInputOutlet></ng-container>\n    </div>\n  </novo-grid>\n  <ng-content></ng-content>\n</form>\n\n<novo-condition-templates *ngIf=\"isConditionHost\" [addressConfig]=\"addressConfig\" [dateConfig]=\"dateConfig\"/>\n\n<!-- LOADING TEMPLATE -->\n<ng-template #loading>\n  <novo-loading></novo-loading>\n</ng-template>\n", styles: [":host{position:relative;display:block;width:100%}:host.condition-host{padding:var(--spacing-md);margin-bottom:1rem}:host .condition-field{grid-template-columns:minmax(fit-content,1fr);width:100%;width:-webkit-fill-available}:host .condition-operator::ng-deep .novo-select{min-width:13rem}:host .condition-input::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(fit-content,1fr);width:-webkit-fill-available}:host .condition-input::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host .condition-input::ng-deep novo-field{width:fit-content}:host .condition-input::ng-deep novo-field.address-radius{width:100px;min-width:100px;max-width:100px;margin-right:1rem}:host .condition-input::ng-deep novo-field.address-radius novo-select{min-width:70px}:host .condition-input::ng-deep novo-field.address-location .novo-field-suffix{align-self:flex-end}:host .condition-input::ng-deep .novo-field-infix{white-space:nowrap;overflow:hidden}:host .condition-input::ng-deep novo-chip-list{flex-grow:1}:host .condition-input::ng-deep novo-chip-list novo-chip{max-width:min(33rem,100% - 9px)}:host .condition-input::ng-deep novo-chips{border-bottom:none!important}:host .condition-input::ng-deep novo-chips input{padding-left:0!important}:host .condition-input::ng-deep novo-radio-group{padding:0!important}:host .and-or-filter-button{box-sizing:border-box;background:#fff;border:1px solid #ddd;color:#5691f5;display:inline-block;position:relative;cursor:pointer;margin:.4rem auto;align-items:center;text-align:center;-webkit-user-select:none;user-select:none;outline:none;white-space:nowrap;text-transform:uppercase;overflow:hidden;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: QueryBuilderService }, { type: i3.ControlContainer }], propDecorators: { _operatorOutlet: [{
                type: ViewChild,
                args: [ConditionOperatorOutlet, { static: true }]
            }], _inputOutlet: [{
                type: ViewChild,
                args: [ConditionInputOutlet, { static: true }]
            }], label: [{
                type: Input
            }], scope: [{
                type: Input
            }], andIndex: [{
                type: Input
            }], groupIndex: [{
                type: Input
            }], addressConfig: [{
                type: Input
            }], dateConfig: [{
                type: Input
            }], isConditionHost: [{
                type: HostBinding,
                args: ['class.condition-host']
            }] } });

const EMPTY_CONDITION$1 = {
    conditionType: '$and',
    field: null,
    operator: null,
    scope: null,
    value: null,
    supportingValue: null,
};
class ConditionGroupComponent {
    constructor(qbs, labels, controlContainer, formBuilder, cdr) {
        this.qbs = qbs;
        this.labels = labels;
        this.controlContainer = controlContainer;
        this.formBuilder = formBuilder;
        this.cdr = cdr;
        this.controlName = '$' + Conjunction.AND;
        this.hideFirstOperator = true;
        this.canBeEmpty = false;
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new Subject();
    }
    ngOnInit() {
        this.parentForm = this.controlContainer.control;
        this.controlName = Object.keys(this.parentForm.controls)[0];
        this.updateGroupScopeAndEntity();
        merge(this.parentForm.parent.valueChanges, this.qbs.stateChanges)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.cdr.markForCheck());
    }
    ngOnChanges() {
        this.updateGroupScopeAndEntity();
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    updateGroupScopeAndEntity() {
        if (this.parentForm && this.controlName) {
            this.scope = this.parentForm.value[this.controlName][0]?.scope || this.qbs.scopes()[0];
            const entity = this.parentForm.value[this.controlName][0]?.entity;
            if (entity) {
                this.entity = entity;
            }
        }
    }
    updateControlName(value) {
        const name = `$${value.replace('$', '')}`;
        if (name !== this.controlName) {
            const current = this.parentForm.get(this.controlName).value;
            this.parentForm.controls[name] = this.parentForm.controls[this.controlName];
            delete this.parentForm.controls[this.controlName];
            this.controlName = name;
            // scrub properties not on control
            const currentStrict = current.map(item => this.sanitizeCondition(item));
            this.parentForm.get(this.controlName)?.setValue(currentStrict);
            this.cdr.markForCheck();
        }
    }
    sanitizeCondition(condition) {
        return {
            conditionType: condition.conditionType,
            field: condition.field,
            operator: condition.operator,
            scope: condition.scope,
            value: condition.value,
            supportingValue: condition.supportingValue,
            entity: condition.entity
        };
    }
    get root() {
        return this.parentForm.get(this.controlName);
    }
    addCondition(data) {
        const condition = this.newCondition(data);
        const onlyConditionIsEmpty = JSON.stringify(this.root.value) === JSON.stringify([EMPTY_CONDITION$1]);
        this.root.push(condition);
        this.qbs.hasMultipleScopes() && onlyConditionIsEmpty && this.removeCondition(0);
        this.cdr.markForCheck();
    }
    removeCondition(index) {
        const isPrimaryScope = this.scope === this.qbs.scopes()[0];
        const lastRowInGroup = this.root.length === 1;
        const lastRowInQueryBuilder = this.cantRemoveRow();
        this.root.removeAt(index);
        if ((lastRowInQueryBuilder || (lastRowInGroup && isPrimaryScope)) && !this.canBeEmpty) {
            this.addCondition();
        }
        this.cdr.markForCheck();
    }
    newCondition({ field, operator, scope, value, supportingValue, entity } = EMPTY_CONDITION$1) {
        return this.formBuilder.group({
            conditionType: '$and',
            field: [field, Validators.required],
            operator: [operator, Validators.required],
            scope: [scope],
            value: [value],
            supportingValue: [supportingValue],
            entity: [entity],
        });
    }
    cantRemoveRow() {
        if (this.parentForm.parent.length > 1) {
            return false;
        }
        return this.root.length <= 1;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ConditionGroupComponent, deps: [{ token: QueryBuilderService }, { token: i1.NovoLabelService }, { token: i3.ControlContainer }, { token: i3.FormBuilder }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: ConditionGroupComponent, isStandalone: false, selector: "novo-condition-group", inputs: { controlName: "controlName", groupIndex: "groupIndex", hideFirstOperator: "hideFirstOperator", canBeEmpty: "canBeEmpty", formGroupName: "formGroupName" }, host: { classAttribute: "novo-condition-group" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ConditionGroupComponent), multi: true }], usesOnChanges: true, ngImport: i0, template: "<div [formGroup]=\"parentForm\" class=\"condition-group-container\">\n  <novo-stack [formArrayName]=\"controlName\" gap=\"md\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLast = last;\">\n      <ng-container [formGroupName]=\"andIndex\">\n        <novo-flex class=\"condition-row\" [ngClass]=\"{ isFirst: andIndex === 0 }\" [class]=\"entity || scope\" align=\"end\" gap=\"sm\" #flex>\n          <novo-dropdown *ngIf=\"(!isFirst || !hideFirstOperator) && qbs.allowedGroupings.length > 1; else labeledGroup\" data-automation-id=\"groupings-dropdown\">\n            <button theme=\"dialogue\" icon=\"collapse\" size=\"sm\">{{qbs.getConjunctionLabel(controlName)}}</button>\n            <novo-optgroup>\n              <novo-option *ngFor=\"let c of qbs.allowedGroupings\" (click)=\"updateControlName(c)\" [attr.data-automation-id]=\"c\">\n                {{qbs.getConjunctionLabel(c)}}</novo-option>\n            </novo-optgroup>\n          </novo-dropdown>\n          <ng-template #labeledGroup>\n            <novo-label *ngIf=\"!isFirst || !hideFirstOperator\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">\n              {{qbs.getConjunctionLabel(controlName)}}</novo-label>\n          </ng-template>\n          <novo-condition-builder [groupIndex]=\"groupIndex\" [andIndex]=\"andIndex\" [hideOperator]=\"isFirst && hideFirstOperator\" [scope]=\"scope\" [conditionType]=\"controlName\"></novo-condition-builder>\n          <novo-button class=\"delete-btn\" theme=\"icon\" icon=\"delete-o\" color=\"negative\" (click)=\"removeCondition(andIndex)\">\n          </novo-button>\n        </novo-flex>\n      </ng-container>\n    </ng-container>\n    <button\n      *ngIf=\"!qbs.hasMultipleScopes()\"\n      theme=\"dialogue\"\n      data-automation-id=\"add-advanced-search-condition\"\n      icon=\"add-thin\"\n      side=\"left\"\n      size=\"sm\"\n      uppercase\n      (click)=\"addCondition()\">\n      {{ labels.addCondition }}</button>\n  </novo-stack>\n</div>\n", styles: [":host{position:relative;display:block;border:1px solid var(--border);border-radius:var(--border-radius-round);padding:var(--spacing-md);width:100%}:host .condition-row{width:100%}:host .delete-btn{margin-bottom:1px}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i3.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "component", type: i5$2.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "component", type: i5.NovoLabel, selector: "novo-label,[novo-label]", inputs: ["id"] }, { kind: "directive", type: i5.PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: ["padding", "p", "paddingLeft", "pl", "paddingRight", "pr", "paddingTop", "pt", "paddingBottom", "pb", "paddingX", "px", "paddingY", "py"] }, { kind: "directive", type: i5.GapDirective, selector: "[gap]", inputs: ["gap"] }, { kind: "directive", type: i5.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i5.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { kind: "component", type: i8.NovoFlexElement, selector: "novo-flex,novo-row", inputs: ["direction", "align", "justify", "wrap", "gap"] }, { kind: "component", type: i8.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { kind: "component", type: i8$3.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { kind: "component", type: ConditionBuilderComponent, selector: "novo-condition-builder", inputs: ["label", "scope", "andIndex", "groupIndex", "addressConfig", "dateConfig", "hideOperator", "conditionType", "config", "editTypeFn"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ConditionGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-condition-group', changeDetection: ChangeDetectionStrategy.OnPush, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ConditionGroupComponent), multi: true }], host: {
                        class: 'novo-condition-group',
                    }, standalone: false, template: "<div [formGroup]=\"parentForm\" class=\"condition-group-container\">\n  <novo-stack [formArrayName]=\"controlName\" gap=\"md\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLast = last;\">\n      <ng-container [formGroupName]=\"andIndex\">\n        <novo-flex class=\"condition-row\" [ngClass]=\"{ isFirst: andIndex === 0 }\" [class]=\"entity || scope\" align=\"end\" gap=\"sm\" #flex>\n          <novo-dropdown *ngIf=\"(!isFirst || !hideFirstOperator) && qbs.allowedGroupings.length > 1; else labeledGroup\" data-automation-id=\"groupings-dropdown\">\n            <button theme=\"dialogue\" icon=\"collapse\" size=\"sm\">{{qbs.getConjunctionLabel(controlName)}}</button>\n            <novo-optgroup>\n              <novo-option *ngFor=\"let c of qbs.allowedGroupings\" (click)=\"updateControlName(c)\" [attr.data-automation-id]=\"c\">\n                {{qbs.getConjunctionLabel(c)}}</novo-option>\n            </novo-optgroup>\n          </novo-dropdown>\n          <ng-template #labeledGroup>\n            <novo-label *ngIf=\"!isFirst || !hideFirstOperator\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">\n              {{qbs.getConjunctionLabel(controlName)}}</novo-label>\n          </ng-template>\n          <novo-condition-builder [groupIndex]=\"groupIndex\" [andIndex]=\"andIndex\" [hideOperator]=\"isFirst && hideFirstOperator\" [scope]=\"scope\" [conditionType]=\"controlName\"></novo-condition-builder>\n          <novo-button class=\"delete-btn\" theme=\"icon\" icon=\"delete-o\" color=\"negative\" (click)=\"removeCondition(andIndex)\">\n          </novo-button>\n        </novo-flex>\n      </ng-container>\n    </ng-container>\n    <button\n      *ngIf=\"!qbs.hasMultipleScopes()\"\n      theme=\"dialogue\"\n      data-automation-id=\"add-advanced-search-condition\"\n      icon=\"add-thin\"\n      side=\"left\"\n      size=\"sm\"\n      uppercase\n      (click)=\"addCondition()\">\n      {{ labels.addCondition }}</button>\n  </novo-stack>\n</div>\n", styles: [":host{position:relative;display:block;border:1px solid var(--border);border-radius:var(--border-radius-round);padding:var(--spacing-md);width:100%}:host .condition-row{width:100%}:host .delete-btn{margin-bottom:1px}\n"] }]
        }], ctorParameters: () => [{ type: QueryBuilderService }, { type: i1.NovoLabelService }, { type: i3.ControlContainer }, { type: i3.FormBuilder }, { type: i0.ChangeDetectorRef }], propDecorators: { controlName: [{
                type: Input
            }], groupIndex: [{
                type: Input
            }], hideFirstOperator: [{
                type: Input
            }], canBeEmpty: [{
                type: Input
            }], formGroupName: [{
                type: Input
            }] } });

const EMPTY_CONDITION = {
    conditionType: '$and',
    field: null,
    operator: null,
    scope: null,
    value: null,
    supportingValue: null,
    entity: null,
};
class CriteriaBuilderComponent {
    set HideFirstOperator(hide) {
        if (!Helpers.isEmpty(hide)) {
            this._hideFirstOperator = hide;
        }
    }
    get hideFirstOperator() {
        return this._hideFirstOperator;
    }
    constructor(controlContainer, formBuilder, cdr, qbs, labels) {
        this.controlContainer = controlContainer;
        this.formBuilder = formBuilder;
        this.cdr = cdr;
        this.qbs = qbs;
        this.labels = labels;
        this.allowedGroupings = [Conjunction.AND, Conjunction.OR, Conjunction.NOT];
        this.canBeEmpty = false;
        this._hideFirstOperator = true;
        this.scopedFieldPicker = viewChild(NovoTabbedGroupPickerElement);
        this.conditionGroups = viewChildren(ConditionGroupComponent);
        this.tabbedGroupPickerTabs = computed(() => {
            const tabs = [];
            this.qbs.scopes()?.forEach((scope) => {
                tabs.push({
                    typeName: scope,
                    typeLabel: scope,
                    valueField: 'name',
                    labelField: 'label',
                    data: this.qbs.config.fields.find((field) => field.value === scope)?.options || [],
                });
            });
            return tabs;
        });
        this.addButtonConfig = {
            theme: 'dialogue',
            side: 'left',
            size: 'sm',
            icon: 'add-thin',
            label: this.labels.addCondition,
        };
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new Subject();
        if (!qbs.componentHost) {
            qbs.componentHost = this;
        }
    }
    ngOnInit() {
        this.parentForm = this.controlContainer.control;
        this.innerForm = this.formBuilder.group({
            criteria: this.formBuilder.array([]),
        });
        this.parentForm.valueChanges.pipe(startWith(this.parentForm.value), filter(v => v?.criteria), takeUntil(this._onDestroy)).subscribe((value) => {
            Promise.resolve().then(() => {
                this.setInitialValue(value[this.controlName]);
                this.cdr.markForCheck();
            });
        });
        this.innerForm.valueChanges
            .pipe(debounce(() => interval(10)), takeUntil(this._onDestroy))
            .subscribe((value) => {
            const result = value.criteria.filter((it, i) => {
                const key = Object.keys(it)[0];
                if (it[key].length === 0) {
                    this.removeConditionGroupAt(i);
                }
                return it[key].length > 0;
            });
            Promise.resolve().then(() => {
                this.parentForm.get(this.controlName).setValue(result, { emitEvent: false });
                this.cdr.markForCheck();
            });
        });
    }
    ngAfterContentChecked() {
        this._configureQueryBuilderService();
        this.cdr.detectChanges();
    }
    ngAfterViewInit() {
        this._registerFieldDefs();
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    isConditionGroup(group) {
        return Object.keys(group).every((key) => ['$and', '$or', '$not'].includes(key));
    }
    setInitialValue(value) {
        if (value.length) {
            if (this.isConditionGroup(value[0])) {
                value.forEach((it) => this.addConditionGroup(it));
            }
            else {
                const conditions = [...value];
                if (this.qbs.hasMultipleScopes()) {
                    // divide up by scope into separate groups
                    const scopedConditions = {};
                    conditions.forEach((condition) => {
                        scopedConditions[condition.scope] = scopedConditions[condition.scope] || [];
                        scopedConditions[condition.scope].push(condition);
                    });
                    for (const scope in scopedConditions) {
                        this.addConditionGroup({ $and: scopedConditions[scope] });
                    }
                }
                else {
                    this.addConditionGroup({ $and: conditions });
                }
            }
        }
        else {
            this.addConditionGroup({ $and: value });
        }
    }
    get root() {
        return this.innerForm.get('criteria');
    }
    addConditionGroup(data = { $and: [EMPTY_CONDITION] }) {
        this.root.push(this.newConditionGroup(data));
        this.cdr.markForCheck();
    }
    newConditionGroup(data) {
        const controls = Object.entries(data).reduce((obj, [key, val]) => {
            return {
                ...obj,
                [key]: this.formBuilder.array(val.map((it) => this.newCondition(it))),
            };
        }, {});
        return this.formBuilder.group(controls);
    }
    newCondition({ field, operator, scope, value, supportingValue } = EMPTY_CONDITION) {
        const entity = this.getFieldEntity(this.config, scope);
        return this.formBuilder.group({
            conditionType: '$and',
            field: [field, Validators.required],
            operator: [operator, Validators.required],
            scope: [scope],
            value: [value],
            supportingValue: [supportingValue],
            entity: [entity],
        });
    }
    getFieldEntity(fieldConfigs, scope) {
        if (Array.isArray(fieldConfigs?.fields)) {
            return fieldConfigs.fields.find(field => field.value === scope)?.entity;
        }
        return null;
    }
    removeConditionGroupAt(index) {
        this.root.removeAt(index, { emitEvent: false });
    }
    clearAllConditions() {
        while (this.root.length) {
            this.root.removeAt(0);
        }
    }
    onFieldSelect(field) {
        this.scopedFieldPicker().dropdown.closePanel();
        const condition = { field: field.name, operator: null, scope: field.scope, value: null, entity: field.entity };
        const group = this.conditionGroups().find((group) => group.scope === field.scope);
        if (group) {
            group.addCondition(condition);
        }
        else {
            this.addConditionGroup({ $and: [condition] });
        }
    }
    _configureQueryBuilderService() {
        this.qbs.scopes.set(this.config?.fields.map((f) => f.value));
        this.qbs.config = this.config;
        this.qbs.editTypeFn = this.editTypeFn;
        this.qbs.allowedGroupings = this.allowedGroupings;
    }
    _registerFieldDefs() {
        const defs = [...Array.from(this._contentFieldDefs)];
        defs.forEach((fieldDef) => {
            this.qbs.registerFieldDef(fieldDef);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CriteriaBuilderComponent, deps: [{ token: i3.ControlContainer }, { token: i3.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: QueryBuilderService }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "19.2.15", type: CriteriaBuilderComponent, isStandalone: false, selector: "novo-criteria-builder", inputs: { config: "config", controlName: "controlName", allowedGroupings: "allowedGroupings", editTypeFn: "editTypeFn", addressConfig: "addressConfig", dateConfig: "dateConfig", canBeEmpty: "canBeEmpty", HideFirstOperator: ["hideFirstOperator", "HideFirstOperator"] }, host: { classAttribute: "novo-criteria-builder" }, providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
            { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
            { provide: QueryBuilderService, useClass: QueryBuilderService },
        ], queries: [{ propertyName: "_contentFieldDefs", predicate: NovoConditionFieldDef, descendants: true }], viewQueries: [{ propertyName: "scopedFieldPicker", first: true, predicate: NovoTabbedGroupPickerElement, descendants: true, isSignal: true }, { propertyName: "conditionGroups", predicate: ConditionGroupComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{ qbs.hasMultipleScopes() ? conditionGroup.scope + ' ' + labels.filterss : qbs.getConjunctionLabel('and') }}</novo-label>\n      <novo-condition-group [hideFirstOperator]=\"hideFirstOperator\" [canBeEmpty]=\"canBeEmpty\" [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\" #conditionGroup></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n  <novo-tabbed-group-picker\n    *ngIf=\"qbs.hasMultipleScopes()\"\n    [tabs]=\"tabbedGroupPickerTabs()\"\n    [selectionEnabled]=\"false\"\n    [buttonConfig]=\"addButtonConfig\"\n    (activation)=\"onFieldSelect($event)\">\n  </novo-tabbed-group-picker>\n</form>\n<novo-condition-templates [addressConfig]=\"addressConfig\" [dateConfig]=\"dateConfig\"/>\n\n<!--\n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->\n", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i3.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "component", type: i5.NovoLabel, selector: "novo-label,[novo-label]", inputs: ["id"] }, { kind: "directive", type: i5.PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: ["padding", "p", "paddingLeft", "pl", "paddingRight", "pr", "paddingTop", "pt", "paddingBottom", "pb", "paddingX", "px", "paddingY", "py"] }, { kind: "component", type: i8.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { kind: "component", type: i7$1.NovoTabbedGroupPickerElement, selector: "novo-tabbed-group-picker", inputs: ["buttonConfig", "tabs", "quickSelectConfig", "showFooter", "selectionEnabled"], outputs: ["activation", "selectionChange", "applyChange", "cancelChange"] }, { kind: "component", type: ConditionGroupComponent, selector: "novo-condition-group", inputs: ["controlName", "groupIndex", "hideFirstOperator", "canBeEmpty", "formGroupName"] }, { kind: "component", type: NovoConditionTemplatesComponent, selector: "novo-condition-templates", inputs: ["addressConfig", "dateConfig"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CriteriaBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-criteria-builder', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
                        { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
                        { provide: QueryBuilderService, useClass: QueryBuilderService },
                    ], host: {
                        class: 'novo-criteria-builder',
                    }, standalone: false, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{ qbs.hasMultipleScopes() ? conditionGroup.scope + ' ' + labels.filterss : qbs.getConjunctionLabel('and') }}</novo-label>\n      <novo-condition-group [hideFirstOperator]=\"hideFirstOperator\" [canBeEmpty]=\"canBeEmpty\" [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\" #conditionGroup></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n  <novo-tabbed-group-picker\n    *ngIf=\"qbs.hasMultipleScopes()\"\n    [tabs]=\"tabbedGroupPickerTabs()\"\n    [selectionEnabled]=\"false\"\n    [buttonConfig]=\"addButtonConfig\"\n    (activation)=\"onFieldSelect($event)\">\n  </novo-tabbed-group-picker>\n</form>\n<novo-condition-templates [addressConfig]=\"addressConfig\" [dateConfig]=\"dateConfig\"/>\n\n<!--\n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->\n", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"] }]
        }], ctorParameters: () => [{ type: i3.ControlContainer }, { type: i3.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: QueryBuilderService }, { type: i1.NovoLabelService }], propDecorators: { config: [{
                type: Input
            }], controlName: [{
                type: Input
            }], allowedGroupings: [{
                type: Input
            }], editTypeFn: [{
                type: Input
            }], addressConfig: [{
                type: Input
            }], dateConfig: [{
                type: Input
            }], canBeEmpty: [{
                type: Input
            }], HideFirstOperator: [{
                type: Input,
                args: ['hideFirstOperator']
            }], _contentFieldDefs: [{
                type: ContentChildren,
                args: [NovoConditionFieldDef, { descendants: true }]
            }] } });

class NovoQueryBuilderModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoQueryBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoQueryBuilderModule, declarations: [CriteriaBuilderComponent,
            ConditionBuilderComponent,
            ConditionInputOutlet,
            ConditionOperatorOutlet,
            ConditionGroupComponent,
            NovoDefaultAddressConditionDef,
            NovoDefaultBooleanConditionDef,
            NovoDefaultDateConditionDef,
            NovoDefaultDateTimeConditionDef,
            NovoConditionOperatorsDef,
            NovoConditionInputDef,
            NovoConditionFieldDef,
            NovoDefaultStringConditionDef,
            NovoDefaultNumberConditionDef,
            NovoDefaultIdConditionDef,
            NovoDefaultPickerConditionDef,
            NovoConditionTemplatesComponent], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            DragDropModule,
            CdkTableModule,
            GooglePlacesModule,
            NovoAutoCompleteModule,
            NovoButtonModule,
            NovoCommonModule,
            NovoFormModule,
            NovoSelectModule,
            NovoNonIdealStateModule,
            NovoFieldModule,
            NovoOptionModule,
            NovoFlexModule,
            NovoTabModule,
            NovoTabbedGroupPickerModule,
            NovoLoadingModule,
            NovoCardModule,
            NovoDatePickerModule,
            NovoDateTimePickerModule,
            NovoIconModule,
            NovoOverlayModule,
            NovoRadioModule,
            NovoSearchBoxModule,
            NovoSwitchModule,
            NovoChipsModule,
            NovoSelectSearchModule,
            NovoDropdownModule,
            NovoFormExtrasModule,
            NovoTooltipModule], exports: [CriteriaBuilderComponent,
            ConditionBuilderComponent,
            NovoDefaultAddressConditionDef,
            NovoDefaultBooleanConditionDef,
            NovoDefaultDateConditionDef,
            NovoDefaultDateTimeConditionDef,
            NovoConditionOperatorsDef,
            NovoConditionInputDef,
            NovoConditionFieldDef,
            NovoDefaultStringConditionDef,
            NovoDefaultNumberConditionDef,
            NovoDefaultIdConditionDef,
            NovoDefaultPickerConditionDef,
            NovoConditionTemplatesComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoQueryBuilderModule, imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            DragDropModule,
            CdkTableModule,
            GooglePlacesModule,
            NovoAutoCompleteModule,
            NovoButtonModule,
            NovoCommonModule,
            NovoFormModule,
            NovoSelectModule,
            NovoNonIdealStateModule,
            NovoFieldModule,
            NovoOptionModule,
            NovoFlexModule,
            NovoTabModule,
            NovoTabbedGroupPickerModule,
            NovoLoadingModule,
            NovoCardModule,
            NovoDatePickerModule,
            NovoDateTimePickerModule,
            NovoIconModule,
            NovoOverlayModule,
            NovoRadioModule,
            NovoSearchBoxModule,
            NovoSwitchModule,
            NovoChipsModule,
            NovoSelectSearchModule,
            NovoDropdownModule,
            NovoFormExtrasModule,
            NovoTooltipModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoQueryBuilderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        DragDropModule,
                        CdkTableModule,
                        GooglePlacesModule,
                        NovoAutoCompleteModule,
                        NovoButtonModule,
                        NovoCommonModule,
                        NovoFormModule,
                        NovoSelectModule,
                        NovoNonIdealStateModule,
                        NovoFieldModule,
                        NovoOptionModule,
                        NovoFlexModule,
                        NovoTabModule,
                        NovoTabbedGroupPickerModule,
                        NovoLoadingModule,
                        NovoCardModule,
                        NovoDatePickerModule,
                        NovoDateTimePickerModule,
                        NovoIconModule,
                        NovoOverlayModule,
                        NovoRadioModule,
                        NovoSearchBoxModule,
                        NovoSwitchModule,
                        NovoChipsModule,
                        NovoSelectSearchModule,
                        NovoDropdownModule,
                        NovoFormExtrasModule,
                        NovoTooltipModule,
                    ],
                    declarations: [
                        CriteriaBuilderComponent,
                        ConditionBuilderComponent,
                        ConditionInputOutlet,
                        ConditionOperatorOutlet,
                        ConditionGroupComponent,
                        NovoDefaultAddressConditionDef,
                        NovoDefaultBooleanConditionDef,
                        NovoDefaultDateConditionDef,
                        NovoDefaultDateTimeConditionDef,
                        NovoConditionOperatorsDef,
                        NovoConditionInputDef,
                        NovoConditionFieldDef,
                        NovoDefaultStringConditionDef,
                        NovoDefaultNumberConditionDef,
                        NovoDefaultIdConditionDef,
                        NovoDefaultPickerConditionDef,
                        NovoConditionTemplatesComponent,
                    ],
                    exports: [
                        CriteriaBuilderComponent,
                        ConditionBuilderComponent,
                        NovoDefaultAddressConditionDef,
                        NovoDefaultBooleanConditionDef,
                        NovoDefaultDateConditionDef,
                        NovoDefaultDateTimeConditionDef,
                        NovoConditionOperatorsDef,
                        NovoConditionInputDef,
                        NovoConditionFieldDef,
                        NovoDefaultStringConditionDef,
                        NovoDefaultNumberConditionDef,
                        NovoDefaultIdConditionDef,
                        NovoDefaultPickerConditionDef,
                        NovoConditionTemplatesComponent,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AbstractConditionFieldDef, BaseConditionFieldDef, ConditionBuilderComponent, ConditionInputOutlet, ConditionOperatorOutlet, Conjunction, CriteriaBuilderComponent, NOVO_CONDITION_BUILDER, NOVO_CRITERIA_BUILDER, NOVO_QUERY_BUILDER, NovoConditionFieldDef, NovoConditionInputDef, NovoConditionOperatorsDef, NovoConditionTemplatesComponent, NovoDefaultAddressConditionDef, NovoDefaultBooleanConditionDef, NovoDefaultDateConditionDef, NovoDefaultDateTimeConditionDef, NovoDefaultIdConditionDef, NovoDefaultNumberConditionDef, NovoDefaultPickerConditionDef, NovoDefaultStringConditionDef, NovoQueryBuilderModule, Operator, RadiusUnits };
//# sourceMappingURL=novo-elements-elements-query-builder.mjs.map
