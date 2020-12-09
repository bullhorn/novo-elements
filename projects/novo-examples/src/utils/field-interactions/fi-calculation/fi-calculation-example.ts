import { Component } from '@angular/core';
// Vendor
import { DateTimeControl, FieldInteractionApi, FormUtils, TextBoxControl } from 'novo-elements';

/**
 * @title Fi Calculation Example
 */
@Component({
  selector: 'fi-calculation-example',
  templateUrl: 'fi-calculation-example.html',
  styleUrls: ['fi-calculation-example.css'],
})
export class FiCalculationExample {
  public form: any;
  public controls: any = {};
  public snippet: any = {};

  constructor(private formUtils: FormUtils) {
    const calculationFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - calculationFunction'); // tslint:disable-line
      const a = Number(API.getValue('a'));
      const b = Number(API.getValue('b'));
      API.setValue('sum', a + b);
      API.setValue('date', new Date());
    };

    // Calculation Field Interactions
    this.controls.aControl = new TextBoxControl({
      type: 'number',
      key: 'a',
      label: 'A',
      value: 1,
      interactions: [{ event: 'change', invokeOnInit: false, script: calculationFunction }],
    });
    this.controls.bControl = new TextBoxControl({
      type: 'number',
      key: 'b',
      label: 'B',
      value: 1,
      interactions: [{ event: 'change', invokeOnInit: false, script: calculationFunction }],
    });
    this.controls.sumControl = new TextBoxControl({
      type: 'number',
      key: 'sum',
      label: 'Sum',
      description: 'I am automatically set when you type in the boxes above me!',
      readOnly: true,
    });
    this.controls.dateModifiedControl = new DateTimeControl({
      key: 'date',
      label: 'Date Last Modified',
      value: new Date(),
    });
    this.form = formUtils.toFormGroup([
      this.controls.aControl,
      this.controls.bControl,
      this.controls.sumControl,
      this.controls.dateModifiedControl,
    ]);
  }
}
