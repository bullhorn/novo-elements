import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { Operator } from '../query-builder.types';
import { NovoLabelService } from 'novo-elements/services';

/**
 * When constructing a query using a field that is a boolean with only true/false as possible values.
 */
@Component({
    selector: 'novo-boolean-condition-def',
    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup; fieldMeta as meta" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="include">{{ labels.equals }}</novo-option>
          <novo-option value="exclude">{{ labels.doesNotEqual }}</novo-option>
          <novo-option value="isNull" *ngIf="!meta?.removeIsEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup; fieldMeta as meta" [style.width.px]="125" [formGroup]="formGroup">
        @let isNull = formGroup.value.operator === 'isNull';
        @let useYesNo = isNull || meta.dataType === 'Boolean';
        @let customOptions = !isNull && meta.options && typeof meta.options[0].value === 'boolean';
        @if (customOptions) {
          <novo-radio-group formControlName="value">
            <novo-radio *ngFor="let opt of meta.options; trackBy: optIdentify" [value]="opt.value">{{ opt.label }}</novo-radio>
          </novo-radio-group>
        } @else {
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ useYesNo ? labels.yes : labels.true }}</novo-radio>
            <novo-radio [value]="false">{{ useYesNo ? labels.no : labels.false }}</novo-radio>
          </novo-radio-group>
        }
      </novo-field>
    </ng-container>
  `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false,
})
export class NovoDefaultBooleanConditionDef extends AbstractConditionFieldDef {
  defaultOperator = Operator.include;

  constructor(labelService: NovoLabelService) {
    super(labelService);
    this.defineOperatorEditGroup(Operator.include, Operator.exclude, Operator.isNull);
  }

  optIdentify(option) {
    return option.label;
  }
}
