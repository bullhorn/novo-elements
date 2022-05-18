import { Directive, Input, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { NovoFilterFieldInputDef, NovoFilterFieldOperatorsDef, NovoFilterFieldTypeDef } from '../base-filter-field.definition';
import { FilterBuilderComponent } from '../filter-builder.component';

@Directive()
export class DefaultFilterFieldDef implements OnDestroy, OnInit {
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

  @ViewChild(NovoFilterFieldTypeDef, { static: true }) fieldDef: NovoFilterFieldTypeDef;

  /**
   * Reference to the defined input template for the field
   */
  @ViewChild(NovoFilterFieldInputDef, { static: true }) inputDef: NovoFilterFieldInputDef;

  /**
   * Reference to the defined operator template for the field
   */
  @ViewChild(NovoFilterFieldOperatorsDef, { static: true }) operatorDef: NovoFilterFieldOperatorsDef;

  constructor(@Optional() private _fb: FilterBuilderComponent<any>) {}

  ngOnInit() {
    this._syncFieldDefName();
    this._syncFieldDefOperatorValue();
    // Need to add self to FilterBuilder because "ContentChildren won't find it"
    console.log('adding field def', this.fieldDef)
    this._fb.addFieldDef(this.fieldDef);
  }

  ngOnDestroy() {
    if (this._fb) {
      // Need to remove self to FilterBuilder
      this._fb.removeFieldDef(this.fieldDef);
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
