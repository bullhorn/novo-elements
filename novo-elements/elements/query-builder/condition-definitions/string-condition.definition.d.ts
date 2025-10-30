import { AbstractControl } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { Operator } from '../query-builder.types';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import * as i0 from "@angular/core";
/**
 * Constructing filters against String fields can be complex. Each "chip" added to the
 * condition can be independently used to query a database.  Not all systems support
 * querying within a text column, ie sql unless LIKE is enabled. This could result in a
 * performance penalty.
 */
export declare class NovoDefaultStringConditionDef extends AbstractConditionFieldDef {
    defaultOperator: Operator;
    constructor(labelService: NovoLabelService);
    getValue(formGroup: AbstractControl): any[];
    add(event: any, formGroup: AbstractControl): void;
    remove(valueToRemove: string, formGroup: AbstractControl): void;
    private setFormValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultStringConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultStringConditionDef, "novo-string-condition-def", never, {}, {}, never, never, false, never>;
}
