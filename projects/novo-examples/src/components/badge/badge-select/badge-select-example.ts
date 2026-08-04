import { Component } from '@angular/core';
import { NovoBadgeColor } from 'novo-elements';

interface Stage {
  label: string;
  count: number;
  color: NovoBadgeColor;
}

/**
 * @title Badge In A Select Dropdown
 */
@Component({
  selector: 'badge-select-example',
  templateUrl: 'badge-select-example.html',
  styleUrls: ['badge-select-example.css'],
  standalone: false,
})
export class BadgeSelectExample {
  public stages: Stage[] = [
    { label: 'New Applicants', count: 12, color: 'positive' },
    { label: 'Phone Screen', count: 5, color: 'neutral' },
    { label: 'Client Submitted', count: 3, color: 'warning' },
    { label: 'Placed', count: 8, color: 'success' },
    { label: 'Rejected', count: 21, color: 'negative' },
  ];
  public selectedStage: Stage = this.stages[0];
}
