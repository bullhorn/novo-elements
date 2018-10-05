import { Component } from '@angular/core';

/**
 * @title Tiles Usage Example
 */
@Component({
  selector: 'tiles-usage-example',
  templateUrl: 'tiles-usage-example.html',
  styleUrls: ['tiles-usage-example.css'],
})
export class TilesUsageExample {
  public shown: boolean = false;
  public demoTiles: Array<any> = [
    {
      label: 'Red',
      value: 'red',
    },
    {
      label: 'Green',
      value: 'green',
    },
    {
      label: 'Disabled',
      value: 'disabled',
      disabled: true,
    },
  ];
  public currentColor: string;
  public value: string = 'red';

  colorSelect(newColorValue) {
    this.currentColor = newColorValue;
  }

  disabledClicked(tile) {
    console.log('Disabled tile clicked: ', tile); // tslint:disable-line
  }

  selectedClicked(tile) {
    console.log('Selected tile clicked: ', tile); // tslint:disable-line
  }

  toggleShown() {
    this.shown = !this.shown;
  }

  addTile() {
    this.demoTiles.push({
      label: 'Blue',
      value: 'blue',
    });
    this.demoTiles = [...this.demoTiles];
  }
}
