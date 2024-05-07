import { ViewContainerRef } from '@angular/core';

export enum Conjunction {
  AND = 'and',
  OR = 'or',
  NOT = 'not',
}

export type ConditionGroup = {
  [K in Conjunction as `$${K}`]?: Condition[]
};

export enum Operator {
  after = 'after',
  before = 'before',
  between = 'between',
  exclude = 'exclude',
  excludeAny = 'excludeAny',
  include = 'include',
  includeAll = 'includeAll',
  includeAny = 'includeAny',
  isEmpty = 'isEmpty',
  isNull = 'isNull',
  within = 'within',
}

export type OperatorName = keyof typeof Operator;

export interface Condition {
  field: string;
  operator: OperatorName;
  value: any;
}

export interface Criteria {
  criteria: ConditionGroup[];
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
