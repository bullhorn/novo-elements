import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl, ControlContainer, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NOVO_FILTER_BUILDER } from '../query-builder.tokens';
import { BaseFilterFieldDef, NovoFilterFieldDef, NovoFilterFieldTypeDef } from './base-filter-field.definition';

export interface Condition {
  field: string;
  operator: string;
  value: any;
}

export interface BaseFieldDef {
  name: string;
  label?: string;
  type: string;
  dataSpecialization?: string;
  optional?: boolean;
  multiValue?: boolean;
  inputType?: string;
  options?: { value: string | number; label: string; readOnly?: boolean }[];
  optionsUrl?: string;
  optionsType?: string;
  dataType?: string;
}

export interface FieldConfig<T extends BaseFieldDef> {
  value: string;
  label: string;
  options: T[];
  search: (term: string) => T[];
  find: (name: string) => T;
}

/** Interface used to provide an outlet for rows to be inserted into. */
export interface QueryFilterOutlet {
  viewContainer: ViewContainerRef;
}

/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
@Directive({ selector: '[queryFilterInputOutlet]' })
export class QueryFilterInputOutlet implements QueryFilterOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
@Directive({ selector: '[queryFilterOperatorOutlet]' })
export class QueryFilterOperatorOutlet implements QueryFilterOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

export const defaultEditTypeFn = (field: BaseFieldDef) => {
  return (field.inputType || field.dataType || field.type).toLowerCase();
};

@Component({
  selector: 'novo-filter-builder',
  templateUrl: './filter-builder.component.html',
  styleUrls: ['./filter-builder.component.scss'],
  providers: [{ provide: NOVO_FILTER_BUILDER, useExisting: FilterBuilderComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBuilderComponent<T extends BaseFieldDef> implements OnInit, AfterContentInit, AfterContentChecked, OnDestroy {
  @ViewChild(QueryFilterOperatorOutlet, { static: true }) _operatorOutlet: QueryFilterOperatorOutlet;
  @ViewChild(QueryFilterInputOutlet, { static: true }) _inputOutlet: QueryFilterInputOutlet;
  @ContentChildren(NovoFilterFieldTypeDef, { descendants: true }) _contentFieldTypeDefs: QueryList<NovoFilterFieldTypeDef>;
  @ContentChildren(NovoFilterFieldDef, { descendants: true }) _contentFieldDefs: QueryList<NovoFilterFieldDef>;

  @Input() label: any;
  @Input() config: { fields: FieldConfig<T>[] } = { fields: [] };
  @Input() editTypeFn: (field: BaseFieldDef) => string = defaultEditTypeFn;

  public parentForm: AbstractControl;
  public fieldConfig: FieldConfig<T>;
  public searches!: Subscription;
  public results$: Promise<any[]>;
  public searchTerm: FormControl = new FormControl();

  private _lastContext: any = {};
  private _customFieldDefs = new Set<BaseFilterFieldDef>();
  private _fieldDefsByName = new Map<string, BaseFilterFieldDef>();

  /** Subject that emits when the component has been destroyed. */
  private readonly _onDestroy = new Subject<void>();

  constructor(private controlContainer: ControlContainer, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.parentForm = this.controlContainer.control;
  }

  ngAfterContentInit() {
    const { fields = [] } = this.config || {};
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

  ngAfterContentChecked() {
    this._cacheFieldDefs();
  }

  ngOnDestroy() {
    this.searches.unsubscribe();
    // Clear all outlets and Maps
    [this._operatorOutlet.viewContainer, this._inputOutlet.viewContainer, this._customFieldDefs, this._fieldDefsByName].forEach((def) => {
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
      console.warn(`No field found for field '${fieldConf.name}'. `);
      return;
    }
    const { field, operator } = this.parentForm.value;

    if (this._lastContext.field !== field) {
      this.createFieldTemplates();
    }
    if (this._lastContext.operator !== operator) {
      this.parentForm.get('value').setValue(null);
    }

    this._lastContext = { ...this.parentForm.value };
    this.cdr.markForCheck();
  }

  /** Adds a field definition that was not included as part of the content children. */
  addFieldDef(fieldDef: BaseFilterFieldDef) {
    this._customFieldDefs.add(fieldDef);
  }

  /** Removes a field definition that was not included as part of the content children. */
  removeFieldDef(fieldDef: BaseFilterFieldDef) {
    this._customFieldDefs.delete(fieldDef);
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

  private findDefinitionForField(field) {
    if (!field) return;
    const editType = this.editTypeFn(field);
    // Don't look at dataSpecialization it is no good, this misses currency, and percent
    const { name, inputType, dataType, type } = field;
    // Check Fields by priority for match Field Definition
    const key = [name, editType, inputType, dataType, type, 'default'].find((it) => this._fieldDefsByName.has(it));
    console.log('looking for input', name, inputType, editType, dataType, type, key, this._fieldDefsByName);
    return this._fieldDefsByName.get(key);
  }

  private createFieldTemplates() {
    const definition = this.findDefinitionForField(this.getField());
    console.log('found def', definition);
    this.parentForm.get('operator').setValue(definition.defaultOperator);
    this.parentForm.get('value').setValue(null);

    this.createFieldOperators(definition);
    this.createFieldInput(definition);
  }

  private createFieldOperators(definition: BaseFilterFieldDef) {
    this._operatorOutlet.viewContainer.clear();
    if (definition) {
      const context = { $implicit: this.parentForm, fieldMeta: this.getField() };
      this._operatorOutlet.viewContainer.createEmbeddedView(definition.fieldOperators.template, context);
    }
    this.cdr.markForCheck();
  }

  private createFieldInput(definition: BaseFilterFieldDef) {
    this._inputOutlet.viewContainer.clear();
    if (definition) {
      const context = { $implicit: this.parentForm, fieldMeta: this.getField() };
      this._inputOutlet.viewContainer.createEmbeddedView(definition.fieldInput.template, context);
    }
    this.cdr.markForCheck();
  }
}
