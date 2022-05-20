import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DefaultFilterFieldDef } from './default-filter-field.definition';

/**
 * Handle selection of field values when a list of options is provided.
 */
@Component({
  selector: 'novo-picker-filter-field-def',
  template: `
    <ng-container novoFilterFieldTypeDef>
      <novo-field *novoFilterFieldOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select placeholder="Operator..." formControlName="operator">
          <novo-option value="includeAny">Include Any</novo-option>
          <novo-option value="includeAll">Include All</novo-option>
          <novo-option value="excludeAny">Exclude</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoFilterFieldInputDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select formControlName="value" placeholder="Select..." [multiple]="true">
          <!-- WHat about optionUrl/optionType -->
          <novo-option *ngFor="let option of meta?.options" [value]="option.value">
            {{ option.label }}
          </novo-option>
        </novo-select>
      </novo-field>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultPickerFilterFieldDef extends DefaultFilterFieldDef {
  defaultOperator = 'includeAny';
}
