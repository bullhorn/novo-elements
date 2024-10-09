import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { Operator } from '../query-builder.types';
import { AbstractConditionFieldDef } from './abstract-condition.definition';

/**
 * When constructing a query using a field that is an Int, Double, Number ...etc.
 * TODO: Do we implment currency formation here potentially>.?
 */
@Component({
  selector: 'novo-number-condition-def',
  template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="greaterThan">{{ labels.greaterThan }}</novo-option>
          <novo-option value="lessThan">{{ labels.lessThan }}</novo-option>
          <novo-option value="equalTo">{{ labels.equalTo }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['greaterThan', 'lessThan', 'equalTo']">
          <input novoInput type="number" formControlName="value"/>
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
        <novo-flex *novoSwitchCases="['between']" justify='space-between' align='end'>
          <novo-field>
            <input novoInput type='number' [value]='min()' (change)='onChangeMin(formGroup, $any($event).target.value)'/>
          </novo-field>
          <novo-field>
            <input novoInput type='number' [value]='max()' (change)='onChangeMax(formGroup, $any($event).target.value)'/>
          </novo-field>
        </novo-flex>
      </ng-container>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultNumberConditionDef extends AbstractConditionFieldDef {
  defaultOperator = Operator.equalTo;

  min: WritableSignal<number> = signal(0);
  max: WritableSignal<number> = signal(0);

  constructor(labelService: NovoLabelService) {
    super(labelService);
    this.defineOperatorEditGroup(Operator.greaterThan, Operator.lessThan, Operator.equalTo);
  }

  onChangeMin(formGroup: AbstractControl, value: number) {
    this.min.set(value);
    // We must dirty the form explicitly to show up as a user modification when it was done programmatically
    formGroup.get('value').setValue({ min: this.min, max: this.max });
    formGroup.markAsDirty();
  }

  onChangeMax(formGroup: AbstractControl, value: number) {
    this.max.set(value);
    // We must dirty the form explicitly to show up as a user modification when it was done programmatically
    formGroup.get('value').setValue({ min: this.min, max: this.max });
    formGroup.markAsDirty();
  }
}
