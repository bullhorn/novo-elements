import { AfterContentChecked, ChangeDetectionStrategy, Component, ContentChildren, forwardRef, Input, OnDestroy, OnInit, QueryList, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BaseConditionFieldDef, NovoConditionFieldDef } from '../query-builder.directives';
import { NOVO_CRITERIA_BUILDER } from '../query-builder.tokens';
import { BaseFieldDef } from '../query-builder.types';

@Component({
  selector: 'novo-criteria-builder',
  templateUrl: './criteria-builder.component.html',
  styleUrls: ['./criteria-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
    { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
  ],
  host: {
    class: 'novo-criteria-builder',
  },
})
export class CriteriaBuilderComponent implements OnInit, OnDestroy, AfterContentChecked {
  public parentForm: AbstractControl;
  @Input() config: any;
  @Input() controlName: string;
  @Input() orEnabled = false;
  @Input() addCriteriaLabel = 'Add Criteria';
  @Input() editTypeFn: (field: BaseFieldDef) => string;

  @ContentChildren(NovoConditionFieldDef, { descendants: true }) _contentFieldDefs: QueryList<NovoConditionFieldDef>;

  private _customFieldDefs = new Set<BaseConditionFieldDef>();
  private _fieldDefsByName = new Map<string, BaseConditionFieldDef>();
  /** Subject that emits when the component has been destroyed. */
  private readonly _onDestroy = new Subject<void>();

  constructor(private controlContainer: ControlContainer, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.parentForm = this.controlContainer.control;
    setTimeout(() => this.addAndGroup());
  }
  
  ngAfterContentChecked() {
    this._cacheFieldDefs();
  }

  ngOnDestroy() {
    // Clear all outlets and Maps
    [this._customFieldDefs, this._fieldDefsByName].forEach((def) => {
      def.clear();
    });
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  handleAddOrFilter(evt: any) {
  }

  handleAddAndFilter(evt: any) {
    this.addAndGroup();
  }

  andGroups(): FormArray {
    return this.parentForm.get(this.controlName) as FormArray;
  }

  newAndGroup(): FormGroup {
    return this.formBuilder.group({
      $or: this.formBuilder.array([this.newOrGroup()]),
    });
  }

  addAndGroup() {
    this.andGroups().push(this.newAndGroup());
    this.cdr.markForCheck();
  }

  removeAndGroup(index: number) {
    this.andGroups().removeAt(index);
    this.cdr.markForCheck();
  }

  orGroups(index: number): FormArray {
    return this.andGroups().at(index).get('$or') as FormArray;
  }

  newOrGroup(): FormGroup {
    return this.formBuilder.group({
      field: [null, Validators.required],
      operator: [null, Validators.required],
      value: [null, Validators.required],
    });
  }

  addOrGroup(index: number) {
    this.orGroups(index).push(this.newOrGroup());
    this.cdr.markForCheck();
  }

  removeOrGroup(index: number, orIndex: number) {
    this.orGroups(index).removeAt(orIndex);
    if (!this.orGroups(index).controls.length) {
      this.removeAndGroup(index);
    }
    this.cdr.markForCheck();
  }

  canAddGroup() {
    if (this.andGroups().controls.length < 1) return true;
    const len = this.andGroups().controls.length - 1;
    const last = this.orGroups(len).controls.length - 1;
    const { field, value } = this.orGroups(len).at(last).value;
    return !!field && !!value;
  }

  /** Adds a field definition that was not included as part of the content children. */
  addFieldDef(fieldDef: BaseConditionFieldDef) {
    this._customFieldDefs.add(fieldDef);
  }

  /** Removes a field definition that was not included as part of the content children. */
  removeFieldDef(fieldDef: BaseConditionFieldDef) {
    this._customFieldDefs.delete(fieldDef);
  }

  getFieldDefsByName() {
    return this._fieldDefsByName;
  }

  private _cacheFieldDefs() {
    this._fieldDefsByName.clear();

    const defs = [
      // Dynamically Added Definitions
      ...Array.from(this._customFieldDefs),
      ...Array.from(this._contentFieldDefs),
    ];

    defs.forEach((fieldDef) => {
      if (this._fieldDefsByName.has(fieldDef.name)) {
        // throw new Error(`duplicate field name for ${fieldDef.name}`);
        console.warn(`Duplicate field name for ${fieldDef.name}`);
      }
      this._fieldDefsByName.set(fieldDef.name, fieldDef);
    });
  }
}
