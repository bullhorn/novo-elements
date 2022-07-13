// NG
import { ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
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
  bounce: boolean;
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
  autoPosition: boolean = true;
  @Input('tooltipIsHTML')
  isHTML: boolean;

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

  show(): void {
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

    const tooltipInstance = this.overlayRef.attach(this.portal).instance;
    tooltipInstance.message = this.tooltip;
    tooltipInstance.tooltipType = this.type;
    tooltipInstance.rounded = this.rounded;
    tooltipInstance.size = this.size;
    tooltipInstance.preline = this.preline;
    tooltipInstance.noAnimate = this.noAnimate;
    tooltipInstance.position = this.removeArrow ? 'no-arrow' : this.position;
    tooltipInstance.isHTML = this.isHTML;
    tooltipInstance.bounce = this.bounce;
  }

  @HostListener('blur')
  hide(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  private getPosition(): FlexibleConnectedPositionStrategy {
    let strategy: FlexibleConnectedPositionStrategy;
    let defaultPosition: ConnectedPosition;
    let offsetX: number;
    let offsetY: number;
    let autoPositions: ConnectedPosition[] = [
      { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetX: 0, offsetY: 12 },
      { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: 0, offsetY: 12 },
      { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 12, offsetY: 0 },
      { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -12, offsetY: 0 },
      { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetX: 0, offsetY: -12 },
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: 0, offsetY: 12 },
      { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: 0, offsetY: -12 },
      { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: 0, offsetY: -12 },
      { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: 12, offsetY: -12 },
      { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: 12, offsetY: 12 },
      { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: -12, offsetY: -12 },
      { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: -12, offsetY: 12 },
    ];

    switch (this.position) {
      case 'right':
        defaultPosition = { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' };
        offsetX = 12;
        offsetY = 0;
        break;
      case 'bottom':
        defaultPosition = { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' };
        offsetX = 0;
        offsetY = 12;
        break;
      case 'top':
        defaultPosition = { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' };
        offsetX = 0;
        offsetY = -12;
        break;
      case 'left':
        defaultPosition = { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' };
        offsetX = -12;
        offsetY = 0;
        break;
      case 'top-left':
        defaultPosition = { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'bottom' };
        offsetX = 12;
        offsetY = -12;
        break;
      case 'bottom-left':
        defaultPosition = { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top' };
        offsetX = 12;
        offsetY = 12;
        break;
      case 'top-right':
        defaultPosition = { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom' };
        offsetX = -12;
        offsetY = -12;
        break;
      case 'bottom-right':
        defaultPosition = { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top' };
        offsetX = -12;
        offsetY = 12;
        break;
      default:
        break;
    }

    const allPositions = this.autoPosition ? [defaultPosition].concat(autoPositions) : [defaultPosition];
    strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withFlexibleDimensions(false)
      .withDefaultOffsetX(offsetX)
      .withDefaultOffsetY(offsetY)
      .withPositions(allPositions);
    return strategy;
  }
}
