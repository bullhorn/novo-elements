// NG
import { Directive, Input, HostListener, OnDestroy, ViewContainerRef, ElementRef, OnInit } from '@angular/core';
import {
  Overlay,
  OverlayRef,
  OverlayConfig,
  FlexibleConnectedPositionStrategy,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategyOrigin,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
// APP
import { NovoTooltip } from './Tooltip.component';

export type NovoTooltipPosition = 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right' | string;

@Directive({
  selector: '[tooltip]',
  host: {
    '[attr.data-hint]': 'tooltip',
  },
})
export class TooltipDirective implements OnDestroy, OnInit {
  private POSITIONS: { [propName: string]: ConnectionPositionPair } = {
    top: { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetX: 0, offsetY: -8 },
    right: { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8, offsetY: 0 },
    bottom: { originX: 'center', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: 0, offsetY: 8 },
    left: { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8, offsetY: 0 },
    'top-left': { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: 8, offsetY: -8 },
    'bottom-left': { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: 8, offsetY: 8 },
    'top-right': { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: -8, offsetY: -8 },
    'bottom-right': { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: -8, offsetY: 8 },
  };
  private DEFAULT_POSITIONS: ConnectionPositionPair[] = [
    { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetX: 0, offsetY: 8 },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: 0, offsetY: 8 },
    { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8, offsetY: 0 },
    { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8, offsetY: 0 },
    { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetX: 0, offsetY: -8 },
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: 0, offsetY: 8 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: 0, offsetY: -8 },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: 0, offsetY: -8 },
    { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: 8, offsetY: -8 },
    { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: 8, offsetY: 8 },
    { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: -8, offsetY: -8 },
    { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: -8, offsetY: 8 },
  ];

  @Input() tooltip: string;
  @Input('tooltipPosition') position: NovoTooltipPosition = 'top';
  @Input('tooltipType') type = 'normal';
  @Input('tooltipSize') size: string;
  @Input('tooltipBounce') bounce: string;
  @Input('tooltipNoAnimate') noAnimate: boolean;
  @Input('tooltipRounded') rounded: boolean;
  @Input('tooltipAlways') always: boolean;
  @Input('tooltipActive') active = true;
  @Input('tooltipPreline') preline: boolean;
  @Input('removeTooltipArrow') removeArrow = false;
  @Input('tooltipAutoPosition') autoPosition = false;
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
    overlayState.positionStrategy = this.getPosition(this.position, this.elementRef);

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
  }

  private hide(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  private getPosition(position: NovoTooltipPosition, origin: FlexibleConnectedPositionStrategyOrigin): FlexibleConnectedPositionStrategy {
    const preferedPosition = this.POSITIONS[position];
    const positions = preferedPosition ? [preferedPosition, ...this.DEFAULT_POSITIONS] : this.DEFAULT_POSITIONS;
    return this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions(positions)
      .withPush(false);
  }
}
