import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { HostBinding, Input, Component, Directive, TemplateRef, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NG2
class NovoLoadingElement {
    constructor() {
        this.size = 'medium';
    }
    /**
     * **deprecated** please use `color`.
     * @deprecated
     **/
    set theme(value) {
        console.warn('\'theme\' property is deprecated, please use \'color\'.');
        this.color = value;
    }
    get theme() {
        return this.color;
    }
    get hb_class() {
        return [`color-${this.color}`, `size-${this.size}`].join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLoadingElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoLoadingElement, isStandalone: false, selector: "novo-loading", inputs: { theme: "theme", color: "color", size: "size" }, host: { properties: { "class": "this.hb_class" } }, ngImport: i0, template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `, isInline: true, styles: [":host{padding:20px;display:flex;flex-direction:row;font-size:13px;gap:.3em}:host.size-small{padding:8px;font-size:8px}:host.size-large{font-size:18px}:host span.dot{display:block;border-radius:50%;height:1em;width:1em}:host span.dot:nth-of-type(1){background-color:#4a89dc}:host span.dot:nth-of-type(2){background-color:#967adc}:host span.dot:nth-of-type(3){background-color:#da4453}:host span.dot:nth-of-type(4){background-color:#f6b042}:host span.dot:nth-of-type(5){background-color:#37bc9b}:host span.dot:nth-of-type(1){animation:jump 1.6s ease-in-out 70ms forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:70ms;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(2){animation:jump 1.6s ease-in-out .14s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.14s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(3){animation:jump 1.6s ease-in-out .21s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.21s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(4){animation:jump 1.6s ease-in-out .28s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.28s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(5){animation:jump 1.6s ease-in-out .35s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.35s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host.color-aqua span.dot{background-color:#3bafda}:host.color-ocean span.dot{background-color:#4a89dc}:host.color-mint span.dot{background-color:#37bc9b}:host.color-grass span.dot{background-color:#8cc152}:host.color-sunflower span.dot{background-color:#f6b042}:host.color-bittersweet span.dot{background-color:#eb6845}:host.color-grapefruit span.dot{background-color:#da4453}:host.color-carnation span.dot{background-color:#d770ad}:host.color-lavender span.dot{background-color:#967adc}:host.color-mountain span.dot{background-color:#9678b6}:host.white span.dot,:host[inverse] span.dot{background-color:#fff!important}@keyframes jump{0%{transform:translateY(0)}30%{transform:translateY(0);opacity:1}45%{transform:translateY(-1.2em);opacity:.5}60%{transform:translateY(.8em);opacity:.95}to{transform:translateY(0);opacity:1}}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLoadingElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-loading', template: `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `, standalone: false, styles: [":host{padding:20px;display:flex;flex-direction:row;font-size:13px;gap:.3em}:host.size-small{padding:8px;font-size:8px}:host.size-large{font-size:18px}:host span.dot{display:block;border-radius:50%;height:1em;width:1em}:host span.dot:nth-of-type(1){background-color:#4a89dc}:host span.dot:nth-of-type(2){background-color:#967adc}:host span.dot:nth-of-type(3){background-color:#da4453}:host span.dot:nth-of-type(4){background-color:#f6b042}:host span.dot:nth-of-type(5){background-color:#37bc9b}:host span.dot:nth-of-type(1){animation:jump 1.6s ease-in-out 70ms forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:70ms;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(2){animation:jump 1.6s ease-in-out .14s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.14s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(3){animation:jump 1.6s ease-in-out .21s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.21s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(4){animation:jump 1.6s ease-in-out .28s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.28s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host span.dot:nth-of-type(5){animation:jump 1.6s ease-in-out .35s forward infinite \"\" \"\";animation-name:jump;animation-duration:1.6s;animation-timing-function:ease-in-out;animation-delay:.35s;animation-direction:forward;animation-iteration-count:infinite;animation-fill-mode:\"\";animation-play-state:\"\"}:host.color-aqua span.dot{background-color:#3bafda}:host.color-ocean span.dot{background-color:#4a89dc}:host.color-mint span.dot{background-color:#37bc9b}:host.color-grass span.dot{background-color:#8cc152}:host.color-sunflower span.dot{background-color:#f6b042}:host.color-bittersweet span.dot{background-color:#eb6845}:host.color-grapefruit span.dot{background-color:#da4453}:host.color-carnation span.dot{background-color:#d770ad}:host.color-lavender span.dot{background-color:#967adc}:host.color-mountain span.dot{background-color:#9678b6}:host.white span.dot,:host[inverse] span.dot{background-color:#fff!important}@keyframes jump{0%{transform:translateY(0)}30%{transform:translateY(0);opacity:1}45%{transform:translateY(-1.2em);opacity:.5}60%{transform:translateY(.8em);opacity:.95}to{transform:translateY(0);opacity:1}}\n"] }]
        }], propDecorators: { theme: [{
                type: Input
            }], color: [{
                type: Input
            }], size: [{
                type: Input
            }], hb_class: [{
                type: HostBinding,
                args: ['class']
            }] } });
class NovoSpinnerElement {
    constructor() {
        this.size = 'medium';
    }
    /**
     * **deprecated** please use `color`.
     * @deprecated
     **/
    set theme(value) {
        console.warn('\'theme\' property is deprecated, please use \'color\'.');
        this.color = value;
    }
    get theme() {
        return this.color;
    }
    get inverse() {
        return this._inverse;
    }
    set inverse(value) {
        this._inverse = coerceBooleanProperty(value);
    }
    get hb_class() {
        return [this.inverse ? 'color-white' : `color-${this.color}`, `size-${this.size}`].join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSpinnerElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoSpinnerElement, isStandalone: false, selector: "novo-spinner", inputs: { theme: "theme", color: "color", size: "size", inverse: "inverse" }, host: { properties: { "class": "this.hb_class" } }, ngImport: i0, template: `
    <div class="dot1 dot"></div>
    <div class="dot2 dot"></div>
    <div class="dot3 dot"></div>
    <div class="dot4 dot"></div>
    <div class="dot5 dot"></div>
    <div class="dot6 dot"></div>
    <div class="dot7 dot"></div>
    <div class="dot8 dot"></div>
    <div class="dot9 dot"></div>
    <div class="dot10 dot"></div>
    <div class="dot11 dot"></div>
    <div class="dot12 dot"></div>
  `, isInline: true, styles: [":host{display:inline-block;width:1.8em;height:1.8em;position:relative}:host.size-small{width:1.2em;height:1.2em}:host.size-large{width:2.1em;height:2.1em}:host .dot{width:100%;height:100%;position:absolute;left:0;top:0}:host .dot:before{content:\"\";display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;-webkit-animation:dotFadeDelay 1.2s infinite ease-in-out both;animation:dotFadeDelay 1.2s infinite ease-in-out both}:host.aqua .dot:before{background-color:#3bafda}:host.ocean .dot:before{background-color:#4a89dc}:host.mint .dot:before{background-color:#37bc9b}:host.grass .dot:before{background-color:#8cc152}:host.sunflower .dot:before{background-color:#f6b042}:host.bittersweet .dot:before{background-color:#eb6845}:host.grapefruit .dot:before{background-color:#da4453}:host.carnation .dot:before{background-color:#d770ad}:host.lavender .dot:before{background-color:#967adc}:host.mountain .dot:before{background-color:#9678b6}:host.multicolor .dot:nth-of-type(1):before{background-color:#3bafda}:host.multicolor .dot:nth-of-type(2):before{background-color:#4a89dc}:host.multicolor .dot:nth-of-type(3):before{background-color:#37bc9b}:host.multicolor .dot:nth-of-type(4):before{background-color:#8cc152}:host.multicolor .dot:nth-of-type(5):before{background-color:#f6b042}:host.multicolor .dot:nth-of-type(6):before{background-color:#eb6845}:host.multicolor .dot:nth-of-type(7):before{background-color:#da4453}:host.multicolor .dot:nth-of-type(8):before{background-color:#d770ad}:host.multicolor .dot:nth-of-type(9):before{background-color:#967adc}:host.multicolor .dot:nth-of-type(10):before{background-color:#9678b6}:host.white .dot:before,:host[inverse] .dot:before{background-color:#fff}:host .dot2{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}:host .dot3{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}:host .dot4{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}:host .dot5{-webkit-transform:rotate(120deg);-ms-transform:rotate(120deg);transform:rotate(120deg)}:host .dot6{-webkit-transform:rotate(150deg);-ms-transform:rotate(150deg);transform:rotate(150deg)}:host .dot7{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}:host .dot8{-webkit-transform:rotate(210deg);-ms-transform:rotate(210deg);transform:rotate(210deg)}:host .dot9{-webkit-transform:rotate(240deg);-ms-transform:rotate(240deg);transform:rotate(240deg)}:host .dot10{-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}:host .dot11{-webkit-transform:rotate(300deg);-ms-transform:rotate(300deg);transform:rotate(300deg)}:host .dot12{-webkit-transform:rotate(330deg);-ms-transform:rotate(330deg);transform:rotate(330deg)}:host .dot2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}:host .dot3:before{-webkit-animation-delay:-1s;animation-delay:-1s}:host .dot4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}:host .dot5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}:host .dot6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}:host .dot7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}:host .dot8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}:host .dot9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}:host .dot10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}:host .dot11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}:host .dot12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes dotFadeDelay{0%,39%,to{opacity:0}40%{opacity:1}}@keyframes dotFadeDelay{0%,39%,to{opacity:0}40%{opacity:1}}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSpinnerElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-spinner', template: `
    <div class="dot1 dot"></div>
    <div class="dot2 dot"></div>
    <div class="dot3 dot"></div>
    <div class="dot4 dot"></div>
    <div class="dot5 dot"></div>
    <div class="dot6 dot"></div>
    <div class="dot7 dot"></div>
    <div class="dot8 dot"></div>
    <div class="dot9 dot"></div>
    <div class="dot10 dot"></div>
    <div class="dot11 dot"></div>
    <div class="dot12 dot"></div>
  `, standalone: false, styles: [":host{display:inline-block;width:1.8em;height:1.8em;position:relative}:host.size-small{width:1.2em;height:1.2em}:host.size-large{width:2.1em;height:2.1em}:host .dot{width:100%;height:100%;position:absolute;left:0;top:0}:host .dot:before{content:\"\";display:block;margin:0 auto;width:15%;height:15%;background-color:#333;border-radius:100%;-webkit-animation:dotFadeDelay 1.2s infinite ease-in-out both;animation:dotFadeDelay 1.2s infinite ease-in-out both}:host.aqua .dot:before{background-color:#3bafda}:host.ocean .dot:before{background-color:#4a89dc}:host.mint .dot:before{background-color:#37bc9b}:host.grass .dot:before{background-color:#8cc152}:host.sunflower .dot:before{background-color:#f6b042}:host.bittersweet .dot:before{background-color:#eb6845}:host.grapefruit .dot:before{background-color:#da4453}:host.carnation .dot:before{background-color:#d770ad}:host.lavender .dot:before{background-color:#967adc}:host.mountain .dot:before{background-color:#9678b6}:host.multicolor .dot:nth-of-type(1):before{background-color:#3bafda}:host.multicolor .dot:nth-of-type(2):before{background-color:#4a89dc}:host.multicolor .dot:nth-of-type(3):before{background-color:#37bc9b}:host.multicolor .dot:nth-of-type(4):before{background-color:#8cc152}:host.multicolor .dot:nth-of-type(5):before{background-color:#f6b042}:host.multicolor .dot:nth-of-type(6):before{background-color:#eb6845}:host.multicolor .dot:nth-of-type(7):before{background-color:#da4453}:host.multicolor .dot:nth-of-type(8):before{background-color:#d770ad}:host.multicolor .dot:nth-of-type(9):before{background-color:#967adc}:host.multicolor .dot:nth-of-type(10):before{background-color:#9678b6}:host.white .dot:before,:host[inverse] .dot:before{background-color:#fff}:host .dot2{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}:host .dot3{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}:host .dot4{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}:host .dot5{-webkit-transform:rotate(120deg);-ms-transform:rotate(120deg);transform:rotate(120deg)}:host .dot6{-webkit-transform:rotate(150deg);-ms-transform:rotate(150deg);transform:rotate(150deg)}:host .dot7{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}:host .dot8{-webkit-transform:rotate(210deg);-ms-transform:rotate(210deg);transform:rotate(210deg)}:host .dot9{-webkit-transform:rotate(240deg);-ms-transform:rotate(240deg);transform:rotate(240deg)}:host .dot10{-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}:host .dot11{-webkit-transform:rotate(300deg);-ms-transform:rotate(300deg);transform:rotate(300deg)}:host .dot12{-webkit-transform:rotate(330deg);-ms-transform:rotate(330deg);transform:rotate(330deg)}:host .dot2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}:host .dot3:before{-webkit-animation-delay:-1s;animation-delay:-1s}:host .dot4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}:host .dot5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}:host .dot6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}:host .dot7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}:host .dot8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}:host .dot9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}:host .dot10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}:host .dot11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}:host .dot12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes dotFadeDelay{0%,39%,to{opacity:0}40%{opacity:1}}@keyframes dotFadeDelay{0%,39%,to{opacity:0}40%{opacity:1}}\n"] }]
        }], propDecorators: { theme: [{
                type: Input
            }], color: [{
                type: Input
            }], size: [{
                type: Input
            }], inverse: [{
                type: Input
            }], hb_class: [{
                type: HostBinding,
                args: ['class']
            }] } });
class NovoSkeletonDirective {
    constructor() {
        this.skeleton = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSkeletonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoSkeletonDirective, isStandalone: false, selector: "[skeleton]", host: { properties: { "class.skeleton": "this.skeleton" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSkeletonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[skeleton]',
                    standalone: false,
                }]
        }], propDecorators: { skeleton: [{
                type: HostBinding,
                args: ['class.skeleton']
            }] } });
class NovoLoadedDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLoadedDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoLoadedDirective, isStandalone: false, selector: "[loaded]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLoadedDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[loaded]',
                    standalone: false,
                }]
        }] });
class NovoIsLoadingDirective {
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
        this.hasView = false;
        this.skeletonViews = [];
        this.loadedViews = [];
    }
    set isLoading(condition) {
        if (!condition && !this.hasView) {
            this.destroyViews(this.loadedViews);
            this.skeletonViews = this.createViews(this.skeletonTemplates);
            this.hasView = true;
        }
        else if (condition && this.hasView) {
            this.destroyViews(this.skeletonViews);
            this.loadedViews = this.createViews(this.loadedTemplates);
            this.hasView = false;
        }
    }
    createViews(templates) {
        return templates && templates.map((v, i) => this.viewContainer.createEmbeddedView(v, null, i));
    }
    destroyViews(views) {
        if (views) {
            for (const view of views) {
                view.destroy();
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoIsLoadingDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoIsLoadingDirective, isStandalone: false, selector: "[isLoading]", inputs: { isLoading: "isLoading" }, queries: [{ propertyName: "skeletonTemplates", predicate: NovoSkeletonDirective, read: TemplateRef }, { propertyName: "loadedTemplates", predicate: NovoLoadedDirective, read: TemplateRef }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoIsLoadingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[isLoading]',
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }], propDecorators: { skeletonTemplates: [{
                type: ContentChildren,
                args: [NovoSkeletonDirective, { read: TemplateRef }]
            }], loadedTemplates: [{
                type: ContentChildren,
                args: [NovoLoadedDirective, { read: TemplateRef }]
            }], isLoading: [{
                type: Input
            }] } });

// NG2
class NovoLoadingModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLoadingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoLoadingModule, declarations: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective], imports: [CommonModule], exports: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLoadingModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLoadingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective],
                    exports: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoIsLoadingDirective, NovoLoadedDirective, NovoLoadingElement, NovoLoadingModule, NovoSkeletonDirective, NovoSpinnerElement };
//# sourceMappingURL=novo-elements-elements-loading.mjs.map
