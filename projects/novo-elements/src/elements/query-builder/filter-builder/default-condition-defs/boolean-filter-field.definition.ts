import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DefaultFilterFieldDef } from './default-filter-field.definition';

/**
 * When constructing a query using a field that is a boolean with only true/false as possible values.
 */
@Component({
  selector: 'novo-boolean-filter-field-def',
  template: `
    <ng-container novoFilterFieldTypeDef>
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="include">Equals</novo-option>
          <novo-option value="exclude">Does Not Equal</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoFilterFieldInputDef="let formGroup" [style.width.px]="100" [formGroup]="formGroup">
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
export class NovoDefaultBooleanFilterFieldDef extends DefaultFilterFieldDef {
  defaultOperator = 'include';
}
