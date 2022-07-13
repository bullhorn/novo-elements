import { ChangeDetectionStrategy, Component, ContentChild, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NovoPickerToggleElement } from './../../field/toggle/picker-toggle.component';
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
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">{{ labels.before }}</novo-option>
          <novo-option value="after">{{ labels.after }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
          <novo-option value="within">{{ labels.within }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex">
        <ng-container [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
          <novo-field *novoSwitchCases="['before', 'after']">
            <input novoInput dateFormat="iso8601" [picker]="datepicker" formControlName="value" />
            <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
              <novo-date-picker (onSelect)="closePanel($event, viewIndex)" #datepicker></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['between']">
            <input novoInput dateRangeFormat="date" [picker]="daterangepicker" formControlName="value" />
            <novo-picker-toggle [for]="daterangepicker" triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
              <novo-date-picker #daterangepicker (onSelect)="closePanel($event, viewIndex)" mode="range" numberOfMonths="2"></novo-date-picker>
            </novo-picker-toggle>
          </novo-field>
          <novo-field *novoSwitchCases="['within']">
            <novo-select [placeholder]="labels.selectDateRange" formControlName="value">
              <novo-option value="7">{{ labels.next7Days }}</novo-option>
              <novo-option value="-7">{{ labels.past7Days }}</novo-option>
              <novo-option value="-30">{{ labels.past30Days }}</novo-option>
              <novo-option value="-90">{{ labels.past90Days }}</novo-option>
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
  @ViewChildren(NovoPickerToggleElement)
  overlayChildren: QueryList<NovoPickerToggleElement>;

  defaultOperator = 'within';

  onOperatorSelect(formGroup: FormGroup): void {
    formGroup.get('value').setValue(null);
  }

  closePanel(event, viewIndex): void {
    const overlay = this.overlayChildren.find(item => item.overlayId === viewIndex);
    overlay.closePanel(event);
  }
}
