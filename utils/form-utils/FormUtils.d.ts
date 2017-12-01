import { NovoControlConfig } from '../../elements/form/FormControls';
import { NovoFieldset } from '../../elements/form/FormInterfaces';
import { NovoFormGroup } from '../../elements/form/NovoFormControl';
export declare class FormUtils {
    toFormGroup(controls: Array<any>): NovoFormGroup;
    emptyFormGroup(): NovoFormGroup;
    addControls(formGroup: NovoFormGroup, controls: Array<NovoControlConfig>): void;
    /**
     * @name toFormGroupFromFieldset
     * @param fieldsets
     * @returns {NovoFormGroup}
     */
    toFormGroupFromFieldset(fieldsets: Array<NovoFieldset>): NovoFormGroup;
    /**
     * @name determineInputType
     * @param field
     * @returns {string}
     */
    determineInputType(field: {
        dataSpecialization: string;
        inputType: string;
        options: string;
        multiValue: boolean;
        dataType: string;
        type: string;
    }): string;
    isFieldEncrypted(key: string): boolean;
    getControlForField(field: any, http: any, config: {
        token?: string;
        restUrl?: string;
        military?: boolean;
    }, overrides?: any, forTable?: boolean): any;
    toControls(meta: any, currencyFormat: any, http: any, config: {
        token?: string;
        restUrl?: string;
        military?: boolean;
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
    }, overrides?: any): NovoFieldset[];
    getControlOptions(field: any, http: any, config: {
        token?: string;
        restUrl?: string;
        military?: boolean;
    }): any;
    setInitialValues(controls: Array<NovoControlConfig>, values: any, keepClean?: boolean, keyOverride?: string): void;
    setInitialValuesFieldsets(fieldsets: Array<NovoFieldset>, values: any, keepClean?: boolean): void;
    forceShowAllControls(controls: Array<NovoControlConfig>): void;
    forceShowAllControlsInFieldsets(fieldsets: Array<NovoFieldset>): void;
    forceValidation(form: NovoFormGroup): void;
}
