// NG2
import { Directive, Input, HostListener, OnDestroy, ViewChild, Component, ViewContainerRef } from '@angular/core';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { Overlay } from '@angular/cdk/overlay';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'novo-tooltip',
  template: `<div [@state]="noAnimate ? 'no-animation' : 'visible'" 
  [ngClass]="[tooltipType, this.rounded ? 'rounded' : '', size ? size : '', this.preline? 'preline' : '']">{{message}}</div>`,
  styleUrls: ['./Tooltip.scss'],
  animations: [
    trigger('state', [
      state('initial, void, hidden', style({ opacity: '0' })),
      state('visible', style({ opacity: '1' })),
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
  public preline: boolean;
  public noAnimate: boolean;

  constructor(private overlay: Overlay, private containerRef: ViewContainerRef) {}
}
