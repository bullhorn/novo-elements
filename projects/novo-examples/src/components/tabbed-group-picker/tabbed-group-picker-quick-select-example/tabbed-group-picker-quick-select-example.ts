import { Component } from '@angular/core';

/**
 * @title Tabbed Group Picker - Quick Select Example
 */
@Component({
  selector: 'tabbed-group-picker-quick-select-example',
  templateUrl: 'tabbed-group-picker-quick-select-example.html',
  styleUrls: ['../tabbed-group-picker-example.scss'],
})
export class TabbedGroupPickerQuickSelectExample {
  public example_schema = [
    {
      typeName: 'animals',
      typeLabel: 'Animals',
      valueField: 'animalId',
      labelField: 'name',
    },
  ];
  public example_quickSelectConfig = {
    label: 'Quick Select',
    items: [
      {
        typeName: 'animals',
        values: [2],
        label: 'Pure Evil',
      },
      {
        typeName: 'animals',
        values: [1, 6, 9],
        label: 'My Pets',
      },
      {
        typeName: 'animals',
        all: true,
        label: 'All Animals',
      },
    ],
  };
  public example_data: any = {
    animals: [
      {
        animalId: 1,
        name: 'Dog',
      },
      {
        animalId: 2,
        name: 'Cat',
      },
      {
        animalId: 3,
        name: 'Mouse',
      },
      {
        animalId: 4,
        name: 'Horse',
      },
      {
        animalId: 5,
        name: 'Cow',
      },
      {
        animalId: 6,
        name: 'Pig',
      },
      {
        animalId: 7,
        name: 'Chicken',
      },
      {
        animalId: 8,
        name: 'Sheep',
      },
      {
        animalId: 9,
        name: 'Goat',
      },
      {
        animalId: 10,
        name: 'Goose',
      },
    ],
  };

  public buttonLabel: string = 'Nothing Selected';
  public example_buttonConfig = {
    theme: 'select',
    side: 'right',
    icon: 'collapse',
    label: this.buttonLabel,
    selector: 'buttonConfig',
  };

  public selectedAnimals: any[] = [];

  onSelectionChange(selectedData) {
    this.selectedAnimals = selectedData['animals'];
    this.example_buttonConfig.label = this.buildButtonLabel();
  }

  buildButtonLabel(): string {
    return this.selectedAnimals.length ? `Animals (${this.selectedAnimals.length})` : 'Nothing Selected';
  }
}
