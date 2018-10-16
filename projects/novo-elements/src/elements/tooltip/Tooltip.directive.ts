// NG
import { Directive, Input, HostListener, OnDestroy, ViewContainerRef, ElementRef, OnInit } from '@angular/core';
import {
  Overlay,
  OverlayRef,
  OverlayConfig,
  ConnectedPositionStrategy,
  OriginConnectionPosition,
  OverlayConnectionPosition,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
// APP
import { NovoTooltip } from './Tooltip.component';

@Directive({
  selector: '[tooltip]',
  host: {
    '[attr.data-hint]': 'tooltip',
  },
})
export class TooltipDirective implements OnDestroy, OnInit {
  @Input()
  tooltip: string;
  @Input('tooltipPosition')
  position: string = 'top';
  @Input('tooltipType')
  type: string = 'normal';
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
  active: boolean = true;
  @Input('tooltipPreline')
  preline: boolean;
  @Input('removeTooltipArrow')
  removeArrow: boolean = false;
  @Input('tooltipAutoPosition')
  autoPosition: boolean = false;
  private tooltipInstance: NovoTooltip | null;
  private portal: ComponentPortal<NovoTooltip>;
  private overlayRef: OverlayRef;

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
    if (this.tooltip && this.active && !this.always) {
      this.show();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.overlayRef && !this.always) {
      this.hide();
      this.overlayRef.dispose();
    }
  }

  ngOnInit(): void {
    if (this.tooltip && this.always && this.active) {
      this.show();
    }
  }

  ngOnDestroy(): void {
    if (this.overlayRef && !this.always) {
      this.hide();
      this.overlayRef.dispose();
    }
  }

  private show(): void {
    const overlayState = new OverlayConfig();
    overlayState.positionStrategy = this.getPosition();

    if (this.always) {
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
    tooltipInstance.tooltipType = this.type;
    tooltipInstance.rounded = this.rounded;
    tooltipInstance.size = this.size;
    tooltipInstance.preline = this.preline;
    tooltipInstance.noAnimate = this.noAnimate;
    tooltipInstance.position = this.removeArrow ? 'no-arrow' : this.position;
  }

  private hide(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  private getPosition(): ConnectedPositionStrategy {
    let strategy: ConnectedPositionStrategy;
    let originPosition: OriginConnectionPosition;
    let overlayPosition: OverlayConnectionPosition;
    let offsetX: number;
    let offsetY: number;

    switch (this.position) {
      case 'right':
        originPosition = { originX: 'end', originY: 'center' };
        overlayPosition = { overlayX: 'start', overlayY: 'center' };
        offsetX = 8;
        offsetY = 0;
        break;
      case 'bottom':
        originPosition = { originX: 'center', originY: 'bottom' };
        overlayPosition = { overlayX: 'center', overlayY: 'top' };
        offsetX = 0;
        offsetY = 8;
        break;
      case 'top':
        originPosition = { originX: 'center', originY: 'top' };
        overlayPosition = { overlayX: 'center', overlayY: 'bottom' };
        offsetX = 0;
        offsetY = -8;
        break;
      case 'left':
        originPosition = { originX: 'start', originY: 'center' };
        overlayPosition = { overlayX: 'end', overlayY: 'center' };
        offsetX = -8;
        offsetY = 0;
        break;
      case 'top-left':
        originPosition = { originX: 'start', originY: 'top' };
        overlayPosition = { overlayX: 'end', overlayY: 'bottom' };
        offsetX = 8;
        offsetY = -8;
        break;
      case 'bottom-left':
        originPosition = { originX: 'start', originY: 'bottom' };
        overlayPosition = { overlayX: 'end', overlayY: 'top' };
        offsetX = 8;
        offsetY = 8;
        break;
      case 'top-right':
        originPosition = { originX: 'end', originY: 'top' };
        overlayPosition = { overlayX: 'start', overlayY: 'bottom' };
        offsetX = -8;
        offsetY = -8;
        break;
      case 'bottom-right':
        originPosition = { originX: 'end', originY: 'bottom' };
        overlayPosition = { overlayX: 'start', overlayY: 'top' };
        offsetX = -8;
        offsetY = 8;
        break;

      default:
        break;
    }
    strategy = this.overlay
      .position()
      .connectedTo(this.elementRef, originPosition, overlayPosition)
      .withOffsetX(offsetX)
      .withOffsetY(offsetY);

    return this.autoPosition ? this.withFallbackStrategy(strategy) : strategy;
  }
  private withFallbackStrategy(strategy: ConnectedPositionStrategy): ConnectedPositionStrategy {
    strategy
      .withFallbackPosition({ originX: 'center', originY: 'bottom' }, { overlayX: 'center', overlayY: 'top' }, 0, 8)
      .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 0, 8)
      .withFallbackPosition({ originX: 'end', originY: 'center' }, { overlayX: 'start', overlayY: 'center' }, 8, 0)
      .withFallbackPosition({ originX: 'start', originY: 'center' }, { overlayX: 'end', overlayY: 'center' }, -8, 0)
      .withFallbackPosition({ originX: 'center', originY: 'top' }, { overlayX: 'center', overlayY: 'bottom' }, 0, -8)
      .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }, 0, 8)
      .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }, 0, -8)
      .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 0, -8)
      .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 8, -8)
      .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 8, 8)
      .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }, -8, -8)
      .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }, -8, 8);

    return strategy;
  }
}
