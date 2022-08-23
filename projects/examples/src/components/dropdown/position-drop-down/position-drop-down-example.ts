import { Component } from '@angular/core';

/**
 * @title Drop Down Positions
 */
@Component({
  selector: 'position-drop-down-example',
  templateUrl: 'position-drop-down-example.html',
  styleUrls: ['position-drop-down-example.css'],
})
export class PositionDropDownExample {
  public POSITION_OPTIONS: { name: string; description: string }[] = [
    {
      name: 'default (left)',
      description: 'Prefer bottom-left, with fallback positions (in order): top-left, bottom-right, top-right, center-left, center-right',
    },
    {
      name: 'right',
      description: 'Prefer bottom-right, with fallback positions (in order): top-right, bottom-left, top-left, center-left, center-right',
    },
    {
      name: 'above-below',
      description: 'Prefer bottom-left, with fallback positions (in order): top-left, bottom-right, top-right (no center)',
    },
    {
      name: 'right-above-below',
      description: 'Prefer bottom-left, with fallback positions (in order): top-left, bottom-right, top-right (no center)',
    },
    { name: 'center', description: 'Prefer center-left, with fallback positions above and below, but always covering the dropdown' },
    { name: 'bottom', description: 'Prefer bottom-left, with fallback position of bottom-right' },
    { name: 'bottom-left', description: 'Always popup to the bottom-left' },
    { name: 'bottom-right', description: 'Always popup to the bottom-right' },
    { name: 'top-left', description: 'Always popup to the top-left' },
    { name: 'top-right', description: 'Always popup to the top-right' },
  ];

  public clickMe(data: string): void {
    console.log('CLICKED!', data); // tslint:disable-line
  }
}
