import { ViewContainerRef } from '@angular/core';

export enum Conjunction {
  AND = 'and',
  OR = 'or',
  NOT = 'not',
}

export type ConditionGroup = {
  [K in Conjunction as `$${K}`]?: Condition[];
};

export type NestedConditionGroup = {
  [K in Conjunction as `$${K}`]?: ConditionOrConditionGroup[];
};

export type ConditionOrConditionGroup = Condition | NestedConditionGroup;

export enum Operator {
  after = 'after',
  before = 'before',
  between = 'between',
  equalTo = 'equalTo',
  exclude = 'exclude',
  excludeAny = 'excludeAny',
  greaterThan = 'greaterThan',
  include = 'include',
  includeAll = 'includeAll',
  includeAny = 'includeAny',
  isEmpty = 'isEmpty',
  isNull = 'isNull',
  lessThan = 'lessThan',
  within = 'within',
}

export type OperatorName = keyof typeof Operator;

export interface Condition {
  field: string;
  operator: OperatorName | string;
  value: any;
}

export interface Criteria {
  criteria: ConditionGroup[];
}

export interface NestedCriteria {
  criteria: NestedConditionGroup[];
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
