// NG2
import { Directive, Input, HostListener, OnDestroy, ViewChild, Component, ViewContainerRef, ElementRef } from '@angular/core';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { Overlay, OverlayRef, OverlayConfig, ConnectedPositionStrategy } from '@angular/cdk/overlay';
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
  private scrollStrategy: string;

  constructor(protected overlay: Overlay, private viewContainerRef: ViewContainerRef, private elementRef: ElementRef) {}
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
    const overlayState = new OverlayConfig();

    // Get the Connected position stategy (There are other positions strategies like in the middle of the screen for modals)
    overlayState.positionStrategy = this.getPosition();

    if (this.scrollStrategy === 'reposition') {
      overlayState.scrollStrategy = this.overlay.scrollStrategies.reposition();
    } else {
      overlayState.scrollStrategy = this.overlay.scrollStrategies.close();
    }
    overlayState.scrollStrategy.enable();

    this.overlayRef = this.overlay.create(overlayState);

    this.overlayRef.detach();
    this.portal = this.portal || new ComponentPortal(NovoTooltip, this.viewContainerRef);

    let tooltipInstance = this.overlayRef.attach(this.portal).instance;
    tooltipInstance.message = this.tooltip;
    tooltipInstance!.show();
  }

  private getPosition(): ConnectedPositionStrategy {
    // The tooltip will try to be placed in the position given.
    // But it has a FallbackStrategy to avoid tooltips outside of screen and that type of issues
    if (this.position === 'right') {
      const strategy = this.overlay
        .position()
        .connectedTo(this.elementRef, { originX: 'end', originY: 'center' }, { overlayX: 'start', overlayY: 'center' })
        .withOffsetX(20)
        .withOffsetY(0);

      return this.withFallbackStrategy(strategy);
    } else if (this.position === 'bottom') {
      const strategy = this.overlay
        .position()
        .connectedTo(this.elementRef, { originX: 'center', originY: 'bottom' }, { overlayX: 'center', overlayY: 'top' })
        .withOffsetX(0)
        .withOffsetY(20);

      return this.withFallbackStrategy(strategy);
    } else if (this.position === 'top') {
      const strategy = this.overlay
        .position()
        .connectedTo(this.elementRef, { originX: 'center', originY: 'top' }, { overlayX: 'center', overlayY: 'bottom' })
        .withOffsetX(0)
        .withOffsetY(-20);

      return this.withFallbackStrategy(strategy);
    } else if (this.position === 'left') {
      const strategy = this.overlay
        .position()
        .connectedTo(this.elementRef, { originX: 'start', originY: 'center' }, { overlayX: 'end', overlayY: 'center' })
        .withOffsetX(-20)
        .withOffsetY(0);

      return this.withFallbackStrategy(strategy);
    }
  }
  private withFallbackStrategy(strategy: ConnectedPositionStrategy): ConnectedPositionStrategy {
    strategy
      .withFallbackPosition({ originX: 'center', originY: 'bottom' }, { overlayX: 'center', overlayY: 'top' }, 0, 20)
      .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 0, 20)
      .withFallbackPosition({ originX: 'end', originY: 'center' }, { overlayX: 'start', overlayY: 'center' }, 20, 0)
      .withFallbackPosition({ originX: 'start', originY: 'center' }, { overlayX: 'end', overlayY: 'center' }, -20, 0)
      .withFallbackPosition({ originX: 'center', originY: 'top' }, { overlayX: 'center', overlayY: 'bottom' }, 0, -20)
      .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }, 0, 20)
      .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }, 0, -20)
      .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 0, -20);

    return strategy;
  }
}
