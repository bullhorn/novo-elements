// NG2
import { Component, Input } from '@angular/core';

@Component({
  selector: 'novo-non-ideal-state',
  styleUrls: ['./NonIdealState.scss'],
  template: `
    <novo-icon *ngIf="icon" [color]="theme">{{ icon }}</novo-icon>
    <h4 *ngIf="title">{{ title }}</h4>
    <p *ngIf="description">{{ description }}</p>
    <ng-content></ng-content>
  `,
})
export class NonIdealStateElement {
  @Input()
  theme: string = 'light';
  @Input()
  icon: string;
  @Input()
  title: string;
  @Input()
  description: string;
}
