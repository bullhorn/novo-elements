import { Component } from '@angular/core';

/**
 * @title Color Input Example
 */
@Component({
  selector: 'color-input-example',
  templateUrl: 'color-input-example.html',
  styleUrls: ['color-input-example.css'],
})
export class ColorInputExample {
  hex: string = '#4A89DC';
  rgb: any = { r: 218, g: 66, b: 83 };
}
