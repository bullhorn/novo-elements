import { Component } from '@angular/core';

/**
 * @title Multiple Date Selection Example
 */
@Component({
  selector: 'multi-date-example',
  templateUrl: 'multi-date-example.html',
  styleUrls: ['multi-date-example.css'],
})
export class MultiDateExample {
  multi: Date[] = [];
  input: Date[] = [];
}
