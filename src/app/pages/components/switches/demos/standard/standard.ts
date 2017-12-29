import { Component } from '@angular/core';

@Component({
  selector: 'demo-switch-standard',
  templateUrl: './standard.html',
})
export class DemoSwitchStandardComponent {
  public toggleCount: number = 0;
  public checked: boolean = true;

  public increment(): void {
    this.toggleCount++;
  }
}
