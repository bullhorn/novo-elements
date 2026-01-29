import { trigger, state, transition, style, animate } from '@angular/animations';
import * as i0 from '@angular/core';
import { Component, signal, HostListener, Input, Directive, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BooleanInput } from 'novo-elements/utils';

// NG2
class NovoTooltip {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTooltip, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoTooltip, isStandalone: false, selector: "novo-tooltip", ngImport: i0, template: "<div *ngIf=\"this.isHTML\" [@state]=\"noAnimate ? 'no-animation' : 'visible'\"\n     [ngClass]=\"[tooltipType, rounded ? 'rounded' : '', size ? size : '', preline? 'preline' : '', bounce ? 'bounce' : '', position]\"\n     [innerHTML]=\"message\"></div>\n<div *ngIf=\"!this.isHTML\" [@state]=\"noAnimate ? 'no-animation' : 'visible'\"\n     [ngClass]=\"[tooltipType, rounded ? 'rounded' : '', size ? size : '', preline? 'preline' : '', bounce ? 'bounce' : '', position]\">{{message}}</div>", styles: [":host div{background:var(--tooltip-background-color, #383838);color:var(--color-white, #fff);border-radius:var(--tooltip-border-radius, 4px);padding:8px 10px;font-size:12px;line-height:12px;white-space:nowrap;box-shadow:var(--shadow-2)}:host div.error{background-color:var(--color-shade-error, #b34e4d)}:host div.error.top-right:before,:host div.error.top-left:before,:host div.error.top:before{border-top-color:var(--color-shade-error, #b34e4d)}:host div.error.bottom-left:before,:host div.error.bottom-right:before,:host div.error.bottom:before{border-bottom-color:var(--color-shade-error, #b34e4d)}:host div.error.left:before{border-left-color:var(--color-shade-error, #b34e4d)}:host div.error.right:before{border-right-color:var(--color-shade-error, #b34e4d)}:host div.info{background-color:var(--color-shade-info, #3986ac)}:host div.info.top-right:before,:host div.info.top-left:before,:host div.info.top:before{border-top-color:var(--color-shade-info, #3986ac)}:host div.info.bottom-left:before,:host div.info.bottom-right:before,:host div.info.bottom:before{border-bottom-color:var(--color-shade-info, #3986ac)}:host div.info.left:before{border-left-color:var(--color-shade-info, #3986ac)}:host div.info.right:before{border-right-color:var(--color-shade-info, #3986ac)}:host div.warning{background-color:var(--color-shade-warning, #c09854)}:host div.warning.top-right:before,:host div.warning.top-left:before,:host div.warning.top:before{border-top-color:var(--color-shade-warning, #c09854)}:host div.warning.bottom-left:before,:host div.warning.bottom-right:before,:host div.warning.bottom:before{border-bottom-color:var(--color-shade-warning, #c09854)}:host div.warning.left:before{border-left-color:var(--color-shade-warning, #c09854)}:host div.warning.right:before{border-right-color:var(--color-shade-warning, #c09854)}:host div.success{background-color:var(--color-shade-success, #458746)}:host div.success.top-right:before,:host div.success.top-left:before,:host div.success.top:before{border-top-color:var(--color-shade-success, #458746)}:host div.success.bottom-left:before,:host div.success.bottom-right:before,:host div.success.bottom:before{border-bottom-color:var(--color-shade-success, #458746)}:host div.success.left:before{border-left-color:var(--color-shade-success, #458746)}:host div.success.right:before{border-right-color:var(--color-shade-success, #458746)}:host div.top-right:before,:host div.top-left:before,:host div.top:before{border-top-color:var(--tooltip-background-color, #383838)}:host div.bottom-left:before,:host div.bottom-right:before,:host div.bottom:before{border-bottom-color:var(--tooltip-background-color, #383838)}:host div.left:before{border-left-color:var(--tooltip-background-color, #383838)}:host div.right:before{border-right-color:var(--tooltip-background-color, #383838)}:host div.top:before{margin-bottom:-11px;left:calc(50% - 6px);bottom:0}:host div.top-left:before{margin-right:0;margin-bottom:-11px;right:1px;bottom:0}:host div.top-right:before{margin-left:0;margin-bottom:-11px;left:1px;bottom:0}:host div.bottom:before{margin-top:-11px;left:calc(50% - 6px);top:0}:host div.bottom-left:before{margin-right:0;margin-top:-11px;right:1px;top:0}:host div.bottom-right:before{margin-left:0;margin-top:-11px;left:1px;top:0}:host div.left:before{margin-right:-11px;margin-bottom:-6px;right:0;bottom:50%}:host div.right:before{left:0;bottom:50%;margin-left:-11px;margin-bottom:-6px}:host div:before{content:\"\";position:absolute;background:0 0;border:6px solid transparent;box-sizing:border-box}:host div.extra-large,:host div.large,:host div.small,:host div.medium{white-space:normal;line-height:1.4em;word-wrap:break-word}:host div.extra-large{width:400px;font-size:1.2vh}:host div.large{width:300px}:host div.medium{width:150px}:host div.small{width:80px}:host div.preline{white-space:pre-line}:host div.bounce{animation:bounce .75s ease-in-out infinite}@keyframes bounce{0%{transform:translateY(0)}50%{transform:translateY(-10px)}to{transform:translateY(0)}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
            trigger('state', [
                state('initial, void, hidden', style({ opacity: '0' })),
                state('visible', style({ opacity: '1' })),
                transition('* => visible', [
                    style({
                        opacity: 0,
                    }),
                    animate('0.3s 0.1s ease-in'),
                ]),
                transition('* => hidden', [
                    style({
                        opacity: 1,
                    }),
                    animate('0.3s 0.1s ease-in'),
                ]),
            ]),
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTooltip, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tooltip', animations: [
                        trigger('state', [
                            state('initial, void, hidden', style({ opacity: '0' })),
                            state('visible', style({ opacity: '1' })),
                            transition('* => visible', [
                                style({
                                    opacity: 0,
                                }),
                                animate('0.3s 0.1s ease-in'),
                            ]),
                            transition('* => hidden', [
                                style({
                                    opacity: 1,
                                }),
                                animate('0.3s 0.1s ease-in'),
                            ]),
                        ]),
                    ], standalone: false, template: "<div *ngIf=\"this.isHTML\" [@state]=\"noAnimate ? 'no-animation' : 'visible'\"\n     [ngClass]=\"[tooltipType, rounded ? 'rounded' : '', size ? size : '', preline? 'preline' : '', bounce ? 'bounce' : '', position]\"\n     [innerHTML]=\"message\"></div>\n<div *ngIf=\"!this.isHTML\" [@state]=\"noAnimate ? 'no-animation' : 'visible'\"\n     [ngClass]=\"[tooltipType, rounded ? 'rounded' : '', size ? size : '', preline? 'preline' : '', bounce ? 'bounce' : '', position]\">{{message}}</div>", styles: [":host div{background:var(--tooltip-background-color, #383838);color:var(--color-white, #fff);border-radius:var(--tooltip-border-radius, 4px);padding:8px 10px;font-size:12px;line-height:12px;white-space:nowrap;box-shadow:var(--shadow-2)}:host div.error{background-color:var(--color-shade-error, #b34e4d)}:host div.error.top-right:before,:host div.error.top-left:before,:host div.error.top:before{border-top-color:var(--color-shade-error, #b34e4d)}:host div.error.bottom-left:before,:host div.error.bottom-right:before,:host div.error.bottom:before{border-bottom-color:var(--color-shade-error, #b34e4d)}:host div.error.left:before{border-left-color:var(--color-shade-error, #b34e4d)}:host div.error.right:before{border-right-color:var(--color-shade-error, #b34e4d)}:host div.info{background-color:var(--color-shade-info, #3986ac)}:host div.info.top-right:before,:host div.info.top-left:before,:host div.info.top:before{border-top-color:var(--color-shade-info, #3986ac)}:host div.info.bottom-left:before,:host div.info.bottom-right:before,:host div.info.bottom:before{border-bottom-color:var(--color-shade-info, #3986ac)}:host div.info.left:before{border-left-color:var(--color-shade-info, #3986ac)}:host div.info.right:before{border-right-color:var(--color-shade-info, #3986ac)}:host div.warning{background-color:var(--color-shade-warning, #c09854)}:host div.warning.top-right:before,:host div.warning.top-left:before,:host div.warning.top:before{border-top-color:var(--color-shade-warning, #c09854)}:host div.warning.bottom-left:before,:host div.warning.bottom-right:before,:host div.warning.bottom:before{border-bottom-color:var(--color-shade-warning, #c09854)}:host div.warning.left:before{border-left-color:var(--color-shade-warning, #c09854)}:host div.warning.right:before{border-right-color:var(--color-shade-warning, #c09854)}:host div.success{background-color:var(--color-shade-success, #458746)}:host div.success.top-right:before,:host div.success.top-left:before,:host div.success.top:before{border-top-color:var(--color-shade-success, #458746)}:host div.success.bottom-left:before,:host div.success.bottom-right:before,:host div.success.bottom:before{border-bottom-color:var(--color-shade-success, #458746)}:host div.success.left:before{border-left-color:var(--color-shade-success, #458746)}:host div.success.right:before{border-right-color:var(--color-shade-success, #458746)}:host div.top-right:before,:host div.top-left:before,:host div.top:before{border-top-color:var(--tooltip-background-color, #383838)}:host div.bottom-left:before,:host div.bottom-right:before,:host div.bottom:before{border-bottom-color:var(--tooltip-background-color, #383838)}:host div.left:before{border-left-color:var(--tooltip-background-color, #383838)}:host div.right:before{border-right-color:var(--tooltip-background-color, #383838)}:host div.top:before{margin-bottom:-11px;left:calc(50% - 6px);bottom:0}:host div.top-left:before{margin-right:0;margin-bottom:-11px;right:1px;bottom:0}:host div.top-right:before{margin-left:0;margin-bottom:-11px;left:1px;bottom:0}:host div.bottom:before{margin-top:-11px;left:calc(50% - 6px);top:0}:host div.bottom-left:before{margin-right:0;margin-top:-11px;right:1px;top:0}:host div.bottom-right:before{margin-left:0;margin-top:-11px;left:1px;top:0}:host div.left:before{margin-right:-11px;margin-bottom:-6px;right:0;bottom:50%}:host div.right:before{left:0;bottom:50%;margin-left:-11px;margin-bottom:-6px}:host div:before{content:\"\";position:absolute;background:0 0;border:6px solid transparent;box-sizing:border-box}:host div.extra-large,:host div.large,:host div.small,:host div.medium{white-space:normal;line-height:1.4em;word-wrap:break-word}:host div.extra-large{width:400px;font-size:1.2vh}:host div.large{width:300px}:host div.medium{width:150px}:host div.small{width:80px}:host div.preline{white-space:pre-line}:host div.bounce{animation:bounce .75s ease-in-out infinite}@keyframes bounce{0%{transform:translateY(0)}50%{transform:translateY(-10px)}to{transform:translateY(0)}}\n"] }]
        }] });

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class TooltipDirective {
    set active(value) {
        this._active.set(value);
    }
    get active() {
        return this._active();
    }
    constructor(overlay, viewContainerRef, elementRef) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.elementRef = elementRef;
        this.position = 'top';
        this.type = 'normal';
        this.removeArrow = false;
        this.autoPosition = true;
        this.closeOnClick = false;
        this.onOverflow = false;
        this._active = signal(true);
    }
    isPosition(position) {
        return position.toLowerCase() === (this.position || '').toLowerCase();
    }
    isType(type) {
        return type.toLowerCase() === (this.type || '').toLowerCase();
    }
    isSize(size) {
        return size.toLowerCase() === (this.size || '').toLowerCase();
    }
    onMouseEnter() {
        if (this.tooltip && this._active() && !this.always) {
            this.show();
        }
    }
    onMouseLeave() {
        if (this.overlayRef && !this.always) {
            this.hide();
            this.overlayRef.dispose();
        }
    }
    onclick() {
        if (this.overlayRef && !this.always && this.closeOnClick) {
            this.hide();
            this.overlayRef.dispose();
        }
    }
    ngOnInit() {
        if (this.tooltip && this.always && this.active) {
            this.show();
        }
    }
    ngAfterViewInit() {
        if (this.onOverflow && this.elementRef?.nativeElement) {
            this._resizeObserver = new ResizeObserver(() => {
                const isOverflowing = this.elementRef.nativeElement.scrollWidth > this.elementRef.nativeElement.clientWidth;
                this._active.set(isOverflowing);
            });
            this._resizeObserver?.observe(this.elementRef.nativeElement);
        }
    }
    ngOnDestroy() {
        this._resizeObserver?.disconnect();
        if (this.overlayRef && !this.always) {
            this.hide();
            this.overlayRef.dispose();
        }
    }
    show() {
        const overlayState = new OverlayConfig();
        overlayState.positionStrategy = this.getPosition();
        if (this.always) {
            overlayState.scrollStrategy = this.overlay.scrollStrategies.reposition();
        }
        else {
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
    hide() {
        if (this.overlayRef) {
            this.overlayRef.detach();
        }
    }
    getPosition() {
        let defaultPosition;
        let offsetX;
        let offsetY;
        const autoPositions = [
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
        const strategy = this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
            .withFlexibleDimensions(false)
            .withDefaultOffsetX(offsetX)
            .withDefaultOffsetY(offsetY)
            .withPositions(allPositions);
        return strategy;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: TooltipDirective, deps: [{ token: i1$1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: TooltipDirective, isStandalone: false, selector: "[tooltip]", inputs: { tooltip: "tooltip", position: ["tooltipPosition", "position"], type: ["tooltipType", "type"], size: ["tooltipSize", "size"], bounce: ["tooltipBounce", "bounce"], noAnimate: ["tooltipNoAnimate", "noAnimate"], rounded: ["tooltipRounded", "rounded"], always: ["tooltipAlways", "always"], preline: ["tooltipPreline", "preline"], removeArrow: ["removeTooltipArrow", "removeArrow"], autoPosition: ["tooltipAutoPosition", "autoPosition"], isHTML: ["tooltipIsHTML", "isHTML"], closeOnClick: ["tooltipCloseOnClick", "closeOnClick"], onOverflow: ["tooltipOnOverflow", "onOverflow"], active: ["tooltipActive", "active"] }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()", "click": "onclick()", "blur": "hide()" }, properties: { "attr.data-hint": "tooltip" } }, ngImport: i0 }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], TooltipDirective.prototype, "onOverflow", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: TooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tooltip]',
                    host: {
                        '[attr.data-hint]': 'tooltip',
                    },
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: i1$1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.ElementRef }], propDecorators: { tooltip: [{
                type: Input
            }], position: [{
                type: Input,
                args: ['tooltipPosition']
            }], type: [{
                type: Input,
                args: ['tooltipType']
            }], size: [{
                type: Input,
                args: ['tooltipSize']
            }], bounce: [{
                type: Input,
                args: ['tooltipBounce']
            }], noAnimate: [{
                type: Input,
                args: ['tooltipNoAnimate']
            }], rounded: [{
                type: Input,
                args: ['tooltipRounded']
            }], always: [{
                type: Input,
                args: ['tooltipAlways']
            }], preline: [{
                type: Input,
                args: ['tooltipPreline']
            }], removeArrow: [{
                type: Input,
                args: ['removeTooltipArrow']
            }], autoPosition: [{
                type: Input,
                args: ['tooltipAutoPosition']
            }], isHTML: [{
                type: Input,
                args: ['tooltipIsHTML']
            }], closeOnClick: [{
                type: Input,
                args: ['tooltipCloseOnClick']
            }], onOverflow: [{
                type: Input,
                args: ['tooltipOnOverflow']
            }], active: [{
                type: Input,
                args: ['tooltipActive']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], onclick: [{
                type: HostListener,
                args: ['click']
            }], hide: [{
                type: HostListener,
                args: ['blur']
            }] } });

// NG2
class NovoTooltipModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTooltipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoTooltipModule, declarations: [TooltipDirective, NovoTooltip], imports: [CommonModule], exports: [TooltipDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTooltipModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TooltipDirective, NovoTooltip],
                    exports: [TooltipDirective],
                    imports: [CommonModule],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoTooltip, NovoTooltipModule, TooltipDirective };
//# sourceMappingURL=novo-elements-elements-tooltip.mjs.map
