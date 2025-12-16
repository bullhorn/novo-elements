import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { BaseFieldDef, Operator } from '../query-builder.types';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { NovoSelectElement } from 'novo-elements/elements/select';

type FieldOption = BaseFieldDef['options'][number];
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
            @for (option of meta?.options; track optionTracker) {
              <novo-option [hidden]="hideOption(option, filterInput?.value)" [value]="option.value" [attr.data-automation-value]="option.label">
                {{ option.label}}
              </novo-option>
            }
            @for (option of customOptions(meta?.options, select); track optionTracker) {
              <novo-option [hidden]="hideOption(option, filterInput?.value)" [value]="option.value" [attr.data-automation-value]="option.label">
                {{ option.label}}
              </novo-option>
            }
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
    standalone: false
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

  optionTracker(option: FieldOption) {
    return `${option.value}~~~${option.label}`;
  }

  hideOption(option: FieldOption, filterValue: string): boolean {
    return filterValue && (option.value.toString().indexOf(filterValue) === -1 &&
        !option.label.toLowerCase().includes(filterValue.toLowerCase()));
  }

  customOptions(options: FieldOption[], select: NovoSelectElement): FieldOption[] {
    return select.value?.filter((selectedOption: string) => {
      return (!options || !(options.find(option => option.value === selectedOption)));
    }).map(value => ({
      value,
      label: value
    }));
  }

  applyCustomItem() {
    // Method to handle adding a new item when "Add Item" is selected
    // This is a placeholder for potential custom logic to add new items
    // Could be implemented to open a modal, trigger a service call, etc.
    console.warn('Custom item addition not implemented');

  }
}
