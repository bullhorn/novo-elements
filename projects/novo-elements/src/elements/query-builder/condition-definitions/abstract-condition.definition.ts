import { Directive, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NovoLabelService } from '../../../services';
import { NovoConditionFieldDef } from '../query-builder.directives';

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

  defaultOperator: string;

  @ViewChild(NovoConditionFieldDef, { static: true }) fieldDef: NovoConditionFieldDef;

  constructor(public labels: NovoLabelService) {}

  ngOnInit() {
    this._syncFieldDefName();
    this._syncFieldDefOperatorValue();
    // Need to add self to FilterBuilder because "ContentChildren won't find it"
    this.fieldDef?.register();
  }

  ngOnDestroy() {
    this.fieldDef?.unregister();
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
