import { Directive, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { NovoConditionFieldDef } from '../query-builder.directives';
import { Operator } from '../query-builder.types';

@Directive()
export abstract class AbstractConditionFieldDef implements OnDestroy, OnInit {
  /** Column name that should be used to reference this column. */
  @Input()
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
    // With Ivy, inputs can be initialized before static query results are
    // available. In that case, we defer the synchronization until "ngOnInit" fires.
    this._syncFieldDefName();
  }
  _name: string;

  defaultOperator: Operator | string;
  protected _previousOperatorValue: Operator;

  protected operatorEditGroups: Set<Operator>[] = [];

  @ViewChild(NovoConditionFieldDef, { static: true }) fieldDef: NovoConditionFieldDef;

  constructor(public labels: NovoLabelService) {}

  ngOnInit() {
    this._syncFieldDefName();
    this._syncFieldDefOperatorValue();
    this._previousOperatorValue = this.defaultOperator as Operator;
    // Need to add self to FilterBuilder because "ContentChildren won't find it"
    this.fieldDef?.register();
  }

  ngOnDestroy() {
    this.fieldDef?.unregister();
  }

  /**
   * Define an edit group of operators. Once defined, if the user switches from one of these operators to another,
   * then the condition value will not be cleared. This makes sense if both operators use the same UI controls for editing.
   * @param operators The set of Operator values intended to share UI controls.
   */
  protected defineOperatorEditGroup(...operators: Operator[]): void {
    this.operatorEditGroups.push(new Set(operators));
  }

  onOperatorSelect(formGroup: UntypedFormGroup): void {
    let clearVal = true;
    if (this._previousOperatorValue && this.operatorEditGroups?.length) {
      const previousOperatorGroupIndex = this.operatorEditGroups.findIndex(grp => grp.has(this._previousOperatorValue));
      const newOperatorValue = formGroup.get('operator').getRawValue();
      const newOperatorGroupIndex = this.operatorEditGroups.findIndex(grp => grp.has(newOperatorValue));
      if (previousOperatorGroupIndex !== -1 && newOperatorGroupIndex !== -1 && previousOperatorGroupIndex === newOperatorGroupIndex) {
        clearVal = false;
      }
    }
    if (clearVal) {
      this._previousOperatorValue = formGroup.get('operator').value;
      formGroup.get('value').setValue(null);
    }
  }

  /** Synchronizes the column definition name with the text column name. */
  private _syncFieldDefName() {
    if (this.fieldDef) {
      this.fieldDef.name = this.name;
    }
  }

  private _syncFieldDefOperatorValue() {
    if (this.fieldDef) {
      this.fieldDef.defaultOperator = this.defaultOperator;
    }
  }
}
