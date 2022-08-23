import { Component } from '@angular/core';
import { ChildTab, ParentTab, TabbedGroupPickerTab } from 'novo-elements';

/**
 * @title Tabbed Group Picker - Groups Example
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

  getAnimalCategories = (): { groupId: number; name: string; children?: { animalId: number; name: string }[] }[] => {
    const animals = this.getAnimals();
    const birds = ['Chicken', 'Goose'].map((name) => animals.find((animal) => animal.name === name));
    const livestock = ['Cow', 'Pig', 'Sheep', 'Goat'].map((name) => animals.find((animal) => animal.name === name));
    return [
      {
        name: 'Birds',
        groupId: 1,
        children: birds,
      },
      {
        name: 'Livestock',
        groupId: 2,
        children: livestock,
      },
    ];
  };
  example_tab = [
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
    },
  ];
  public example_quickSelectConfig = {
    label: 'Quick Select',
    items: [
      {
        childTypeName: 'animals',
        children: [2],
        label: 'Pure Evil',
      },
      {
        childTypeName: 'animals',
        children: [1, 6, 9],
        label: 'My Pets',
      },
      {
        childTypeName: 'animals',
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

  selectedAnimals: string[] = [];
  selectedAnimalCategories: string[] = [];

  onSelectionChange(selectedData: TabbedGroupPickerTab[]) {
    this.selectedAnimals = (selectedData.find(({ typeName }) => typeName === 'animals') as ChildTab).data.map(({ animalId }) => animalId);
    this.selectedAnimalCategories = (selectedData.find(({ typeName }) => typeName === 'animalCategories') as ParentTab).data.map(
      ({ groupId }) => groupId,
    );
    this.example_buttonConfig.label = this.buildButtonLabel();
  }

  buildButtonLabel(): string {
    return this.selectedAnimals.length ? `Animals (${this.selectedAnimals.length})` : 'Nothing Selected';
  }
}
