import { ChangeDetectionStrategy, Component, Optional, ViewEncapsulation } from '@angular/core';
import { FilterBuilderComponent } from '../filter-builder.component';
import { DefaultFilterFieldDef } from './default-filter-field.definition';

/**
 * Handle selection of field values when a list of options is provided.
 */
@Component({
  selector: 'novo-address-filter-field-def',
  template: `
    <ng-container novoFilterFieldTypeDef>
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="includeAny">Include Any</novo-option>
          <novo-option value="excludeAny">Exclude</novo-option>
          <novo-option value="radius">Radius</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoFilterFieldInputDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select formControlName="value" placeholder="Select..." [multiple]="true">
        </novo-select>
      </novo-field>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultAddressFilterFieldDef extends DefaultFilterFieldDef {
  defaultOperator = 'includeAny';

  constructor(@Optional() _fb: FilterBuilderComponent<any>) {
    super(_fb);
  }
}
