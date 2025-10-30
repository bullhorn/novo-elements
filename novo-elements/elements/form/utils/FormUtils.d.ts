import { NovoControlConfig } from '../FormControls';
import type { FormField, NovoFieldset } from '../FormInterfaces';
import { NovoFormGroup } from '../NovoFormGroup';
import { NovoLabelService, OptionsService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class FormUtils {
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
