import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { debounce, takeUntil } from 'rxjs/operators';
import { NovoConditionFieldDef } from '../query-builder.directives';
import { QueryBuilderService } from '../query-builder.service';
import { NOVO_CRITERIA_BUILDER } from '../query-builder.tokens';
import { BaseFieldDef, Condition, ConditionGroup, Conjunction } from '../query-builder.types';

const EMPTY_CONDITION: Condition = {
  field: null,
  operator: null,
  value: null,
};
@Component({
  selector: 'novo-criteria-builder',
  templateUrl: './criteria-builder.component.html',
  styleUrls: ['./criteria-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
    { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
    { provide: QueryBuilderService, useClass: QueryBuilderService },
  ],
  host: {
    class: 'novo-criteria-builder',
  },
})
export class CriteriaBuilderComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewInit {
  @Input() config: any;
  @Input() controlName: string;
  @Input() allowedGroupings = [Conjunction.AND, Conjunction.OR, Conjunction.NOT];
  @Input() editTypeFn: (field: BaseFieldDef) => string;

  @ContentChildren(NovoConditionFieldDef, { descendants: true }) _contentFieldDefs: QueryList<NovoConditionFieldDef>;

  public parentForm: FormGroup;
  public innerForm: FormGroup;
  /** Subject that emits when the component has been destroyed. */
  private readonly _onDestroy = new Subject<void>();

  constructor(
    private controlContainer: ControlContainer,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    public qbs: QueryBuilderService,
  ) {}

  ngOnInit() {
    this.parentForm = this.controlContainer.control as FormGroup;
    this.innerForm = this.formBuilder.group({
      criteria: this.formBuilder.array([]),
    });

    this.parentForm.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe((value) => {
      Promise.resolve().then(() => {
        this.setInitalValue(value[this.controlName]);
        this.cdr.markForCheck();
      });
    });
    this.innerForm.valueChanges
      .pipe(
        debounce(() => interval(10)),
        takeUntil(this._onDestroy),
      )
      .subscribe((value) => {
        const result = value.criteria.filter((it, i) => {
          const key = Object.keys(it)[0];
          if (it[key].length === 0) {
            this.removeConditionGroupAt(i);
          }
          return it[key].length > 0;
        });

        Promise.resolve().then(() => {
          this.parentForm.get(this.controlName).setValue(result, { emitEvent: false });
          this.cdr.markForCheck();
        });
      });
  }

  ngAfterContentChecked(): void {
    this._configureQueryBuilderService();
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this._registerFieldDefs();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private isConditionGroup(group: unknown) {
    return Object.keys(group).every((key) => ['$and', '$or', '$not'].includes(key));
  }

  private setInitalValue(value: ConditionGroup[] | Condition[]) {
    if (value.length && this.isConditionGroup(value[0])) {
      value.forEach((it) => this.addConditionGroup(it));
    } else {
      this.addConditionGroup({ $and: value });
    }
  }

  get root(): FormArray {
    return this.innerForm.get('criteria') as FormArray;
  }

  addConditionGroup(data: any = { $and: [EMPTY_CONDITION] }) {
    this.root.push(this.newConditionGroup(data));
    this.cdr.markForCheck();
  }

  newConditionGroup(data: ConditionGroup): FormGroup {
    const controls = Object.entries(data).reduce((obj, [key, val]) => {
      return {
        ...obj,
        [key]: this.formBuilder.array(val.map((it) => this.newCondition(it))),
      };
    }, {});
    return this.formBuilder.group(controls);
  }

  newCondition({ field, operator, value }: Condition = EMPTY_CONDITION): FormGroup {
    return this.formBuilder.group({
      field: [field, Validators.required],
      operator: [operator, Validators.required],
      value: [value],
    });
  }

  removeConditionGroupAt(index: number) {
    this.root.removeAt(index, { emitEvent: false });
  }

  clearAllConditions() {
    while (this.root.length) {
      this.root.removeAt(0);
    }
  }

  private _configureQueryBuilderService() {
    this.qbs.config = this.config;
    this.qbs.editTypeFn = this.editTypeFn;
    this.qbs.allowedGroupings = this.allowedGroupings as Conjunction[];
  }

  private _registerFieldDefs() {
    const defs = [...Array.from(this._contentFieldDefs)];
    defs.forEach((fieldDef) => {
      this.qbs.registerFieldDef(fieldDef);
    });
  }
}
