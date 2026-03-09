import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { PopOverDirective } from './PopOver';

@Component({
    selector: 'popover-content',
    template: `
    <div
      #popoverDiv
      class="popover {{ effectivePlacement }}"
      [style.top]="top + 'px'"
      [style.left]="left + 'px'"
      [class.fade]="animation"
      style="display: block"
      role="popover"
    >
      <div class="arrow {{ effectiveAlignment }}"></div>
      <div class="popover-title" [hidden]="!title">{{ title }}</div>
      <div class="popover-content">
        <ng-content></ng-content>
        <div *ngIf="htmlContent" class="popover-content-text" [innerHTML]="htmlContent"></div>
        <div *ngIf="!htmlContent" class="popover-content-text">{{ content }}</div>
      </div>
    </div>
  `,
    styleUrls: ['./PopOver.scss'],
    standalone: false,
})
export class PopOverContent implements AfterViewInit {
  @Input()
  content: string;
  @Input()
  htmlContent: string;
  @Input()
  placement: string = 'top';
  @Input()
  title: string;
  @Input()
  animation: boolean = true;

  @ViewChild('popoverDiv')
  popoverDiv: ElementRef;
  popover: PopOverDirective;
  onCloseFromOutside = new EventEmitter();
  top: number = -10000;
  left: number = -10000;
  displayType: string = 'none';
  effectivePlacement: string;
  effectiveAlignment: string;
  isHidden: boolean = false;

  constructor(protected element: ElementRef, protected cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.show();
    this.cdr.detectChanges();
  }

  toggle(): void {
    if (this.isHidden) {
      this.show();
    } else {
      this.hide();
    }
  }

  show(): void {
    console.log('show popover', !!this.popover);
    console.log('show popover getElement', !!this.popover?.getElement());
    if (!this.popover || !this.popover.getElement()) {
      return;
    }

    const p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
    this.displayType = 'block';
    this.top = p.top;
    this.left = p.left;
    this.isHidden = false;

    // Host
    this.popover.getElement().setAttribute('style', 'border: 1px solid red;');
    // Target
    this.popoverDiv.nativeElement.setAttribute('style', this.popoverDiv.nativeElement.getAttribute('style') + 'border: 1px solid blue;');
  }

  hide(): void {
    console.log('hide');
    this.top = -10000;
    this.left = -10000;
    this.isHidden = true;
    this.popover.hide();
  }

  hideFromPopover() {
    this.top = -10000;
    this.left = -10000;
  }

  protected positionElements(
    hostEl: HTMLElement,
    targetEl: HTMLElement,
    positionStr: string,
    appendToBody = false,
  ): { top: number; left: number } {

    console.log('positionElements positionStr', positionStr);
    console.log('positionElements appendToBody', appendToBody);
    const positionStrParts = positionStr.split('-');
    const mainSide = (this.effectivePlacement = this.getEffectivePlacement(positionStrParts[0] || 'right', hostEl, targetEl));
    // const orientation = (this.effectiveAlignment = positionStrParts[1] || 'center');
    const orientation = (this.effectiveAlignment = this.getEffectivePlacement(positionStrParts[1] || 'center', hostEl, targetEl));
    const hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
    console.log('positionElements hostElPos', hostElPos);
    const targetElWidth = targetEl.offsetWidth;
    const targetElHeight = targetEl.offsetHeight;

    console.log('positionElements mainSide', mainSide);
    console.log('positionElements orientation', orientation);

    const shiftWidth: any = {
      center(): number {
        return hostElPos.left + (hostElPos.width - targetElWidth) / 2;
      },
      right(): number {
        return hostElPos.left;
      },
      left(): number {
        return hostElPos.left + (hostElPos.width - targetElWidth);
      },
    };

    const shiftHeight: any = {
      center(): number {
        return hostElPos.top + (hostElPos.height - targetElHeight) / 2;
      },
      bottom(): number {
        return hostElPos.top;
      },
      top(): number {
        return hostElPos.top + (hostElPos.height - targetElHeight);
      },
    };

    let targetElPos: { top: number; left: number };
    switch (mainSide) {
      case 'right':
        targetElPos = {
          top: shiftHeight[orientation](),
          left: hostElPos.left + hostElPos.width,
        };
        break;

      case 'left':
        targetElPos = {
          top: shiftHeight[orientation](),
          left: hostElPos.left - targetElWidth,
        };
        break;

      case 'bottom':
        targetElPos = {
          top: hostElPos.top + hostElPos.height,
          left: shiftWidth[orientation](),
        };
        break;

      default:
        targetElPos = {
          top: hostElPos.top - targetElHeight,
          left: shiftWidth[orientation](),
        };
        break;
    }

    return targetElPos;
  }

