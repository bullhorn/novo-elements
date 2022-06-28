import { ViewContainerRef } from '@angular/core';

export enum Conjunction {
  AND = 'and',
  OR = 'or',
  NOT = 'not',
}
export type ConditionGroup = {
  [key: string]: Condition[];
};
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
