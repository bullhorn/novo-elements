// NG2
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'novo-non-ideal-state',
  styleUrls: ['./NonIdealState.scss'],
  template: `
    <novo-icon class="novo-non-ideal-state-icon" *ngIf="icon" [color]="theme">{{ icon }}</novo-icon>
    <novo-title class="novo-non-ideal-state-title" *ngIf="title" marginBefore>{{ title }}</novo-title>
    <novo-text *ngIf="description" block marginBefore marginAfter>{{ description }}</novo-text>
    <ng-content></ng-content>
  `,
})
export class NonIdealStateElement {
  @HostBinding('class')
  hb_class = 'novo-non-ideal-state';

  @Input()
  theme: string = 'light';
  @Input()
  icon: string;
  @Input()
  title: string;
  @Input()
  description: string;
}
