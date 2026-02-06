import { Component, OnInit } from '@angular/core';
import { ChildTab, TabbedGroupPickerTab } from 'novo-elements';

/**
 * @title Tabbed Group Picker - Basic Example
 */
@Component({
  selector: 'tabbed-group-picker-chips-example',
  templateUrl: 'tabbed-group-picker-chips-example.html',
  styleUrls: ['../tabbed-group-picker-example.scss'],
  standalone: false,
})
export class TabbedGroupPickerChipsExample implements OnInit {
  getAnimals = (): { animalId: number; name: string }[] =>
    ['Dog', 'Cat', 'Mouse', 'Horse', 'Cow', 'Chicken', 'Pig', 'Sheep', 'Goat', 'Goose'].map((name, index) => ({
      name,
      animalId: index + 1,
      selected: index % 3 === 1,
    }));
  getPlaces = (): { placeId: number; label: string }[] =>
    ['Rome', 'Florence', 'Munich', 'Paris', 'Seville', 'Athens',].map((label, index) => ({
        label,
        placeId: index + 1,
    }));

  getColors = (): { value: string; label: string }[] =>
    [
      ['255,0,0', 'Red'],
      ['0,255,0', 'Green'],
      ['0,0,255', 'Blue'],
      ['0,0,0', 'Black'],
      ['255,255,255', 'White'],
    ].map(([value, label]) => ({ value, label }));
  example_tab = [
    {
      typeName: 'animals',
      typeLabel: 'Animals',
      valueField: 'animalId',
      labelField: 'name',
      icon: { entityColor: 'joborder' },
      data: this.getAnimals(),
    },
    {
      typeName: 'places',
      typeLabel: 'Places',
      valueField: 'placeId',
      labelField: 'label',
      icon: 'note',
      data: this.getPlaces(),
    },
    {
      typeName: 'colors',
      typeLabel: 'Colors',
      valueField: 'value',
      labelField: 'label',
      data: this.getColors(),
    },
  ];
  public example_buttonConfig = {
    theme: 'select',
    side: 'right',
    icon: 'collapse',
    label: 'Nothing Selected',
    selector: 'buttonConfig',
  };
  public selectedAnimals: string[] = [];
  public selectedPlaces: string[] = [];
  public selectedColors: string[] = [];

  ngOnInit() {
    this.resetState(this.example_tab);
  }

  onSelectionChange(selectedData: TabbedGroupPickerTab[]) {
    this.selectedAnimals = (selectedData.find(({ typeName }) => typeName === 'animals') as ChildTab).data.map(({ animalId }) => animalId);
    this.selectedPlaces = (selectedData.find(({ typeName }) => typeName === 'places') as ChildTab).data.map(({ label }) => label);
    this.selectedColors = (selectedData.find(({ typeName }) => typeName === 'colors') as ChildTab).data.map(({ label }) => label);
    this.example_buttonConfig.label = this.buildButtonLabel();
  }

  resetState([animalsTab, placesTab, colorsTab]: TabbedGroupPickerTab[]) {
    this.selectedAnimals = animalsTab.data.filter((animal) => animal.selected).map(({ animalId }) => animalId);
    this.selectedPlaces = placesTab.data.filter((place) => place.selected).map(({ label }) => label);
    this.selectedColors = colorsTab.data.filter((color) => color.selected).map(({ label }) => label);
    this.example_buttonConfig.label = this.buildButtonLabel();
  }

  buildButtonLabel(): string {
    const labelParts: string[] = [];
    this.selectedAnimals.length ? labelParts.push(`Animals (${this.selectedAnimals.length})`) : '';
    this.selectedPlaces.length ? labelParts.push(`Places (${this.selectedPlaces.length})`) : '';
    this.selectedColors.length ? labelParts.push(`Colors (${this.selectedColors.length})`) : '';
    return labelParts.join(', ') || 'Nothing Selected';
  }
}
