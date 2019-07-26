import {Component} from '@angular/core';

/**
 * @title Group Member Picker
 */
@Component({
  selector: 'group-member-picker-basic-example',
  templateUrl: 'group-member-picker-basic-example.html',
  // styleUrls: ['large-drop-down-example.css'],
})
export class GroupMemberPickerBasicExample {
  public example_schema = [
    {
      typeName: 'colors',
      typeLabel: 'Colors',
      valueField: 'value',
      labelField: 'name',
    }, {
      typeName: 'animals',
      typeLabel: 'Animals',
      valueField: 'animalId',
      labelField: 'name',
    }, {
      typeName: 'places',
      typeLabel: 'Places',
      valueField: 'localName',
      labelField: 'englishName',
    }
  ];
  public example_data: any = {
    colors: [
      {
        value: { r: 255, g: 0, b: 0 },
        name: 'Red',
      }, {
        value: { r: 0, g: 255, b: 0 },
        name: 'Green',
      }, {
        value: { r: 0, g: 0, b: 255 },
        name: 'Blue',
      }, {
        value: { r: 255, g: 255, b: 255 },
        name: 'White',
      }, {
        value: { r: 0, g: 0, b: 0 },
        name: 'Black',
      },
    ],
    animals: [
      {
        animalId: 1,
        name: 'Dog'
      }, {
        animalId: 2,
        name: 'Cat'
      }, {
        animalId: 3,
        name: 'Mouse'
      }, {
        animalId: 4,
        name: 'Horse'
      }, {
        animalId: 5,
        name: 'Cow'
      }, {
        animalId: 6,
        name: 'Pig'
      }, {
        animalId: 7,
        name: 'Chicken'
      }, {
        animalId: 8,
        name: 'Sheep'
      }, {
        animalId: 9,
        name: 'Goat'
      }, {
        animalId: 10,
        name: 'Goose'
      },
    ],
    places: [
      {
        localName: 'Roma',
        englishName: 'Rome',
      }, {
        localName: 'Firenze',
        englishName: 'Florence',
      }, {
        localName: 'Munchen',
        englishName: 'Munich',
      }, {
        localName: 'Paris',
        englishName: 'Paris',
      }, {
        localName: 'Sevilla',
        englishName: 'Seville',
      }, {
        localName: 'Athinai',
        englishName: 'Athens',
      },
    ]
  };

  public example_buttonConfig = {
    theme: 'dialog',
    side: 'left',
    icon: 'user-o',
    label: 'Click Me',
  };

  public selectedColors: any[] = [];
  public selectedAnimals: any[] = [];
  public selectedPlaces: any[] = [];

  onSelectionChange(selectedData) {
    this.selectedColors = selectedData['colors'].map(color => JSON.stringify(color));
    this.selectedAnimals = selectedData['animals'];
    this.selectedPlaces = selectedData['places'];
  }
}
