import { Component } from '@angular/core';
import { allColors } from '../../../design';

/**
 * @title Tiles Usage Example
 */
@Component({
  selector: 'tiles-usage-example',
  templateUrl: 'tiles-usage-example.html',
  styleUrls: ['tiles-usage-example.css'],
})
export class TilesUsageExample {
  public demoTilesDefault: Array<any> = [
    {
      label: 'Yes',
      value: 'yes',
    },
    {
      label: 'No',
      value: 'no',
    },
    {
      label: 'Maybe',
      value: 'maybe',
      disabled: true,
    },
  ];
  public valueDefault: string = 'yes';

  public demoTilesIcons: Array<any> = [
    {
      label: 'Include',
      value: 'include',
      icon: 'check',
    },
    {
      label: 'Exclude',
      value: 'exclude',
      icon: 'exclude',
    },
  ];
  public valueIcons: string = 'exclude';

  public demoTilesDisabled: Array<any> = [...this.demoTilesDefault];
  public valueDisabled: string = 'yes';

  public demoTilesColor: Array<any> = [
    {
      label: 'Good',
      value: 'good',
      color: 'success',
    },
    {
      label: 'Bad',
      value: 'bad',
      color: 'negative',
    },
  ];
  public valueColor: string = 'good';

  addedTiles = 0;

  select(demo: string, newValue) {
    this[`current${demo}`] = newValue;
  }

  addTile() {
    const randomColor = allColors[allColors.length * Math.random() | 0];
    this.demoTilesColor.push({
      label: randomColor.name.charAt(0).toUpperCase() + randomColor.name.slice(1),
      value: randomColor.variables[0] + this.addedTiles,
      color: randomColor.variables[0],
    });
    this.addedTiles++;
    this.demoTilesColor = [...this.demoTilesColor];
  }

  resetTiles() {
    this.demoTilesColor.length = 2;
    this.demoTilesColor = [...this.demoTilesColor];
  }
}
