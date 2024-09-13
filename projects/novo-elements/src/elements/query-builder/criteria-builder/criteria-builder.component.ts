import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChildren,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  viewChild,
  viewChildren,
} from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, NG_VALUE_ACCESSOR, UntypedFormGroup, Validators } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { debounce, filter, startWith, takeUntil } from 'rxjs/operators';
import { NovoTabbedGroupPickerElement, TabbedGroupPickerButtonConfig, TabbedGroupPickerTab } from 'novo-elements/elements/tabbed-group-picker';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { ConditionGroupComponent } from '../condition-group/condition-group.component';
import { NovoConditionFieldDef } from '../query-builder.directives';
import { QueryBuilderService } from '../query-builder.service';
import { NOVO_CRITERIA_BUILDER } from '../query-builder.tokens';
import {
  BaseFieldDef,
  Condition,
  ConditionGroup,
  Conjunction,
  AddressCriteriaConfig,
  ConditionOrConditionGroup,
  NestedConditionGroup
} from '../query-builder.types';

const EMPTY_CONDITION: Condition = {
  conditionType: '$and',
  field: null,
  operator: null,
  scope: null,
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
  @Input() addressConfig: AddressCriteriaConfig;
  @Input() canBeEmpty: boolean = false;

  @Input('hideFirstOperator')
  set HideFirstOperator(hide: boolean) {
      if (!Helpers.isEmpty(hide)) {
        this._hideFirstOperator = hide;
      }
  }
  get hideFirstOperator() {
    return this._hideFirstOperator;
  }
  private _hideFirstOperator: boolean = true;

  @ContentChildren(NovoConditionFieldDef, { descendants: true }) _contentFieldDefs: QueryList<NovoConditionFieldDef>;
  scopedFieldPicker = viewChild(NovoTabbedGroupPickerElement);
  conditionGroups = viewChildren(ConditionGroupComponent);

  public parentForm: UntypedFormGroup;
  public innerForm: UntypedFormGroup;
  public tabbedGroupPickerTabs = computed<TabbedGroupPickerTab[]>(() => {
    const tabs = [];
    this.qbs.scopes()?.forEach((scope) => {
      tabs.push({
        typeName: scope,
        typeLabel: scope,
        valueField: 'name',
        labelField: 'label',
        data: this.qbs.config.fields.find((field) => field.value === scope)?.options || [],
      });
    });
    return tabs;
  });
  public addButtonConfig: TabbedGroupPickerButtonConfig = {
    theme: 'dialogue',
    side: 'left',
    size: 'sm',
    icon: 'add-thin',
    label: this.labels.addCondition,
  };
  /** Subject that emits when the component has been destroyed. */
  private readonly _onDestroy = new Subject<void>();

  constructor(
    private controlContainer: ControlContainer,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    public qbs: QueryBuilderService,
    public labels: NovoLabelService,
  ) {
    if (!qbs.componentHost) {
      qbs.componentHost = this;
    }
  }

  ngOnInit() {
    this.parentForm = this.controlContainer.control as UntypedFormGroup;
    this.innerForm = this.formBuilder.group({
      criteria: this.formBuilder.array([]),
    });

    this.parentForm.valueChanges.pipe(
      startWith(this.parentForm.value),
      filter(v => v?.criteria),
      takeUntil(this._onDestroy)
    ).subscribe((value) => {
      Promise.resolve().then(() => {
        this.setInitialValue(value[this.controlName]);
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

  private isConditionGroup(group: unknown): group is ConditionGroup {
    return Object.keys(group).every((key) => ['$and', '$or', '$not'].includes(key));
  }

  private setInitialValue(value: ConditionGroup[] | Condition[]) {
    if (value.length) {
      if (this.isConditionGroup(value[0])) {
        value.forEach((it) => this.addConditionGroup(it));
      } else {
        const conditions: Condition[] = [...value] as Condition[];
        if (this.qbs.hasMultipleScopes()) {
          // divide up by scope into separate groups
          const scopedConditions: { [key: string]: Condition[] } = {};
          conditions.forEach((condition) => {
            scopedConditions[condition.scope] = scopedConditions[condition.scope] || [];
            scopedConditions[condition.scope].push(condition);
          })
          for (const scope in scopedConditions) {
            this.addConditionGroup({ $and: scopedConditions[scope] });
          }
        } else {
          this.addConditionGroup({ $and: conditions });
        }
      }
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

  newConditionGroup(data: ConditionGroup): UntypedFormGroup {
    const controls = Object.entries(data).reduce((obj, [key, val]) => {
      return {
        ...obj,
        [key]: this.formBuilder.array(val.map((it) => this.newCondition(it))),
      };
    }, {});
    return this.formBuilder.group(controls);
  }

  newCondition({ field, operator, scope, value }: Condition = EMPTY_CONDITION): UntypedFormGroup {
    return this.formBuilder.group({
      conditionType: '$and',
      field: [field, Validators.required],
      operator: [operator, Validators.required],
      scope: [scope],
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

  onFieldSelect(field) {
    this.scopedFieldPicker().dropdown.closePanel();
    const condition = { field: field.name, operator: null, scope: field.scope, value: null };
    const group = this.conditionGroups().find((group) => group.scope === field.scope);
    if (group) {
      group.addCondition(condition);
    } else {
      this.addConditionGroup({ $and: [condition] })
    }
  }

  resetValues() {
    for (const conditionOrGroup of this.root?.value as ConditionOrConditionGroup[]) {
      this.resetValuesRecursively(conditionOrGroup);
    }
  }

  private resetValuesRecursively(conditionOrGroup: ConditionOrConditionGroup) {
    if (this.isConditionGroup(conditionOrGroup)) {
      if (conditionOrGroup.$and?.length) {
        for (const condition of conditionOrGroup.$and) {
          this.resetValuesRecursively(condition);
        }
      }
      if (conditionOrGroup.$or?.length) {
        for (const condition of conditionOrGroup.$or) {
          this.resetValuesRecursively(condition);
        }
      }
      if (conditionOrGroup.$not?.length) {
        for (const condition of conditionOrGroup.$not) {
          this.resetValuesRecursively(condition);
        }
      }
    } else if (conditionOrGroup.hasOwnProperty('value')) {
      (conditionOrGroup as Condition).value = null;
    }
  }

  private _configureQueryBuilderService() {
    this.qbs.scopes.set(this.config?.fields.map((f) => f.value));
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
