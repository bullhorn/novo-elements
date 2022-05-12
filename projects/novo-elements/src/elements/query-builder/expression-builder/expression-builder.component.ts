import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { NOVO_EXPRESSION_BUILDER } from '../query-builder.tokens';

@Component({
  selector: 'novo-expression-builder',
  templateUrl: './expression-builder.component.html',
  styleUrls: ['./expression-builder.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ExpressionBuilderComponent), multi: true },
    { provide: NOVO_EXPRESSION_BUILDER, useExisting: ExpressionBuilderComponent },
  ],
})
export class ExpressionBuilderComponent implements OnInit {
  public parentForm: AbstractControl;
  @Input() config: any;
  @Input() controlName: string;

  constructor(private controlContainer: ControlContainer, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.parentForm = this.controlContainer.control;
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
}
