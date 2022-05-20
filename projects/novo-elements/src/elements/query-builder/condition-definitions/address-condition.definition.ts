import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';

/**
 * Handle selection of field values when a list of options is provided.
 */
@Component({
  selector: 'novo-address-condition-def',
  template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="includeAny">Include Any</novo-option>
          <novo-option value="excludeAny">Exclude</novo-option>
          <novo-option value="radius">Radius</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select formControlName="value" placeholder="Select..." [multiple]="true"> </novo-select>
      </novo-field>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef {
  defaultOperator = 'includeAny';
}
