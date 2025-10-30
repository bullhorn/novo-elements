import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, UntypedFormGroup } from '@angular/forms';
import { QueryBuilderService } from '../query-builder.service';
import { Condition } from '../query-builder.types';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class ConditionGroupComponent implements OnInit, OnDestroy {
    qbs: QueryBuilderService;
    labels: NovoLabelService;
    private controlContainer;
    private formBuilder;
    private cdr;
    controlName: string;
    groupIndex: number;
    hideFirstOperator: boolean;
    canBeEmpty: boolean;
    formGroupName: any;
    scope: string;
    entity: string;
    parentForm: UntypedFormGroup;
    /** Subject that emits when the component has been destroyed. */
    private readonly _onDestroy;
    constructor(qbs: QueryBuilderService, labels: NovoLabelService, controlContainer: ControlContainer, formBuilder: FormBuilder, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    updateGroupScopeAndEntity(): void;
    updateControlName(value: string): void;
    private sanitizeCondition;
    get root(): FormArray;
    addCondition(data?: any): void;
    removeCondition(index: number): void;
    newCondition({ field, operator, scope, value, supportingValue, entity }?: Condition): UntypedFormGroup;
    cantRemoveRow(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConditionGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConditionGroupComponent, "novo-condition-group", never, { "controlName": { "alias": "controlName"; "required": false; }; "groupIndex": { "alias": "groupIndex"; "required": false; }; "hideFirstOperator": { "alias": "hideFirstOperator"; "required": false; }; "canBeEmpty": { "alias": "canBeEmpty"; "required": false; }; "formGroupName": { "alias": "formGroupName"; "required": false; }; }, {}, never, never, false, never>;
}
