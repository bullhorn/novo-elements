import { Component } from '@angular/core';

/**
 * @title Color Picker Example
 */
@Component({
  selector: 'color-picker-example',
  templateUrl: 'color-picker-example.html',
  styleUrls: ['color-picker-example.css'],
})
export class ColorPickerExample {
  hex: string = '#4A89DC';
  rgb: any = { r: 218, g: 66, b: 83 };
}
