import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DefaultFilterFieldDef } from './default-filter-field.definition';

/**
 * When constructing a query using a field that is an Int, Double, Number ...etc.
 * TODO: Do we implment currency formation here potentially>.?
 */
@Component({
  selector: 'novo-number-filter-field-def',
  template: `
    <ng-container novoFilterFieldTypeDef>
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="greaterThan">Greater Than</novo-option>
          <novo-option value="lessThan">Less Than</novo-option>
          <novo-option value="equalTo">Equal To</novo-option>
          <!-- <novo-option value="equalTo">Between</novo-option> -->
        </novo-select>
      </novo-field>
      <novo-field *novoFilterFieldInputDef="let formGroup" [style.width.px]="100" [formGroup]="formGroup">
        <input novoInput type="number" formControlName="value" />
      </novo-field>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultNumberFilterFieldDef extends DefaultFilterFieldDef {
  defaultOperator = 'equalTo';
}
