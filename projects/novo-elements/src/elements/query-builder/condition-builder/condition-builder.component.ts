import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  SkipSelf,
  ViewChild,
  ViewContainerRef,
  computed,
  input
} from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BaseConditionFieldDef } from '../query-builder.directives';
import { QueryBuilderConfig, QueryBuilderService } from '../query-builder.service';
import { NOVO_CONDITION_BUILDER } from '../query-builder.tokens';
import { AddressCriteriaConfig, BaseFieldDef, FieldConfig, QueryFilterOutlet } from '../query-builder.types';

/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
@Directive({
    selector: '[conditionInputOutlet]',
    standalone: false
})
export class ConditionInputOutlet implements QueryFilterOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
@Directive({
    selector: '[conditionOperatorOutlet]',
    standalone: false
})
export class ConditionOperatorOutlet implements QueryFilterOutlet {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}

@Component({
    selector: 'novo-condition-builder',
    templateUrl: './condition-builder.component.html',
    styleUrls: ['./condition-builder.component.scss'],
    providers: [{ provide: NOVO_CONDITION_BUILDER, useExisting: ConditionBuilderComponent },
        {
            provide: QueryBuilderService,
            deps: [NovoLabelService, [new SkipSelf(), new Optional(), QueryBuilderService]],
            useFactory: (labelService: NovoLabelService, queryBuilderService?: QueryBuilderService) => {
                if (!queryBuilderService) {
                    queryBuilderService = new QueryBuilderService(labelService);
                }
                return queryBuilderService;
            }
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ConditionBuilderComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy {
  @ViewChild(ConditionOperatorOutlet, { static: true }) _operatorOutlet: ConditionOperatorOutlet;
  @ViewChild(ConditionInputOutlet, { static: true }) _inputOutlet: ConditionInputOutlet;

  @Input() label: any;
  @Input() scope: string;
  @Input() andIndex: number;
  @Input() groupIndex: number;
  @Input() addressConfig: AddressCriteriaConfig;
  hideOperator = input(true);
  conditionType = input();

  // This component can either be directly hosted as a host to a condition, or it can be part of a condition group within a criteria builder.
  // In the former case, config will come from inputs, and we will instantiate our own QueryBuilderService. In the latter, it comes from
  // the QueryBuilderService.
  inputConfig = input<QueryBuilderConfig>(null, { alias: 'config'});
  inputEditTypeFn = input<(field: BaseFieldDef) => string>(null, { alias: 'editTypeFn'});
  private config = computed<QueryBuilderConfig>(() => {
    if (this.isConditionHost) {
      this.queryBuilderService.config = this.inputConfig();
    }
    return this.queryBuilderService.config;
  });
  private editTypeFn = computed<(field: BaseFieldDef) => string>(() => {
    if (this.isConditionHost) {
      this.queryBuilderService.editTypeFn = this.inputEditTypeFn();
    }
    return this.queryBuilderService.editTypeFn;
  });

  public parentForm: FormGroup;
  public fieldConfig: FieldConfig<BaseFieldDef>;
  public searches!: Subscription;
  public results$: Promise<any[]>;
  public searchTerm: FormControl = new FormControl();
  public fieldDisplayWith;
  public displayIcon: string;

  public staticFieldSelection = computed(() => this.config().staticFieldSelection);
  private _lastContext: any = {};
  @HostBinding('class.condition-host')
  public isConditionHost = false;

  public gridColumns = computed(() => {
    if (this.staticFieldSelection()) {
      return '13rem 1fr';
    } else {
      const firstColumnWidth = this.hideOperator() ? '20rem' : '16rem';
      return `${firstColumnWidth} 13rem 1fr`;
    }
  });

  /** Subject that emits when the component has been destroyed. */
  private readonly _onDestroy = new Subject<void>();

  constructor(
    public labels: NovoLabelService,
    private cdr: ChangeDetectorRef,
    private queryBuilderService: QueryBuilderService,
    private controlContainer: ControlContainer,
  ) {
    if (!queryBuilderService.componentHost) {
      queryBuilderService.componentHost = this;
      this.isConditionHost = true;
      this.groupIndex = 0;
      this.andIndex = 0;
    }
  }

  ngOnInit() {
    this.parentForm = this.controlContainer.control as FormGroup;
    this.parentForm.controls.field.valueChanges.subscribe((value) => {
      Promise.resolve().then(() => this.updateFieldSelection());
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inputConfig?.previousValue?.staticFieldSelection &&
      changes.inputConfig.previousValue.staticFieldSelection !== changes.inputConfig.currentValue.staticFieldSelection) {
        this.parentForm.controls.field.setValue(changes.inputConfig.currentValue.staticFieldSelection);
    }
  }

  ngAfterContentInit() {
    const allFields = this.config()?.fields || [];
    const scopedFields = this.scope ? allFields.find((field) => field.value === this.scope) : allFields[0];
    allFields.length && this.changeFieldOptions(scopedFields);
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
      Promise.resolve().then(() => this.updateFieldSelection());
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

  /**
   * Resets the input and operator view containers, regenerates the field templates,
   * and marks the component for change detection.
   *
   * Use this method after updating form controls to reinitialize the input and
   * operator fields so that the view reflects the latest form control changes.
   *
   * @returns void
   */
  resetInputAndOperator(): void {
    this._inputOutlet.viewContainer.clear();
    this._operatorOutlet.viewContainer.clear();
    this.createFieldTemplates();
    this.cdr.markForCheck();
  }

  getField() {
    const field = this.parentForm?.value?.field;
    if (!field) return null;
    return this.fieldConfig.find(field);
  }

  getDefaultField() {
    const fields = this.fieldConfig.options;
    if (fields?.length) {
      return fields[0].name;
    }
    return null;
  }

  updateFieldSelection() {
    const fieldConf = this.getField();
    if (!fieldConf) {
      this.parentForm.get('field').setValue(this.getDefaultField());
      return;
    } else {
      this.fieldDisplayWith = () => fieldConf.label || fieldConf.name;
      this.displayIcon = fieldConf.icon || null;
    }
    const { field } = this.parentForm.value;

    if (this._lastContext.field !== field) {
      if (this._lastContext.field) {
        // only clearing operator/value if field was previously defined so we can preload values onto the form
        this.parentForm.get('value').setValue(null);
        this.parentForm.get('operator').setValue(null);
      }
      this.createFieldTemplates();
    }
    setTimeout(() => this.updateConditionType());

    this._lastContext = { ...this.parentForm.value };
    this.cdr.markForCheck();
  }

  updateConditionType() {
    this.parentForm.get('conditionType')?.setValue(this.conditionType());
  }

  private findDefinitionForField(field) {
    if (!field) return;
    const editType = this.editTypeFn()(field);
    // Don't look at dataSpecialization it is no good, this misses currency, and percent
    const { name } = field;
    const fieldDefsByName = this.queryBuilderService.getFieldDefsByName();
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
