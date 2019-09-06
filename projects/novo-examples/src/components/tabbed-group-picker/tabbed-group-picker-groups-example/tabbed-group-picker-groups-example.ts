import { Component } from '@angular/core';

/**
 * @title Tabbed Group Picker - Quick Select Example
 */
@Component({
  selector: 'tabbed-group-picker-groups-example',
  templateUrl: 'tabbed-group-picker-groups-example.html',
  styleUrls: ['../tabbed-group-picker-example.scss'],
})
export class TabbedGroupPickerGroupsExample {

  getAnimals = (): { animalId: number; name: string }[] =>
    ['Dog', 'Cat', 'Mouse', 'Horse', 'Cow', 'Chicken', 'Pig', 'Sheep', 'Goat', 'Goose'].map((name, index) => ({
      name,
      animalId: index + 1,
    }));

  getAnimalCategories = (): {groupId: number, name: string, children?: {animalId: number, name: string}[]}[] => {
    const animals = this.getAnimals();
    const birds = ['Chicken', 'Goose'].map((name) => animals.find((animal) => animal.name === name));
    const livestock = ['Cow', 'Pig', 'Sheep', 'Goat'].map((name) => animals.find((animal) => animal.name === name));
    return [
      {
        name: 'Birds',
        groupId: 1,
        children: birds
      },
      {
        name: 'Livestock',
        groupId: 2,
        children: livestock
      }
    ];
  }
  example_schema = [
    {
      typeName: 'animals',
      typeLabel: 'Animals',
      valueField: 'animalId',
      labelField: 'name',
      data: this.getAnimals(),
    },
    {
      typeName: 'animalCategories',
      typeLabel: 'Animal Categories',
      valueField: 'groupId',
      labelField: 'name',
      childTypeName: 'animals',
      data: this.getAnimalCategories(),
    }
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

  public buttonLabel: string = 'Nothing Selected';
  public example_buttonConfig = {
    theme: 'select',
    side: 'right',
    icon: 'collapse',
    label: this.buttonLabel,
    selector: 'buttonConfig',
  };

  public selectedAnimals: any[] = [];
  selectedAnimalCategories = [];

  onSelectionChange(selectedData) {
    this.selectedAnimals = selectedData['animals'];
    this.selectedAnimalCategories = selectedData['animalCategories'];
    this.example_buttonConfig.label = this.buildButtonLabel();
  }

  buildButtonLabel(): string {
    return this.selectedAnimals.length ? `Animals (${this.selectedAnimals.length})` : 'Nothing Selected';
  }
}
