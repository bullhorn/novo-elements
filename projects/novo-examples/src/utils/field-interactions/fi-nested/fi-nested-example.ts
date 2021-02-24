import { Component } from '@angular/core';
// Vendor
import { CheckboxControl, FieldInteractionApi, FormUtils, NovoControlGroupAddConfig, NovoFormGroup, TextBoxControl } from 'novo-elements';

/**
 * @title Fi Nested Form Example
 */
@Component({
  selector: 'fi-nested-example',
  templateUrl: 'fi-nested-example.html',
  styleUrls: ['fi-nested-example.css'],
})
export class FiNestedExample {
  public formGroup: NovoFormGroup;
  public controls: any[];
  public initialValue = [
    { selected: true, value: .1, label: `Value + 10%` },
    { selected: false, value: .2, label: `Value + 20%` },
    { selected: false, value: .3, label: `Value + 30%` },
  ];
  public simpleAddConfig: NovoControlGroupAddConfig = {
    label: 'Add',
  };
  public emptyMessage: string = 'There are no items...';

  constructor(private formUtils: FormUtils) {
    const selectedFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - selectedFunction'); // tslint:disable-line

      // If my row is selected, deselect other rows without causing cascading changes
      if (API.getActiveValue() === true && API.getParent()) {
        API.getParent().controls.forEach(form => {
          if (API.associations['index'] !== form.associations['index']) {
            API.setValue(API.getActiveKey(), false, { emitEvent: false }, form);
          }
        });
      }
    };

    const valueFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - valueFunction'); // tslint:disable-line

      // Keep the changes in sync across all fields
      if (API.getParent()) {
        const diff = API.getActiveValue() - API.getActiveInitialValue();
        API.getParent().controls.forEach(form => {
          if (API.associations['index'] !== form.associations['index']) {
            const updatedValue = API.getInitialValue(API.getActiveKey(), form) + diff;
            API.setValue(API.getActiveKey(), updatedValue, { emitEvent: false }, form);
          }
        });
      }
    };

    const labelFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - labelFunction'); // tslint:disable-line

      // When editing the label on a row, adjust labels of all rows to include this text plus each row's initial value
      if (API.getParent()) {
        const baseLabel = API.getActiveValue().replace(/ \+.*/, '');
        API.getParent().controls.forEach(form => {
          const formattedInitialValue = Math.round(Number(API.getInitialValue('value', form)) * 100);
          const modifiedLabel = `${baseLabel || 'Value'} + ${formattedInitialValue}%`;
          API.setValue(API.getActiveKey(), modifiedLabel, { emitEvent: false }, form);
        });
      }
    };

    this.formGroup = this.formUtils.emptyFormGroup();
    this.controls = [
      new CheckboxControl({ key: 'selected', interactions: [{ event: 'change', script: selectedFunction }] }),
      new TextBoxControl({ key: 'value', type: 'percentage', required: true, interactions: [{ event: 'change', script: valueFunction }] }),
      new TextBoxControl({ key: 'label', required: true, interactions: [{ invokeOnInit: true, event: 'change', script: labelFunction }] }),
    ];
  }
}
