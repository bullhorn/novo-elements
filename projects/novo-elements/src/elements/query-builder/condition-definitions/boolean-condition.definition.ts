import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';

/**
 * When constructing a query using a field that is a boolean with only true/false as possible values.
 */
@Component({
  selector: 'novo-boolean-condition-def',
  template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="include">Equals</novo-option>
          <novo-option value="exclude">Does Not Equal</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [style.width.px]="100" [formGroup]="formGroup">
        <novo-select placeholder="Value..." formControlName="value">
          <novo-option [value]="true">True</novo-option>
          <novo-option [value]="false">False</novo-option>
        </novo-select>
      </novo-field>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultBooleanConditionDef extends AbstractConditionFieldDef {
  defaultOperator = 'include';
}
