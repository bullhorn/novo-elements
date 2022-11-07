import { Component } from '@angular/core';

/**
 * @title Switch Usage Example
 */
@Component({
  selector: 'switch-usage-example',
  templateUrl: 'switch-usage-example.html',
  styleUrls: ['switch-usage-example.css'],
})
export class SwitchUsageExample {
  public toggleCount: number = 0;
  public checked: boolean = true;

  public increment(): void {
    this.toggleCount++;
  }
}
