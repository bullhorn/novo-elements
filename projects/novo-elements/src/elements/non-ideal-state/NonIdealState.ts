// NG2
import { Component, Input } from '@angular/core';

@Component({
  selector: 'novo-non-ideal-state',
  styleUrls: ['./NonIdealState.scss'],
  template: `
    <novo-icon *ngIf="icon" [color]="theme">{{ icon }}</novo-icon>
    <novo-title *ngIf="title" marginBefore>{{ title }}</novo-title>
    <novo-text *ngIf="description" block marginBefore marginAfter>{{ description }}</novo-text>
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
