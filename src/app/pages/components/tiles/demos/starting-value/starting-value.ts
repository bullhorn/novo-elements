import { Component } from '@angular/core';

@Component({
  selector: 'demo-tiles-starting',
  templateUrl: './starting-value.html',
})
export class DemoTilesStartingComponent {
  public value: string = 'true';
  public demoTiles: any[] = [
    {
      label: 'True',
      value: 'true',
    },
    {
      label: 'False',
      value: 'false',
    },
  ];
  private currentValue: string;

  public valueSelect(newValue: string): void {
    this.currentValue = newValue;
  }
}
