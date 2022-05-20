import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DefaultFilterFieldDef } from './default-filter-field.definition';

/**
 * Any condition that has a type of ID usually only is queried by ID.
 */
@Component({
  selector: 'novo-id-filter-field-def',
  template: `
    <ng-container novoFilterFieldTypeDef>
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="equalTo">Equal To</novo-option>
          <ng-content></ng-content>
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
export class NovoDefaultIdFilterFieldDef extends DefaultFilterFieldDef {
  defaultOperator = 'equalTo';
}
