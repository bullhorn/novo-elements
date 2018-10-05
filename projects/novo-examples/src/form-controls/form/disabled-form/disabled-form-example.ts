import { Component, Input } from '@angular/core';

// Vendor
import { FormUtils, TextBoxControl, CheckboxControl, FileControl, PickerControl } from 'novo-elements';
import { MockMetaForDisabledForm } from '../MockMeta';

/**
 * @title Disabled Form Example
 */
@Component({
  selector: 'disabled-form-example',
  templateUrl: 'disabled-form-example.html',
  styleUrls: ['disabled-form-example.css'],
})
export class DisabledFormExample {
  public disabledControls: any;
  public disabledQuickNote: any;
  public disabledForm: any;
  public disabledNote: any;
  public required: boolean = false;
  public disabled: boolean = true;
  public placeholder: string = 'Placeholder';
  public note: string = '';

  constructor(private formUtils: FormUtils) {
    // Disabled Form
    let disabledOverrides: any = {
      address: {
        readOnly: true,
      },
      textbox: {
        readOnly: true,
      },
      textarea: {
        readOnly: true,
      },
      date: {
        readOnly: true,
      },
      time: {
        readOnly: true,
      },
      datetime: {
        readOnly: true,
      },
      select: {
        readOnly: true,
      },
      tiles: {
        readOnly: true,
      },
      picker: {
        readOnly: true,
      },
      chips: {
        readOnly: true,
      },
      checkbox: {
        readOnly: true,
      },
      checklist: {
        readOnly: true,
      },
      file: {
        readOnly: true,
      },
      type: {
        readOnly: true,
      },
      radio: {
        readOnly: true,
      },
      htmlFieldFullEditor: {
        readOnly: true,
      },
      rowChips: {
        readOnly: true,
        label: 'Row Chips',
        columns: [
          {
            label: 'Value',
            data: (item: any): string => {
              return item.value['value'];
            },
          },
          {
            label: 'Description',
            data: (item: any): string => {
              return item.value['description'];
            },
          },
        ],
      },
    };
    // Updating form
    this.disabledControls = formUtils.toFieldSets(
      MockMetaForDisabledForm,
      '$ USD',
      {},
      { token: 'TOKEN', military: true },
      disabledOverrides,
    );
    formUtils.setInitialValuesFieldsets(this.disabledControls, {
      textbox: 'Disabled TextBox',
      textarea:
        'Disabled TextArea Disabled TextArea Disabled TextArea Disabled TextArea Disabled TextArea Disabled TextArea Disabled TextArea ',
      select: 'disabledValue',
      checklist: 'Disabled',
      tiles: 'Disabled',
      radio: 'Yes',
      chips: ['Disabled', 'Chip'],
      address: {
        address1: '100 Summer St',
        address2: 'apt 25',
        countryID: 1,
        state: 'Georgia',
        city: 'Atlanta',
        zip: '30312',
        countryName: 'United States',
        countryCode: 'US',
      },
      file: [{ name: 'yourFile.pdf', loaded: true, link: 'www.google.com', description: 'file description' }],
      htmlFieldFullEditor: `<h1>Disabled Editor</h1><br><ui><li>Disabled</li><li>Editor</li></ui>`,
      picker: 'Disabled Picker',
      rowChips: [{ id: 1, value: 'Disabled Row Chip', description: 'This is a disabled Row Chip' }],
    });
    this.disabledForm = formUtils.toFormGroupFromFieldset(this.disabledControls);
    this.disabledNote = 'Disabled QuickNote';
    this.disabledQuickNote = {
      triggers: {
        tags: '@',
        references: '#',
        boos: '^',
      },
      options: {
        tags: ['First', 'Second', 'Space Between'],
        references: ['Third', 'Fourth'],
        boos: ['Test'],
      },
      readOnly: true,
      renderer: {
        tags: (symbol, item) => {
          return `<a href="https://www.google.com/search?q=bullhorn&oq=bullhorn">${symbol}${item.label}</a>`;
        },
        references: (symbol, item) => {
          return `<a href="https://www.google.com/search?q=bullhorn&oq=bullhorn">${symbol}${item.label}</a>`;
        },
        boos: (symbol, item) => {
          return `<strong>${symbol}${item.label}</strong>`;
        },
      },
    };
  }
}
