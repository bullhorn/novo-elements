import { TemplateRef } from '@angular/core';
import { QueryBuilderService } from './query-builder.service';
import * as i0 from "@angular/core";
/** Base interface for a condidation template directives. */
export interface ConditionDef {
    template: TemplateRef<any>;
}
/**
 * Contained within a novoConditionField definition describing what input should be
 * used to capture the compare value of the Condtion
 */
export declare class NovoConditionInputDef implements ConditionDef {
    template: TemplateRef<any>;
    constructor(/** @docs-private */ template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoConditionInputDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoConditionInputDef, "[novoConditionInputDef]", never, {}, {}, never, never, false, never>;
}
/**
 * Contained within a novoConditionField definition describing what operators should be available.
 */
export declare class NovoConditionOperatorsDef implements ConditionDef {
    template: TemplateRef<any>;
    constructor(/** @docs-private */ template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoConditionOperatorsDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoConditionOperatorsDef, "[novoConditionOperatorsDef]", never, {}, {}, never, never, false, never>;
}
/**
 * Field Field definition for the QueryBuilder.
 * Defines the inputType and operators to use for the query builder.
 */
export declare class BaseConditionFieldDef {
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
export declare class NovoConditionFieldDef extends BaseConditionFieldDef {
    private qbs;
    constructor(qbs: QueryBuilderService);
    register(): void;
    unregister(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoConditionFieldDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoConditionFieldDef, "[novoConditionFieldDef]", never, {}, {}, never, never, false, never>;
}
