import { Component } from '@angular/core';
// Vendor
import { FieldInteractionApi, FormUtils, NovoControlConfig, NovoFormGroup, RadioControl, TextBoxControl } from 'novo-elements';

/**
 * @title Fi Nested Form Example
 */
@Component({
  selector: 'fi-nested-example',
  templateUrl: 'fi-nested-example.html',
  styleUrls: ['fi-nested-example.css'],
})
export class FiNestedExample {
  public form: NovoFormGroup;
  public minPayRateControl: TextBoxControl;
  public maxPayRateControl: TextBoxControl;
  public controls: NovoControlConfig[];
  public initialValue = [
    { selected: true, label: `First Shift`, multiplier: 1, payRate: 40 },
    { selected: false, label: ``, multiplier: 1.5, payRate: 60 },
    { selected: false, label: ``, multiplier: 2.0, payRate: 80 },
  ];

  constructor(private formUtils: FormUtils) {
    const onMinMaxPayRateChanged = (API: FieldInteractionApi) => {
      // Validate the min/max range
      const minPayRateControl = API.getControl('minPayRate');
      const minPayRate = Number(API.getValue('minPayRate'));
      const maxPayRate = Number(API.getValue('maxPayRate'));
      if (minPayRate > maxPayRate) {
        API.markAsInvalid(API.getActiveKey(), 'Range is invalid. Please ensure that the minimum does not exceed the maximum.');
        minPayRateControl.tipWell = {
          tip: 'Range is invalid. Please ensure that the minimum does not exceed the maximum.',
          icon: 'caution'
        };
      } else {
        // The API.form is equal the top level form since the min/max fields are directly on the form, not part of a nested form
        this.calculatePayRates(API, API.form);
        minPayRateControl.tipWell = null;
      }
    };

    const onSelectedChanged = (API: FieldInteractionApi) => {
      // If my row is selected, deselect other rows without causing cascading changes
      if (API.getActiveValue() === true) {
        API.getParent().controls.forEach(form => {
          if (API.getIndex() !== API.getIndex(form)) {
            API.setValue(API.getActiveKey(), false, { emitEvent: false }, form);
          }
        });
      }
    };

    const onLabelChanged = (API: FieldInteractionApi) => {
      // Update the labels for the Overtime/Double Time earn codes
      if (API.getIndex() === 0) {
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

      // The parent of this nested row form is the rows form array, and the grandparent is the main form object
      const rowsFormArray = API.getParent();
      const topLevelForm = API.getParent(rowsFormArray);
      this.calculatePayRates(API, topLevelForm);
    };

    const onPayRateChanged = (API: FieldInteractionApi) => {
      // Disable the non-base rate payRates since they are auto calculated
      API.setReadOnly(API.getActiveKey(), API.getIndex() > 0);

      // The parent of this nested row form is the rows form array, and the grandparent is the main form object
      const rowsFormArray = API.getParent();
      const topLevelForm = API.getParent(rowsFormArray);
      this.calculatePayRates(API, topLevelForm);
    };

    this.minPayRateControl = new TextBoxControl({
      key: 'minPayRate',
      type: 'currency',
      label: 'Minimum Pay Rate',
      value: 20,
      currencyFormat: '$ USD',
      interactions: [{ event: 'change', script: onMinMaxPayRateChanged }],
      tooltip: 'If the value of any pay rates are below this value then the form will be marked invalid.',
    });

    this.maxPayRateControl = new TextBoxControl({
      key: 'maxPayRate',
      type: 'currency',
      label: 'Maximum Pay Rate',
      value: 80,
      tooltip: 'If the value of any pay rates are above this value then the form will be marked invalid.',
      currencyFormat: '$ USD',
      interactions: [{ event: 'change', script: onMinMaxPayRateChanged }],
      tipWell: {
        tip: 'This form is interactive! Try adjusting the min/max and pay rates to see the custom form validation logic that is enabled by field interactions across nested forms.',
        icon: 'info',
      },
    });

    this.form = formUtils.toFormGroup([this.minPayRateControl, this.maxPayRateControl]);

    this.controls = [
      new RadioControl({
        key: 'selected',
        label: 'Selected',
        options: [{ label: '', value: true }],
        interactions: [{ event: 'change', script: onSelectedChanged }],
        tooltip: 'Selecting a radio button will de-select buttons on the other forms, making multiple nested forms appear as a single form.',
      }),
      new TextBoxControl({
        key: 'label',
        label: 'Earn Code',
        required: true,
        interactions: [{ invokeOnInit: true, event: 'change', script: onLabelChanged }],
        tooltip: 'Labels on other nested forms will be updated based on this label.',
      }),
      new TextBoxControl({
        key: 'multiplier',
        label: 'Multiplier',
        type: 'bigdecimal',
        required: true,
        interactions: [{ invokeOnInit: true, event: 'change', script: onMultiplierChanged }],
        tooltip: 'Updating the multiplier will auto calculate the resulting pay rate.',
      }),
      new TextBoxControl({
        key: 'payRate',
        label: 'Pay Rate',
        type: 'currency',
        required: true,
        interactions: [{ invokeOnInit: true, event: 'change', script: onPayRateChanged }],
        currencyFormat: '$ USD',
      }),
    ];
  }

  private calculatePayRates(API: FieldInteractionApi, topLevelForm: NovoFormGroup | any) {
    // TODO:
    // const rowsArray: NovoFormGroup[] = API.getFormArray('rows', topLevelForm);

    // Get values from the top level form controls
    const minPayRate = Number(API.getValue('minPayRate', topLevelForm));
    const maxPayRate = Number(API.getValue('maxPayRate', topLevelForm));

    // Walk down to the nested forms: 'rows' is the key input value passed to the NovoControlGroup for constructing the formArray
    const rowsFormArray = topLevelForm.controls.rows;
    const baseRowForm = rowsFormArray.controls[0] as NovoFormGroup | any;
    const basePayRateControl = API.getControl('payRate', baseRowForm);
    const basePayRate = Number(API.getValue('payRate', baseRowForm));

    let isPayRateValid = true;
    rowsFormArray.controls.forEach(form => {
      // Calculate the payRate for read only Overtime / Double time fields
      if (API.getIndex(form) > 0) {
        const multiplier = Number(API.getValue('multiplier', form));
        API.setValue('payRate', basePayRate * multiplier, { emitEvent: false }, form);
      }

      // Determine if each pay rate is valid. Put a tipWell on the invalid rows.
      const payRateControl = API.getControl('payRate', form);
      const payRate = Number(API.getValue('payRate', form));
      if (payRate < minPayRate) {
        isPayRateValid = false;
        API.displayTip('payRate', 'rate is below the minimum', 'caution', false, false, form);
      } else if (payRate > maxPayRate) {
        isPayRateValid = false;
        API.displayTip('payRate', 'rate exceeds the maximum', 'caution', false, false, form);
      } else {
        API.clearTip('payRate', form);
        payRateControl.tipWell = null;
      }
    });

    // Mark the editable row as valid or invalid.
    if (isPayRateValid) {
      // TODO: API.markAsValid() to remove the errors?
      basePayRateControl.setErrors(null);
    } else {
      API.markAsInvalid('payRate', 'pay rate is less than the minimum pay rate', baseRowForm);
    }
  }
}
