// NG2
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'novo-non-ideal-state',
  styleUrls: ['./NonIdealState.scss'],
  template: `
    @if (icon) {
      <novo-icon class="novo-non-ideal-state-icon" [color]="theme">{{ icon }}</novo-icon>
    }
    <ng-content select="novo-icon"></ng-content>
    <ng-content select="novo-icon,novo-loading,novo-avatar"></ng-content>
    @if (title) {
      <novo-title class="novo-non-ideal-state-title" marginBefore>{{ title }}</novo-title>
    }
    <ng-content select="novo-title"></ng-content>
    @if (description) {
      <novo-text block marginBefore marginAfter>{{ description }}</novo-text>
    }
    <ng-content select="novo-text"></ng-content>
    <ng-content></ng-content>
  `,
  standalone: false
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
