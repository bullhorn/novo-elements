import { Component } from '@angular/core';
// Vendor
import { FormUtils, FieldInteractionApi } from 'novo-elements';
import { MockMetaHeaders } from '../MockMeta';

/**
 * @title Fi Adding Removing Example
 */
@Component({
  selector: 'fi-adding-removing-example',
  templateUrl: 'fi-adding-removing-example.html',
  styleUrls: ['fi-adding-removing-example.css'],
})
export class FiAddingRemovingExample {
  public form: any;
  public controls: any = [];

  constructor(private formUtils: FormUtils) {
    let addingRemovingFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - addingRemovingFunction'); // tslint:disable-line
      // Control above field
      API.addControl(
        'cat',
        {
          key: 'fieldAbove',
          type: 'text',
          label: 'Added Above Cat',
        },
        FieldInteractionApi.FIELD_POSITIONS.ABOVE_FIELD,
        'DEFAULT',
      );
      // Control below field
      API.addControl(
        'name',
        {
          key: 'fieldBelow',
          type: 'text',
          label: 'Added Below Name',
        },
        FieldInteractionApi.FIELD_POSITIONS.BELOW_FIELD,
        ':)',
      );
      // Control at the top of the form
      API.addControl(
        'name',
        {
          key: 'top',
          type: 'text',
          label: 'Added To The Very Top',
        },
        FieldInteractionApi.FIELD_POSITIONS.TOP_OF_FORM,
        'HIGHEST',
      );
      // Control at the bottom of the form
      API.addControl(
        'name',
        {
          key: 'bottom',
          type: 'text',
          label: 'Added To The Very Bottom',
        },
        FieldInteractionApi.FIELD_POSITIONS.BOTTOM_OF_FORM,
        'LOWEST',
      );
      // Remove the jersey color field
      API.removeControl('jersey-color');
    };

    let removeAddOnChangeFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - removeAddOnChangeFunction'); // tslint:disable-line
      // Select control with a field interaction on change event
      let currentValue = API.getActiveValue();
      if (currentValue === 'Yes') {
        API.removeControl('to-be-removed');
      } else {
        API.addControl(
          'remove-select',
          {
            key: 'to-be-removed',
            name: 'to-be-removed',
            type: 'text',
            label: 'This field will be removed',
          },
          FieldInteractionApi.FIELD_POSITIONS.BELOW_FIELD,
        );
      }
    };

    // Adding / Removing Interactions
    this.controls = formUtils.toFieldSets(MockMetaHeaders, '$ USD', {}, { token: 'TOKEN', military: true });
    this.controls[2].controls[0].interactions = [{ event: 'change', script: removeAddOnChangeFunction }];
    this.controls[0].controls[0].interactions = [{ event: 'init', script: addingRemovingFunction }];
    this.form = formUtils.toFormGroupFromFieldset(this.controls);
  }
}
