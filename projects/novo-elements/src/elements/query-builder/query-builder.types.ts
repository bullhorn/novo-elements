import { ViewContainerRef } from '@angular/core';

export enum Conjunction {
  AND = 'and',
  OR = 'or',
  NOT = 'not',
}

export type ConditionType = '$and' | '$or' | '$not';

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
  beginsWith = 'beginsWith',
  between = 'between',
  equalTo = 'equalTo',
  exclude = 'exclude',
  excludeAny = 'excludeAny',
  greaterThan = 'greaterThan',
  include = 'include',
  includeAll = 'includeAll',
  includeAny = 'includeAny',
  insideRadius = 'insideRadius',
  isEmpty = 'isEmpty',
  isNull = 'isNull',
  lessThan = 'lessThan',
  outsideRadius = 'outsideRadius',
  radius = 'radius',
  within = 'within',
}

export type OperatorName = keyof typeof Operator;

export interface Condition {
  conditionType?: ConditionType;
  field: string;
  operator: OperatorName | string;
  scope?: string;
  value: any;
  supportingValue?: any;
  entity?: string;
  warnOnDelete?: boolean;
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
  icon?: string;
}

export interface FieldConfig<T extends BaseFieldDef> {
  value: string;
  label: string;
  options: T[];
  search: (term: string) => T[];
  find: (name: string) => T;
}

export interface AddressData {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: AddressGeometry;
  name?: string;
  place_id: string;
  radius?: AddressRadius;
  postal_codes?: string[];
  types?: string[];
}

export interface AddressRadius {
  value: number;
  units: AddressRadiusUnitsName;
  operator?: string;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface AddressGeometry {
  location: AddressGeometryLocation;
  viewport: AddressGeometryViewport;
}

export interface AddressGeometryLocation {
  lat: number;
  lng: number;
}

export interface AddressGeometryViewport {
  north: number;
  south: number;
  east: number;
  west: number;
}

export enum RadiusUnits {
  miles = 'miles',
  km = 'km',
}

export type AddressRadiusUnitsName = keyof typeof RadiusUnits;

/** All options that can be used to override the defaults for the address criteria */
export type AddressCriteriaConfig = {
  radiusEnabled?: boolean;
  radiusUnits?: AddressRadiusUnitsName;
}

/** All options that can be used to configure date pickers */
export type DateCriteriaConfig = {
  weekStart?: Day;
}

/** Interface used to provide an outlet for rows to be inserted into. */
export interface QueryFilterOutlet {
  viewContainer: ViewContainerRef;
}
