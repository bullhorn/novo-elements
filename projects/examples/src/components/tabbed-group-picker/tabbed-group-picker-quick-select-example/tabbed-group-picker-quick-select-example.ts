import { Component } from '@angular/core';
import { ChildTab, TabbedGroupPickerTab } from 'novo-elements';

/**
 * @title Tabbed Group Picker - Quick Select Example
 */
@Component({
  selector: 'tabbed-group-picker-quick-select-example',
  templateUrl: 'tabbed-group-picker-quick-select-example.html',
  styleUrls: ['../tabbed-group-picker-example.scss'],
})
export class TabbedGroupPickerQuickSelectExample {
  getAnimals = (): { animalId: number; name: string }[] =>
    ['Dog', 'Cat', 'Mouse', 'Horse', 'Cow', 'Chicken', 'Pig', 'Sheep', 'Goat', 'Goose'].map((name, index) => ({
      name,
      animalId: index + 1,
    }));
  public example_tab = [
    {
      typeName: 'animals',
      typeLabel: 'Animals',
      valueField: 'animalId',
      labelField: 'name',
      data: this.getAnimals(),
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

  public selectedAnimals: string[] = [];

  onSelectionChange(selectedData: TabbedGroupPickerTab[]) {
    this.selectedAnimals = (selectedData.find(({ typeName }) => typeName === 'animals') as ChildTab).data.map(
      ({ animalId }: { animalId: string }) => animalId,
    );
    this.example_buttonConfig.label = this.buildButtonLabel();
  }

  buildButtonLabel(): string {
    return this.selectedAnimals.length ? `Animals (${this.selectedAnimals.length})` : 'Nothing Selected';
  }
}
