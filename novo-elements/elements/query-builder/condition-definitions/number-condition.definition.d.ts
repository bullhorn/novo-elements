import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { Operator } from '../query-builder.types';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
/**
 * When constructing a query using a field that is an Int, Double, Number ...etc.
 * TODO: Do we implement currency formation here potentially?
 */
export declare class NovoDefaultNumberConditionDef extends AbstractConditionFieldDef {
    defaultOperator: Operator;
    constructor(labelService: NovoLabelService);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultNumberConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultNumberConditionDef, "novo-number-condition-def", never, {}, {}, never, never, false, never>;
}
