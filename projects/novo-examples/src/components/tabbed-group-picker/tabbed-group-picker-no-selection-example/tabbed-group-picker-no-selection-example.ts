import { Component } from '@angular/core';

/**
 * @title Tabbed Group Picker - Basic Example
 */
@Component({
    selector: 'tabbed-group-picker-no-selection-example',
    templateUrl: 'tabbed-group-picker-no-selection-example.html',
    styleUrls: ['../tabbed-group-picker-example.scss'],
    standalone: false
})
export class TabbedGroupPickerNoSelectionExample {
  getActions = (): { actionId: number; name: string }[] =>
    ['Run', 'Jump', 'Swim', 'Climb', 'Walk', 'Fly'].map((name, index) => ({
      name,
      actionId: index + 1
    }));

  actionsTab = {
    typeName: 'actions',
    typeLabel: 'Actions',
    valueField: 'actionId',
    labelField: 'name',
    data: this.getActions(),
  };

  example_tab = [
    this.actionsTab
  ];

  public example_buttonConfig = {
    theme: 'select',
    side: 'right',
    icon: 'collapse',
    label: 'Open action activation window',
    selector: 'buttonConfig',
  };

  public lastSelection: string;

  onActivation(selectedData: { actionId: number; name: string }) {
    this.lastSelection = selectedData.name;
  }
}
