import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl, ControlContainer, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BaseConditionFieldDef } from '../query-builder.directives';
import { QueryBuilderService } from '../query-builder.service';
import { NOVO_CONDITION_BUILDER } from '../query-builder.tokens';
import { BaseFieldDef, FieldConfig, QueryFilterOutlet } from '../query-builder.types';
import { NovoLabelService } from '../../../services';

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

@Component({
  selector: 'novo-condition-builder',
  templateUrl: './condition-builder.component.html',
  styleUrls: ['./condition-builder.component.scss'],
  providers: [{ provide: NOVO_CONDITION_BUILDER, useExisting: ConditionBuilderComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionBuilderComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @ViewChild(ConditionOperatorOutlet, { static: true }) _operatorOutlet: ConditionOperatorOutlet;
  @ViewChild(ConditionInputOutlet, { static: true }) _inputOutlet: ConditionInputOutlet;

  @Input() label: any;
  @Input() isFirst: boolean;
  @Input() andIndex: number;
  @Input() groupIndex: number;

  public parentForm: AbstractControl;
  public fieldConfig: FieldConfig<BaseFieldDef>;
  public searches!: Subscription;
  public results$: Promise<any[]>;
  public searchTerm: FormControl = new FormControl();
  public fieldDisplayWith;

  private _lastContext: any = {};

  /** Subject that emits when the component has been destroyed. */
  private readonly _onDestroy = new Subject<void>();

  constructor(
    public labels: NovoLabelService,
    private cdr: ChangeDetectorRef,
    private qbs: QueryBuilderService,
    private controlContainer: ControlContainer,
  ) {}

  ngOnInit() {
    this.parentForm = this.controlContainer.control;
    this.parentForm.valueChanges.subscribe((value) => {
      Promise.resolve().then(() => this.onFieldSelect());
    });
  }

  ngAfterContentInit() {
    const { fields = [] } = this.qbs.config || {};
    fields.length && this.changeFieldOptions(fields[0]);
    this.searches = this.searchTerm.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
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
      Promise.resolve().then(() => this.onFieldSelect());
    }
  }

  ngOnDestroy() {
    this.searches.unsubscribe();
    // Clear all outlets and Maps
    [this._operatorOutlet.viewContainer, this._inputOutlet.viewContainer].forEach((def) => {
      def.clear();
    });
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Updates the Conditions "Field" Options to Change base on new Scope
   * @param fieldConfig
   */
  changeFieldOptions(fieldConfig: FieldConfig<BaseFieldDef>) {
    this.fieldConfig = fieldConfig;
    this.searchTerm.setValue('');
    this.results$ = Promise.resolve(this.fieldConfig.options);
  }

  getField() {
    const { field } = this.parentForm?.value;
    if (!field) return null;
    return this.fieldConfig.find(field);
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
      if (!!this._lastContext.field) {
        // only clearing operator/value is field was previously defined so we can preload values onto the form
        this.parentForm.get('value').setValue(null);
        this.parentForm.get('operator').setValue(null);
      }
      this.createFieldTemplates();
    }

    this._lastContext = { ...this.parentForm.value };
    this.cdr.markForCheck();
  }

  private findDefinitionForField(field) {
    if (!field) return;
    const editType = this.qbs.editTypeFn(field);
    // Don't look at dataSpecialization it is no good, this misses currency, and percent
    const { name, inputType, dataType, type } = field;
    const fieldDefsByName = this.qbs.getFieldDefsByName();
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
      const context = { $implicit: this.parentForm, fieldMeta: this.getField(), viewIndex: this.groupIndex.toString() + this.andIndex.toString() };
      this._inputOutlet.viewContainer.createEmbeddedView(definition.fieldInput.template, context);
    }
    this.cdr.markForCheck();
  }
}
