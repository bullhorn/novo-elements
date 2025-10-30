import { AfterViewInit, OnDestroy, OnInit, QueryList } from '@angular/core';
import { FormControlName, UntypedFormGroup } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { NovoConditionFieldDef } from '../query-builder.directives';
import { Operator } from '../query-builder.types';
import * as i0 from "@angular/core";
export declare abstract class AbstractConditionFieldDef implements OnDestroy, OnInit, AfterViewInit {
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
