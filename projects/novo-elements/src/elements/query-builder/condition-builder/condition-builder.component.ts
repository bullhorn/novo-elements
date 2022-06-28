import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl, ControlContainer, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import type { CriteriaBuilderComponent } from '../criteria-builder/criteria-builder.component';
import { BaseConditionFieldDef } from '../query-builder.directives';
import { NOVO_CONDITION_BUILDER, NOVO_CRITERIA_BUILDER } from '../query-builder.tokens';
import { BaseFieldDef, FieldConfig, QueryFilterOutlet } from '../query-builder.types';

/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
@Directive({ selector: '[conditionInputOutlet]' })
export class ConditionInputOutlet implements QueryFilterOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
@Directive({ selector: '[conditionOperatorOutlet]' })
export class ConditionOperatorOutlet implements QueryFilterOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

export const defaultEditTypeFn = (field: BaseFieldDef) => {
  return field.inputType || field.dataType || field.type;
};

@Component({
  selector: 'novo-condition-builder',
  templateUrl: './condition-builder.component.html',
  styleUrls: ['./condition-builder.component.scss'],
  providers: [{ provide: NOVO_CONDITION_BUILDER, useExisting: ConditionBuilderComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionBuilderComponent<T extends BaseFieldDef> implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @ViewChild(ConditionOperatorOutlet, { static: true }) _operatorOutlet: ConditionOperatorOutlet;
  @ViewChild(ConditionInputOutlet, { static: true }) _inputOutlet: ConditionInputOutlet;

  @Input() label: any;
  @Input() config: { fields: FieldConfig<T>[] } = { fields: [] };
  @Input() editTypeFn: (field: BaseFieldDef) => string;

  public parentForm: AbstractControl;
  public fieldConfig: FieldConfig<T>;
  public searches!: Subscription;
  public results$: Promise<any[]>;
  public searchTerm: FormControl = new FormControl();
  public fieldDisplayWith;

  private _lastContext: any = {};

  /** Subject that emits when the component has been destroyed. */
  private readonly _onDestroy = new Subject<void>();

  constructor(
    private controlContainer: ControlContainer,
    private cdr: ChangeDetectorRef,
    @Optional() @Inject(NOVO_CRITERIA_BUILDER) @Optional() public _expressionBuilder?: CriteriaBuilderComponent,
  ) {}

  ngOnInit() {
    this.editTypeFn = this.editTypeFn ?? defaultEditTypeFn;
    this.parentForm = this.controlContainer.control;
  }

  ngAfterContentInit() {
    const { fields = [] } = this.config || {};
    fields.length && this.changeFieldOptions(fields[0]);
    this.searches = this.searchTerm.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      this.parentForm.get('field').setValue(null);
        this.results$ = Promise.resolve(
          this.fieldConfig.options.filter(
            (f) => f.name.toLowerCase().includes(term.toLowerCase()) || f.label?.toLowerCase().includes(term.toLowerCase()),
          ),
        );
        this.cdr.markForCheck();
    });
  }

  ngAfterViewInit() {
    if (this.parentForm.value?.field !== null) {
      setTimeout(() => this.onFieldSelect());
    }
  }

  ngOnDestroy() {
    this.searches.unsubscribe();
    // Clear all outlets and Maps
    [this._operatorOutlet.viewContainer, this._inputOutlet.viewContainer].forEach((def) => {
      def.clear();
    });
    // this._contentFieldTypeDefs = [];
    // this._contentFieldDefs = [];
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Updates the Conditions "Field" Options to Change base on new Scope
   * @param fieldConfig
   */
  changeFieldOptions(fieldConfig: FieldConfig<T>) {
    // this.fields = entity.filter(term);
    this.fieldConfig = fieldConfig;
    this.searchTerm.setValue('');
    this.results$ = Promise.resolve(this.fieldConfig.options);
  }

  getField() {
    const { field } = this.parentForm?.value;
    if (!field) return null;
    const fieldName = field.split('.')[1];
    // const fieldNameNew = field.charAt(0) === '.' ? field.slice(1) : field;
    // console.log('field:', field, 'fieldName:', fieldName, 'fieldNameNew:', fieldNameNew, 'fieldConfig:', this.fieldConfig.find(fieldName))
    return this.fieldConfig.find(fieldName);
  }

  getDefaultField() {
    const fields = this.fieldConfig.options;
    if (fields && fields.length) {
      return fields[0].name;
    }
    return null;
  }

  onFieldSelect() {
    const fieldConf = this.getField();
    if (!fieldConf) {
      this.parentForm.get('field').setValue(this.getDefaultField());
      return;
    } else {
      this.fieldDisplayWith = () => fieldConf.label || fieldConf.name;
    }
    const { field, operator } = this.parentForm.value;

    if (this._lastContext.field !== field) {
      this.createFieldTemplates();
    }

    this._lastContext = { ...this.parentForm.value };
    this.cdr.markForCheck();
  }

  private findDefinitionForField(field) {
    if (!field) return;
    const editType = this.editTypeFn(field);
    // Don't look at dataSpecialization it is no good, this misses currency, and percent
    const { name, inputType, dataType, type } = field;
    const fieldDefsByName = this._expressionBuilder.getFieldDefsByName();
    // Check Fields by priority for match Field Definition
    const key = [name, editType?.toUpperCase(), 'DEFAULT'].find((it) => fieldDefsByName.has(it));
    return fieldDefsByName.get(key);
  }

  private createFieldTemplates() {
    const definition = this.findDefinitionForField(this.getField());

    if (!this.parentForm.get('operator').value) {
      this.parentForm.get('operator').setValue(definition.defaultOperator);
    }

    this.createFieldOperators(definition);
    this.createFieldInput(definition);
  }

  private createFieldOperators(definition: BaseConditionFieldDef) {
    this._operatorOutlet.viewContainer.clear();
    if (definition) {
      const context = { $implicit: this.parentForm, fieldMeta: this.getField() };
      this._operatorOutlet.viewContainer.createEmbeddedView(definition.fieldOperators.template, context);
    }
    this.cdr.markForCheck();
  }

  private createFieldInput(definition: BaseConditionFieldDef) {
    this._inputOutlet.viewContainer.clear();
    if (definition) {
      const context = { $implicit: this.parentForm, fieldMeta: this.getField() };
      this._inputOutlet.viewContainer.createEmbeddedView(definition.fieldInput.template, context);
    }
    this.cdr.markForCheck();
  }
}
