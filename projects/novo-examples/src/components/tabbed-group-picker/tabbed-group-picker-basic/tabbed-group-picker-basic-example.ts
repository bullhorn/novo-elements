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
  getAnimals = (): { animalId: number; name: string }[] =>
    ['Dog', 'Cat', 'Mouse', 'Horse', 'Cow', 'Chicken', 'Pig', 'Sheep', 'Goat', 'Goose'].map((name, index) => ({
      name,
      animalId: index + 1,
    }));

  getPlaces = (): { localName: string; englishName: string }[] =>
    [
      ['Roma', 'Rome'],
      ['Firenze', 'Florence'],
      ['Munchen', 'Munich'],
      ['Paris', 'Paris'],
      ['Sevilla', 'Seville'],
      ['Athinai', 'Athens'],
    ].map(([localName, englishName]) => ({ localName, englishName }));
  getColors = (): { rgb: string; colorName: string }[] =>
    [['255,0,0', 'Red'], ['0,255,0', 'Green'], ['0,0,255', 'Blue'], ['0,0,0', 'Black'], ['255,255,255', 'White']].map(
      ([rgb, colorName]) => ({ rgb, colorName }),
    );

  animalSchema = {
    typeName: 'animals',
    typeLabel: 'Animals',
    valueField: 'animalId',
    labelField: 'name',
    data: this.getAnimals(),
  };

  example_schema = [
    this.animalSchema,
    {
      typeName: 'places',
      typeLabel: 'Places',
      valueField: 'localName',
      labelField: 'englishName',
      data: this.getPlaces(),
    },
    {
      typeName: 'colors',
      typeLabel: 'Colors',
      valueField: 'rgb',
      labelField: 'colorName',
      data: this.getColors(),
    },
  ];

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
