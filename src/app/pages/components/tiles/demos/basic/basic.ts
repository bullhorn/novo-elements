import { Component } from '@angular/core';

@Component({
  selector: 'demo-tiles-basic',
  templateUrl: './basic.html',
})
export class DemoTilesBasicComponent {
  public demoTiles: any[] = [
    {
      label: 'Red',
      value: 'red',
    },
    {
      label: 'Green',
      value: 'green',
    },
  ];
}
