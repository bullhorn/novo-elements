import { Component } from '@angular/core';
// Vendor
import { FormUtils, TextBoxControl, FieldInteractionApi, TilesControl } from 'novo-elements';

/**
 * @title Fi Tooltip Example
 */
@Component({
  selector: 'fi-tooltip-example',
  templateUrl: 'fi-tooltip-example.html',
  styleUrls: ['fi-tooltip-example.css'],
})
export class FiTooltipExample {
  public form: any = {};
  public controls: any = {};

  constructor(private formUtils: FormUtils) {
    let tooltipFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - tooltipFunction'); // tslint:disable-line
      API.setTooltip(API.getActiveKey(), API.getActiveValue());
    };

    let tooltipUpdateFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - tooltipUpdateFunction'); // tslint:disable-line
      API.getControl(this.controls.tooltipControl.key).tooltipSize = API.getValue(this.controls.tooltipSizeControl.key);
      API.getControl(this.controls.tooltipControl.key).tooltipPreline = API.getValue(this.controls.tooltipPrelineControl.key);
    };

    // Tooltip Field Interactions
    this.controls.tooltipControl = new TextBoxControl({
      type: 'text',
      key: 'toolTipValue',
      label: 'Tooltip',
      description: 'I will add a tooltip to this control as a value is typed',
      interactions: [{ event: 'change', script: tooltipFunction }],
    });

    this.controls.tooltipSizeControl = new TilesControl({
      key: 'tooltipSize',
      label: 'Tooltip Size',
      description: 'Changing me will set a fixed width on the tooltip',
      options: [{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }],
      interactions: [{ event: 'change', script: tooltipUpdateFunction }],
    });

    this.controls.tooltipPrelineControl = new TilesControl({
      key: 'tooltipPreline',
      label: 'Tooltip Multiline',
      description: 'Should the tooltip be multiple lines tall or all on one line?',
      options: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }],
      interactions: [{ event: 'change', script: tooltipUpdateFunction }],
    });

    this.form = formUtils.toFormGroup([
      this.controls.tooltipControl,
      this.controls.tooltipSizeControl,
      this.controls.tooltipPrelineControl,
    ]);
  }
}
