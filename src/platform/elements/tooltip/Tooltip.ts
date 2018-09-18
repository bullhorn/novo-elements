// NG2
import { Directive, Input, HostListener, OnDestroy, ViewChild, Component } from '@angular/core';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { Overlay } from '@angular/cdk/overlay';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input()
  tooltip: string;
  @Input('tooltipPosition')
  position: string = 'top';
  @Input('tooltipType')
  type: string;
  @Input('tooltipSize')
  size: string;
  @Input('tooltipBounce')
  bounce: string;
  @Input('tooltipNoAnimate')
  noAnimate: boolean;
  @Input('tooltipRounded')
  rounded: boolean;
  @Input('tooltipAlways')
  always: boolean;
  @Input('tooltipActive')
  active: boolean;
  @Input('tooltipPreline')
  preline: boolean;
  private tooltipInstance: NovoTooltip | null;

  constructor(protected overlay: Overlay) {}
  isPosition(position: string): boolean {
    return position.toLowerCase() === (this.position || '').toLowerCase();
  }

  isType(type: string): boolean {
    return type.toLowerCase() === (this.type || '').toLowerCase();
  }

  isSize(size: string): boolean {
    return size.toLowerCase() === (this.size || '').toLowerCase();
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.overlay.create({
      height: '400px',
      width: '600px',
    });
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    // hide tooltip
  }

  ngOnDestroy(): void {
    // hide tooltip
  }
}

@Component({
  selector: 'novo-tooltip',
  template: `<div>{{message}}</div>`,
})
export class NovoTooltip {
  public message: string;

  constructor(protected overlay: Overlay) {}

  public open(): void {}
}
