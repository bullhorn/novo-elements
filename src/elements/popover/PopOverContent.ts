import { Component, AfterViewInit, OnDestroy, Input, ViewChild, ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { PopOverDirective } from './PopOver';

@Component({
    selector: 'popover-content',
    template: `
<div #popoverDiv class="popover {{ effectivePlacement }}"
     [style.top]="top + 'px'"
     [style.left]="left + 'px'"
     [class.fade]="animation"
     style="display: block"
     role="popover">
    <div class="virtual-area"></div>
    <div class="arrow {{effectiveAlignment}}"></div> 
    <h4 class="popover-title" [hidden]="!title">{{ title }}</h4>
    <div class="popover-content">
        <ng-content></ng-content>
        <div class="popover-content-text">{{ content }}</div>
    </div> 
</div>
`
})
export class PopOverContent implements AfterViewInit {
    @Input() content:string;
    @Input() placement:string = 'top';
    @Input() title:string;
    @Input() animation:boolean = true;

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

    constructor(protected element: ElementRef,
                protected cdr: ChangeDetectorRef) {
    }

    ngAfterViewInit(): void {
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
        if (!this.popover || !this.popover.getElement()) {
            return;
        }

        const p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
        this.displayType = 'block';
        this.top = p.top;
        this.left = p.left;
        this.isHidden = false;
    }

    hide(): void {
        this.top = -10000;
        this.left = -10000;
        this.isHidden = true;
        this.popover.hide();
    }

    hideFromPopover() {
        this.top = -10000;
        this.left = -10000;
    }

    protected positionElements(hostEl: HTMLElement, targetEl: HTMLElement, positionStr: string, appendToBody = false): { top: number, left: number } {
        let positionStrParts = positionStr.split('-');
        let mainSide = this.effectivePlacement = this.getEffectivePlacement(positionStrParts[0] || 'right', hostEl, targetEl);
        let orientation = this.effectiveAlignment = positionStrParts[1] || 'center';
        let hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        let targetElWidth = targetEl.offsetWidth;
        let targetElHeight = targetEl.offsetHeight;

        let shiftWidth: any = {
            center: function (): number {
                return hostElPos.left + ( hostElPos.width - targetElWidth ) / 2;
            },
            right: function (): number {
                return hostElPos.left;
            },
            left: function (): number {
                return hostElPos.left + ( hostElPos.width - targetElWidth );
            }
        };

        let shiftHeight: any = {
            center: function (): number {
                return hostElPos.top + ( hostElPos.height - targetElHeight ) / 2;
            },
            bottom: function (): number {
                return hostElPos.top;
            },
            top: function (): number {
                return hostElPos.top + ( hostElPos.height - targetElHeight );
            }
        };

        let targetElPos: { top: number, left: number };
        switch (mainSide) {
            case 'right':
                targetElPos = {
                    top: shiftHeight[orientation](),
                    left: hostElPos.left + hostElPos.width
                };
                break;

            case 'left':
                targetElPos = {
                    top: shiftHeight[orientation](),
                    left: hostElPos.left - targetElWidth
                };
                break;

            case 'bottom':
                targetElPos = {
                    top: hostElPos.top + hostElPos.height,
                    left: shiftWidth[orientation]()
                };
                break;

            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[orientation]()
                };
                break;
        }

        return targetElPos;
    }

    protected position(nativeEl: HTMLElement): { width: number, height: number, top: number, left: number } {
        let offsetParentBCR = { top: 0, left: 0 };
        const elBCR = this.offset(nativeEl);
        const offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    }

    protected offset(nativeEl: any): { width: number, height: number, top: number, left: number } {
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
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
        return (this.getStyle(nativeEl, 'position') || 'static' ) === 'static';
    }

    protected parentOffsetEl(nativeEl: HTMLElement): any {
        let offsetParent: any = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }

    protected getEffectivePlacement(desiredPlacement: string, hostElement: HTMLElement, targetElement: HTMLElement): string {
        const hostElBoundingRect = hostElement.getBoundingClientRect();

        if (desiredPlacement === 'top' && hostElBoundingRect.top - targetElement.offsetHeight < 0) {
            return 'bottom';
        }
        if (desiredPlacement === 'bottom' && hostElBoundingRect.bottom + targetElement.offsetHeight > window.innerHeight) {
            return 'top';
        }
        if (desiredPlacement === 'left' && hostElBoundingRect.left - targetElement.offsetWidth < 0) {
            return 'right';
        }
        if (desiredPlacement === 'right' && hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
            return 'left';
        }

        return desiredPlacement;
    }
}
