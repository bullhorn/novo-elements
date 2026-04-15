import { Component } from '@angular/core';

/**
 * @title Tooltip Overflow Example
 */
@Component({
    selector: 'tooltip-overflow-example',
    templateUrl: 'tooltip-overflow-example.html',
    styleUrls: ['tooltip-overflow-example.css'],
    standalone: false,
})
export class TooltipOverflowExample {
  public tooltipActive: boolean = true;
  longText = 'Lorem Ipsum pariatur laborum tempor voluptate non adipisicing reprehenderit.';
  shortText = 'Lorem Ipsum!';

  public toggleTooltip() {
    this.tooltipActive = !this.tooltipActive;
  }
}
