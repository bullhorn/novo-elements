// NG2
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'novo-tooltip',
  templateUrl: './Tooltip.html',
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
  public position: string;
}
