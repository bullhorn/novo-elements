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
  public value: string = 'Bravo';
  public withNumbers: Array<any> = [
    { label: 'One', value: { id: 1, label: 'One' } },
    { label: 'Two', value: { id: 2, label: 'Two' } },
    { divider: true },
    { label: 'Zero', value: { id: 0, label: 'Zero' } },
    { label: 'Four', value: { id: 4, label: 'Four' }, readOnly: true },
    { divider: true },
    { label: 'Six', value: { id: 6, label: 'Six' } },
  ];
  public withNumbersValue: any = { id: 25, label: 'Twenty Five' };
  public withNumbersObject: any = { value: { id: 4, label: 'Four' } };
  public withDisabledAndTooltip: Array<any> = [
    { label: 'One', value: { id: 1, label: 'One' } },
    { label: 'Two', value: { id: 2, label: 'Two' } },
    { label: 'Disabled', value: { id: 3, label: 'Three' }, disabled: true },
    { label: 'Disabled Tooltip', value: { id: 4, label: 'Four' }, disabled: true, tooltip: 'Tooltip on disabled item' },
    {
      label: 'Disabled Left Tooltip',
      value: { id: 5, label: 'Five' },
      disabled: true,
      tooltip: 'Left side tooltip on disabled item',
      tooltipPosition: 'left',
    },
    {
      label: 'Disabled Bottom Tooltip',
      value: { id: 6, label: 'Six' },
      disabled: true,
      tooltip: 'Bottom tooltip on disabled item',
      tooltipPosition: 'bottom',
    },
  ];
  public disabledWithTooltipValue: number = 1;
  public headerConfig: any = {
    label: 'Add New Item',
    placeholder: 'Enter item here',
    onSave: this.create.bind(this),
  };

  public create(opt): void {
    this.options = [...this.options, opt];
  }
}
