import { Component } from '@angular/core';

/**
 * @title Badge In A Field Label
 */
@Component({
  selector: 'badge-field-example',
  templateUrl: 'badge-field-example.html',
  styleUrls: ['badge-field-example.css'],
  standalone: false,
})
export class BadgeFieldExample {
  public rate: string = '65.00';
  public unreadNotes: number = 3;
}
