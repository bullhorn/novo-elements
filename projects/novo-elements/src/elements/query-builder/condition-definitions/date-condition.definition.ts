import { FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';

/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
@Component({
  selector: 'novo-date-condition-def',
  template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">Before</novo-option>
          <novo-option value="after">After</novo-option>
          <novo-option value="between">Between</novo-option>
          <novo-option value="within">Within</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup">
        <ng-container [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
          <novo-field *novoSwitchCases="['before', 'after']">
            <input novoInput dateFormat="iso8601" [picker]="datepicker" formControlName="value" />
            <novo-picker-toggle novoSuffix icon="calendar">
              <novo-date-picker #datepicker></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['between']">
            <input novoInput dateRangeFormat="iso8601" [picker]="daterangepicker" formControlName="value" />
            <novo-picker-toggle novoSuffix icon="calendar">
              <novo-date-picker #daterangepicker mode="range" numberOfMonths="2"></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['within']">
            <novo-select placeholder="Select Date Range..." formControlName="value">
              <novo-option value="7">Next Week</novo-option>
              <novo-option value="-7">Last Week</novo-option>
              <novo-option value="-30">Last 30 Days</novo-option>
              <novo-option value="-90">Last 90 Days</novo-option>
            </novo-select>
          </novo-field>
        </ng-container>
      </ng-container>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultDateConditionDef extends AbstractConditionFieldDef {
  defaultOperator = 'within';

  onOperatorSelect(formGroup: FormGroup): void {
      formGroup.get('value').setValue(null);
  }
}
