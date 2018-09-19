// NG2
import { Directive, Input, HostListener, OnDestroy, ViewChild, Component, ViewContainerRef } from '@angular/core';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { Overlay } from '@angular/cdk/overlay';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'novo-tooltip',
  template: `<div [@state]="'visible'" [ngClass]="[tooltipType, this.rounded ? 'rounded' : '', size ? size : '']" [ngStyle]="style">{{message}}</div>`,
  styleUrls: ['./Tooltip.scss'],
  animations: [
    trigger('state', [
      state('initial, void, hidden', style({ opacity: '0', transform: 'translate(0px, 0px)' })),
      state(
        'visible',
        style({ opacity: '1', transform: 'translate({{positionStrategy.withOffsetX}}px, {{positionStrategy.withOffsetY}}px)' }),
        { params: { 'positionStrategy.withOffsetX': 0, 'positionStrategy.withOffsetY': 0 } },
      ),
      transition('* => visible', [
        style({
          opacity: 0,
          visibility: 'visible',
        }),
        animate('0.3s ease-in'),
      ]),
      transition('* => hidden', [
        style({
          opacity: 1,
          visibility: 'hidden',
        }),
        animate('0.3s ease-in'),
      ]),
    ]),
  ],
})
export class NovoTooltip {
  public message: string;
  public hidden: boolean;
  public tooltipType: string;
  public rounded: boolean;
  public size: string;
  public positionStrategy: any;

  constructor(private overlay: Overlay, private containerRef: ViewContainerRef) {}

  public open(): void {}

  public show(): void {
    this.hidden = false;
  }

  public hide(): void {
    this.hidden = true;
  }
}