  protected position(nativeEl: HTMLElement): { width: number; height: number; top: number; left: number } {
    let offsetParentBCR = { top: 0, left: 0 };
    const elBCR = this.offset(nativeEl);
    const offsetParentEl = this.parentOffsetEl(nativeEl);
    console.log('position elBCR', elBCR);
    if (offsetParentEl !== window.document) {
      console.log('position offsetParentEl is NOT window.document', offsetParentBCR);
      offsetParentBCR = this.offset(offsetParentEl);
      console.log('position offsetParentBCR', offsetParentBCR);
      offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
      offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
    }

    const boundingClientRect = nativeEl.getBoundingClientRect();
    console.log('position boundingClientRect', boundingClientRect);
    return {
      width: boundingClientRect.width || nativeEl.offsetWidth,
      height: boundingClientRect.height || nativeEl.offsetHeight,
      top: elBCR.top - offsetParentBCR.top,
      left: elBCR.left - offsetParentBCR.left,
    };
  }

  protected offset(nativeEl: any): { width: number; height: number; top: number; left: number } {
    console.log('offset');
    const boundingClientRect = nativeEl.getBoundingClientRect();
    return {
      width: boundingClientRect.width || nativeEl.offsetWidth,
      height: boundingClientRect.height || nativeEl.offsetHeight,
      top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
      left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft),
    };
  }

  protected getStyle(nativeEl: HTMLElement, cssProp: string): string {
    if ((nativeEl as any).currentStyle) {
      return (nativeEl as any).currentStyle[cssProp];
    }

    if (window.getComputedStyle) {
      return (window.getComputedStyle as any)(nativeEl)[cssProp];
    }

    return (nativeEl.style as any)[cssProp];
  }

  protected isStaticPositioned(nativeEl: HTMLElement): boolean {
    console.log('isStaticPositioned', (this.getStyle(nativeEl, 'position') || 'static') === 'static');
    return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
  }

  protected parentOffsetEl(nativeEl: HTMLElement): any {
    console.log('parentOffsetEl');
    let offsetParent: any = nativeEl.offsetParent || window.document;
    while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || window.document;
  }

  protected getEffectivePlacement(desiredPlacement: string, hostElement: HTMLElement, targetElement: HTMLElement): string {
    console.log('desiredPlacement', desiredPlacement);
    const hostElBoundingRect = hostElement.getBoundingClientRect();

    if (desiredPlacement === 'top' && hostElBoundingRect.top - targetElement.offsetHeight < 0) {
      console.log('!!! hit top', hostElBoundingRect.top - targetElement.offsetHeight, 'reposition to bottom');
      return 'bottom';
    }
    if (desiredPlacement === 'bottom' && hostElBoundingRect.bottom + targetElement.offsetHeight > window.innerHeight) {
      console.log('!!! hit bottom', hostElBoundingRect.top - targetElement.offsetHeight, 'reposition to top');
      return 'top';
    }
    if (desiredPlacement === 'left' && hostElBoundingRect.left - targetElement.offsetWidth < 0) {
      console.log('!!! hit left', hostElBoundingRect.top - targetElement.offsetHeight, 'reposition to right');
      return 'right';
    }
    if (desiredPlacement === 'right' && hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
      console.log('!!! hit right', hostElBoundingRect.top - targetElement.offsetHeight, 'reposition to left');
      return 'left';
    }
    console.log('!!! didnt hit anything --> ', desiredPlacement);
    return desiredPlacement;
  }
}
