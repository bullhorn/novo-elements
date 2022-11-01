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
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="include">{{ labels.equals }}</novo-option>
          <novo-option value="exclude">{{ labels.doesNotEqual }}</novo-option>
          <novo-option value="isEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [style.width.px]="125" [formGroup]="formGroup">
        <novo-radio-group formControlName="value">
          <novo-radio [value]="true">{{ formGroup.value.operator === 'isEmpty' ? labels.yes : labels.true }}</novo-radio>
          <novo-radio [value]="false">{{ formGroup.value.operator === 'isEmpty' ? labels.no : labels.false }}</novo-radio>
        </novo-radio-group>
      </novo-field>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultBooleanConditionDef extends AbstractConditionFieldDef {
  defaultOperator = 'include';
}
