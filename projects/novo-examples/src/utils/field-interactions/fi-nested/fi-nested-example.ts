import { Component } from '@angular/core';
// Vendor
import { FieldInteractionApi, FormUtils, NovoFormGroup, RadioControl, TextBoxControl } from 'novo-elements';

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
    { selected: true, label: `First Shift`, multiplier: 1, payRate: 40 },
    { selected: false, label: ``, multiplier: 1.5, payRate: 60 },
    { selected: false, label: ``, multiplier: 2.0, payRate: 80 },
  ];

  constructor(private formUtils: FormUtils) {
    const onSelectedChanged = (API: FieldInteractionApi) => {
      // If my row is selected, deselect other rows without causing cascading changes
      if (API.getActiveValue() === true && API.getParent()) {
        API.getParent().controls.forEach(form => {
          if (API.getIndex() !== API.getIndex(form)) {
            API.setValue(API.getActiveKey(), false, { emitEvent: false }, form);
          }
        });
      }
    };

    const onLabelChanged = (API: FieldInteractionApi) => {
      // Update the labels for the Overtime/Double Time earn codes
      if (API.getIndex() === 0 && API.getParent()) {
        const overtimeForm = API.getParent().controls[1];
        const doubleTimeForm = API.getParent().controls[2];
        if (overtimeForm) {
          API.setValue(API.getActiveKey(), API.getActiveValue() + ' - OT', { emitEvent: false }, overtimeForm);
          API.setReadOnly(API.getActiveKey(), true, overtimeForm);
        }
        if (doubleTimeForm) {
          API.setValue(API.getActiveKey(), API.getActiveValue() + ' - DT', { emitEvent: false }, doubleTimeForm);
          API.setReadOnly(API.getActiveKey(), true, doubleTimeForm);
        }
      }
    };

    const onMultiplierChanged = (API: FieldInteractionApi) => {
      // Disable the base rate multiplier since it is fixed at one
      API.setReadOnly(API.getActiveKey(), API.getIndex() === 0);
      this.calculatePayRates(API);
    };

    const onPayRateChanged = (API: FieldInteractionApi) => {
      // Disable the non-base rate payRates since they are auto calculated
      API.setReadOnly(API.getActiveKey(), API.getIndex() > 0);
      this.calculatePayRates(API);
    };

    this.formGroup = this.formUtils.emptyFormGroup();
    this.controls = [
      new RadioControl({
        key: 'selected',
        label: 'Selected',
        options: [{ label: '', value: true }],
        interactions: [{ event: 'change', script: onSelectedChanged }]
      }),
      new TextBoxControl({
        key: 'label',
        label: 'Earn Code',
        required: true,
        interactions: [{ invokeOnInit: true, event: 'change', script: onLabelChanged }]
      }),
      new TextBoxControl({
        key: 'multiplier',
        label: 'Multiplier',
        type: 'bigdecimal',
        required: true,
        interactions: [{ invokeOnInit: true, event: 'change', script: onMultiplierChanged }]
      }),
      new TextBoxControl({
        key: 'payRate',
        label: 'Pay Rate',
        type: 'currency',
        required: true,
        interactions: [{ invokeOnInit: true, event: 'change', script: onPayRateChanged }]
      }),
    ];
  }

  private calculatePayRates(API: FieldInteractionApi) {
    const baseForm = API.getParent().controls[0];
    const basePayRate = Number(API.getValue('payRate', baseForm));
    API.getParent().controls.forEach(form => {
      if (API.getIndex(form) > 0) {
        const multiplier = Number(API.getValue('multiplier', form));
        API.setValue('payRate', basePayRate * multiplier, { emitEvent: false }, form);
      }
    });
  }
}
