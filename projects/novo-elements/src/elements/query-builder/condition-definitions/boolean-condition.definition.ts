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
        <novo-select [placeholder]="labels.operator" formControlName="operator">
          <novo-option value="include">{{ labels.equals }}</novo-option>
          <novo-option value="exclude">{{ labels.doesNotEqual }}</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [style.width.px]="100" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.value" formControlName="value">
          <novo-option [value]="true">{{ labels.true }}</novo-option>
          <novo-option [value]="false">{{ labels.false }}</novo-option>
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
