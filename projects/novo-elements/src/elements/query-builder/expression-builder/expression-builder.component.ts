import { AfterContentChecked, Component, ContentChildren, forwardRef, Input, OnDestroy, OnInit, QueryList } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BaseFilterFieldDef, NovoFilterFieldDef, NovoFilterFieldTypeDef } from '../filter-builder/base-filter-field.definition';
import { NOVO_EXPRESSION_BUILDER } from '../query-builder.tokens';
import { BaseFieldDef } from '../query-builder.types';

@Component({
  selector: 'novo-expression-builder',
  templateUrl: './expression-builder.component.html',
  styleUrls: ['./expression-builder.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ExpressionBuilderComponent), multi: true },
    { provide: NOVO_EXPRESSION_BUILDER, useExisting: ExpressionBuilderComponent },
  ],
})
export class ExpressionBuilderComponent implements OnInit, OnDestroy, AfterContentChecked {
  public parentForm: AbstractControl;
  @Input() config: any;
  @Input() controlName: string;
  @Input() orEnabled = false;
  @Input() addCriteriaLabel = 'Add Criteria';
  @Input() editTypeFn: (field: BaseFieldDef) => string;

  @ContentChildren(NovoFilterFieldTypeDef, { descendants: true }) _contentFieldTypeDefs: QueryList<NovoFilterFieldTypeDef>;
  @ContentChildren(NovoFilterFieldDef, { descendants: true }) _contentFieldDefs: QueryList<NovoFilterFieldDef>;

  private _customFieldDefs = new Set<BaseFilterFieldDef>();
  private _fieldDefsByName = new Map<string, BaseFilterFieldDef>();
  /** Subject that emits when the component has been destroyed. */
  private readonly _onDestroy = new Subject<void>();

  constructor(private controlContainer: ControlContainer, private formBuilder: FormBuilder) {}

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
    // console.log('Add Or', evt);
  }

  handleAddAndFilter(evt: any) {
    // console.log('Add And', evt);
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
    // console.log(this.parentForm.value);
  }

  removeAndGroup(index: number) {
    this.andGroups().removeAt(index);
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
  }

  removeOrGroup(index: number, orIndex: number) {
    this.orGroups(index).removeAt(orIndex);
    if (!this.orGroups(index).controls.length) {
      this.removeAndGroup(index);
    }
  }

  canAddGroup() {
    // console.log('can Add Group', this.andGroups().controls, this.parentForm.valid);
    if (this.andGroups().controls.length < 1) return true;
    const len = this.andGroups().controls.length - 1;
    const last = this.orGroups(len).controls.length - 1;
    // console.log('last value', this.orGroups(len).at(last).value);
    const { field, value } = this.orGroups(len).at(last).value;
    return !!field && !!value;
  }

  /** Adds a field definition that was not included as part of the content children. */
  addFieldDef(fieldDef: BaseFilterFieldDef) {
    this._customFieldDefs.add(fieldDef);
  }

  /** Removes a field definition that was not included as part of the content children. */
  removeFieldDef(fieldDef: BaseFilterFieldDef) {
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
      // Definitions added as Content
      ...Array.from(this._contentFieldTypeDefs),
      ...Array.from(this._contentFieldDefs),
    ];

    defs.forEach((fieldDef) => {
      if (this._fieldDefsByName.has(fieldDef.name)) {
        // throw new Error(`duplicate field name for ${fieldDef.name}`);
        console.warn(`duplicate field name for ${fieldDef.name}`);
      }
      this._fieldDefsByName.set(fieldDef.name, fieldDef);
    });
  }
}
