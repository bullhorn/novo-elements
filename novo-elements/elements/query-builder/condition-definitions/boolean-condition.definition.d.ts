import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { Operator } from '../query-builder.types';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
/**
 * When constructing a query using a field that is a boolean with only true/false as possible values.
 */
export declare class NovoDefaultBooleanConditionDef extends AbstractConditionFieldDef {
    defaultOperator: Operator;
    constructor(labelService: NovoLabelService);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultBooleanConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultBooleanConditionDef, "novo-boolean-condition-def", never, {}, {}, never, never, false, never>;
}
