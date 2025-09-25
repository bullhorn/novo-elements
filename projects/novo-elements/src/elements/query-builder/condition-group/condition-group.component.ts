import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, UntypedFormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QueryBuilderService } from '../query-builder.service';
import { Condition, Conjunction } from '../query-builder.types';
import { NovoLabelService } from 'novo-elements/services';

const EMPTY_CONDITION: Condition = {
  conditionType: '$and',
  field: null,
  operator: null,
  scope: null,
  value: null,
  supportingValue: null,
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
    standalone: false
})
export class ConditionGroupComponent implements OnInit, OnDestroy {
  @Input() controlName: string = '$' + Conjunction.AND;
  @Input() groupIndex: number;
  @Input() hideFirstOperator: boolean = true;
  @Input() canBeEmpty: boolean = false;
  @Input() formGroupName: any;

  public scope: string;
  public parentForm: UntypedFormGroup;
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
    this.parentForm = this.controlContainer.control as UntypedFormGroup;
    this.controlName = Object.keys(this.parentForm.controls)[0];
    this.updateGroupScope();
    merge(this.parentForm.parent.valueChanges, this.qbs.stateChanges)
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnChanges() {
    this.updateGroupScope();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  updateGroupScope() {
    if (this.parentForm && this.controlName) {
      this.scope = this.parentForm.value[this.controlName][0]?.scope || this.qbs.scopes()[0];
    }
  }

  updateControlName(value: string) {
    const name = `$${value.replace('$', '')}`;
    if (name !== this.controlName) {
      const current = this.parentForm.get(this.controlName).value;
      this.parentForm.controls[name] = this.parentForm.controls[this.controlName];
      delete this.parentForm.controls[this.controlName];
      this.controlName = name;
      // scrub properties not on control
      const currentStrict = current.map((item) => (({ conditionType, field, operator, scope, value, ...rest }) => ({ conditionType, field, operator, scope, value }))(item));
      this.parentForm.get(this.controlName)?.setValue(currentStrict);
      this.cdr.markForCheck();
    }
  }

  get root(): FormArray {
    return this.parentForm.get(this.controlName) as FormArray;
  }

  addCondition(data?: any) {
    const condition = this.newCondition(data);
    const onlyConditionIsEmpty = JSON.stringify(this.root.value) === JSON.stringify([EMPTY_CONDITION]);
    this.root.push(condition);
    this.qbs.hasMultipleScopes() && onlyConditionIsEmpty && this.removeCondition(0);
    this.cdr.markForCheck();
  }

  removeCondition(index: number) {
    const isPrimaryScope = this.scope === this.qbs.scopes()[0];
    const lastRowInGroup = this.root.length === 1;
    const lastRowInQueryBuilder = this.cantRemoveRow();
    this.root.removeAt(index);
    if ((lastRowInQueryBuilder || (lastRowInGroup && isPrimaryScope)) && !this.canBeEmpty) {
      this.addCondition();
    }
    this.cdr.markForCheck();
  }

  newCondition({ field, operator, scope, value, supportingValue }: Condition = EMPTY_CONDITION): UntypedFormGroup {
    return this.formBuilder.group({
      conditionType: '$and',
      field: [field, Validators.required],
      operator: [operator, Validators.required],
      scope: [scope],
      value: [value],
      supportingValue: [supportingValue],
    });
  }

  cantRemoveRow() {
    if ((this.parentForm.parent as FormArray).length > 1) {
      return false;
    }
    return this.root.length <= 1;
  }
}
