import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';

/**
 * Any condition that has a type of ID usually only is queried by ID.
 */
@Component({
  selector: 'novo-id-condition-def',
  template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="equalTo">Equal To</novo-option>
          <ng-content></ng-content>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [style.width.px]="100" [formGroup]="formGroup">
        <input novoInput type="number" formControlName="value" />
      </novo-field>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultIdConditionDef extends AbstractConditionFieldDef {
  defaultOperator = 'equalTo';
}