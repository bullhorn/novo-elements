import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QueryBuilderService } from '../query-builder.service';
import { Condition, Conjunction } from '../query-builder.types';
import { NovoLabelService } from '../../../services/novo-label-service';

const EMPTY_CONDITION: Condition = {
  field: null,
  operator: null,
  value: null,
};
@Component({
  selector: 'novo-condition-group',
  templateUrl: './condition-group.component.html',
  styleUrls: ['./condition-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ConditionGroupComponent), multi: true }],
  host: {
    class: 'novo-condition-group',
  },
})
export class ConditionGroupComponent implements OnInit, OnDestroy {
  @Input() controlName: string = '$' + Conjunction.AND;
  @Input() groupIndex: number;

  public parentForm: FormGroup;
  public innerForm: FormGroup;
  /** Subject that emits when the component has been destroyed. */
  private readonly _onDestroy = new Subject<void>();

  constructor(
    public qbs: QueryBuilderService,
    public labels: NovoLabelService,
    private controlContainer: ControlContainer,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.parentForm = this.controlContainer.control as FormGroup;
    this.controlName = Object.keys(this.parentForm.controls)[0];
    merge(this.parentForm.parent.valueChanges, this.qbs.stateChanges)
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  updateControlName(value: string) {
    const name = `$${value.replace('$', '')}`;
    if (name !== this.controlName) {
      const current = this.parentForm.get(this.controlName).value;
      this.parentForm.controls[name] = this.parentForm.controls[this.controlName];
      delete this.parentForm.controls[this.controlName];
      this.controlName = name;
      this.parentForm.get(this.controlName).setValue(current);
      this.cdr.markForCheck();
    }
  }

  get root(): FormArray {
    return this.parentForm.get(this.controlName) as FormArray;
  }

  addCondition(data?: any) {
    const conditon = this.newCondition(data);
    this.root.push(conditon);
    this.cdr.markForCheck();
  }

  removeCondition(index: number) {
    this.root.removeAt(index);
    this.cdr.markForCheck();
  }

  newCondition({ field, operator, value }: Condition = EMPTY_CONDITION): FormGroup {
    return this.formBuilder.group({
      field: [field, Validators.required],
      operator: [operator, Validators.required],
      value: [value],
    });
  }

  cantRemoveRow(isFirst: boolean) {
    if ((this.parentForm.parent as FormArray).length > 1) return false;
    return this.root.length <= 1;
  }
}
