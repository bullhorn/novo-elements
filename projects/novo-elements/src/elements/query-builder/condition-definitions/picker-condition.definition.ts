import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { Operator } from '../query-builder.types';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { NovoSelectSearchComponent } from 'novo-elements/elements/select-search';

/**
 * Handle selection of field values when a list of options is provided.
 */
@Component({
  selector: 'novo-picker-condition-def',
  template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll" *ngIf="!meta?.removeIncludeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-select #select extupdatefix formControlName="value" [placeholder]="labels.select" [multiple]="true">
            <novo-option [disabled]="!meta?.allowCustomFilterValues" [hidden]="!meta?.allowCustomFilterValues">
              <novo-select-search #filterInput allowDeselectDuringFilter></novo-select-search>
            </novo-option>
            <!-- WHat about optionUrl/optionType -->
            <novo-option *ngFor="let option of filteredOptions(meta?.options, select, filterInput?.value); trackBy: optionTracker" [value]="option.value" [attr.data-automation-value]="option.label">
              {{ option.label }}
            </novo-option>
            <novo-option class="add-option" *ngIf="showAddOption(meta, select, filterInput?.value)" [value]="filterInput?.value" [allowSelection]="false">
              {{filterInput.value}}
              <novo-icon class="add-icon" novoSuffix>add-thin</novo-icon>
            </novo-option>
          </novo-select>
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultPickerConditionDef extends AbstractConditionFieldDef {
  defaultOperator = Operator.includeAny;

  constructor(labelService: NovoLabelService) {
    super(labelService);
    this.defineOperatorEditGroup(Operator.includeAny, Operator.includeAll, Operator.excludeAny);
  }

  showAddOption(meta, select, filterValue: string): boolean {
    if (!(meta?.allowCustomFilterValues)) {
      return false;
    }
    filterValue = filterValue?.trim().toLowerCase();
    if (!filterValue) {
      return false;
    }
    if (select.value && select.value.find(selectValue => selectValue.trim().toLowerCase() === filterValue)) {
      return false;
    }
    return meta?.options && meta.options.find(opt => {
      const optionLabel = opt.label.trim().toLowerCase();
      return optionLabel === filterValue;
    }) == null;
  }

  optionTracker(option) {
    return `${option.value}~~~${option.label}`;
  }

  filteredOptions(options, select, filterValue: string) {
    if (!options) {
      return [];
    }
    const baseOptionSet = new Set();
    let returnOptions = [];
    for (let opt of options) {
    //const returnOptions = filterValue ? options.filter(opt => {
      baseOptionSet.add(opt.value);
      if (!filterValue || (opt.value.indexOf(filterValue) !== -1 ||
        opt.label.toLowerCase().includes(filterValue.toLowerCase()))) {
          returnOptions.push(opt);
      }
    }
    const customOptions = select.value?.filter(value => !baseOptionSet.has(value)).map(value => ({
      value,
      label: value
    }));
    if (customOptions) {
      returnOptions.push(...customOptions);
    }
    return returnOptions;
  }

  applyCustomItem() {
    // Method to handle adding a new item when "Add Item" is selected
    // This is a placeholder for potential custom logic to add new items
    // Could be implemented to open a modal, trigger a service call, etc.
    console.warn('Custom item addition not implemented');

  }
}
