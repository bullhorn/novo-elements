import { Component } from '@angular/core';
// Vendor
import { FormUtils, CheckboxControl, FieldInteractionApi, SelectControl, PickerControl } from 'novo-elements';
import { map } from 'rxjs/operators';

/**
 * @title Fi Modify Options Example
 */
@Component({
  selector: 'fi-modify-options-example',
  templateUrl: 'fi-modify-options-example.html',
  styleUrls: ['fi-modify-options-example.css'],
})
export class FiModifyOptionsExample {
  public form: any = {};
  public controls: any = {};

  constructor(private formUtils: FormUtils) {
    let modifyOptionsAddFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - modifyOptionsAddFunction'); // tslint:disable-line
      let currentValue = API.getActiveValue();
      if (!currentValue) {
        API.removeStaticOption('select', 'NEW');
        API.removeStaticOption('picker', 'NEW');
      } else {
        API.addStaticOption('select', 'NEW');
        API.addStaticOption('select', 'NEW'); // Duplicate options will be ignored
        API.addStaticOption('picker', 'NEW');
      }
    };
    let modifyOptionsAsyncFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - modifyOptionsAsyncFunction'); // tslint:disable-line
      let currentValue = API.getActiveValue();
      switch (currentValue) {
        case 1:
          // Static
          API.setProperty('picker', 'label', 'Static Picker');
          API.modifyPickerConfig('picker', {
            options: ['A', 'B', 'C'],
          });
          break;
        case 2:
          // Async with Options URL
          API.setProperty('picker', 'label', 'Async Picker (with options url)');
          API.modifyPickerConfig(
            'picker',
            {
              format: '$name $test',
              optionsUrl: 'http://novo-elements-mock.getsandbox.com/users',
            },
            function(result) {
              result.test = 'Built with Options URL!';
              return result;
            },
          );
          break;
        case 3:
          // Async with Options URL Builder
          API.setProperty('picker', 'label', 'Async Picker (with options url builder)');
          API.modifyPickerConfig(
            'picker',
            {
              format: '$name $test',
              optionsUrlBuilder: (query) => {
                return 'http://novo-elements-mock.getsandbox.com/users';
              },
            },
            function(result) {
              result.test = 'Built with Options URL Builder!';
              return result;
            },
          );
          break;
        case 4:
          // Async with Options Promise
          API.setProperty('picker', 'label', 'Async Picker (with options promise)');
          API.modifyPickerConfig('picker', {
            format: '$name $test',
            optionsPromise: function(query, http) {
              return new Promise(function(resolve, reject) {
                if (query && query.length) {
                  http
                    .get('http://novo-elements-mock.getsandbox.com/users')
                    .map(function(results: any[]) {
                      return results.map((result) => {
                        result.test = 'Built with Options Promise';
                        return result;
                      });
                    })
                    .subscribe(resolve, reject);
                } else {
                  resolve(['DEFAULT']);
                }
              });
            },
          });
          break;
        default:
          break;
      }
    };

    // Modify Options Field Interactions
    this.controls.selectControl = new SelectControl({
      key: 'select',
      label: 'Select',
      options: ['A', 'B', 'C'],
    });
    this.controls.pickerControl = new PickerControl({
      key: 'picker',
      label: 'Static Picker',
      config: {
        options: ['A', 'B', 'C'],
      },
    });
    this.controls.toggleControl = new CheckboxControl({
      key: 'toggle',
      label: 'Add Option?',
      description: 'I will add options to the above field!',
      interactions: [{ event: 'change', script: modifyOptionsAddFunction }],
    });
    this.controls.makePickerAsyncControl = new SelectControl({
      key: 'async',
      label: 'Async Picker?',
      description: 'I will make the picker now hit a service!',
      value: 1,
      options: [
        { label: 'Not Async', value: 1 },
        { label: 'Async With Options URL', value: 2 },
        { label: 'Async With Options URL Builder', value: 3 },
        { label: 'Async With Options Promise', value: 4 },
      ],
      interactions: [{ event: 'change', script: modifyOptionsAsyncFunction }],
    });
    this.form = formUtils.toFormGroup([
      this.controls.selectControl,
      this.controls.pickerControl,
      this.controls.toggleControl,
      this.controls.makePickerAsyncControl,
    ]);
  }
}
