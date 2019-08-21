import { Component } from '@angular/core';

/**
 * @title Tabbed Group Picker - Basic Example
 */
@Component({
  selector: 'tabbed-group-picker-basic-example',
  templateUrl: 'tabbed-group-picker-basic-example.html',
  styleUrls: ['../tabbed-group-picker-example.scss'],
})
export class TabbedGroupPickerBasicExample {
  public example_schema = [
    {
      typeName: 'animals',
      typeLabel: 'Animals',
      valueField: 'animalId',
      labelField: 'name',
    },
    {
      typeName: 'places',
      typeLabel: 'Places',
      valueField: 'localName',
      labelField: 'englishName',
    },
    {
      typeName: 'colors',
      typeLabel: 'Colors',
      valueField: 'rgb',
      labelField: 'colorName',
    },
  ];
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
    places: [
      {
        localName: 'Roma',
        englishName: 'Rome',
      },
      {
        localName: 'Firenze',
        englishName: 'Florence',
      },
      {
        localName: 'Munchen',
        englishName: 'Munich',
      },
      {
        localName: 'Paris',
        englishName: 'Paris',
      },
      {
        localName: 'Sevilla',
        englishName: 'Seville',
      },
      {
        localName: 'Athinai',
        englishName: 'Athens',
      },
    ],
    colors: [
      {
        rgb: '255,0,0',
        colorName: 'Red',
      },
      {
        rgb: '0,255,0',
        colorName: 'Green',
      },
      {
        rgb: '0,0,255',
        colorName: 'Blue',
      },
      {
        rgb: '0,0,0',
        colorName: 'Black',
      },
      {
        rgb: '255,255,255',
        colorName: 'White',
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

  public selectedAnimals: number[] = [];
  public selectedPlaces: string[] = [];
  public selectedColors: string[] = [];

  onSelectionChange(selectedData) {
    this.selectedAnimals = selectedData['animals'];
    this.selectedPlaces = selectedData['places'];
    this.selectedColors = selectedData['colors'];
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
