import { Component } from '@angular/core';
import { MixedMultiPickerResults } from 'novo-elements';

/**
 * @title Mixed Picker Example
 */
@Component({
  selector: 'mixed-picker-example',
  templateUrl: 'mixed-picker-example.html',
  styleUrls: ['mixed-picker-example.css'],
})
export class MixedPickerExample {
  public placeholder: string = 'Select...';
  public mixedPicker: any;
  public mixedPickerValue: any;

  constructor() {
    this.setupMixedPickerDemo();
  }

  setupMixedPickerDemo() {
    this.mixedPicker = {
      options: [
        { value: 'p1', label: 'Option One - No Secondary Options' },
        {
          value: 'p2',
          label: 'Option Two - Static Secondary Options',
          secondaryOptions: [
            { value: 'p2s1', label: 'Static Secondary Option 1' },
            { value: 'p2s2', label: 'Static Secondary Option 2' },
          ],
        },
        {
          value: 'p3',
          label: 'Option Three - Async Secondary Options',
          getSecondaryOptionsAsync: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: 'p3d1', label: 'Async Secondary Option 1' },
                  { value: 'p3d2', label: 'Async Secondary Option 2' },
                ]);
              }, 1000);
            });
          },
        },
        { value: 'p4', label: 'Option Four - No Secondary Options' },
        {
          value: 'p5',
          label: 'Option Five - Async Secondary Options with Search',
          showSearchOnSecondaryOptions: true,
          getSecondaryOptionsAsync: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: 'p5d1', label: 'ABC - Async Secondary Option with Search 1' },
                  { value: 'p5d2', label: 'DEF - Async Secondary Option with Search 2' },
                ]);
              }, 1000);
            });
          },
        },
      ],
      resultsTemplate: MixedMultiPickerResults,
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
