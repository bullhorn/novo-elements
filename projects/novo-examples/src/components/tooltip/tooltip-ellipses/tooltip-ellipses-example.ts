import { Component } from '@angular/core';

/**
 * @title Tooltip Ellipses Example
 */
@Component({
  selector: 'tooltip-ellipses-example',
  templateUrl: 'tooltip-ellipses-example.html',
  styleUrls: ['tooltip-ellipses-example.css'],
})
export class TooltipEllipsesExample {
  public murdererTip: string = `The murderer! It was the butler, Jenkins!`;

  public nonTooltip: string = 'I knew who it was all along. I don\'t need a tip.';
}
