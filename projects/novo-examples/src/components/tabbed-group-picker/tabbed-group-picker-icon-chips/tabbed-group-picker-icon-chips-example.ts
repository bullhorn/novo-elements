import { Component, OnInit } from '@angular/core';
import { ChildTab, TabbedGroupPickerTab } from 'novo-elements';

/**
 * @title Tabbed Group Picker - Icon Button with Chips
 */
@Component({
  selector: 'tabbed-group-picker-icon-chips-example',
  templateUrl: 'tabbed-group-picker-icon-chips-example.html',
  styleUrls: ['../tabbed-group-picker-example.scss'],
  standalone: false,
})
export class TabbedGroupPickerIconChipsExample implements OnInit {
  getAnimals = (): { animalId: number; name: string }[] =>
    ['Dog', 'Cat', 'Mouse', 'Horse', 'Cow', 'Chicken', 'Pig', 'Sheep', 'Goat', 'Goose'].map((name, index) => ({
      name,
      animalId: index + 1,
      selected: index % 3 === 1,
    }));
  getPlaces = (): { placeId: number; label: string }[] =>
    ['Rome', 'Florence', 'Munich', 'Paris', 'Seville', 'Athens'].map((label, index) => ({
        label,
        placeId: index + 1,
    }));

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
  ];
  public example_buttonConfig = {
    theme: 'icon',
    side: 'left',
    icon: 'entity-candidate',
    label: 'Click Me!',
  };
  public selectedAnimals: string[] = [];
  public selectedPlaces: string[] = [];

  ngOnInit() {
    this.resetState(this.example_tab);
  }

  onSelectionChange(selectedData: TabbedGroupPickerTab[]) {
    this.selectedAnimals = (selectedData.find(({ typeName }) => typeName === 'animals') as ChildTab).data.map(({ animalId }) => animalId);
    this.selectedPlaces = (selectedData.find(({ typeName }) => typeName === 'places') as ChildTab).data.map(({ label }) => label);
  }

  resetState([animalsTab, placesTab]: TabbedGroupPickerTab[]) {
    this.selectedAnimals = animalsTab.data.filter((animal) => animal.selected).map(({ animalId }) => animalId);
    this.selectedPlaces = placesTab.data.filter((place) => place.selected).map(({ label }) => label);
  }
}
