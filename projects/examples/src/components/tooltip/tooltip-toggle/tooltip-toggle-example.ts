import { Component } from '@angular/core';

/**
 * @title Tooltip Toggle Example
 */
@Component({
  selector: 'tooltip-toggle-example',
  templateUrl: 'tooltip-toggle-example.html',
  styleUrls: ['tooltip-toggle-example.css'],
})
export class TooltipToggleExample {
  public tooltipActive: boolean;
  public toggleTooltip() {
    this.tooltipActive = !this.tooltipActive;
  }
}
