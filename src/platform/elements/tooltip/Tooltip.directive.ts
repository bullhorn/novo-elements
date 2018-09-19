// NG2
import { Directive, Input, HostListener, OnDestroy, ViewChild, Component, ViewContainerRef } from '@angular/core';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { NovoTooltip } from './Tooltip.component';
import { ComponentPortal } from '@angular/cdk/portal';

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
  private portal: ComponentPortal<NovoTooltip>;
  private overlayRef: OverlayRef;

  constructor(protected overlay: Overlay, private viewContainerRef: ViewContainerRef) {}
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
    if (this.tooltip) {
      this.show();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    // hide tooltip
  }

  ngOnDestroy(): void {
    // hide tooltip
  }

  private show(): void {
    this.overlayRef = this.overlay.create({
      height: '400px',
      width: '600px',
    });

    this.overlayRef.detach();
    this.portal = this.portal || new ComponentPortal(NovoTooltip, this.viewContainerRef);

    let tooltipInstance = this.overlayRef.attach(this.portal).instance;
    tooltipInstance.message = this.tooltip;
    tooltipInstance!.show();
  }
}
