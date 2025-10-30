import { NovoLabelService } from 'novo-elements/services';
import { BaseFieldDef, Operator } from '../query-builder.types';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { NovoSelectElement } from 'novo-elements/elements/select';
import * as i0 from "@angular/core";
type FieldOption = BaseFieldDef['options'][number];
/**
 * Handle selection of field values when a list of options is provided.
 */
export declare class NovoDefaultPickerConditionDef extends AbstractConditionFieldDef {
    defaultOperator: Operator;
    constructor(labelService: NovoLabelService);
    showAddOption(meta: any, select: any, filterValue: string): boolean;
    optionTracker(option: FieldOption): string;
    hideOption(option: FieldOption, filterValue: string): boolean;
    customOptions(options: FieldOption[], select: NovoSelectElement): FieldOption[];
    applyCustomItem(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDefaultPickerConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDefaultPickerConditionDef, "novo-picker-condition-def", never, {}, {}, never, never, false, never>;
}
export {};
