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
    { label: 'Zero', value: 0 },
    { label: 'Four', value: 4, readOnly: true },
  ];
  public withNumbersValue: number = 4;
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
