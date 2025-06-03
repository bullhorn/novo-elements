import { Component } from '@angular/core';

/**
 * @title Legacy Select Option Example
 */
@Component({
  selector: 'legacy-select-option-example',
  templateUrl: './legacy-select-option-example.html',
  styleUrls: ['./legacy-select-option-example.css'],
})
export class LegacySelectOptionExample {
  public placeholder: string = 'Select...';
  public options: Array<string> = ['Alpha', 'Bravo', 'Charlie'];
  public value: string = 'Delta';
}