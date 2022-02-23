import { Component } from '@angular/core';
// Vendor
import { CheckboxControl, CheckListControl, FormUtils, SwitchControl, TilesControl } from 'novo-elements';

// import { MockMeta, MockMetaHeaders } from './MockMeta';

/**
 * @title Check Box Controls Example
 */
@Component({
  selector: 'check-box-controls-example',
  templateUrl: 'check-box-controls-example.html',
  styleUrls: ['check-box-controls-example.css'],
})
export class CheckBoxControlsExample {
  public checkControl: any;
  public checkListControl: any;
  public tilesControl: any;
  public disabledTilesControl: any;
  public switchControl: any;
  public checkForm: any;

  constructor(private formUtils: FormUtils) {
    // Check box controls
    this.switchControl = new SwitchControl({ key: 'switch', tooltip: 'Switch', label: 'Switch', checkboxLabel: 'Switch' });
    this.checkControl = new CheckboxControl({ key: 'check', tooltip: 'Checkbox', label: 'Checkbox', checkboxLabel: 'Checkbox' });
    this.checkListControl = new CheckListControl({
      key: 'checklist',
      label: 'Check List',
      options: ['One', 'Two', 'Three'],
      tooltip: 'CheckList',
      tooltipPosition: 'Top',
    });
    this.tilesControl = new TilesControl({
      key: 'tiles',
      label: 'Tiles',
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'disabled', label: 'Disabled', disabled: true },
      ],
      tooltip: 'Tiles',
    });
    this.disabledTilesControl = new TilesControl({
      key: 'disabledTiles',
      label: 'Disabled Tiles',
      readOnly: true,
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
      ],
      tooltip: 'Tiles',
    });
    this.checkForm = formUtils.toFormGroup([
      this.switchControl,
      this.checkControl,
      this.checkListControl,
      this.tilesControl,
      this.disabledTilesControl,
    ]);
  }

  onChange(value) {
    console.log('I changed!', value); // tslint:disable-line
  }
}
