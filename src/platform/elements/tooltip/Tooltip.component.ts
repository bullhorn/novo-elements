// NG2
import { Directive, Input, HostListener, OnDestroy, ViewChild, Component, ViewContainerRef } from '@angular/core';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'novo-tooltip',
  template: `<div>{{message}}</div>`,
  styleUrls: ['./Tooltip.scss'],
})
export class NovoTooltip {
  public message: string;
  public hidden: boolean;

  constructor(private overlay: Overlay, private containerRef: ViewContainerRef) {}

  public open(): void {}

  public show(): void {
    this.hidden = false;
  }

  public hide(): void {
    this.hidden = true;
  }
}
