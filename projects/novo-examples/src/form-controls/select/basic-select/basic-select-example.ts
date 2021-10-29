import { Component } from '@angular/core';

/**
 * @title Basic Select Example
 */
@Component({
  selector: 'basic-select-example',
  templateUrl: 'basic-select-example.html',
  styleUrls: ['basic-select-example.css'],
})
export class BasicSelectExample {
  public placeholder: string = 'Select...';
  public options: Array<string> = ['Alpha', 'Bravo', 'Charlie'];
  public withNumbers: Array<any> = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { divider: true },
    { label: 'Zero', value: 0 },
    { label: 'Four', value: 4, readOnly: true },
    { label: 'Five', divider: true },
    { label: 'Six', value: 6 },
  ];
  public withNumbersValue: number = 4;
  public withNumbersObject: any = { id: 4, label: 'Four' };
  public withDisabledAndTooltip: Array<any> = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Disabled', value: 3, disabled: true },
    { label: 'Disabled Tooltip', value: 4, disabled: true, tooltip: 'Tooltip on disabled item' },
    { label: 'Disabled Left Tooltip', value: 5, disabled: true, tooltip: 'Left side tooltip on disabled item', tooltipPosition: 'left' },
    { label: 'Disabled Bottom Tooltip', value: 5, disabled: true, tooltip: 'Bottom tooltip on disabled item', tooltipPosition: 'bottom' },
  ];
  public disabledWithTooltipValue: number = 1;
  public value: string = 'Bravo';
  public headerConfig: any = {
    label: 'Add New Item',
    placeholder: 'Enter item here',
    onSave: this.create.bind(this),
  };

  public create(opt): void {
    this.options = [...this.options, opt];
  }
}
