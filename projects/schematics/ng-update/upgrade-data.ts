import { UpgradeData, VersionChanges } from '@angular/cdk/schematics';
import {
  attributeSelectors,
  classNames,
  constructorChecks,
  cssSelectors,
  elementSelectors,
  inputNames,
  methodCallChecks,
  outputNames,
  propertyNames,
  ScssVariableData,
  scssVariables,
  symbolRemoval,
} from './data';

export interface NovoUpgradeData extends UpgradeData {
  scssVariables: VersionChanges<ScssVariableData>;
}
/** Upgrade data that will be used for the Novo Elements ng-update schematic. */
export const elementsUpgradeData: NovoUpgradeData = {
  attributeSelectors,
  classNames,
  constructorChecks,
  cssSelectors,
  elementSelectors,
  inputNames,
  methodCallChecks,
  outputNames,
  propertyNames,
  scssVariables,
  symbolRemoval,
};
