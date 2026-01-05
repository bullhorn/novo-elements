import { computed, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { BaseConditionFieldDef } from './query-builder.directives';
import { BaseFieldDef, Conjunction, FieldConfig } from './query-builder.types';

export const defaultEditTypeFn = (field: BaseFieldDef) => {
  return field.inputType || field.dataType || field.type;
};

export interface QueryBuilderConfig {
  fields: FieldConfig<BaseFieldDef>[];
  staticFieldSelection?: string;
}

@Injectable()
export class QueryBuilderService {
  private _customFieldDefs = new Set<BaseConditionFieldDef>();
  private _fieldDefsByName = new Map<string, BaseConditionFieldDef>();
  public scopes = signal([]);
  public hasMultipleScopes = computed(() => this.scopes()?.length > 1);
  /**
   * Will dispatch when properties changes, subscribe to this if component should
   * re-render when props are updated
   */
  readonly stateChanges: Subject<void> = new Subject<void>();

  /**
   * Function to determine operator and input templates for a field.  Value passed
   * through the criteria builder Input.
   */
  public get editTypeFn(): (field: BaseFieldDef) => string {
    return this._editTypeFn;
  }
  public set editTypeFn(value: (field: BaseFieldDef) => string) {
    this._editTypeFn = value ?? defaultEditTypeFn;
    this.stateChanges.next();
  }
  private _editTypeFn: (field: BaseFieldDef) => string = defaultEditTypeFn;

  /**
   * The field configuration to control which types of fields are available to select
   * within the Condition Builder.
   */
  public get config(): QueryBuilderConfig {
    return this._config;
  }
  public set config(value: QueryBuilderConfig) {
    this._config = value;
    this.stateChanges.next();
  }
  private _config: QueryBuilderConfig = {
    fields: [],
    staticFieldSelection: null,
  };

  /**
   * The configuration to control which types of conjuntions can be used in the query builder.
   * Value passed through the criteria builder Input
   * eg. and, or, not
   */
  public get allowedGroupings(): Conjunction[] {
    return this._allowedGroupings;
  }
  public set allowedGroupings(value: Conjunction[]) {
    this._allowedGroupings = value;
    this.stateChanges.next();
  }
  private _allowedGroupings: Conjunction[];

  public componentHost: any;

  constructor(private labels: NovoLabelService) {}

  /** Adds a field definition that was not included as part of the content children. */
  registerFieldDef(fieldDef: BaseConditionFieldDef) {
    this._customFieldDefs.add(fieldDef);
    this._fieldDefsByName.set(fieldDef.name, fieldDef);
  }

  /** Removes a field definition that was not included as part of the content children. */
  unregisterFieldDef(fieldDef: BaseConditionFieldDef) {
    this._customFieldDefs.delete(fieldDef);
    this._fieldDefsByName.delete(fieldDef.name);
  }

  getFieldDefsByName() {
    return this._fieldDefsByName;
  }

  getConjunctionLabel(conjunction: string) {
    switch (conjunction.replace('$', '').toLowerCase()) {
      case Conjunction.OR:
        return this.labels.or;
      case Conjunction.NOT:
        return this.labels.not;
      case Conjunction.AND:
      default:
        return this.labels.and;
    }
  }
}
