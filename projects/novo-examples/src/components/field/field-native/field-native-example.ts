import { Component } from '@angular/core';

/**
 * @title Field Native Example
 */
@Component({
    selector: 'field-native-example',
    templateUrl: 'field-native-example.html',
    styleUrls: ['field-native-example.css'],
    standalone: false,
})
export class FieldNativeExample {
  appearance = 'standard';
  direction = 'horizontal';
  fullWidth = false;
  hide = true;
}
