import { Component } from '@angular/core';
// Vendor
import { FieldInteractionApi, FormUtils, PickerControl } from 'novo-elements';

/**
 * @title Fi Modify Added Picker Example
 */
@Component({
  selector: 'fi-modify-added-picker-example',
  templateUrl: 'fi-modify-added-picker-example.html',
  styleUrls: ['fi-modify-added-picker-example.css'],
})
export class FiModifyAddedPickerExample {
  public form: any;
  public controls: any = {};

  constructor(private formUtils: FormUtils) {
    // Adding / Removing Interactions
    const entityPickerFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - entityPickerFunction'); // tslint:disable-line
      API.modifyPickerConfig('custom-entity-picker', {
        optionsPromise: (query, http) => {
          return new Promise(function (resolve, reject) {
            if (query && query.length) {
              http
                .get('http://novo-elements-mock.getsandbox.com/users')
                .map(function (results: any[]) {
                  return results.map((result) => {
                    // Setting the searchEntity on the item is important. We use it to format your display properly.
                    // Valid options are: Candidate, ClientContact, ClientCorporation, CorporateUser, JobOrder, Lead, Opportunity, and Placement
                    result.searchEntity = 'Candidate';
                    return result;
                  });
                })
                .subscribe(resolve, reject);
            } else {
              resolve(['DEFAULT']);
            }
          });
        },
        format: '$name',
        // This is how we set the picker to be of an entity type
        resultsTemplateType: 'entity-picker',
      });
    };

    this.controls.pickerControl = new PickerControl({
      key: 'custom-entity-picker',
      name: 'custom-entity-picker',
      config: {
        options: [],
      },
      label: 'Custom Entity Picker',
      interactions: [{ event: 'init', script: entityPickerFunction }],
    });
    this.form = this.formUtils.toFormGroup([this.controls.pickerControl]);
  }
}
