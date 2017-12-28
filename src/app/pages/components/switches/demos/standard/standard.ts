import { Component } from '@angular/core';

@Component({
  selector: 'demo-switch-standard',
  templateUrl: './standard.html',
})
export class DemoSwitchStandardComponent {
  private toggleCount: number = 0;
  private checked: boolean = true;

  public increment(): void {
    this.toggleCount++;
  }
}
