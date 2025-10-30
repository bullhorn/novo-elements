import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { Operator } from '../query-builder.types';
import * as i0 from "@angular/core";
/**
 * Any condition that has a type of ID usually only is queried by ID.
 */
export declare class NovoDefaultIdConditionDef extends AbstractConditionFieldDef {
    defaultOperator: Operator;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultIdConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultIdConditionDef, "novo-id-condition-def", never, {}, {}, never, ["*"], false, never>;
}
