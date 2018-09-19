// NG2
import { Directive, Input, HostListener, OnDestroy, ViewChild, Component, ViewContainerRef } from '@angular/core';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'novo-tooltip',
  template: `<div [ngClass]="[tooltipType, this.rounded ? 'rounded' : '', size ? size : '']" [ngStyle]="style">{{message}}</div>`,
  styleUrls: ['./Tooltip.scss'],
})
export class NovoTooltip {
  public message: string;
  public hidden: boolean;
  public tooltipType: string;
  public rounded: boolean;
  public size: string;
  public style: any;

  constructor(private overlay: Overlay, private containerRef: ViewContainerRef) {}

  public open(): void {}

  public show(): void {
    this.hidden = false;
  }

  public hide(): void {
    this.hidden = true;
  }
}
