import * as i1 from '@angular/common';
import { CommonModule, DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Injectable, HostBinding, Input, Directive, Host, Optional, Inject, ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule, InjectionToken, Output, input, inject, TemplateRef, ViewChild } from '@angular/core';
import { of, Subject, fromEvent, merge } from 'rxjs';
import * as tokens from 'novo-design-tokens';
import { BooleanInput, Helpers } from 'novo-elements/utils';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayContainer, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter, first, switchMap } from 'rxjs/operators';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

class NovoThemeOptions {
}
class NovoTheme {
    constructor() {
        this._defaultTheme = { themeName: 'modern-light' };
        this.onThemeChange = new EventEmitter();
    }
    /** Name of the theme being used. defaults to `modern-light` */
    get themeName() {
        return this._currentTheme?.themeName || this._defaultTheme.themeName;
    }
    set themeName(value) {
        this._currentTheme = { themeName: value };
        this.changeTheme(this._currentTheme);
    }
    use(options) {
        // future: don't change the theme if the theme given is already selected
        this.changeTheme(options);
        // this might become async in future
        return of(options);
    }
    /**
     * Changes the current theme
     */
    changeTheme(theme) {
        this._currentTheme = theme;
        this.onThemeChange.emit({ themeName: theme.themeName, options: theme });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTheme, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTheme, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTheme, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class AccentColorDirective {
    get hb_textColor() {
        // Support legacy classic theme... for now
        if (this.theme.themeName === 'classic') {
            return `novo-theme-${this.accent}`;
        }
        return `novo-accent-${this.accent}`;
    }
    constructor(theme, cdr) {
        this.theme = theme;
        this.cdr = cdr;
        this.subscription = this.theme.onThemeChange.subscribe((event) => {
            this.cdr.markForCheck();
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AccentColorDirective, deps: [{ token: NovoTheme }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: AccentColorDirective, isStandalone: false, selector: "[accent]", inputs: { accent: "accent" }, host: { properties: { "class": "this.hb_textColor" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AccentColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[accent]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: NovoTheme }, { type: i0.ChangeDetectorRef }], propDecorators: { accent: [{
                type: Input
            }], hb_textColor: [{
                type: HostBinding,
                args: ['class']
            }] } });

class BackgroundColorDirective {
    get hb_bgColor() {
        return isValidColor$1(this.bg) ? 'novo-background-custom' : `novo-background-${this.bg}`;
    }
    get hb_bgStyle() {
        return isValidColor$1(this.bg) ? this.bg : null;
    }
    constructor(el) {
        this.el = el;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BackgroundColorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: BackgroundColorDirective, isStandalone: false, selector: "[bg]", inputs: { bg: "bg" }, host: { properties: { "class": "this.hb_bgColor", "style.background-color": "this.hb_bgStyle" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BackgroundColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bg]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { bg: [{
                type: Input
            }], hb_bgColor: [{
                type: HostBinding,
                args: ['class']
            }], hb_bgStyle: [{
                type: HostBinding,
                args: ['style.background-color']
            }] } });
function isValidColor$1(color) {
    return color.startsWith('#') || color.startsWith('rgb');
}

class BorderDirective {
    get hb_border() {
        return `border-${this.border}`;
    }
    get hb_border_left() {
        return this.borderLeft || this.bl || this.bx || this.borderX;
    }
    get hb_border_right() {
        return this.borderRight || this.bt || this.bx || this.borderX;
    }
    get hb_border_top() {
        return this.borderTop || this.bt || this.by || this.borderY;
    }
    get hb_border_bottom() {
        return this.borderBottom || this.bt || this.by || this.borderY;
    }
    constructor(el) {
        this.el = el;
        this.borderStyle = 'solid';
        this.borderColor = '#eaecef';
        this.borderWidth = 1;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BorderDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: BorderDirective, isStandalone: false, selector: "[border], [bb], [borderBottom], [bt], [borderTop], [bl], [borderLeft], [br], [borderRight], [bx], [borderX], [by], [borderY]", inputs: { borderStyle: "borderStyle", borderColor: "borderColor", borderWidth: "borderWidth", border: "border", borderLeft: "borderLeft", bl: "bl", borderRight: "borderRight", br: "br", borderTop: "borderTop", bt: "bt", borderBottom: "borderBottom", bb: "bb", borderX: "borderX", bx: "bx", borderY: "borderY", by: "by" }, host: { properties: { "class": "this.hb_border", "style.border-left": "this.hb_border_left", "style.border-right": "this.hb_border_right", "style.border-top": "this.hb_border_top", "style.border-bottom": "this.hb_border_bottom" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BorderDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[border], [bb], [borderBottom], [bt], [borderTop], [bl], [borderLeft], [br], [borderRight], [bx], [borderX], [by], [borderY]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { borderStyle: [{
                type: Input
            }], borderColor: [{
                type: Input
            }], borderWidth: [{
                type: Input
            }], border: [{
                type: Input
            }], borderLeft: [{
                type: Input
            }], bl: [{
                type: Input
            }], borderRight: [{
                type: Input
            }], br: [{
                type: Input
            }], borderTop: [{
                type: Input
            }], bt: [{
                type: Input
            }], borderBottom: [{
                type: Input
            }], bb: [{
                type: Input
            }], borderX: [{
                type: Input
            }], bx: [{
                type: Input
            }], borderY: [{
                type: Input
            }], by: [{
                type: Input
            }], hb_border: [{
                type: HostBinding,
                args: ['class']
            }], hb_border_left: [{
                type: HostBinding,
                args: ['style.border-left']
            }], hb_border_right: [{
                type: HostBinding,
                args: ['style.border-right']
            }], hb_border_top: [{
                type: HostBinding,
                args: ['style.border-top']
            }], hb_border_bottom: [{
                type: HostBinding,
                args: ['style.border-bottom']
            }] } });

class TextColorDirective {
    get hb_textColor() {
        return isValidColor(this.txc) ? 'novo-text-custom' : `novo-text-${this.txc}`;
    }
    get hb_textStyle() {
        return isValidColor(this.txc) ? this.txc : null;
    }
    constructor(el) {
        this.el = el;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: TextColorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: TextColorDirective, isStandalone: false, selector: "[txc]", inputs: { txc: "txc" }, host: { properties: { "class": "this.hb_textColor", "style.color": "this.hb_textStyle" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: TextColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[txc]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { txc: [{
                type: Input
            }], hb_textColor: [{
                type: HostBinding,
                args: ['class']
            }], hb_textStyle: [{
                type: HostBinding,
                args: ['style.color']
            }] } });
function isValidColor(color) {
    return color.startsWith('#') || color.startsWith('rgb');
}

class FillColorDirective {
    get hb_textColor() {
        return `novo-fill-${this.fill}`;
    }
    constructor(el) {
        this.el = el;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: FillColorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: FillColorDirective, isStandalone: false, selector: "[fill]", inputs: { fill: "fill" }, host: { properties: { "class": "this.hb_textColor" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: FillColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[fill]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { fill: [{
                type: Input
            }], hb_textColor: [{
                type: HostBinding,
                args: ['class']
            }] } });

class FlexDirective {
    get flex() {
        return this._flex;
    }
    set flex(value) {
        if (!value) {
            this._flex = '1 1 auto';
        }
        else {
            this._flex = value;
        }
    }
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: FlexDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: FlexDirective, isStandalone: false, selector: "[flex]", inputs: { flex: "flex" }, host: { properties: { "style.flex": "this.flex" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: FlexDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[flex]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { flex: [{
                type: HostBinding,
                args: ['style.flex']
            }, {
                type: Input
            }] } });

/*
Prop	CSS Property	Theme Field
m, margin	margin	space
mt, marginTop	margin-top	space
mr, marginRight	margin-right	space
mb, marginBottom	margin-bottom	space
ml, marginLeft	margin-left	space
mx	margin-left and margin-right	space
my	margin-top and margin-bottom	space
p, padding	padding	space
pt, paddingTop	padding-top	space
pr, paddingRight	padding-right	space
pb, paddingBottom	padding-bottom	space
pl, paddingLeft	padding-left	space
px	padding-left and padding-right	space
py	padding-top and padding-bottom	space
*/
/*
// Selectors generated with the following code
const directions = ['Top', 'Right', 'Bottom', 'Left', 'X', 'Y'];
const abbrDirections = directions.map((d) => d.slice(0, 1).toLowerCase());
const marginAttrs = [
  '[m]',
  '[margin]',
  ...directions.map((dir) => `[margin${dir}]`),
  ...abbrDirections.map((dir) => `[m${dir}]`),
];
const paddingAttrs = [
  '[p]',
  '[padding]',
  ...directions.map((dir) => `[padding${dir}]`),
  ...abbrDirections.map((dir) => `[p${dir}]`),
];

const selectors = [...marginAttrs, ...paddingAttrs];
*/
const getSpacingToken = (value) => {
    if (Object.keys(tokens.spacing).includes(value)) {
        return tokens.spacing[value];
    }
    // TODO: Maybe Validate Value ie.(rem, px)
    return value;
};
class MarginDirective {
    get hb_margin() {
        return `margin-${this.margin || this.m}`;
    }
    get hb_margin_left() {
        return getSpacingToken(this.marginLeft || this.ml || this.mx || this.marginX);
    }
    get hb_margin_right() {
        return getSpacingToken(this.marginRight || this.mr || this.mx || this.marginX);
    }
    get hb_margin_top() {
        return getSpacingToken(this.marginTop || this.mt || this.my || this.marginY);
    }
    get hb_margin_bottom() {
        return getSpacingToken(this.marginBottom || this.mb || this.my || this.marginY);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: MarginDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: MarginDirective, isStandalone: false, selector: "[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]", inputs: { margin: "margin", m: "m", marginLeft: "marginLeft", ml: "ml", marginRight: "marginRight", mr: "mr", marginTop: "marginTop", mt: "mt", marginBottom: "marginBottom", mb: "mb", marginX: "marginX", mx: "mx", marginY: "marginY", my: "my" }, host: { properties: { "class": "this.hb_margin", "style.margin-left": "this.hb_margin_left", "style.margin-right": "this.hb_margin_right", "style.margin-top": "this.hb_margin_top", "style.margin-bottom": "this.hb_margin_bottom" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: MarginDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]',
                    standalone: false
                }]
        }], propDecorators: { margin: [{
                type: Input
            }], m: [{
                type: Input
            }], marginLeft: [{
                type: Input
            }], ml: [{
                type: Input
            }], marginRight: [{
                type: Input
            }], mr: [{
                type: Input
            }], marginTop: [{
                type: Input
            }], mt: [{
                type: Input
            }], marginBottom: [{
                type: Input
            }], mb: [{
                type: Input
            }], marginX: [{
                type: Input
            }], mx: [{
                type: Input
            }], marginY: [{
                type: Input
            }], my: [{
                type: Input
            }], hb_margin: [{
                type: HostBinding,
                args: ['class']
            }], hb_margin_left: [{
                type: HostBinding,
                args: ['style.margin-left']
            }], hb_margin_right: [{
                type: HostBinding,
                args: ['style.margin-right']
            }], hb_margin_top: [{
                type: HostBinding,
                args: ['style.margin-top']
            }], hb_margin_bottom: [{
                type: HostBinding,
                args: ['style.margin-bottom']
            }] } });
class PaddingDirective {
    get hb_padding() {
        return `padding-${this.padding || this.p}`;
    }
    get hb_padding_left() {
        return getSpacingToken(this.paddingLeft || this.pl || this.px || this.paddingX);
    }
    get hb_padding_right() {
        return getSpacingToken(this.paddingRight || this.pr || this.px || this.paddingX);
    }
    get hb_padding_top() {
        return getSpacingToken(this.paddingTop || this.pt || this.py || this.paddingY);
    }
    get hb_padding_bottom() {
        return getSpacingToken(this.paddingBottom || this.pb || this.py || this.paddingY);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: PaddingDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: PaddingDirective, isStandalone: false, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: { padding: "padding", p: "p", paddingLeft: "paddingLeft", pl: "pl", paddingRight: "paddingRight", pr: "pr", paddingTop: "paddingTop", pt: "pt", paddingBottom: "paddingBottom", pb: "pb", paddingX: "paddingX", px: "px", paddingY: "paddingY", py: "py" }, host: { properties: { "class": "this.hb_padding", "style.padding-left": "this.hb_padding_left", "style.padding-right": "this.hb_padding_right", "style.padding-top": "this.hb_padding_top", "style.padding-bottom": "this.hb_padding_bottom" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: PaddingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]',
                    standalone: false
                }]
        }], propDecorators: { padding: [{
                type: Input
            }], p: [{
                type: Input
            }], paddingLeft: [{
                type: Input
            }], pl: [{
                type: Input
            }], paddingRight: [{
                type: Input
            }], pr: [{
                type: Input
            }], paddingTop: [{
                type: Input
            }], pt: [{
                type: Input
            }], paddingBottom: [{
                type: Input
            }], pb: [{
                type: Input
            }], paddingX: [{
                type: Input
            }], px: [{
                type: Input
            }], paddingY: [{
                type: Input
            }], py: [{
                type: Input
            }], hb_padding: [{
                type: HostBinding,
                args: ['class']
            }], hb_padding_left: [{
                type: HostBinding,
                args: ['style.padding-left']
            }], hb_padding_right: [{
                type: HostBinding,
                args: ['style.padding-right']
            }], hb_padding_top: [{
                type: HostBinding,
                args: ['style.padding-top']
            }], hb_padding_bottom: [{
                type: HostBinding,
                args: ['style.padding-bottom']
            }] } });
class GapDirective {
    get hb_gap() {
        return getSpacingToken(this.gap);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: GapDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: GapDirective, isStandalone: false, selector: "[gap]", inputs: { gap: "gap" }, host: { properties: { "style.gap": "this.hb_gap" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: GapDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[gap]',
                    standalone: false
                }]
        }], propDecorators: { gap: [{
                type: Input
            }], hb_gap: [{
                type: HostBinding,
                args: ['style.gap']
            }] } });

class SwitchCasesDirective {
    constructor(viewContainer, templateRef, ngSwitch) {
        this.viewContainer = viewContainer;
        this.templateRef = templateRef;
        this._created = false;
        this.ngSwitch = ngSwitch;
    }
    ngOnInit() {
        (this.novoSwitchCases || []).forEach(() => this.ngSwitch._addCase());
    }
    ngDoCheck() {
        let enforce = false;
        (this.novoSwitchCases || []).forEach((value) => (enforce = this.ngSwitch._matchCase(value) || enforce));
        this.enforceState(enforce);
    }
    enforceState(created) {
        if (created && !this._created) {
            this._created = true;
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else if (!created && this._created) {
            this._created = false;
            this.viewContainer.clear();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: SwitchCasesDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }, { token: i1.NgSwitch, host: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: SwitchCasesDirective, isStandalone: false, selector: "[novoSwitchCases]", inputs: { novoSwitchCases: "novoSwitchCases" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: SwitchCasesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSwitchCases]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }, { type: i1.NgSwitch, decorators: [{
                    type: Host
                }] }], propDecorators: { novoSwitchCases: [{
                type: Input
            }] } });

class ThemeColorDirective {
    get hb_textColor() {
        return `novo-theme-${this.theme}`;
    }
    constructor(el) {
        this.el = el;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ThemeColorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: ThemeColorDirective, isStandalone: false, selector: "[theme]", inputs: { theme: "theme" }, host: { properties: { "class": "this.hb_textColor" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ThemeColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[theme]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { theme: [{
                type: Input
            }], hb_textColor: [{
                type: HostBinding,
                args: ['class']
            }] } });

var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class VisibleDirective {
    get hb_visibility() {
        return this.visible ? '' : `novo-visibility-hidden`;
    }
    constructor(el) {
        this.el = el;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: VisibleDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: VisibleDirective, isStandalone: false, selector: "[visible]", inputs: { visible: "visible" }, host: { properties: { "class": "this.hb_visibility" } }, ngImport: i0 }); }
}
__decorate$3([
    BooleanInput(),
    __metadata$3("design:type", Boolean)
], VisibleDirective.prototype, "visible", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: VisibleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[visible]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { visible: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class']
            }], hb_visibility: [{
                type: HostBinding,
                args: ['class']
            }] } });

class NovoTemplate {
    constructor(template) {
        this.template = template;
    }
    getType() {
        return this.name;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTemplate, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoTemplate, isStandalone: false, selector: "[novoTemplate]", inputs: { type: "type", name: ["novoTemplate", "name"] }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTemplate, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoTemplate]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }], propDecorators: { type: [{
                type: Input
            }], name: [{
                type: Input,
                args: ['novoTemplate']
            }] } });

/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `novo-primary .novo-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<novo-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
class NovoPseudoCheckbox {
    constructor(_animationMode) {
        this._animationMode = _animationMode;
        /** Display state of the checkbox. */
        this.state = 'unchecked';
        /** Display state of the checkbox. */
        this.shape = 'box';
        /** Whether the checkbox is disabled. */
        this.disabled = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPseudoCheckbox, deps: [{ token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoPseudoCheckbox, isStandalone: false, selector: "novo-pseudo-checkbox", inputs: { state: "state", shape: "shape", disabled: "disabled" }, host: { properties: { "class.novo-pseudo-checkbox-indeterminate": "state === \"indeterminate\"", "class.novo-pseudo-checkbox-checked": "state === \"checked\"", "class.novo-pseudo-checkbox-disabled": "disabled", "class._novo-animation-noopable": "_animationMode === \"NoopAnimations\"" }, classAttribute: "novo-pseudo-checkbox" }, ngImport: i0, template: ` <i
    [class.bhi-checkbox-empty]="state === 'unchecked' && shape === 'box'"
    [class.bhi-checkbox-filled]="state === 'checked' && shape === 'box'"
    [class.bhi-checkbox-indeterminate]="state === 'indeterminate' && shape === 'box'"
    [class.bhi-circle-o]="state === 'unchecked' && shape === 'circle'"
    [class.bhi-check-circle-filled]="state === 'checked' && shape === 'circle'"
    [class.bhi-circle]="state === 'indeterminate' && shape === 'circle'"
    [class.bhi-box-empty]="state === 'unchecked' && shape === 'line'"
    [class.bhi-check]="state === 'checked' && shape === 'line'"
    [class.bhi-box-minus-o]="state === 'indeterminate' && shape === 'line'"
  ></i>`, isInline: true, styles: [".novo-pseudo-checkbox{width:16px;height:16px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;flex-shrink:0;transition:color .3s ease-in-out}.novo-pseudo-checkbox.novo-pseudo-checkbox-checked,.novo-pseudo-checkbox.novo-pseudo-checkbox-indeterminate{color:#4a89dc;animation:iconEnter .16s ease-in-out}.novo-pseudo-checkbox i{font-size:1.4rem;line-height:1rem}.novo-pseudo-checkbox-disabled{cursor:default}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPseudoCheckbox, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'novo-pseudo-checkbox', template: ` <i
    [class.bhi-checkbox-empty]="state === 'unchecked' && shape === 'box'"
    [class.bhi-checkbox-filled]="state === 'checked' && shape === 'box'"
    [class.bhi-checkbox-indeterminate]="state === 'indeterminate' && shape === 'box'"
    [class.bhi-circle-o]="state === 'unchecked' && shape === 'circle'"
    [class.bhi-check-circle-filled]="state === 'checked' && shape === 'circle'"
    [class.bhi-circle]="state === 'indeterminate' && shape === 'circle'"
    [class.bhi-box-empty]="state === 'unchecked' && shape === 'line'"
    [class.bhi-check]="state === 'checked' && shape === 'line'"
    [class.bhi-box-minus-o]="state === 'indeterminate' && shape === 'line'"
  ></i>`, host: {
                        class: 'novo-pseudo-checkbox',
                        '[class.novo-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
                        '[class.novo-pseudo-checkbox-checked]': 'state === "checked"',
                        '[class.novo-pseudo-checkbox-disabled]': 'disabled',
                        '[class._novo-animation-noopable]': '_animationMode === "NoopAnimations"',
                    }, standalone: false, styles: [".novo-pseudo-checkbox{width:16px;height:16px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;flex-shrink:0;transition:color .3s ease-in-out}.novo-pseudo-checkbox.novo-pseudo-checkbox-checked,.novo-pseudo-checkbox.novo-pseudo-checkbox-indeterminate{color:#4a89dc;animation:iconEnter .16s ease-in-out}.novo-pseudo-checkbox i{font-size:1.4rem;line-height:1rem}.novo-pseudo-checkbox-disabled{cursor:default}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }], propDecorators: { state: [{
                type: Input
            }], shape: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

class NovoPseudoCheckboxModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPseudoCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoPseudoCheckboxModule, declarations: [NovoPseudoCheckbox], exports: [NovoPseudoCheckbox] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPseudoCheckboxModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPseudoCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    exports: [NovoPseudoCheckbox],
                    declarations: [NovoPseudoCheckbox],
                }]
        }] });

/** Mixin to augment a directive with a `disabled` property. */
function mixinDisabled(base) {
    return class extends base {
        get disabled() {
            return this._disabled;
        }
        set disabled(value) {
            this._disabled = coerceBooleanProperty(value);
        }
        constructor(...args) {
            super(...args);
            this._disabled = false;
        }
    };
}

/**
 * Injection token used to provide the parent component to options.
 */
const NOVO_OPTION_PARENT_COMPONENT = new InjectionToken('NOVO_OPTION_PARENT_COMPONENT');

// Notes on the accessibility pattern used for `novo-optgroup`.
// The option group has two different "modes": regular and novoInert. The regular mode uses the
// recommended a11y pattern which has `role="group"` on the group element with `aria-labelledby`
// pointing to the label. This works for `novo-select`, but it seems to hit a bug for autocomplete
// under VoiceOver where the group doesn't get read out at all. The bug appears to be that if
// there's __any__ a11y-related attribute on the group (e.g. `role` or `aria-labelledby`),
// VoiceOver on Safari won't read it out.
// We've introduced the `novoInert` mode as a workaround. Under this mode, all a11y attributes are
// removed from the group, and we get the screen reader to read out the group label by mirroring it
// inside an invisible element in the option. This is sub-optimal, because the screen reader will
// repeat the group label on each navigation, whereas the default pattern only reads the group when
// the user enters a new group. The following alternate approaches were considered:
// 1. Reading out the group label using the `LiveAnnouncer` solves the problem, but we can't control
//    when the text will be read out so sometimes it comes in too late or never if the user
//    navigates quickly.
// 2. `<novo-option aria-describedby="groupLabel"` - This works on Safari, but VoiceOver in Chrome
//    won't read out the description at all.
// 3. `<novo-option aria-labelledby="optionLabel groupLabel"` - This works on Chrome, but Safari
//     doesn't read out the text at all. Furthermore, on
// Boilerplate for applying mixins to NovoOptgroup.
class NovoOptgroupBase {
    constructor() {
        /** Unique id for the underlying label. */
        this._labelId = `novo-optgroup-label-${_uniqueOptgroupIdCounter++}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOptgroupBase, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoOptgroupBase, isStandalone: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOptgroupBase, decorators: [{
            type: Directive
        }] });
const NovoOptgroupMixinBase = mixinDisabled(NovoOptgroupBase);
// Counter for unique group ids.
let _uniqueOptgroupIdCounter = 0;
/**
 * Injection token that can be used to reference instances of `NovoOptgroup`. It serves as
 * alternative token to the actual `NovoOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
const NOVO_OPTGROUP = new InjectionToken('NovoOptgroup');
/**
 * Component that is used to group instances of `novo-option`.
 */
class NovoOptgroup extends NovoOptgroupMixinBase {
    constructor(parent) {
        super();
        this._novoInert = parent?.inertGroups ?? false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOptgroup, deps: [{ token: NOVO_OPTION_PARENT_COMPONENT, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoOptgroup, isStandalone: false, selector: "novo-optgroup", inputs: { disabled: "disabled", label: "label" }, host: { properties: { "attr.role": "_novoInert ? null : \"group\"", "attr.aria-disabled": "_novoInert ? null : disabled.toString()", "attr.aria-labelledby": "_novoInert ? null : _labelId", "class.novo-optgroup-disabled": "disabled" }, classAttribute: "novo-optgroup" }, providers: [{ provide: NOVO_OPTGROUP, useExisting: NovoOptgroup }], exportAs: ["novoOptgroup"], usesInheritance: true, ngImport: i0, template: "<span *ngIf=\"label\" class=\"novo-optgroup-label\" aria-hidden=\"true\" [id]=\"_labelId\">{{ label }}</span>\n<ng-content select=\"novo-option, ng-container, novo-divider, cdk-virtual-scroll-viewport\"></ng-content>", styles: [".novo-optgroup-label{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;color:#9e9e9e;cursor:default;flex:1;padding:5px 10px;display:block}.novo-optgroup-label.text-capitalize{text-transform:capitalize}.novo-optgroup-label.text-uppercase{text-transform:uppercase}.novo-optgroup-label.text-nowrap{white-space:nowrap}.novo-optgroup-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-optgroup-label.text-size-default{font-size:inherit}.novo-optgroup-label.text-size-body{font-size:1.3rem}.novo-optgroup-label.text-size-xs{font-size:1rem}.novo-optgroup-label.text-size-sm{font-size:1.2rem}.novo-optgroup-label.text-size-md{font-size:1.3rem}.novo-optgroup-label.text-size-lg{font-size:1.6rem}.novo-optgroup-label.text-size-xl{font-size:2rem}.novo-optgroup-label.text-size-2xl{font-size:2.6rem}.novo-optgroup-label.text-size-3xl{font-size:3.2rem}.novo-optgroup-label.text-size-smaller{font-size:.8em}.novo-optgroup-label.text-size-larger{font-size:1.2em}.novo-optgroup-label.text-color-black{color:#000}.novo-optgroup-label.text-color-white{color:#fff}.novo-optgroup-label.text-color-gray,.novo-optgroup-label.text-color-grey{color:#9e9e9e}.novo-optgroup-label.text-color-offWhite,.novo-optgroup-label.text-color-bright{color:#f7f7f7}.novo-optgroup-label.text-color-light{color:#dbdbdb}.novo-optgroup-label.text-color-neutral{color:#4f5361}.novo-optgroup-label.text-color-dark{color:#3d464d}.novo-optgroup-label.text-color-orange{color:#ff6900}.novo-optgroup-label.text-color-navigation{color:#202945}.novo-optgroup-label.text-color-skyBlue{color:#009bdf}.novo-optgroup-label.text-color-steel{color:#5b6770}.novo-optgroup-label.text-color-metal{color:#637893}.novo-optgroup-label.text-color-sand{color:#f4f4f4}.novo-optgroup-label.text-color-silver{color:#e2e2e2}.novo-optgroup-label.text-color-stone{color:#bebebe}.novo-optgroup-label.text-color-ash{color:#a0a0a0}.novo-optgroup-label.text-color-slate{color:#707070}.novo-optgroup-label.text-color-onyx{color:#526980}.novo-optgroup-label.text-color-charcoal{color:#282828}.novo-optgroup-label.text-color-moonlight{color:#1a242f}.novo-optgroup-label.text-color-midnight{color:#202945}.novo-optgroup-label.text-color-darkness{color:#161f27}.novo-optgroup-label.text-color-navy{color:#0d2d42}.novo-optgroup-label.text-color-aqua{color:#3bafda}.novo-optgroup-label.text-color-ocean{color:#4a89dc}.novo-optgroup-label.text-color-mint{color:#37bc9b}.novo-optgroup-label.text-color-grass{color:#8cc152}.novo-optgroup-label.text-color-sunflower{color:#f6b042}.novo-optgroup-label.text-color-bittersweet{color:#eb6845}.novo-optgroup-label.text-color-grapefruit{color:#da4453}.novo-optgroup-label.text-color-carnation{color:#d770ad}.novo-optgroup-label.text-color-lavender{color:#967adc}.novo-optgroup-label.text-color-mountain{color:#9678b6}.novo-optgroup-label.text-color-info,.novo-optgroup-label.text-color-positive{color:#4a89dc}.novo-optgroup-label.text-color-success{color:#8cc152}.novo-optgroup-label.text-color-negative,.novo-optgroup-label.text-color-danger,.novo-optgroup-label.text-color-error{color:#da4453}.novo-optgroup-label.text-color-warning{color:#f6b042}.novo-optgroup-label.text-color-empty{color:#cccdcc}.novo-optgroup-label.text-color-disabled{color:#bebebe}.novo-optgroup-label.text-color-background{color:#f7f7f7}.novo-optgroup-label.text-color-backgroundDark{color:#e2e2e2}.novo-optgroup-label.text-color-presentation{color:#5b6770}.novo-optgroup-label.text-color-bullhorn{color:#ff6900}.novo-optgroup-label.text-color-pulse{color:#3bafda}.novo-optgroup-label.text-color-company{color:#39d}.novo-optgroup-label.text-color-candidate{color:#4b7}.novo-optgroup-label.text-color-lead{color:#a69}.novo-optgroup-label.text-color-contact,.novo-optgroup-label.text-color-clientcontact{color:#fa4}.novo-optgroup-label.text-color-opportunity{color:#625}.novo-optgroup-label.text-color-job,.novo-optgroup-label.text-color-joborder{color:#b56}.novo-optgroup-label.text-color-submission{color:#a9adbb}.novo-optgroup-label.text-color-sendout{color:#747884}.novo-optgroup-label.text-color-placement{color:#0b344f}.novo-optgroup-label.text-color-note{color:#747884}.novo-optgroup-label.text-color-contract{color:#454ea0}.novo-optgroup-label.text-color-task{color:#4f5361}.novo-optgroup-label.text-color-jobCode,.novo-optgroup-label.text-color-earnCode,.novo-optgroup-label.text-color-invoiceStatement,.novo-optgroup-label.text-color-billableCharge,.novo-optgroup-label.text-color-payableCharge,.novo-optgroup-label.text-color-user,.novo-optgroup-label.text-color-corporateUser,.novo-optgroup-label.text-color-distributionList,.novo-optgroup-label.text-color-credential,.novo-optgroup-label.text-color-person{color:#696d79}.novo-optgroup-label.margin-before{margin-top:.4rem}.novo-optgroup-label.margin-after{margin-bottom:.8rem}.novo-optgroup-label.text-length-small{max-width:40ch}.novo-optgroup-label.text-length-medium{max-width:55ch}.novo-optgroup-label.text-length-large{max-width:70ch}.novo-optgroup-label.text-weight-hairline{font-weight:100}.novo-optgroup-label.text-weight-thin{font-weight:200}.novo-optgroup-label.text-weight-light{font-weight:300}.novo-optgroup-label.text-weight-normal{font-weight:400}.novo-optgroup-label.text-weight-medium{font-weight:500}.novo-optgroup-label.text-weight-semibold{font-weight:600}.novo-optgroup-label.text-weight-bold{font-weight:700}.novo-optgroup-label.text-weight-extrabold{font-weight:800}.novo-optgroup-label.text-weight-heavy{font-weight:900}.novo-optgroup-label.text-weight-lighter{font-weight:lighter}.novo-optgroup-label.text-weight-bolder{font-weight:bolder}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOptgroup, decorators: [{
            type: Component,
            args: [{ selector: 'novo-optgroup', exportAs: 'novoOptgroup', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, inputs: ['disabled', 'label'], host: {
                        class: 'novo-optgroup',
                        '[attr.role]': '_novoInert ? null : "group"',
                        '[attr.aria-disabled]': '_novoInert ? null : disabled.toString()',
                        '[attr.aria-labelledby]': '_novoInert ? null : _labelId',
                        '[class.novo-optgroup-disabled]': 'disabled',
                    }, providers: [{ provide: NOVO_OPTGROUP, useExisting: NovoOptgroup }], standalone: false, template: "<span *ngIf=\"label\" class=\"novo-optgroup-label\" aria-hidden=\"true\" [id]=\"_labelId\">{{ label }}</span>\n<ng-content select=\"novo-option, ng-container, novo-divider, cdk-virtual-scroll-viewport\"></ng-content>", styles: [".novo-optgroup-label{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;color:#9e9e9e;cursor:default;flex:1;padding:5px 10px;display:block}.novo-optgroup-label.text-capitalize{text-transform:capitalize}.novo-optgroup-label.text-uppercase{text-transform:uppercase}.novo-optgroup-label.text-nowrap{white-space:nowrap}.novo-optgroup-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-optgroup-label.text-size-default{font-size:inherit}.novo-optgroup-label.text-size-body{font-size:1.3rem}.novo-optgroup-label.text-size-xs{font-size:1rem}.novo-optgroup-label.text-size-sm{font-size:1.2rem}.novo-optgroup-label.text-size-md{font-size:1.3rem}.novo-optgroup-label.text-size-lg{font-size:1.6rem}.novo-optgroup-label.text-size-xl{font-size:2rem}.novo-optgroup-label.text-size-2xl{font-size:2.6rem}.novo-optgroup-label.text-size-3xl{font-size:3.2rem}.novo-optgroup-label.text-size-smaller{font-size:.8em}.novo-optgroup-label.text-size-larger{font-size:1.2em}.novo-optgroup-label.text-color-black{color:#000}.novo-optgroup-label.text-color-white{color:#fff}.novo-optgroup-label.text-color-gray,.novo-optgroup-label.text-color-grey{color:#9e9e9e}.novo-optgroup-label.text-color-offWhite,.novo-optgroup-label.text-color-bright{color:#f7f7f7}.novo-optgroup-label.text-color-light{color:#dbdbdb}.novo-optgroup-label.text-color-neutral{color:#4f5361}.novo-optgroup-label.text-color-dark{color:#3d464d}.novo-optgroup-label.text-color-orange{color:#ff6900}.novo-optgroup-label.text-color-navigation{color:#202945}.novo-optgroup-label.text-color-skyBlue{color:#009bdf}.novo-optgroup-label.text-color-steel{color:#5b6770}.novo-optgroup-label.text-color-metal{color:#637893}.novo-optgroup-label.text-color-sand{color:#f4f4f4}.novo-optgroup-label.text-color-silver{color:#e2e2e2}.novo-optgroup-label.text-color-stone{color:#bebebe}.novo-optgroup-label.text-color-ash{color:#a0a0a0}.novo-optgroup-label.text-color-slate{color:#707070}.novo-optgroup-label.text-color-onyx{color:#526980}.novo-optgroup-label.text-color-charcoal{color:#282828}.novo-optgroup-label.text-color-moonlight{color:#1a242f}.novo-optgroup-label.text-color-midnight{color:#202945}.novo-optgroup-label.text-color-darkness{color:#161f27}.novo-optgroup-label.text-color-navy{color:#0d2d42}.novo-optgroup-label.text-color-aqua{color:#3bafda}.novo-optgroup-label.text-color-ocean{color:#4a89dc}.novo-optgroup-label.text-color-mint{color:#37bc9b}.novo-optgroup-label.text-color-grass{color:#8cc152}.novo-optgroup-label.text-color-sunflower{color:#f6b042}.novo-optgroup-label.text-color-bittersweet{color:#eb6845}.novo-optgroup-label.text-color-grapefruit{color:#da4453}.novo-optgroup-label.text-color-carnation{color:#d770ad}.novo-optgroup-label.text-color-lavender{color:#967adc}.novo-optgroup-label.text-color-mountain{color:#9678b6}.novo-optgroup-label.text-color-info,.novo-optgroup-label.text-color-positive{color:#4a89dc}.novo-optgroup-label.text-color-success{color:#8cc152}.novo-optgroup-label.text-color-negative,.novo-optgroup-label.text-color-danger,.novo-optgroup-label.text-color-error{color:#da4453}.novo-optgroup-label.text-color-warning{color:#f6b042}.novo-optgroup-label.text-color-empty{color:#cccdcc}.novo-optgroup-label.text-color-disabled{color:#bebebe}.novo-optgroup-label.text-color-background{color:#f7f7f7}.novo-optgroup-label.text-color-backgroundDark{color:#e2e2e2}.novo-optgroup-label.text-color-presentation{color:#5b6770}.novo-optgroup-label.text-color-bullhorn{color:#ff6900}.novo-optgroup-label.text-color-pulse{color:#3bafda}.novo-optgroup-label.text-color-company{color:#39d}.novo-optgroup-label.text-color-candidate{color:#4b7}.novo-optgroup-label.text-color-lead{color:#a69}.novo-optgroup-label.text-color-contact,.novo-optgroup-label.text-color-clientcontact{color:#fa4}.novo-optgroup-label.text-color-opportunity{color:#625}.novo-optgroup-label.text-color-job,.novo-optgroup-label.text-color-joborder{color:#b56}.novo-optgroup-label.text-color-submission{color:#a9adbb}.novo-optgroup-label.text-color-sendout{color:#747884}.novo-optgroup-label.text-color-placement{color:#0b344f}.novo-optgroup-label.text-color-note{color:#747884}.novo-optgroup-label.text-color-contract{color:#454ea0}.novo-optgroup-label.text-color-task{color:#4f5361}.novo-optgroup-label.text-color-jobCode,.novo-optgroup-label.text-color-earnCode,.novo-optgroup-label.text-color-invoiceStatement,.novo-optgroup-label.text-color-billableCharge,.novo-optgroup-label.text-color-payableCharge,.novo-optgroup-label.text-color-user,.novo-optgroup-label.text-color-corporateUser,.novo-optgroup-label.text-color-distributionList,.novo-optgroup-label.text-color-credential,.novo-optgroup-label.text-color-person{color:#696d79}.novo-optgroup-label.margin-before{margin-top:.4rem}.novo-optgroup-label.margin-after{margin-bottom:.8rem}.novo-optgroup-label.text-length-small{max-width:40ch}.novo-optgroup-label.text-length-medium{max-width:55ch}.novo-optgroup-label.text-length-large{max-width:70ch}.novo-optgroup-label.text-weight-hairline{font-weight:100}.novo-optgroup-label.text-weight-thin{font-weight:200}.novo-optgroup-label.text-weight-light{font-weight:300}.novo-optgroup-label.text-weight-normal{font-weight:400}.novo-optgroup-label.text-weight-medium{font-weight:500}.novo-optgroup-label.text-weight-semibold{font-weight:600}.novo-optgroup-label.text-weight-bold{font-weight:700}.novo-optgroup-label.text-weight-extrabold{font-weight:800}.novo-optgroup-label.text-weight-heavy{font-weight:900}.novo-optgroup-label.text-weight-lighter{font-weight:lighter}.novo-optgroup-label.text-weight-bolder{font-weight:bolder}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_OPTION_PARENT_COMPONENT]
                }, {
                    type: Optional
                }] }] });

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter = 0;
/** Event object emitted by NovoOption when selected or deselected. */
class NovoOptionSelectionChange {
    constructor(
    /** Reference to the option that emitted the event. */
    source, 
    /** Whether the change in the option's value was a result of a user action. */
    isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
class NovoOptionBase {
    /** If there is no parent then nothing is managing the selection. */
    get selectable() {
        return this.allowSelection && this._parent;
    }
    /** Whether the wrapping component is in multiple selection mode. */
    get multiple() {
        return this._parent && this._parent.multiple;
    }
    /** Whether the option is disabled. */
    get disabled() {
        return (this.group && this.group.disabled) || this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = coerceBooleanProperty(value);
    }
    constructor(_element, _changeDetectorRef, _parent, group) {
        this._element = _element;
        this._changeDetectorRef = _changeDetectorRef;
        this._parent = _parent;
        this.group = group;
        this._selected = false;
        this._active = false;
        this._disabled = false;
        this._mostRecentViewValue = '';
        /** TODO: deprecate maybe, check support for table headers */
        this.keepOpen = false;
        this.novoInert = false;
        this.allowSelection = true;
        // When selected, use a particular string for display instead of what was used to select it
        this.customViewValue = '';
        /** The unique ID of the option. */
        this.id = `novo-option-${_uniqueIdCounter++}`;
        /** Event emitted when the option is selected or deselected. */
        this.onSelectionChange = new EventEmitter();
        /** Emits when the state of the option changes and any parents have to be notified. */
        this._stateChanges = new Subject();
        // (click) is overridden when defined by user.
        this._clickCapture = fromEvent(this._element.nativeElement, 'click', { capture: true }).subscribe((evt) => {
            this._handleDisabledClick(evt);
        });
        this._clickPassive = fromEvent(this._element.nativeElement, 'click').subscribe((evt) => {
            setTimeout(() => this._handlePassiveClick(evt));
        });
    }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active() {
        return this._active;
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue() {
        return this.customViewValue || (this._getHostElement().textContent || '').trim();
    }
    /** Selects the option. */
    select() {
        if (!this._selected) {
            this._selected = true;
            this._changeDetectorRef.markForCheck();
        }
    }
    /** Deselects the option. */
    deselect() {
        if (this._selected) {
            this._selected = false;
            this._changeDetectorRef.markForCheck();
        }
    }
    /** Sets focus onto this option. */
    focus(_origin, options) {
        // Note that we aren't using `_origin`, but we need to keep it because some internal consumers
        // use `NovoOption` in a `FocusKeyManager` and we need it to match `FocusableOption`.
        const element = this._getHostElement();
        if (typeof element.focus === 'function') {
            element.focus(options);
        }
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles() {
        if (!this._active) {
            this._active = true;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles() {
        if (this._active) {
            this._active = false;
            this._changeDetectorRef.markForCheck();
        }
    }
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel() {
        return this.viewValue;
    }
    _handleDisabledClick(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    }
    _handlePassiveClick(event) {
        if (!this.novoInert) {
            this._selectViaInteraction();
        }
    }
    /** Ensures the option is selected when activated from the keyboard. */
    _handleKeydown(event) {
        if (event.target instanceof HTMLInputElement && event.key === "Enter" /* Key.Enter */) {
            this._emitSelectionChangeEvent(!this.keepOpen);
        }
        else if (!(event.target instanceof HTMLInputElement) &&
            (event.key === "Enter" /* Key.Enter */ || event.key === " " /* Key.Space */) &&
            !hasModifierKey(event)) {
            this._selectViaInteraction();
            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    }
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    _selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._changeDetectorRef.markForCheck();
            this._emitSelectionChangeEvent(!this.keepOpen);
        }
    }
    /**
     * Force a click event
     */
    _clickViaInteraction() {
        if (!this.disabled) {
            this._element.nativeElement.click();
        }
    }
    /**
     * Gets the `aria-selected` value for the option. We explicitly omit the `aria-selected`
     * attribute from single-selection, unselected options. Including the `aria-selected="false"`
     * attributes adds a significant amount of noise to screen-reader users without providing useful
     * information.
     */
    _getAriaSelected() {
        return this.selected || (this.multiple ? false : null);
    }
    /** Returns the correct tabindex for the option depending on disabled state. */
    _getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    /** Gets the host DOM element. */
    _getHostElement() {
        return this._element.nativeElement;
    }
    ngAfterViewChecked() {
        // Since parent components could be using the option's label to display the selected values
        // (e.g. `novo-select`) and they don't have a way of knowing if the option's label has changed
        // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
        // relatively cheap, however we still limit them only to selected options in order to avoid
        // hitting the DOM too often.
        if (this._selected) {
            const viewValue = this.viewValue;
            if (viewValue !== this._mostRecentViewValue) {
                this._mostRecentViewValue = viewValue;
                this._stateChanges.next();
            }
        }
    }
    ngOnDestroy() {
        this._stateChanges.complete();
        this._clickCapture.unsubscribe();
        this._clickPassive.unsubscribe();
    }
    /** Emits the selection change event. */
    _emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new NovoOptionSelectionChange(this, isUserInput));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOptionBase, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: NOVO_OPTION_PARENT_COMPONENT, optional: true }, { token: NOVO_OPTGROUP, optional: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoOptionBase, isStandalone: true, inputs: { keepOpen: "keepOpen", novoInert: "novoInert", allowSelection: "allowSelection", customViewValue: "customViewValue", value: "value", id: "id", disabled: "disabled", selected: "selected" }, outputs: { onSelectionChange: "onSelectionChange" }, ngImport: i0 }); }
}
__decorate$2([
    BooleanInput(),
    __metadata$2("design:type", Boolean)
], NovoOptionBase.prototype, "keepOpen", void 0);
__decorate$2([
    BooleanInput(),
    __metadata$2("design:type", Boolean)
], NovoOptionBase.prototype, "novoInert", void 0);
__decorate$2([
    BooleanInput(),
    __metadata$2("design:type", Object)
], NovoOptionBase.prototype, "allowSelection", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOptionBase, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_OPTION_PARENT_COMPONENT]
                }] }, { type: NovoOptgroupBase, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_OPTGROUP]
                }] }], propDecorators: { keepOpen: [{
                type: Input
            }], novoInert: [{
                type: Input
            }], allowSelection: [{
                type: Input
            }], customViewValue: [{
                type: Input
            }], value: [{
                type: Input
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selected: [{
                type: Input
            }], onSelectionChange: [{
                type: Output
            }] } });
/**
 * Single option inside of a `<novo-select>` element.
 */
class NovoOption extends NovoOptionBase {
    constructor(element, changeDetectorRef, parent, group) {
        super(element, changeDetectorRef, parent, group);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOption, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: NOVO_OPTION_PARENT_COMPONENT, optional: true }, { token: NOVO_OPTGROUP, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoOption, isStandalone: false, selector: "novo-option", inputs: { selected: "selected", keepOpen: "keepOpen", novoInert: "novoInert", value: "value", disabled: "disabled" }, host: { attributes: { "role": "option" }, listeners: { "keydown": "_handleKeydown($event)" }, properties: { "id": "id", "attr.tabindex": "_getTabIndex()", "attr.aria-selected": "_getAriaSelected()", "attr.aria-disabled": "disabled.toString()", "class.novo-active": "active", "class.novo-selected": "selectable && selected", "class.novo-option-multiple": "multiple", "class.novo-option-disabled": "disabled", "class.novo-option-inert": "novoInert" }, classAttribute: "novo-option novo-focus-indicator" }, exportAs: ["novoOption"], usesInheritance: true, ngImport: i0, template: "<novo-pseudo-checkbox *ngIf=\"selectable && multiple\" class=\"novo-option-pseudo-checkbox\"\n  [state]=\"selected ? 'checked' : 'unchecked'\" [disabled]=\"disabled\"></novo-pseudo-checkbox>\n\n<span class=\"novo-option-text\">\n  <ng-content></ng-content>\n</span>\n\n<novo-pseudo-checkbox *ngIf=\"selectable && !multiple && selected\" class=\"novo-option-pseudo-checkbox\" state=\"checked\"\n  shape=\"line\"\n  [disabled]=\"disabled\"></novo-pseudo-checkbox>\n\n<ng-content select=\"[novoSuffix]\"></ng-content>\n<!-- See a11y notes inside optgroup.ts for context behind this element. -->\n<span class=\"cdk-visually-hidden\" *ngIf=\"group && group._novoInert\">({{ group.label }})</span>", styles: [".novo-option{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;position:relative;cursor:pointer;outline:none;display:flex;flex-direction:row;max-width:100%;box-sizing:border-box;align-items:center;margin:0;padding:1rem 1rem 1rem 1.6rem;gap:1rem;flex:1;-webkit-tap-highlight-color:transparent}.novo-option.text-capitalize{text-transform:capitalize}.novo-option.text-uppercase{text-transform:uppercase}.novo-option.text-nowrap{white-space:nowrap}.novo-option.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-option.text-size-default{font-size:inherit}.novo-option.text-size-body{font-size:1.3rem}.novo-option.text-size-xs{font-size:1rem}.novo-option.text-size-sm{font-size:1.2rem}.novo-option.text-size-md{font-size:1.3rem}.novo-option.text-size-lg{font-size:1.6rem}.novo-option.text-size-xl{font-size:2rem}.novo-option.text-size-2xl{font-size:2.6rem}.novo-option.text-size-3xl{font-size:3.2rem}.novo-option.text-size-smaller{font-size:.8em}.novo-option.text-size-larger{font-size:1.2em}.novo-option.text-color-black{color:#000}.novo-option.text-color-white{color:#fff}.novo-option.text-color-gray,.novo-option.text-color-grey{color:#9e9e9e}.novo-option.text-color-offWhite,.novo-option.text-color-bright{color:#f7f7f7}.novo-option.text-color-light{color:#dbdbdb}.novo-option.text-color-neutral{color:#4f5361}.novo-option.text-color-dark{color:#3d464d}.novo-option.text-color-orange{color:#ff6900}.novo-option.text-color-navigation{color:#202945}.novo-option.text-color-skyBlue{color:#009bdf}.novo-option.text-color-steel{color:#5b6770}.novo-option.text-color-metal{color:#637893}.novo-option.text-color-sand{color:#f4f4f4}.novo-option.text-color-silver{color:#e2e2e2}.novo-option.text-color-stone{color:#bebebe}.novo-option.text-color-ash{color:#a0a0a0}.novo-option.text-color-slate{color:#707070}.novo-option.text-color-onyx{color:#526980}.novo-option.text-color-charcoal{color:#282828}.novo-option.text-color-moonlight{color:#1a242f}.novo-option.text-color-midnight{color:#202945}.novo-option.text-color-darkness{color:#161f27}.novo-option.text-color-navy{color:#0d2d42}.novo-option.text-color-aqua{color:#3bafda}.novo-option.text-color-ocean{color:#4a89dc}.novo-option.text-color-mint{color:#37bc9b}.novo-option.text-color-grass{color:#8cc152}.novo-option.text-color-sunflower{color:#f6b042}.novo-option.text-color-bittersweet{color:#eb6845}.novo-option.text-color-grapefruit{color:#da4453}.novo-option.text-color-carnation{color:#d770ad}.novo-option.text-color-lavender{color:#967adc}.novo-option.text-color-mountain{color:#9678b6}.novo-option.text-color-info,.novo-option.text-color-positive{color:#4a89dc}.novo-option.text-color-success{color:#8cc152}.novo-option.text-color-negative,.novo-option.text-color-danger,.novo-option.text-color-error{color:#da4453}.novo-option.text-color-warning{color:#f6b042}.novo-option.text-color-empty{color:#cccdcc}.novo-option.text-color-disabled{color:#bebebe}.novo-option.text-color-background{color:#f7f7f7}.novo-option.text-color-backgroundDark{color:#e2e2e2}.novo-option.text-color-presentation{color:#5b6770}.novo-option.text-color-bullhorn{color:#ff6900}.novo-option.text-color-pulse{color:#3bafda}.novo-option.text-color-company{color:#39d}.novo-option.text-color-candidate{color:#4b7}.novo-option.text-color-lead{color:#a69}.novo-option.text-color-contact,.novo-option.text-color-clientcontact{color:#fa4}.novo-option.text-color-opportunity{color:#625}.novo-option.text-color-job,.novo-option.text-color-joborder{color:#b56}.novo-option.text-color-submission{color:#a9adbb}.novo-option.text-color-sendout{color:#747884}.novo-option.text-color-placement{color:#0b344f}.novo-option.text-color-note{color:#747884}.novo-option.text-color-contract{color:#454ea0}.novo-option.text-color-task{color:#4f5361}.novo-option.text-color-jobCode,.novo-option.text-color-earnCode,.novo-option.text-color-invoiceStatement,.novo-option.text-color-billableCharge,.novo-option.text-color-payableCharge,.novo-option.text-color-user,.novo-option.text-color-corporateUser,.novo-option.text-color-distributionList,.novo-option.text-color-credential,.novo-option.text-color-person{color:#696d79}.novo-option.margin-before{margin-top:.4rem}.novo-option.margin-after{margin-bottom:.8rem}.novo-option.text-length-small{max-width:40ch}.novo-option.text-length-medium{max-width:55ch}.novo-option.text-length-large{max-width:70ch}.novo-option.text-weight-hairline{font-weight:100}.novo-option.text-weight-thin{font-weight:200}.novo-option.text-weight-light{font-weight:300}.novo-option.text-weight-normal{font-weight:400}.novo-option.text-weight-medium{font-weight:500}.novo-option.text-weight-semibold{font-weight:600}.novo-option.text-weight-bold{font-weight:700}.novo-option.text-weight-extrabold{font-weight:800}.novo-option.text-weight-heavy{font-weight:900}.novo-option.text-weight-lighter{font-weight:lighter}.novo-option.text-weight-bolder{font-weight:bolder}.novo-option:hover:not(.novo-option-inert){background:var(--background-main, rgba(74, 137, 220, .1))}.novo-option:active:not(.novo-option-inert),.novo-option.novo-active:not(.novo-option-inert){background:#4a89dc4d}.novo-option.novo-selected,.novo-option .add-icon{color:#4a89dc}.novo-option.disabled,.novo-option[aria-disabled=true]{cursor:not-allowed;color:#bebebe}.novo-option.disabled:hover,.novo-option[aria-disabled=true]:hover{background:#da44531a}.novo-optgroup .novo-option:not(.novo-option-multiple){padding-left:1rem}[dir=rtl] .novo-optgroup .novo-option:not(.novo-option-multiple){padding-left:.5rem;padding-right:1rem}.novo-option.novo-accent-black{border-left:4px solid #000000}.novo-option.novo-fill-black:not(.novo-option-inert){color:#fff;background:#000}.novo-option.novo-fill-black:not(.novo-option-inert):hover,.novo-option.novo-fill-black:not(.novo-option-inert):focus{background:#333}.novo-option.novo-fill-black:not(.novo-option-inert):active{background:#000}.novo-option.novo-accent-white{border-left:4px solid #ffffff}.novo-option.novo-fill-white:not(.novo-option-inert){color:#3d464d;background:#fff}.novo-option.novo-fill-white:not(.novo-option-inert):hover,.novo-option.novo-fill-white:not(.novo-option-inert):focus{background:#fff}.novo-option.novo-fill-white:not(.novo-option-inert):active{background:#ccc}.novo-option.novo-accent-gray{border-left:4px solid #9e9e9e}.novo-option.novo-fill-gray:not(.novo-option-inert){color:#3d464d;background:#9e9e9e}.novo-option.novo-fill-gray:not(.novo-option-inert):hover,.novo-option.novo-fill-gray:not(.novo-option-inert):focus{background:#b1b1b1}.novo-option.novo-fill-gray:not(.novo-option-inert):active{background:#7e7e7e}.novo-option.novo-accent-grey{border-left:4px solid #9e9e9e}.novo-option.novo-fill-grey:not(.novo-option-inert){color:#3d464d;background:#9e9e9e}.novo-option.novo-fill-grey:not(.novo-option-inert):hover,.novo-option.novo-fill-grey:not(.novo-option-inert):focus{background:#b1b1b1}.novo-option.novo-fill-grey:not(.novo-option-inert):active{background:#7e7e7e}.novo-option.novo-accent-offWhite{border-left:4px solid #f7f7f7}.novo-option.novo-fill-offWhite:not(.novo-option-inert){color:#3d464d;background:#f7f7f7}.novo-option.novo-fill-offWhite:not(.novo-option-inert):hover,.novo-option.novo-fill-offWhite:not(.novo-option-inert):focus{background:#f8f8f8}.novo-option.novo-fill-offWhite:not(.novo-option-inert):active{background:#c5c5c5}.novo-option.novo-accent-bright{border-left:4px solid #f7f7f7}.novo-option.novo-fill-bright:not(.novo-option-inert){color:#3d464d;background:#f7f7f7}.novo-option.novo-fill-bright:not(.novo-option-inert):hover,.novo-option.novo-fill-bright:not(.novo-option-inert):focus{background:#f8f8f8}.novo-option.novo-fill-bright:not(.novo-option-inert):active{background:#c5c5c5}.novo-option.novo-accent-light{border-left:4px solid #dbdbdb}.novo-option.novo-fill-light:not(.novo-option-inert){color:#3d464d;background:#dbdbdb}.novo-option.novo-fill-light:not(.novo-option-inert):hover,.novo-option.novo-fill-light:not(.novo-option-inert):focus{background:#e2e2e2}.novo-option.novo-fill-light:not(.novo-option-inert):active{background:#afafaf}.novo-option.novo-accent-neutral{border-left:4px solid #4f5361}.novo-option.novo-fill-neutral:not(.novo-option-inert){color:#fff;background:#4f5361}.novo-option.novo-fill-neutral:not(.novo-option-inert):hover,.novo-option.novo-fill-neutral:not(.novo-option-inert):focus{background:#727580}.novo-option.novo-fill-neutral:not(.novo-option-inert):active{background:#3f424d}.novo-option.novo-accent-dark{border-left:4px solid #3d464d}.novo-option.novo-fill-dark:not(.novo-option-inert){color:#fff;background:#3d464d}.novo-option.novo-fill-dark:not(.novo-option-inert):hover,.novo-option.novo-fill-dark:not(.novo-option-inert):focus{background:#636b70}.novo-option.novo-fill-dark:not(.novo-option-inert):active{background:#30383d}.novo-option.novo-accent-orange{border-left:4px solid #ff6900}.novo-option.novo-fill-orange:not(.novo-option-inert){color:#3d464d;background:#ff6900}.novo-option.novo-fill-orange:not(.novo-option-inert):hover,.novo-option.novo-fill-orange:not(.novo-option-inert):focus{background:#ff8733}.novo-option.novo-fill-orange:not(.novo-option-inert):active{background:#cc5400}.novo-option.novo-accent-navigation{border-left:4px solid #202945}.novo-option.novo-fill-navigation:not(.novo-option-inert){color:#fff;background:#202945}.novo-option.novo-fill-navigation:not(.novo-option-inert):hover,.novo-option.novo-fill-navigation:not(.novo-option-inert):focus{background:#4c536a}.novo-option.novo-fill-navigation:not(.novo-option-inert):active{background:#192037}.novo-option.novo-accent-skyBlue{border-left:4px solid #009bdf}.novo-option.novo-fill-skyBlue:not(.novo-option-inert){color:#fff;background:#009bdf}.novo-option.novo-fill-skyBlue:not(.novo-option-inert):hover,.novo-option.novo-fill-skyBlue:not(.novo-option-inert):focus{background:#33afe5}.novo-option.novo-fill-skyBlue:not(.novo-option-inert):active{background:#007cb2}.novo-option.novo-accent-steel{border-left:4px solid #5b6770}.novo-option.novo-fill-steel:not(.novo-option-inert){color:#fff;background:#5b6770}.novo-option.novo-fill-steel:not(.novo-option-inert):hover,.novo-option.novo-fill-steel:not(.novo-option-inert):focus{background:#7b858c}.novo-option.novo-fill-steel:not(.novo-option-inert):active{background:#485259}.novo-option.novo-accent-metal{border-left:4px solid #637893}.novo-option.novo-fill-metal:not(.novo-option-inert){color:#fff;background:#637893}.novo-option.novo-fill-metal:not(.novo-option-inert):hover,.novo-option.novo-fill-metal:not(.novo-option-inert):focus{background:#8293a8}.novo-option.novo-fill-metal:not(.novo-option-inert):active{background:#4f6075}.novo-option.novo-accent-sand{border-left:4px solid #f4f4f4}.novo-option.novo-fill-sand:not(.novo-option-inert){color:#3d464d;background:#f4f4f4}.novo-option.novo-fill-sand:not(.novo-option-inert):hover,.novo-option.novo-fill-sand:not(.novo-option-inert):focus{background:#f6f6f6}.novo-option.novo-fill-sand:not(.novo-option-inert):active{background:#c3c3c3}.novo-option.novo-accent-silver{border-left:4px solid #e2e2e2}.novo-option.novo-fill-silver:not(.novo-option-inert){color:#3d464d;background:#e2e2e2}.novo-option.novo-fill-silver:not(.novo-option-inert):hover,.novo-option.novo-fill-silver:not(.novo-option-inert):focus{background:#e7e7e7}.novo-option.novo-fill-silver:not(.novo-option-inert):active{background:#b4b4b4}.novo-option.novo-accent-stone{border-left:4px solid #bebebe}.novo-option.novo-fill-stone:not(.novo-option-inert){color:#3d464d;background:#bebebe}.novo-option.novo-fill-stone:not(.novo-option-inert):hover,.novo-option.novo-fill-stone:not(.novo-option-inert):focus{background:#cbcbcb}.novo-option.novo-fill-stone:not(.novo-option-inert):active{background:#989898}.novo-option.novo-accent-ash{border-left:4px solid #a0a0a0}.novo-option.novo-fill-ash:not(.novo-option-inert){color:#3d464d;background:#a0a0a0}.novo-option.novo-fill-ash:not(.novo-option-inert):hover,.novo-option.novo-fill-ash:not(.novo-option-inert):focus{background:#b3b3b3}.novo-option.novo-fill-ash:not(.novo-option-inert):active{background:gray}.novo-option.novo-accent-slate{border-left:4px solid #707070}.novo-option.novo-fill-slate:not(.novo-option-inert){color:#fff;background:#707070}.novo-option.novo-fill-slate:not(.novo-option-inert):hover,.novo-option.novo-fill-slate:not(.novo-option-inert):focus{background:#8c8c8c}.novo-option.novo-fill-slate:not(.novo-option-inert):active{background:#595959}.novo-option.novo-accent-onyx{border-left:4px solid #526980}.novo-option.novo-fill-onyx:not(.novo-option-inert){color:#fff;background:#526980}.novo-option.novo-fill-onyx:not(.novo-option-inert):hover,.novo-option.novo-fill-onyx:not(.novo-option-inert):focus{background:#748799}.novo-option.novo-fill-onyx:not(.novo-option-inert):active{background:#415466}.novo-option.novo-accent-charcoal{border-left:4px solid #282828}.novo-option.novo-fill-charcoal:not(.novo-option-inert){color:#fff;background:#282828}.novo-option.novo-fill-charcoal:not(.novo-option-inert):hover,.novo-option.novo-fill-charcoal:not(.novo-option-inert):focus{background:#535353}.novo-option.novo-fill-charcoal:not(.novo-option-inert):active{background:#202020}.novo-option.novo-accent-moonlight{border-left:4px solid #1a242f}.novo-option.novo-fill-moonlight:not(.novo-option-inert){color:#fff;background:#1a242f}.novo-option.novo-fill-moonlight:not(.novo-option-inert):hover,.novo-option.novo-fill-moonlight:not(.novo-option-inert):focus{background:#474f58}.novo-option.novo-fill-moonlight:not(.novo-option-inert):active{background:#141c25}.novo-option.novo-accent-midnight{border-left:4px solid #202945}.novo-option.novo-fill-midnight:not(.novo-option-inert){color:#fff;background:#202945}.novo-option.novo-fill-midnight:not(.novo-option-inert):hover,.novo-option.novo-fill-midnight:not(.novo-option-inert):focus{background:#4c536a}.novo-option.novo-fill-midnight:not(.novo-option-inert):active{background:#192037}.novo-option.novo-accent-darkness{border-left:4px solid #161f27}.novo-option.novo-fill-darkness:not(.novo-option-inert){color:#fff;background:#161f27}.novo-option.novo-fill-darkness:not(.novo-option-inert):hover,.novo-option.novo-fill-darkness:not(.novo-option-inert):focus{background:#444b52}.novo-option.novo-fill-darkness:not(.novo-option-inert):active{background:#11181f}.novo-option.novo-accent-navy{border-left:4px solid #0d2d42}.novo-option.novo-fill-navy:not(.novo-option-inert){color:#fff;background:#0d2d42}.novo-option.novo-fill-navy:not(.novo-option-inert):hover,.novo-option.novo-fill-navy:not(.novo-option-inert):focus{background:#3d5767}.novo-option.novo-fill-navy:not(.novo-option-inert):active{background:#0a2434}.novo-option.novo-accent-aqua{border-left:4px solid #3bafda}.novo-option.novo-fill-aqua:not(.novo-option-inert){color:#3d464d;background:#3bafda}.novo-option.novo-fill-aqua:not(.novo-option-inert):hover,.novo-option.novo-fill-aqua:not(.novo-option-inert):focus{background:#62bfe1}.novo-option.novo-fill-aqua:not(.novo-option-inert):active{background:#2f8cae}.novo-option.novo-accent-ocean{border-left:4px solid #4a89dc}.novo-option.novo-fill-ocean:not(.novo-option-inert){color:#fff;background:#4a89dc}.novo-option.novo-fill-ocean:not(.novo-option-inert):hover,.novo-option.novo-fill-ocean:not(.novo-option-inert):focus{background:#6ea0e3}.novo-option.novo-fill-ocean:not(.novo-option-inert):active{background:#3b6db0}.novo-option.novo-accent-mint{border-left:4px solid #37bc9b}.novo-option.novo-fill-mint:not(.novo-option-inert){color:#3d464d;background:#37bc9b}.novo-option.novo-fill-mint:not(.novo-option-inert):hover,.novo-option.novo-fill-mint:not(.novo-option-inert):focus{background:#5fc9af}.novo-option.novo-fill-mint:not(.novo-option-inert):active{background:#2c967c}.novo-option.novo-accent-grass{border-left:4px solid #8cc152}.novo-option.novo-fill-grass:not(.novo-option-inert){color:#fff;background:#8cc152}.novo-option.novo-fill-grass:not(.novo-option-inert):hover,.novo-option.novo-fill-grass:not(.novo-option-inert):focus{background:#a3cd74}.novo-option.novo-fill-grass:not(.novo-option-inert):active{background:#709a41}.novo-option.novo-accent-sunflower{border-left:4px solid #f6b042}.novo-option.novo-fill-sunflower:not(.novo-option-inert){color:#fff;background:#f6b042}.novo-option.novo-fill-sunflower:not(.novo-option-inert):hover,.novo-option.novo-fill-sunflower:not(.novo-option-inert):focus{background:#f7bf67}.novo-option.novo-fill-sunflower:not(.novo-option-inert):active{background:#c48c34}.novo-option.novo-accent-bittersweet{border-left:4px solid #eb6845}.novo-option.novo-fill-bittersweet:not(.novo-option-inert){color:#fff;background:#eb6845}.novo-option.novo-fill-bittersweet:not(.novo-option-inert):hover,.novo-option.novo-fill-bittersweet:not(.novo-option-inert):focus{background:#ef866a}.novo-option.novo-fill-bittersweet:not(.novo-option-inert):active{background:#bc5337}.novo-option.novo-accent-grapefruit{border-left:4px solid #da4453}.novo-option.novo-fill-grapefruit:not(.novo-option-inert){color:#fff;background:#da4453}.novo-option.novo-fill-grapefruit:not(.novo-option-inert):hover,.novo-option.novo-fill-grapefruit:not(.novo-option-inert):focus{background:#e16975}.novo-option.novo-fill-grapefruit:not(.novo-option-inert):active{background:#ae3642}.novo-option.novo-accent-carnation{border-left:4px solid #d770ad}.novo-option.novo-fill-carnation:not(.novo-option-inert){color:#fff;background:#d770ad}.novo-option.novo-fill-carnation:not(.novo-option-inert):hover,.novo-option.novo-fill-carnation:not(.novo-option-inert):focus{background:#df8cbd}.novo-option.novo-fill-carnation:not(.novo-option-inert):active{background:#ac598a}.novo-option.novo-accent-lavender{border-left:4px solid #967adc}.novo-option.novo-fill-lavender:not(.novo-option-inert){color:#fff;background:#967adc}.novo-option.novo-fill-lavender:not(.novo-option-inert):hover,.novo-option.novo-fill-lavender:not(.novo-option-inert):focus{background:#ab94e3}.novo-option.novo-fill-lavender:not(.novo-option-inert):active{background:#7861b0}.novo-option.novo-accent-mountain{border-left:4px solid #9678b6}.novo-option.novo-fill-mountain:not(.novo-option-inert){color:#fff;background:#9678b6}.novo-option.novo-fill-mountain:not(.novo-option-inert):hover,.novo-option.novo-fill-mountain:not(.novo-option-inert):focus{background:#ab93c4}.novo-option.novo-fill-mountain:not(.novo-option-inert):active{background:#786091}.novo-option.novo-accent-info{border-left:4px solid #4a89dc}.novo-option.novo-fill-info:not(.novo-option-inert){color:#fff;background:#4a89dc}.novo-option.novo-fill-info:not(.novo-option-inert):hover,.novo-option.novo-fill-info:not(.novo-option-inert):focus{background:#6ea0e3}.novo-option.novo-fill-info:not(.novo-option-inert):active{background:#3b6db0}.novo-option.novo-accent-positive{border-left:4px solid #4a89dc}.novo-option.novo-fill-positive:not(.novo-option-inert){color:#fff;background:#4a89dc}.novo-option.novo-fill-positive:not(.novo-option-inert):hover,.novo-option.novo-fill-positive:not(.novo-option-inert):focus{background:#6ea0e3}.novo-option.novo-fill-positive:not(.novo-option-inert):active{background:#3b6db0}.novo-option.novo-accent-success{border-left:4px solid #8cc152}.novo-option.novo-fill-success:not(.novo-option-inert){color:#fff;background:#8cc152}.novo-option.novo-fill-success:not(.novo-option-inert):hover,.novo-option.novo-fill-success:not(.novo-option-inert):focus{background:#a3cd74}.novo-option.novo-fill-success:not(.novo-option-inert):active{background:#709a41}.novo-option.novo-accent-negative{border-left:4px solid #da4453}.novo-option.novo-fill-negative:not(.novo-option-inert){color:#fff;background:#da4453}.novo-option.novo-fill-negative:not(.novo-option-inert):hover,.novo-option.novo-fill-negative:not(.novo-option-inert):focus{background:#e16975}.novo-option.novo-fill-negative:not(.novo-option-inert):active{background:#ae3642}.novo-option.novo-accent-danger{border-left:4px solid #da4453}.novo-option.novo-fill-danger:not(.novo-option-inert){color:#fff;background:#da4453}.novo-option.novo-fill-danger:not(.novo-option-inert):hover,.novo-option.novo-fill-danger:not(.novo-option-inert):focus{background:#e16975}.novo-option.novo-fill-danger:not(.novo-option-inert):active{background:#ae3642}.novo-option.novo-accent-error{border-left:4px solid #da4453}.novo-option.novo-fill-error:not(.novo-option-inert){color:#fff;background:#da4453}.novo-option.novo-fill-error:not(.novo-option-inert):hover,.novo-option.novo-fill-error:not(.novo-option-inert):focus{background:#e16975}.novo-option.novo-fill-error:not(.novo-option-inert):active{background:#ae3642}.novo-option.novo-accent-warning{border-left:4px solid #f6b042}.novo-option.novo-fill-warning:not(.novo-option-inert){color:#fff;background:#f6b042}.novo-option.novo-fill-warning:not(.novo-option-inert):hover,.novo-option.novo-fill-warning:not(.novo-option-inert):focus{background:#f7bf67}.novo-option.novo-fill-warning:not(.novo-option-inert):active{background:#c48c34}.novo-option.novo-accent-empty{border-left:4px solid #cccdcc}.novo-option.novo-fill-empty:not(.novo-option-inert){color:#3d464d;background:#cccdcc}.novo-option.novo-fill-empty:not(.novo-option-inert):hover,.novo-option.novo-fill-empty:not(.novo-option-inert):focus{background:#d6d7d6}.novo-option.novo-fill-empty:not(.novo-option-inert):active{background:#a3a4a3}.novo-option.novo-accent-disabled{border-left:4px solid #bebebe}.novo-option.novo-fill-disabled:not(.novo-option-inert){color:#3d464d;background:#bebebe}.novo-option.novo-fill-disabled:not(.novo-option-inert):hover,.novo-option.novo-fill-disabled:not(.novo-option-inert):focus{background:#cbcbcb}.novo-option.novo-fill-disabled:not(.novo-option-inert):active{background:#989898}.novo-option.novo-accent-background{border-left:4px solid #f7f7f7}.novo-option.novo-fill-background:not(.novo-option-inert){color:#3d464d;background:#f7f7f7}.novo-option.novo-fill-background:not(.novo-option-inert):hover,.novo-option.novo-fill-background:not(.novo-option-inert):focus{background:#f8f8f8}.novo-option.novo-fill-background:not(.novo-option-inert):active{background:#c5c5c5}.novo-option.novo-accent-backgroundDark{border-left:4px solid #e2e2e2}.novo-option.novo-fill-backgroundDark:not(.novo-option-inert){color:#3d464d;background:#e2e2e2}.novo-option.novo-fill-backgroundDark:not(.novo-option-inert):hover,.novo-option.novo-fill-backgroundDark:not(.novo-option-inert):focus{background:#e7e7e7}.novo-option.novo-fill-backgroundDark:not(.novo-option-inert):active{background:#b4b4b4}.novo-option.novo-accent-presentation{border-left:4px solid #5b6770}.novo-option.novo-fill-presentation:not(.novo-option-inert){color:#fff;background:#5b6770}.novo-option.novo-fill-presentation:not(.novo-option-inert):hover,.novo-option.novo-fill-presentation:not(.novo-option-inert):focus{background:#7b858c}.novo-option.novo-fill-presentation:not(.novo-option-inert):active{background:#485259}.novo-option.novo-accent-bullhorn{border-left:4px solid #ff6900}.novo-option.novo-fill-bullhorn:not(.novo-option-inert){color:#3d464d;background:#ff6900}.novo-option.novo-fill-bullhorn:not(.novo-option-inert):hover,.novo-option.novo-fill-bullhorn:not(.novo-option-inert):focus{background:#ff8733}.novo-option.novo-fill-bullhorn:not(.novo-option-inert):active{background:#cc5400}.novo-option.novo-accent-pulse{border-left:4px solid #3bafda}.novo-option.novo-fill-pulse:not(.novo-option-inert){color:#3d464d;background:#3bafda}.novo-option.novo-fill-pulse:not(.novo-option-inert):hover,.novo-option.novo-fill-pulse:not(.novo-option-inert):focus{background:#62bfe1}.novo-option.novo-fill-pulse:not(.novo-option-inert):active{background:#2f8cae}.novo-option.novo-accent-company{border-left:4px solid #3399dd}.novo-option.novo-fill-company:not(.novo-option-inert){color:#fff;background:#39d}.novo-option.novo-fill-company:not(.novo-option-inert):hover,.novo-option.novo-fill-company:not(.novo-option-inert):focus{background:#5bade3}.novo-option.novo-fill-company:not(.novo-option-inert):active{background:#287ab0}.novo-option.novo-accent-candidate{border-left:4px solid #44bb77}.novo-option.novo-fill-candidate:not(.novo-option-inert){color:#fff;background:#4b7}.novo-option.novo-fill-candidate:not(.novo-option-inert):hover,.novo-option.novo-fill-candidate:not(.novo-option-inert):focus{background:#69c892}.novo-option.novo-fill-candidate:not(.novo-option-inert):active{background:#36955f}.novo-option.novo-accent-lead{border-left:4px solid #aa6699}.novo-option.novo-fill-lead:not(.novo-option-inert){color:#fff;background:#a69}.novo-option.novo-fill-lead:not(.novo-option-inert):hover,.novo-option.novo-fill-lead:not(.novo-option-inert):focus{background:#bb84ad}.novo-option.novo-fill-lead:not(.novo-option-inert):active{background:#88517a}.novo-option.novo-accent-contact{border-left:4px solid #ffaa44}.novo-option.novo-fill-contact:not(.novo-option-inert){color:#fff;background:#fa4}.novo-option.novo-fill-contact:not(.novo-option-inert):hover,.novo-option.novo-fill-contact:not(.novo-option-inert):focus{background:#ffbb69}.novo-option.novo-fill-contact:not(.novo-option-inert):active{background:#cc8836}.novo-option.novo-accent-clientcontact{border-left:4px solid #ffaa44}.novo-option.novo-fill-clientcontact:not(.novo-option-inert){color:#fff;background:#fa4}.novo-option.novo-fill-clientcontact:not(.novo-option-inert):hover,.novo-option.novo-fill-clientcontact:not(.novo-option-inert):focus{background:#ffbb69}.novo-option.novo-fill-clientcontact:not(.novo-option-inert):active{background:#cc8836}.novo-option.novo-accent-opportunity{border-left:4px solid #662255}.novo-option.novo-fill-opportunity:not(.novo-option-inert){color:#fff;background:#625}.novo-option.novo-fill-opportunity:not(.novo-option-inert):hover,.novo-option.novo-fill-opportunity:not(.novo-option-inert):focus{background:#844e77}.novo-option.novo-fill-opportunity:not(.novo-option-inert):active{background:#511b44}.novo-option.novo-accent-job{border-left:4px solid #bb5566}.novo-option.novo-fill-job:not(.novo-option-inert){color:#fff;background:#b56}.novo-option.novo-fill-job:not(.novo-option-inert):hover,.novo-option.novo-fill-job:not(.novo-option-inert):focus{background:#c87784}.novo-option.novo-fill-job:not(.novo-option-inert):active{background:#954451}.novo-option.novo-accent-joborder{border-left:4px solid #bb5566}.novo-option.novo-fill-joborder:not(.novo-option-inert){color:#fff;background:#b56}.novo-option.novo-fill-joborder:not(.novo-option-inert):hover,.novo-option.novo-fill-joborder:not(.novo-option-inert):focus{background:#c87784}.novo-option.novo-fill-joborder:not(.novo-option-inert):active{background:#954451}.novo-option.novo-accent-submission{border-left:4px solid #a9adbb}.novo-option.novo-fill-submission:not(.novo-option-inert){color:#3d464d;background:#a9adbb}.novo-option.novo-fill-submission:not(.novo-option-inert):hover,.novo-option.novo-fill-submission:not(.novo-option-inert):focus{background:#babdc8}.novo-option.novo-fill-submission:not(.novo-option-inert):active{background:#878a95}.novo-option.novo-accent-sendout{border-left:4px solid #747884}.novo-option.novo-fill-sendout:not(.novo-option-inert){color:#fff;background:#747884}.novo-option.novo-fill-sendout:not(.novo-option-inert):hover,.novo-option.novo-fill-sendout:not(.novo-option-inert):focus{background:#8f939c}.novo-option.novo-fill-sendout:not(.novo-option-inert):active{background:#5c6069}.novo-option.novo-accent-placement{border-left:4px solid #0b344f}.novo-option.novo-fill-placement:not(.novo-option-inert){color:#fff;background:#0b344f}.novo-option.novo-fill-placement:not(.novo-option-inert):hover,.novo-option.novo-fill-placement:not(.novo-option-inert):focus{background:#3b5c72}.novo-option.novo-fill-placement:not(.novo-option-inert):active{background:#08293f}.novo-option.novo-accent-note{border-left:4px solid #747884}.novo-option.novo-fill-note:not(.novo-option-inert){color:#fff;background:#747884}.novo-option.novo-fill-note:not(.novo-option-inert):hover,.novo-option.novo-fill-note:not(.novo-option-inert):focus{background:#8f939c}.novo-option.novo-fill-note:not(.novo-option-inert):active{background:#5c6069}.novo-option.novo-accent-contract{border-left:4px solid #454ea0}.novo-option.novo-fill-contract:not(.novo-option-inert){color:#fff;background:#454ea0}.novo-option.novo-fill-contract:not(.novo-option-inert):hover,.novo-option.novo-fill-contract:not(.novo-option-inert):focus{background:#6a71b3}.novo-option.novo-fill-contract:not(.novo-option-inert):active{background:#373e80}.novo-option.novo-accent-task{border-left:4px solid #4f5361}.novo-option.novo-fill-task:not(.novo-option-inert){color:#fff;background:#4f5361}.novo-option.novo-fill-task:not(.novo-option-inert):hover,.novo-option.novo-fill-task:not(.novo-option-inert):focus{background:#727580}.novo-option.novo-fill-task:not(.novo-option-inert):active{background:#3f424d}.novo-option.novo-accent-jobCode{border-left:4px solid #696d79}.novo-option.novo-fill-jobCode:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-jobCode:not(.novo-option-inert):hover,.novo-option.novo-fill-jobCode:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-jobCode:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-earnCode{border-left:4px solid #696d79}.novo-option.novo-fill-earnCode:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-earnCode:not(.novo-option-inert):hover,.novo-option.novo-fill-earnCode:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-earnCode:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-invoiceStatement{border-left:4px solid #696d79}.novo-option.novo-fill-invoiceStatement:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-invoiceStatement:not(.novo-option-inert):hover,.novo-option.novo-fill-invoiceStatement:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-invoiceStatement:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-billableCharge{border-left:4px solid #696d79}.novo-option.novo-fill-billableCharge:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-billableCharge:not(.novo-option-inert):hover,.novo-option.novo-fill-billableCharge:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-billableCharge:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-payableCharge{border-left:4px solid #696d79}.novo-option.novo-fill-payableCharge:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-payableCharge:not(.novo-option-inert):hover,.novo-option.novo-fill-payableCharge:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-payableCharge:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-user{border-left:4px solid #696d79}.novo-option.novo-fill-user:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-user:not(.novo-option-inert):hover,.novo-option.novo-fill-user:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-user:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-corporateUser{border-left:4px solid #696d79}.novo-option.novo-fill-corporateUser:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-corporateUser:not(.novo-option-inert):hover,.novo-option.novo-fill-corporateUser:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-corporateUser:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-distributionList{border-left:4px solid #696d79}.novo-option.novo-fill-distributionList:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-distributionList:not(.novo-option-inert):hover,.novo-option.novo-fill-distributionList:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-distributionList:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-credential{border-left:4px solid #696d79}.novo-option.novo-fill-credential:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-credential:not(.novo-option-inert):hover,.novo-option.novo-fill-credential:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-credential:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-person{border-left:4px solid #696d79}.novo-option.novo-fill-person:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-person:not(.novo-option-inert):hover,.novo-option.novo-fill-person:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-person:not(.novo-option-inert):active{background:#545760}.novo-option-text{display:inline-block;display:inline-flex;flex-direction:row;align-items:center;flex-grow:1;overflow:hidden;text-overflow:ellipsis;gap:1rem}.novo-option-pseudo-checkbox{margin-right:.25rem}[dir=rtl] .novo-option-pseudo-checkbox{margin-left:.25rem;margin-right:0}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: NovoPseudoCheckbox, selector: "novo-pseudo-checkbox", inputs: ["state", "shape", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOption, decorators: [{
            type: Component,
            args: [{ selector: 'novo-option', exportAs: 'novoOption', host: {
                        role: 'option',
                        '[id]': 'id',
                        '[attr.tabindex]': '_getTabIndex()',
                        '[attr.aria-selected]': '_getAriaSelected()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[class.novo-active]': 'active',
                        '[class.novo-selected]': 'selectable && selected',
                        '[class.novo-option-multiple]': 'multiple',
                        '[class.novo-option-disabled]': 'disabled',
                        '[class.novo-option-inert]': 'novoInert',
                        '(keydown)': '_handleKeydown($event)',
                        class: 'novo-option novo-focus-indicator',
                    }, inputs: ['selected', 'keepOpen', 'novoInert', 'value', 'disabled'], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<novo-pseudo-checkbox *ngIf=\"selectable && multiple\" class=\"novo-option-pseudo-checkbox\"\n  [state]=\"selected ? 'checked' : 'unchecked'\" [disabled]=\"disabled\"></novo-pseudo-checkbox>\n\n<span class=\"novo-option-text\">\n  <ng-content></ng-content>\n</span>\n\n<novo-pseudo-checkbox *ngIf=\"selectable && !multiple && selected\" class=\"novo-option-pseudo-checkbox\" state=\"checked\"\n  shape=\"line\"\n  [disabled]=\"disabled\"></novo-pseudo-checkbox>\n\n<ng-content select=\"[novoSuffix]\"></ng-content>\n<!-- See a11y notes inside optgroup.ts for context behind this element. -->\n<span class=\"cdk-visually-hidden\" *ngIf=\"group && group._novoInert\">({{ group.label }})</span>", styles: [".novo-option{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;position:relative;cursor:pointer;outline:none;display:flex;flex-direction:row;max-width:100%;box-sizing:border-box;align-items:center;margin:0;padding:1rem 1rem 1rem 1.6rem;gap:1rem;flex:1;-webkit-tap-highlight-color:transparent}.novo-option.text-capitalize{text-transform:capitalize}.novo-option.text-uppercase{text-transform:uppercase}.novo-option.text-nowrap{white-space:nowrap}.novo-option.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-option.text-size-default{font-size:inherit}.novo-option.text-size-body{font-size:1.3rem}.novo-option.text-size-xs{font-size:1rem}.novo-option.text-size-sm{font-size:1.2rem}.novo-option.text-size-md{font-size:1.3rem}.novo-option.text-size-lg{font-size:1.6rem}.novo-option.text-size-xl{font-size:2rem}.novo-option.text-size-2xl{font-size:2.6rem}.novo-option.text-size-3xl{font-size:3.2rem}.novo-option.text-size-smaller{font-size:.8em}.novo-option.text-size-larger{font-size:1.2em}.novo-option.text-color-black{color:#000}.novo-option.text-color-white{color:#fff}.novo-option.text-color-gray,.novo-option.text-color-grey{color:#9e9e9e}.novo-option.text-color-offWhite,.novo-option.text-color-bright{color:#f7f7f7}.novo-option.text-color-light{color:#dbdbdb}.novo-option.text-color-neutral{color:#4f5361}.novo-option.text-color-dark{color:#3d464d}.novo-option.text-color-orange{color:#ff6900}.novo-option.text-color-navigation{color:#202945}.novo-option.text-color-skyBlue{color:#009bdf}.novo-option.text-color-steel{color:#5b6770}.novo-option.text-color-metal{color:#637893}.novo-option.text-color-sand{color:#f4f4f4}.novo-option.text-color-silver{color:#e2e2e2}.novo-option.text-color-stone{color:#bebebe}.novo-option.text-color-ash{color:#a0a0a0}.novo-option.text-color-slate{color:#707070}.novo-option.text-color-onyx{color:#526980}.novo-option.text-color-charcoal{color:#282828}.novo-option.text-color-moonlight{color:#1a242f}.novo-option.text-color-midnight{color:#202945}.novo-option.text-color-darkness{color:#161f27}.novo-option.text-color-navy{color:#0d2d42}.novo-option.text-color-aqua{color:#3bafda}.novo-option.text-color-ocean{color:#4a89dc}.novo-option.text-color-mint{color:#37bc9b}.novo-option.text-color-grass{color:#8cc152}.novo-option.text-color-sunflower{color:#f6b042}.novo-option.text-color-bittersweet{color:#eb6845}.novo-option.text-color-grapefruit{color:#da4453}.novo-option.text-color-carnation{color:#d770ad}.novo-option.text-color-lavender{color:#967adc}.novo-option.text-color-mountain{color:#9678b6}.novo-option.text-color-info,.novo-option.text-color-positive{color:#4a89dc}.novo-option.text-color-success{color:#8cc152}.novo-option.text-color-negative,.novo-option.text-color-danger,.novo-option.text-color-error{color:#da4453}.novo-option.text-color-warning{color:#f6b042}.novo-option.text-color-empty{color:#cccdcc}.novo-option.text-color-disabled{color:#bebebe}.novo-option.text-color-background{color:#f7f7f7}.novo-option.text-color-backgroundDark{color:#e2e2e2}.novo-option.text-color-presentation{color:#5b6770}.novo-option.text-color-bullhorn{color:#ff6900}.novo-option.text-color-pulse{color:#3bafda}.novo-option.text-color-company{color:#39d}.novo-option.text-color-candidate{color:#4b7}.novo-option.text-color-lead{color:#a69}.novo-option.text-color-contact,.novo-option.text-color-clientcontact{color:#fa4}.novo-option.text-color-opportunity{color:#625}.novo-option.text-color-job,.novo-option.text-color-joborder{color:#b56}.novo-option.text-color-submission{color:#a9adbb}.novo-option.text-color-sendout{color:#747884}.novo-option.text-color-placement{color:#0b344f}.novo-option.text-color-note{color:#747884}.novo-option.text-color-contract{color:#454ea0}.novo-option.text-color-task{color:#4f5361}.novo-option.text-color-jobCode,.novo-option.text-color-earnCode,.novo-option.text-color-invoiceStatement,.novo-option.text-color-billableCharge,.novo-option.text-color-payableCharge,.novo-option.text-color-user,.novo-option.text-color-corporateUser,.novo-option.text-color-distributionList,.novo-option.text-color-credential,.novo-option.text-color-person{color:#696d79}.novo-option.margin-before{margin-top:.4rem}.novo-option.margin-after{margin-bottom:.8rem}.novo-option.text-length-small{max-width:40ch}.novo-option.text-length-medium{max-width:55ch}.novo-option.text-length-large{max-width:70ch}.novo-option.text-weight-hairline{font-weight:100}.novo-option.text-weight-thin{font-weight:200}.novo-option.text-weight-light{font-weight:300}.novo-option.text-weight-normal{font-weight:400}.novo-option.text-weight-medium{font-weight:500}.novo-option.text-weight-semibold{font-weight:600}.novo-option.text-weight-bold{font-weight:700}.novo-option.text-weight-extrabold{font-weight:800}.novo-option.text-weight-heavy{font-weight:900}.novo-option.text-weight-lighter{font-weight:lighter}.novo-option.text-weight-bolder{font-weight:bolder}.novo-option:hover:not(.novo-option-inert){background:var(--background-main, rgba(74, 137, 220, .1))}.novo-option:active:not(.novo-option-inert),.novo-option.novo-active:not(.novo-option-inert){background:#4a89dc4d}.novo-option.novo-selected,.novo-option .add-icon{color:#4a89dc}.novo-option.disabled,.novo-option[aria-disabled=true]{cursor:not-allowed;color:#bebebe}.novo-option.disabled:hover,.novo-option[aria-disabled=true]:hover{background:#da44531a}.novo-optgroup .novo-option:not(.novo-option-multiple){padding-left:1rem}[dir=rtl] .novo-optgroup .novo-option:not(.novo-option-multiple){padding-left:.5rem;padding-right:1rem}.novo-option.novo-accent-black{border-left:4px solid #000000}.novo-option.novo-fill-black:not(.novo-option-inert){color:#fff;background:#000}.novo-option.novo-fill-black:not(.novo-option-inert):hover,.novo-option.novo-fill-black:not(.novo-option-inert):focus{background:#333}.novo-option.novo-fill-black:not(.novo-option-inert):active{background:#000}.novo-option.novo-accent-white{border-left:4px solid #ffffff}.novo-option.novo-fill-white:not(.novo-option-inert){color:#3d464d;background:#fff}.novo-option.novo-fill-white:not(.novo-option-inert):hover,.novo-option.novo-fill-white:not(.novo-option-inert):focus{background:#fff}.novo-option.novo-fill-white:not(.novo-option-inert):active{background:#ccc}.novo-option.novo-accent-gray{border-left:4px solid #9e9e9e}.novo-option.novo-fill-gray:not(.novo-option-inert){color:#3d464d;background:#9e9e9e}.novo-option.novo-fill-gray:not(.novo-option-inert):hover,.novo-option.novo-fill-gray:not(.novo-option-inert):focus{background:#b1b1b1}.novo-option.novo-fill-gray:not(.novo-option-inert):active{background:#7e7e7e}.novo-option.novo-accent-grey{border-left:4px solid #9e9e9e}.novo-option.novo-fill-grey:not(.novo-option-inert){color:#3d464d;background:#9e9e9e}.novo-option.novo-fill-grey:not(.novo-option-inert):hover,.novo-option.novo-fill-grey:not(.novo-option-inert):focus{background:#b1b1b1}.novo-option.novo-fill-grey:not(.novo-option-inert):active{background:#7e7e7e}.novo-option.novo-accent-offWhite{border-left:4px solid #f7f7f7}.novo-option.novo-fill-offWhite:not(.novo-option-inert){color:#3d464d;background:#f7f7f7}.novo-option.novo-fill-offWhite:not(.novo-option-inert):hover,.novo-option.novo-fill-offWhite:not(.novo-option-inert):focus{background:#f8f8f8}.novo-option.novo-fill-offWhite:not(.novo-option-inert):active{background:#c5c5c5}.novo-option.novo-accent-bright{border-left:4px solid #f7f7f7}.novo-option.novo-fill-bright:not(.novo-option-inert){color:#3d464d;background:#f7f7f7}.novo-option.novo-fill-bright:not(.novo-option-inert):hover,.novo-option.novo-fill-bright:not(.novo-option-inert):focus{background:#f8f8f8}.novo-option.novo-fill-bright:not(.novo-option-inert):active{background:#c5c5c5}.novo-option.novo-accent-light{border-left:4px solid #dbdbdb}.novo-option.novo-fill-light:not(.novo-option-inert){color:#3d464d;background:#dbdbdb}.novo-option.novo-fill-light:not(.novo-option-inert):hover,.novo-option.novo-fill-light:not(.novo-option-inert):focus{background:#e2e2e2}.novo-option.novo-fill-light:not(.novo-option-inert):active{background:#afafaf}.novo-option.novo-accent-neutral{border-left:4px solid #4f5361}.novo-option.novo-fill-neutral:not(.novo-option-inert){color:#fff;background:#4f5361}.novo-option.novo-fill-neutral:not(.novo-option-inert):hover,.novo-option.novo-fill-neutral:not(.novo-option-inert):focus{background:#727580}.novo-option.novo-fill-neutral:not(.novo-option-inert):active{background:#3f424d}.novo-option.novo-accent-dark{border-left:4px solid #3d464d}.novo-option.novo-fill-dark:not(.novo-option-inert){color:#fff;background:#3d464d}.novo-option.novo-fill-dark:not(.novo-option-inert):hover,.novo-option.novo-fill-dark:not(.novo-option-inert):focus{background:#636b70}.novo-option.novo-fill-dark:not(.novo-option-inert):active{background:#30383d}.novo-option.novo-accent-orange{border-left:4px solid #ff6900}.novo-option.novo-fill-orange:not(.novo-option-inert){color:#3d464d;background:#ff6900}.novo-option.novo-fill-orange:not(.novo-option-inert):hover,.novo-option.novo-fill-orange:not(.novo-option-inert):focus{background:#ff8733}.novo-option.novo-fill-orange:not(.novo-option-inert):active{background:#cc5400}.novo-option.novo-accent-navigation{border-left:4px solid #202945}.novo-option.novo-fill-navigation:not(.novo-option-inert){color:#fff;background:#202945}.novo-option.novo-fill-navigation:not(.novo-option-inert):hover,.novo-option.novo-fill-navigation:not(.novo-option-inert):focus{background:#4c536a}.novo-option.novo-fill-navigation:not(.novo-option-inert):active{background:#192037}.novo-option.novo-accent-skyBlue{border-left:4px solid #009bdf}.novo-option.novo-fill-skyBlue:not(.novo-option-inert){color:#fff;background:#009bdf}.novo-option.novo-fill-skyBlue:not(.novo-option-inert):hover,.novo-option.novo-fill-skyBlue:not(.novo-option-inert):focus{background:#33afe5}.novo-option.novo-fill-skyBlue:not(.novo-option-inert):active{background:#007cb2}.novo-option.novo-accent-steel{border-left:4px solid #5b6770}.novo-option.novo-fill-steel:not(.novo-option-inert){color:#fff;background:#5b6770}.novo-option.novo-fill-steel:not(.novo-option-inert):hover,.novo-option.novo-fill-steel:not(.novo-option-inert):focus{background:#7b858c}.novo-option.novo-fill-steel:not(.novo-option-inert):active{background:#485259}.novo-option.novo-accent-metal{border-left:4px solid #637893}.novo-option.novo-fill-metal:not(.novo-option-inert){color:#fff;background:#637893}.novo-option.novo-fill-metal:not(.novo-option-inert):hover,.novo-option.novo-fill-metal:not(.novo-option-inert):focus{background:#8293a8}.novo-option.novo-fill-metal:not(.novo-option-inert):active{background:#4f6075}.novo-option.novo-accent-sand{border-left:4px solid #f4f4f4}.novo-option.novo-fill-sand:not(.novo-option-inert){color:#3d464d;background:#f4f4f4}.novo-option.novo-fill-sand:not(.novo-option-inert):hover,.novo-option.novo-fill-sand:not(.novo-option-inert):focus{background:#f6f6f6}.novo-option.novo-fill-sand:not(.novo-option-inert):active{background:#c3c3c3}.novo-option.novo-accent-silver{border-left:4px solid #e2e2e2}.novo-option.novo-fill-silver:not(.novo-option-inert){color:#3d464d;background:#e2e2e2}.novo-option.novo-fill-silver:not(.novo-option-inert):hover,.novo-option.novo-fill-silver:not(.novo-option-inert):focus{background:#e7e7e7}.novo-option.novo-fill-silver:not(.novo-option-inert):active{background:#b4b4b4}.novo-option.novo-accent-stone{border-left:4px solid #bebebe}.novo-option.novo-fill-stone:not(.novo-option-inert){color:#3d464d;background:#bebebe}.novo-option.novo-fill-stone:not(.novo-option-inert):hover,.novo-option.novo-fill-stone:not(.novo-option-inert):focus{background:#cbcbcb}.novo-option.novo-fill-stone:not(.novo-option-inert):active{background:#989898}.novo-option.novo-accent-ash{border-left:4px solid #a0a0a0}.novo-option.novo-fill-ash:not(.novo-option-inert){color:#3d464d;background:#a0a0a0}.novo-option.novo-fill-ash:not(.novo-option-inert):hover,.novo-option.novo-fill-ash:not(.novo-option-inert):focus{background:#b3b3b3}.novo-option.novo-fill-ash:not(.novo-option-inert):active{background:gray}.novo-option.novo-accent-slate{border-left:4px solid #707070}.novo-option.novo-fill-slate:not(.novo-option-inert){color:#fff;background:#707070}.novo-option.novo-fill-slate:not(.novo-option-inert):hover,.novo-option.novo-fill-slate:not(.novo-option-inert):focus{background:#8c8c8c}.novo-option.novo-fill-slate:not(.novo-option-inert):active{background:#595959}.novo-option.novo-accent-onyx{border-left:4px solid #526980}.novo-option.novo-fill-onyx:not(.novo-option-inert){color:#fff;background:#526980}.novo-option.novo-fill-onyx:not(.novo-option-inert):hover,.novo-option.novo-fill-onyx:not(.novo-option-inert):focus{background:#748799}.novo-option.novo-fill-onyx:not(.novo-option-inert):active{background:#415466}.novo-option.novo-accent-charcoal{border-left:4px solid #282828}.novo-option.novo-fill-charcoal:not(.novo-option-inert){color:#fff;background:#282828}.novo-option.novo-fill-charcoal:not(.novo-option-inert):hover,.novo-option.novo-fill-charcoal:not(.novo-option-inert):focus{background:#535353}.novo-option.novo-fill-charcoal:not(.novo-option-inert):active{background:#202020}.novo-option.novo-accent-moonlight{border-left:4px solid #1a242f}.novo-option.novo-fill-moonlight:not(.novo-option-inert){color:#fff;background:#1a242f}.novo-option.novo-fill-moonlight:not(.novo-option-inert):hover,.novo-option.novo-fill-moonlight:not(.novo-option-inert):focus{background:#474f58}.novo-option.novo-fill-moonlight:not(.novo-option-inert):active{background:#141c25}.novo-option.novo-accent-midnight{border-left:4px solid #202945}.novo-option.novo-fill-midnight:not(.novo-option-inert){color:#fff;background:#202945}.novo-option.novo-fill-midnight:not(.novo-option-inert):hover,.novo-option.novo-fill-midnight:not(.novo-option-inert):focus{background:#4c536a}.novo-option.novo-fill-midnight:not(.novo-option-inert):active{background:#192037}.novo-option.novo-accent-darkness{border-left:4px solid #161f27}.novo-option.novo-fill-darkness:not(.novo-option-inert){color:#fff;background:#161f27}.novo-option.novo-fill-darkness:not(.novo-option-inert):hover,.novo-option.novo-fill-darkness:not(.novo-option-inert):focus{background:#444b52}.novo-option.novo-fill-darkness:not(.novo-option-inert):active{background:#11181f}.novo-option.novo-accent-navy{border-left:4px solid #0d2d42}.novo-option.novo-fill-navy:not(.novo-option-inert){color:#fff;background:#0d2d42}.novo-option.novo-fill-navy:not(.novo-option-inert):hover,.novo-option.novo-fill-navy:not(.novo-option-inert):focus{background:#3d5767}.novo-option.novo-fill-navy:not(.novo-option-inert):active{background:#0a2434}.novo-option.novo-accent-aqua{border-left:4px solid #3bafda}.novo-option.novo-fill-aqua:not(.novo-option-inert){color:#3d464d;background:#3bafda}.novo-option.novo-fill-aqua:not(.novo-option-inert):hover,.novo-option.novo-fill-aqua:not(.novo-option-inert):focus{background:#62bfe1}.novo-option.novo-fill-aqua:not(.novo-option-inert):active{background:#2f8cae}.novo-option.novo-accent-ocean{border-left:4px solid #4a89dc}.novo-option.novo-fill-ocean:not(.novo-option-inert){color:#fff;background:#4a89dc}.novo-option.novo-fill-ocean:not(.novo-option-inert):hover,.novo-option.novo-fill-ocean:not(.novo-option-inert):focus{background:#6ea0e3}.novo-option.novo-fill-ocean:not(.novo-option-inert):active{background:#3b6db0}.novo-option.novo-accent-mint{border-left:4px solid #37bc9b}.novo-option.novo-fill-mint:not(.novo-option-inert){color:#3d464d;background:#37bc9b}.novo-option.novo-fill-mint:not(.novo-option-inert):hover,.novo-option.novo-fill-mint:not(.novo-option-inert):focus{background:#5fc9af}.novo-option.novo-fill-mint:not(.novo-option-inert):active{background:#2c967c}.novo-option.novo-accent-grass{border-left:4px solid #8cc152}.novo-option.novo-fill-grass:not(.novo-option-inert){color:#fff;background:#8cc152}.novo-option.novo-fill-grass:not(.novo-option-inert):hover,.novo-option.novo-fill-grass:not(.novo-option-inert):focus{background:#a3cd74}.novo-option.novo-fill-grass:not(.novo-option-inert):active{background:#709a41}.novo-option.novo-accent-sunflower{border-left:4px solid #f6b042}.novo-option.novo-fill-sunflower:not(.novo-option-inert){color:#fff;background:#f6b042}.novo-option.novo-fill-sunflower:not(.novo-option-inert):hover,.novo-option.novo-fill-sunflower:not(.novo-option-inert):focus{background:#f7bf67}.novo-option.novo-fill-sunflower:not(.novo-option-inert):active{background:#c48c34}.novo-option.novo-accent-bittersweet{border-left:4px solid #eb6845}.novo-option.novo-fill-bittersweet:not(.novo-option-inert){color:#fff;background:#eb6845}.novo-option.novo-fill-bittersweet:not(.novo-option-inert):hover,.novo-option.novo-fill-bittersweet:not(.novo-option-inert):focus{background:#ef866a}.novo-option.novo-fill-bittersweet:not(.novo-option-inert):active{background:#bc5337}.novo-option.novo-accent-grapefruit{border-left:4px solid #da4453}.novo-option.novo-fill-grapefruit:not(.novo-option-inert){color:#fff;background:#da4453}.novo-option.novo-fill-grapefruit:not(.novo-option-inert):hover,.novo-option.novo-fill-grapefruit:not(.novo-option-inert):focus{background:#e16975}.novo-option.novo-fill-grapefruit:not(.novo-option-inert):active{background:#ae3642}.novo-option.novo-accent-carnation{border-left:4px solid #d770ad}.novo-option.novo-fill-carnation:not(.novo-option-inert){color:#fff;background:#d770ad}.novo-option.novo-fill-carnation:not(.novo-option-inert):hover,.novo-option.novo-fill-carnation:not(.novo-option-inert):focus{background:#df8cbd}.novo-option.novo-fill-carnation:not(.novo-option-inert):active{background:#ac598a}.novo-option.novo-accent-lavender{border-left:4px solid #967adc}.novo-option.novo-fill-lavender:not(.novo-option-inert){color:#fff;background:#967adc}.novo-option.novo-fill-lavender:not(.novo-option-inert):hover,.novo-option.novo-fill-lavender:not(.novo-option-inert):focus{background:#ab94e3}.novo-option.novo-fill-lavender:not(.novo-option-inert):active{background:#7861b0}.novo-option.novo-accent-mountain{border-left:4px solid #9678b6}.novo-option.novo-fill-mountain:not(.novo-option-inert){color:#fff;background:#9678b6}.novo-option.novo-fill-mountain:not(.novo-option-inert):hover,.novo-option.novo-fill-mountain:not(.novo-option-inert):focus{background:#ab93c4}.novo-option.novo-fill-mountain:not(.novo-option-inert):active{background:#786091}.novo-option.novo-accent-info{border-left:4px solid #4a89dc}.novo-option.novo-fill-info:not(.novo-option-inert){color:#fff;background:#4a89dc}.novo-option.novo-fill-info:not(.novo-option-inert):hover,.novo-option.novo-fill-info:not(.novo-option-inert):focus{background:#6ea0e3}.novo-option.novo-fill-info:not(.novo-option-inert):active{background:#3b6db0}.novo-option.novo-accent-positive{border-left:4px solid #4a89dc}.novo-option.novo-fill-positive:not(.novo-option-inert){color:#fff;background:#4a89dc}.novo-option.novo-fill-positive:not(.novo-option-inert):hover,.novo-option.novo-fill-positive:not(.novo-option-inert):focus{background:#6ea0e3}.novo-option.novo-fill-positive:not(.novo-option-inert):active{background:#3b6db0}.novo-option.novo-accent-success{border-left:4px solid #8cc152}.novo-option.novo-fill-success:not(.novo-option-inert){color:#fff;background:#8cc152}.novo-option.novo-fill-success:not(.novo-option-inert):hover,.novo-option.novo-fill-success:not(.novo-option-inert):focus{background:#a3cd74}.novo-option.novo-fill-success:not(.novo-option-inert):active{background:#709a41}.novo-option.novo-accent-negative{border-left:4px solid #da4453}.novo-option.novo-fill-negative:not(.novo-option-inert){color:#fff;background:#da4453}.novo-option.novo-fill-negative:not(.novo-option-inert):hover,.novo-option.novo-fill-negative:not(.novo-option-inert):focus{background:#e16975}.novo-option.novo-fill-negative:not(.novo-option-inert):active{background:#ae3642}.novo-option.novo-accent-danger{border-left:4px solid #da4453}.novo-option.novo-fill-danger:not(.novo-option-inert){color:#fff;background:#da4453}.novo-option.novo-fill-danger:not(.novo-option-inert):hover,.novo-option.novo-fill-danger:not(.novo-option-inert):focus{background:#e16975}.novo-option.novo-fill-danger:not(.novo-option-inert):active{background:#ae3642}.novo-option.novo-accent-error{border-left:4px solid #da4453}.novo-option.novo-fill-error:not(.novo-option-inert){color:#fff;background:#da4453}.novo-option.novo-fill-error:not(.novo-option-inert):hover,.novo-option.novo-fill-error:not(.novo-option-inert):focus{background:#e16975}.novo-option.novo-fill-error:not(.novo-option-inert):active{background:#ae3642}.novo-option.novo-accent-warning{border-left:4px solid #f6b042}.novo-option.novo-fill-warning:not(.novo-option-inert){color:#fff;background:#f6b042}.novo-option.novo-fill-warning:not(.novo-option-inert):hover,.novo-option.novo-fill-warning:not(.novo-option-inert):focus{background:#f7bf67}.novo-option.novo-fill-warning:not(.novo-option-inert):active{background:#c48c34}.novo-option.novo-accent-empty{border-left:4px solid #cccdcc}.novo-option.novo-fill-empty:not(.novo-option-inert){color:#3d464d;background:#cccdcc}.novo-option.novo-fill-empty:not(.novo-option-inert):hover,.novo-option.novo-fill-empty:not(.novo-option-inert):focus{background:#d6d7d6}.novo-option.novo-fill-empty:not(.novo-option-inert):active{background:#a3a4a3}.novo-option.novo-accent-disabled{border-left:4px solid #bebebe}.novo-option.novo-fill-disabled:not(.novo-option-inert){color:#3d464d;background:#bebebe}.novo-option.novo-fill-disabled:not(.novo-option-inert):hover,.novo-option.novo-fill-disabled:not(.novo-option-inert):focus{background:#cbcbcb}.novo-option.novo-fill-disabled:not(.novo-option-inert):active{background:#989898}.novo-option.novo-accent-background{border-left:4px solid #f7f7f7}.novo-option.novo-fill-background:not(.novo-option-inert){color:#3d464d;background:#f7f7f7}.novo-option.novo-fill-background:not(.novo-option-inert):hover,.novo-option.novo-fill-background:not(.novo-option-inert):focus{background:#f8f8f8}.novo-option.novo-fill-background:not(.novo-option-inert):active{background:#c5c5c5}.novo-option.novo-accent-backgroundDark{border-left:4px solid #e2e2e2}.novo-option.novo-fill-backgroundDark:not(.novo-option-inert){color:#3d464d;background:#e2e2e2}.novo-option.novo-fill-backgroundDark:not(.novo-option-inert):hover,.novo-option.novo-fill-backgroundDark:not(.novo-option-inert):focus{background:#e7e7e7}.novo-option.novo-fill-backgroundDark:not(.novo-option-inert):active{background:#b4b4b4}.novo-option.novo-accent-presentation{border-left:4px solid #5b6770}.novo-option.novo-fill-presentation:not(.novo-option-inert){color:#fff;background:#5b6770}.novo-option.novo-fill-presentation:not(.novo-option-inert):hover,.novo-option.novo-fill-presentation:not(.novo-option-inert):focus{background:#7b858c}.novo-option.novo-fill-presentation:not(.novo-option-inert):active{background:#485259}.novo-option.novo-accent-bullhorn{border-left:4px solid #ff6900}.novo-option.novo-fill-bullhorn:not(.novo-option-inert){color:#3d464d;background:#ff6900}.novo-option.novo-fill-bullhorn:not(.novo-option-inert):hover,.novo-option.novo-fill-bullhorn:not(.novo-option-inert):focus{background:#ff8733}.novo-option.novo-fill-bullhorn:not(.novo-option-inert):active{background:#cc5400}.novo-option.novo-accent-pulse{border-left:4px solid #3bafda}.novo-option.novo-fill-pulse:not(.novo-option-inert){color:#3d464d;background:#3bafda}.novo-option.novo-fill-pulse:not(.novo-option-inert):hover,.novo-option.novo-fill-pulse:not(.novo-option-inert):focus{background:#62bfe1}.novo-option.novo-fill-pulse:not(.novo-option-inert):active{background:#2f8cae}.novo-option.novo-accent-company{border-left:4px solid #3399dd}.novo-option.novo-fill-company:not(.novo-option-inert){color:#fff;background:#39d}.novo-option.novo-fill-company:not(.novo-option-inert):hover,.novo-option.novo-fill-company:not(.novo-option-inert):focus{background:#5bade3}.novo-option.novo-fill-company:not(.novo-option-inert):active{background:#287ab0}.novo-option.novo-accent-candidate{border-left:4px solid #44bb77}.novo-option.novo-fill-candidate:not(.novo-option-inert){color:#fff;background:#4b7}.novo-option.novo-fill-candidate:not(.novo-option-inert):hover,.novo-option.novo-fill-candidate:not(.novo-option-inert):focus{background:#69c892}.novo-option.novo-fill-candidate:not(.novo-option-inert):active{background:#36955f}.novo-option.novo-accent-lead{border-left:4px solid #aa6699}.novo-option.novo-fill-lead:not(.novo-option-inert){color:#fff;background:#a69}.novo-option.novo-fill-lead:not(.novo-option-inert):hover,.novo-option.novo-fill-lead:not(.novo-option-inert):focus{background:#bb84ad}.novo-option.novo-fill-lead:not(.novo-option-inert):active{background:#88517a}.novo-option.novo-accent-contact{border-left:4px solid #ffaa44}.novo-option.novo-fill-contact:not(.novo-option-inert){color:#fff;background:#fa4}.novo-option.novo-fill-contact:not(.novo-option-inert):hover,.novo-option.novo-fill-contact:not(.novo-option-inert):focus{background:#ffbb69}.novo-option.novo-fill-contact:not(.novo-option-inert):active{background:#cc8836}.novo-option.novo-accent-clientcontact{border-left:4px solid #ffaa44}.novo-option.novo-fill-clientcontact:not(.novo-option-inert){color:#fff;background:#fa4}.novo-option.novo-fill-clientcontact:not(.novo-option-inert):hover,.novo-option.novo-fill-clientcontact:not(.novo-option-inert):focus{background:#ffbb69}.novo-option.novo-fill-clientcontact:not(.novo-option-inert):active{background:#cc8836}.novo-option.novo-accent-opportunity{border-left:4px solid #662255}.novo-option.novo-fill-opportunity:not(.novo-option-inert){color:#fff;background:#625}.novo-option.novo-fill-opportunity:not(.novo-option-inert):hover,.novo-option.novo-fill-opportunity:not(.novo-option-inert):focus{background:#844e77}.novo-option.novo-fill-opportunity:not(.novo-option-inert):active{background:#511b44}.novo-option.novo-accent-job{border-left:4px solid #bb5566}.novo-option.novo-fill-job:not(.novo-option-inert){color:#fff;background:#b56}.novo-option.novo-fill-job:not(.novo-option-inert):hover,.novo-option.novo-fill-job:not(.novo-option-inert):focus{background:#c87784}.novo-option.novo-fill-job:not(.novo-option-inert):active{background:#954451}.novo-option.novo-accent-joborder{border-left:4px solid #bb5566}.novo-option.novo-fill-joborder:not(.novo-option-inert){color:#fff;background:#b56}.novo-option.novo-fill-joborder:not(.novo-option-inert):hover,.novo-option.novo-fill-joborder:not(.novo-option-inert):focus{background:#c87784}.novo-option.novo-fill-joborder:not(.novo-option-inert):active{background:#954451}.novo-option.novo-accent-submission{border-left:4px solid #a9adbb}.novo-option.novo-fill-submission:not(.novo-option-inert){color:#3d464d;background:#a9adbb}.novo-option.novo-fill-submission:not(.novo-option-inert):hover,.novo-option.novo-fill-submission:not(.novo-option-inert):focus{background:#babdc8}.novo-option.novo-fill-submission:not(.novo-option-inert):active{background:#878a95}.novo-option.novo-accent-sendout{border-left:4px solid #747884}.novo-option.novo-fill-sendout:not(.novo-option-inert){color:#fff;background:#747884}.novo-option.novo-fill-sendout:not(.novo-option-inert):hover,.novo-option.novo-fill-sendout:not(.novo-option-inert):focus{background:#8f939c}.novo-option.novo-fill-sendout:not(.novo-option-inert):active{background:#5c6069}.novo-option.novo-accent-placement{border-left:4px solid #0b344f}.novo-option.novo-fill-placement:not(.novo-option-inert){color:#fff;background:#0b344f}.novo-option.novo-fill-placement:not(.novo-option-inert):hover,.novo-option.novo-fill-placement:not(.novo-option-inert):focus{background:#3b5c72}.novo-option.novo-fill-placement:not(.novo-option-inert):active{background:#08293f}.novo-option.novo-accent-note{border-left:4px solid #747884}.novo-option.novo-fill-note:not(.novo-option-inert){color:#fff;background:#747884}.novo-option.novo-fill-note:not(.novo-option-inert):hover,.novo-option.novo-fill-note:not(.novo-option-inert):focus{background:#8f939c}.novo-option.novo-fill-note:not(.novo-option-inert):active{background:#5c6069}.novo-option.novo-accent-contract{border-left:4px solid #454ea0}.novo-option.novo-fill-contract:not(.novo-option-inert){color:#fff;background:#454ea0}.novo-option.novo-fill-contract:not(.novo-option-inert):hover,.novo-option.novo-fill-contract:not(.novo-option-inert):focus{background:#6a71b3}.novo-option.novo-fill-contract:not(.novo-option-inert):active{background:#373e80}.novo-option.novo-accent-task{border-left:4px solid #4f5361}.novo-option.novo-fill-task:not(.novo-option-inert){color:#fff;background:#4f5361}.novo-option.novo-fill-task:not(.novo-option-inert):hover,.novo-option.novo-fill-task:not(.novo-option-inert):focus{background:#727580}.novo-option.novo-fill-task:not(.novo-option-inert):active{background:#3f424d}.novo-option.novo-accent-jobCode{border-left:4px solid #696d79}.novo-option.novo-fill-jobCode:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-jobCode:not(.novo-option-inert):hover,.novo-option.novo-fill-jobCode:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-jobCode:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-earnCode{border-left:4px solid #696d79}.novo-option.novo-fill-earnCode:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-earnCode:not(.novo-option-inert):hover,.novo-option.novo-fill-earnCode:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-earnCode:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-invoiceStatement{border-left:4px solid #696d79}.novo-option.novo-fill-invoiceStatement:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-invoiceStatement:not(.novo-option-inert):hover,.novo-option.novo-fill-invoiceStatement:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-invoiceStatement:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-billableCharge{border-left:4px solid #696d79}.novo-option.novo-fill-billableCharge:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-billableCharge:not(.novo-option-inert):hover,.novo-option.novo-fill-billableCharge:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-billableCharge:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-payableCharge{border-left:4px solid #696d79}.novo-option.novo-fill-payableCharge:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-payableCharge:not(.novo-option-inert):hover,.novo-option.novo-fill-payableCharge:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-payableCharge:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-user{border-left:4px solid #696d79}.novo-option.novo-fill-user:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-user:not(.novo-option-inert):hover,.novo-option.novo-fill-user:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-user:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-corporateUser{border-left:4px solid #696d79}.novo-option.novo-fill-corporateUser:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-corporateUser:not(.novo-option-inert):hover,.novo-option.novo-fill-corporateUser:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-corporateUser:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-distributionList{border-left:4px solid #696d79}.novo-option.novo-fill-distributionList:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-distributionList:not(.novo-option-inert):hover,.novo-option.novo-fill-distributionList:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-distributionList:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-credential{border-left:4px solid #696d79}.novo-option.novo-fill-credential:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-credential:not(.novo-option-inert):hover,.novo-option.novo-fill-credential:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-credential:not(.novo-option-inert):active{background:#545760}.novo-option.novo-accent-person{border-left:4px solid #696d79}.novo-option.novo-fill-person:not(.novo-option-inert){color:#fff;background:#696d79}.novo-option.novo-fill-person:not(.novo-option-inert):hover,.novo-option.novo-fill-person:not(.novo-option-inert):focus{background:#878a93}.novo-option.novo-fill-person:not(.novo-option-inert):active{background:#545760}.novo-option-text{display:inline-block;display:inline-flex;flex-direction:row;align-items:center;flex-grow:1;overflow:hidden;text-overflow:ellipsis;gap:1rem}.novo-option-pseudo-checkbox{margin-right:.25rem}[dir=rtl] .novo-option-pseudo-checkbox{margin-left:.25rem;margin-right:0}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_OPTION_PARENT_COMPONENT]
                }] }, { type: NovoOptgroup, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_OPTGROUP]
                }] }] });
/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
function _countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
    if (optionGroups.length) {
        let optionsArray = options.toArray();
        let groups = optionGroups.toArray();
        let groupCounter = 0;
        for (let i = 0; i < optionIndex + 1; i++) {
            if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
                groupCounter++;
            }
        }
        return groupCounter;
    }
    return 0;
}
/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionOffset Offset of the option from the top of the panel.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
function _getOptionScrollPosition(optionOffset, optionHeight, currentScrollPosition, panelHeight) {
    if (optionOffset < currentScrollPosition) {
        return optionOffset;
    }
    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
        return Math.max(0, optionOffset - panelHeight + optionHeight);
    }
    return currentScrollPosition;
}

class NovoOptionModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoOptionModule, declarations: [NovoOption, NovoOptgroup], imports: [CommonModule, NovoPseudoCheckboxModule], exports: [NovoOption, NovoOptgroup] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOptionModule, imports: [CommonModule, NovoPseudoCheckboxModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoPseudoCheckboxModule],
                    exports: [NovoOption, NovoOptgroup],
                    declarations: [NovoOption, NovoOptgroup],
                }]
        }] });

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class NovoBaseTextElement {
    get hb_classBinding() {
        return [
            this.color ? `text-color-${this.color}` : null,
            this.lineLength ? `text-length-${this.lineLength}` : null,
            this.size ? `text-size-${this.size}` : null,
            this.weight ? `text-weight-${this.weight}` : null,
        ]
            .filter(Boolean)
            .join(' ');
    }
    constructor(element) {
        this.element = element;
    }
    get nativeElement() {
        return this.element.nativeElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoBaseTextElement, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoBaseTextElement, isStandalone: true, inputs: { size: "size", weight: "weight", lineLength: "lineLength", color: "color", disabled: "disabled", muted: "muted", error: "error", marginBefore: "marginBefore", marginAfter: "marginAfter", capitialize: "capitialize", uppercase: "uppercase", nowrap: "nowrap", ellipsis: "ellipsis", smaller: "smaller", larger: "larger", thin: "thin", lighter: "lighter", light: "light", medium: "medium", bold: "bold", bolder: "bolder", extrabold: "extrabold" }, host: { properties: { "class": "this.hb_classBinding", "class.text-disabled": "this.disabled", "class.text-color-empty": "this.muted", "class.text-color-negative": "this.error", "class.margin-before": "this.marginBefore", "class.margin-after": "this.marginAfter", "class.text-capitialize": "this.capitialize", "class.text-uppercase": "this.uppercase", "class.text-nowrap": "this.nowrap", "class.text-ellipsis": "this.ellipsis", "class.text-size-smaller": "this.smaller", "class.text-size-larger": "this.larger", "class.text-weight-thin": "this.thin", "class.text-weight-lighter": "this.lighter", "class.text-weight-light": "this.light", "class.text-weight-medium": "this.medium", "class.text-weight-bold": "this.bold", "class.text-weight-bolder": "this.bolder", "class.text-weight-extrabold": "this.extrabold" } }, ngImport: i0 }); }
}
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "disabled", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "muted", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "error", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "marginBefore", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "marginAfter", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "capitialize", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "uppercase", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "nowrap", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "ellipsis", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "smaller", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "larger", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "thin", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "lighter", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "light", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "medium", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "bold", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "bolder", void 0);
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoBaseTextElement.prototype, "extrabold", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoBaseTextElement, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { size: [{
                type: Input
            }], weight: [{
                type: Input
            }], lineLength: [{
                type: Input
            }], color: [{
                type: Input
            }], hb_classBinding: [{
                type: HostBinding,
                args: ['class']
            }], disabled: [{
                type: HostBinding,
                args: ['class.text-disabled']
            }, {
                type: Input
            }], muted: [{
                type: HostBinding,
                args: ['class.text-color-empty']
            }, {
                type: Input
            }], error: [{
                type: HostBinding,
                args: ['class.text-color-negative']
            }, {
                type: Input
            }], marginBefore: [{
                type: HostBinding,
                args: ['class.margin-before']
            }, {
                type: Input
            }], marginAfter: [{
                type: HostBinding,
                args: ['class.margin-after']
            }, {
                type: Input
            }], capitialize: [{
                type: HostBinding,
                args: ['class.text-capitialize']
            }, {
                type: Input
            }], uppercase: [{
                type: HostBinding,
                args: ['class.text-uppercase']
            }, {
                type: Input
            }], nowrap: [{
                type: HostBinding,
                args: ['class.text-nowrap']
            }, {
                type: Input
            }], ellipsis: [{
                type: HostBinding,
                args: ['class.text-ellipsis']
            }, {
                type: Input
            }], smaller: [{
                type: HostBinding,
                args: ['class.text-size-smaller']
            }, {
                type: Input
            }], larger: [{
                type: HostBinding,
                args: ['class.text-size-larger']
            }, {
                type: Input
            }], thin: [{
                type: HostBinding,
                args: ['class.text-weight-thin']
            }, {
                type: Input
            }], lighter: [{
                type: HostBinding,
                args: ['class.text-weight-lighter']
            }, {
                type: Input
            }], light: [{
                type: HostBinding,
                args: ['class.text-weight-light']
            }, {
                type: Input
            }], medium: [{
                type: HostBinding,
                args: ['class.text-weight-medium']
            }, {
                type: Input
            }], bold: [{
                type: HostBinding,
                args: ['class.text-weight-bold']
            }, {
                type: Input
            }], bolder: [{
                type: HostBinding,
                args: ['class.text-weight-bolder']
            }, {
                type: Input
            }], extrabold: [{
                type: HostBinding,
                args: ['class.text-weight-extrabold']
            }, {
                type: Input
            }] } });

// NG2
/**
 * Tag Example
 * <novo-title size="sm" disabled>Label</novo-title
 * <novo-title small disabled>Label</novo-title>
 * <novo-title large disabled>Label</novo-title>
 * <novo-title error>Label</novo-title>
 * <novo-title muted>Label</novo-title>
 * <novo-title class="tc-grapefruit">Label</novo-title>
 * <novo-title color="grapefruit">Label</novo-title>
 */
class NovoCaption extends NovoBaseTextElement {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCaption, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoCaption, isStandalone: false, selector: "novo-caption,[novo-caption]", host: { classAttribute: "novo-caption" }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:inline;font-size:var(--font-size-caption);font-weight:400;line-height:1.375;color:var(--text-muted);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.3rem}:host.text-size-xs{font-size:1rem}:host.text-size-sm{font-size:1.2rem}:host.text-size-md{font-size:1.3rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray{color:#9e9e9e}:host.text-color-grey{color:#9e9e9e}:host.text-color-offWhite{color:#f7f7f7}:host.text-color-bright{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info{color:#4a89dc}:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-negative{color:#da4453}:host.text-color-danger{color:#da4453}:host.text-color-error{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-clientcontact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-joborder{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-task{color:#4f5361}:host.text-color-jobCode{color:#696d79}:host.text-color-earnCode{color:#696d79}:host.text-color-invoiceStatement{color:#696d79}:host.text-color-billableCharge{color:#696d79}:host.text-color-payableCharge{color:#696d79}:host.text-color-user{color:#696d79}:host.text-color-corporateUser{color:#696d79}:host.text-color-distributionList{color:#696d79}:host.text-color-credential{color:#696d79}:host.text-color-person{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCaption, decorators: [{
            type: Component,
            args: [{ selector: 'novo-caption,[novo-caption]', template: ` <ng-content></ng-content> `, host: {
                        class: 'novo-caption',
                    }, standalone: false, styles: [":host{display:inline;font-size:var(--font-size-caption);font-weight:400;line-height:1.375;color:var(--text-muted);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.3rem}:host.text-size-xs{font-size:1rem}:host.text-size-sm{font-size:1.2rem}:host.text-size-md{font-size:1.3rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray{color:#9e9e9e}:host.text-color-grey{color:#9e9e9e}:host.text-color-offWhite{color:#f7f7f7}:host.text-color-bright{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info{color:#4a89dc}:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-negative{color:#da4453}:host.text-color-danger{color:#da4453}:host.text-color-error{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-clientcontact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-joborder{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-task{color:#4f5361}:host.text-color-jobCode{color:#696d79}:host.text-color-earnCode{color:#696d79}:host.text-color-invoiceStatement{color:#696d79}:host.text-color-billableCharge{color:#696d79}:host.text-color-payableCharge{color:#696d79}:host.text-color-user{color:#696d79}:host.text-color-corporateUser{color:#696d79}:host.text-color-distributionList{color:#696d79}:host.text-color-credential{color:#696d79}:host.text-color-person{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }]
        }] });

// NG2
/**
 * Tag Example
 * <novo-label size="sm" disabled>Label</novo-label
 * <novo-label small disabled>Label</novo-label>
 * <novo-label large disabled>Label</novo-label>
 * <novo-label error>Label</novo-label>
 * <novo-label muted>Label</novo-label>
 * <novo-label class="tc-grapefruit">Label</novo-label>
 * <novo-label color="grapefruit">Label</novo-label>
 */
let nextId = 0;
class NovoLabel extends NovoBaseTextElement {
    constructor() {
        super(...arguments);
        this.inputId = input(null, { alias: 'id' });
    }
    ngOnInit() {
        this.id = this.inputId() || `novo-label-${++nextId}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLabel, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.15", type: NovoLabel, isStandalone: false, selector: "novo-label,[novo-label]", inputs: { inputId: { classPropertyName: "inputId", publicName: "id", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.id": "this.id" }, classAttribute: "novo-label" }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:inline-block;font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.3rem}:host.text-size-xs{font-size:1rem}:host.text-size-sm{font-size:1.2rem}:host.text-size-md{font-size:1.3rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray{color:#9e9e9e}:host.text-color-grey{color:#9e9e9e}:host.text-color-offWhite{color:#f7f7f7}:host.text-color-bright{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info{color:#4a89dc}:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-negative{color:#da4453}:host.text-color-danger{color:#da4453}:host.text-color-error{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-clientcontact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-joborder{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-task{color:#4f5361}:host.text-color-jobCode{color:#696d79}:host.text-color-earnCode{color:#696d79}:host.text-color-invoiceStatement{color:#696d79}:host.text-color-billableCharge{color:#696d79}:host.text-color-payableCharge{color:#696d79}:host.text-color-user{color:#696d79}:host.text-color-corporateUser{color:#696d79}:host.text-color-distributionList{color:#696d79}:host.text-color-credential{color:#696d79}:host.text-color-person{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLabel, decorators: [{
            type: Component,
            args: [{ selector: 'novo-label,[novo-label]', template: ` <ng-content></ng-content> `, host: {
                        class: 'novo-label',
                    }, standalone: false, styles: [":host{display:inline-block;font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.3rem}:host.text-size-xs{font-size:1rem}:host.text-size-sm{font-size:1.2rem}:host.text-size-md{font-size:1.3rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray{color:#9e9e9e}:host.text-color-grey{color:#9e9e9e}:host.text-color-offWhite{color:#f7f7f7}:host.text-color-bright{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info{color:#4a89dc}:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-negative{color:#da4453}:host.text-color-danger{color:#da4453}:host.text-color-error{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-clientcontact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-joborder{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-task{color:#4f5361}:host.text-color-jobCode{color:#696d79}:host.text-color-earnCode{color:#696d79}:host.text-color-invoiceStatement{color:#696d79}:host.text-color-billableCharge{color:#696d79}:host.text-color-payableCharge{color:#696d79}:host.text-color-user{color:#696d79}:host.text-color-corporateUser{color:#696d79}:host.text-color-distributionList{color:#696d79}:host.text-color-credential{color:#696d79}:host.text-color-person{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }]
        }], propDecorators: { id: [{
                type: HostBinding,
                args: ['attr.id']
            }] } });

// NG2
/**
 * Tag Example
 * <novo-text size="small" disabled>Label</novo-text
 * <novo-text small disabled>Label</novo-text>
 * <novo-text large disabled>Label</novo-text>
 * <novo-text error>Label</novo-text>
 * <novo-text muted>Label</novo-text>
 * <novo-text class="tc-grapefruit">Label</novo-text>
 * <novo-text color="grapefruit">Label</novo-text>
 */
class NovoLink extends NovoBaseTextElement {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLink, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoLink, isStandalone: false, selector: "novo-link", inputs: { href: "href" }, host: { classAttribute: "novo-link" }, usesInheritance: true, ngImport: i0, template: `<a [attr.href]="href"><ng-content></ng-content></a>`, isInline: true, styles: [":host{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.3rem}:host.text-size-xs{font-size:1rem}:host.text-size-sm{font-size:1.2rem}:host.text-size-md{font-size:1.3rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray{color:#9e9e9e}:host.text-color-grey{color:#9e9e9e}:host.text-color-offWhite{color:#f7f7f7}:host.text-color-bright{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info{color:#4a89dc}:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-negative{color:#da4453}:host.text-color-danger{color:#da4453}:host.text-color-error{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-clientcontact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-joborder{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-task{color:#4f5361}:host.text-color-jobCode{color:#696d79}:host.text-color-earnCode{color:#696d79}:host.text-color-invoiceStatement{color:#696d79}:host.text-color-billableCharge{color:#696d79}:host.text-color-payableCharge{color:#696d79}:host.text-color-user{color:#696d79}:host.text-color-corporateUser{color:#696d79}:host.text-color-distributionList{color:#696d79}:host.text-color-credential{color:#696d79}:host.text-color-person{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}:host::ng-deep novo-icon{font-size:1em}:host novo-icon{font-size:1em}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoLink, decorators: [{
            type: Component,
            args: [{ selector: 'novo-link', template: `<a [attr.href]="href"><ng-content></ng-content></a>`, encapsulation: ViewEncapsulation.None, host: {
                        class: 'novo-link',
                    }, standalone: false, styles: [":host{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.3rem}:host.text-size-xs{font-size:1rem}:host.text-size-sm{font-size:1.2rem}:host.text-size-md{font-size:1.3rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray{color:#9e9e9e}:host.text-color-grey{color:#9e9e9e}:host.text-color-offWhite{color:#f7f7f7}:host.text-color-bright{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info{color:#4a89dc}:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-negative{color:#da4453}:host.text-color-danger{color:#da4453}:host.text-color-error{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-clientcontact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-joborder{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-task{color:#4f5361}:host.text-color-jobCode{color:#696d79}:host.text-color-earnCode{color:#696d79}:host.text-color-invoiceStatement{color:#696d79}:host.text-color-billableCharge{color:#696d79}:host.text-color-payableCharge{color:#696d79}:host.text-color-user{color:#696d79}:host.text-color-corporateUser{color:#696d79}:host.text-color-distributionList{color:#696d79}:host.text-color-credential{color:#696d79}:host.text-color-person{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}:host::ng-deep novo-icon{font-size:1em}:host novo-icon{font-size:1em}\n"] }]
        }], propDecorators: { href: [{
                type: Input
            }] } });

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Tag Example
 * <novo-text size="small" disabled>Label</novo-text
 * <novo-text small disabled>Label</novo-text>
 * <novo-text large disabled>Label</novo-text>
 * <novo-text error>Label</novo-text>
 * <novo-text muted>Label</novo-text>
 * <novo-text class="tc-grapefruit">Label</novo-text>
 * <novo-text color="grapefruit">Label</novo-text>
 */
class NovoText extends NovoBaseTextElement {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoText, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoText, isStandalone: false, selector: "novo-text,[novo-text]", inputs: { block: "block" }, host: { properties: { "class.text-block": "this.block" }, classAttribute: "novo-text" }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [".novo-text{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}.novo-text.text-capitalize{text-transform:capitalize}.novo-text.text-uppercase{text-transform:uppercase}.novo-text.text-nowrap{white-space:nowrap}.novo-text.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-text.text-size-default{font-size:inherit}.novo-text.text-size-body{font-size:1.3rem}.novo-text.text-size-xs{font-size:1rem}.novo-text.text-size-sm{font-size:1.2rem}.novo-text.text-size-md{font-size:1.3rem}.novo-text.text-size-lg{font-size:1.6rem}.novo-text.text-size-xl{font-size:2rem}.novo-text.text-size-2xl{font-size:2.6rem}.novo-text.text-size-3xl{font-size:3.2rem}.novo-text.text-size-smaller{font-size:.8em}.novo-text.text-size-larger{font-size:1.2em}.novo-text.text-color-black{color:#000}.novo-text.text-color-white{color:#fff}.novo-text.text-color-gray,.novo-text.text-color-grey{color:#9e9e9e}.novo-text.text-color-offWhite,.novo-text.text-color-bright{color:#f7f7f7}.novo-text.text-color-light{color:#dbdbdb}.novo-text.text-color-neutral{color:#4f5361}.novo-text.text-color-dark{color:#3d464d}.novo-text.text-color-orange{color:#ff6900}.novo-text.text-color-navigation{color:#202945}.novo-text.text-color-skyBlue{color:#009bdf}.novo-text.text-color-steel{color:#5b6770}.novo-text.text-color-metal{color:#637893}.novo-text.text-color-sand{color:#f4f4f4}.novo-text.text-color-silver{color:#e2e2e2}.novo-text.text-color-stone{color:#bebebe}.novo-text.text-color-ash{color:#a0a0a0}.novo-text.text-color-slate{color:#707070}.novo-text.text-color-onyx{color:#526980}.novo-text.text-color-charcoal{color:#282828}.novo-text.text-color-moonlight{color:#1a242f}.novo-text.text-color-midnight{color:#202945}.novo-text.text-color-darkness{color:#161f27}.novo-text.text-color-navy{color:#0d2d42}.novo-text.text-color-aqua{color:#3bafda}.novo-text.text-color-ocean{color:#4a89dc}.novo-text.text-color-mint{color:#37bc9b}.novo-text.text-color-grass{color:#8cc152}.novo-text.text-color-sunflower{color:#f6b042}.novo-text.text-color-bittersweet{color:#eb6845}.novo-text.text-color-grapefruit{color:#da4453}.novo-text.text-color-carnation{color:#d770ad}.novo-text.text-color-lavender{color:#967adc}.novo-text.text-color-mountain{color:#9678b6}.novo-text.text-color-info,.novo-text.text-color-positive{color:#4a89dc}.novo-text.text-color-success{color:#8cc152}.novo-text.text-color-negative,.novo-text.text-color-danger,.novo-text.text-color-error{color:#da4453}.novo-text.text-color-warning{color:#f6b042}.novo-text.text-color-empty{color:#cccdcc}.novo-text.text-color-disabled{color:#bebebe}.novo-text.text-color-background{color:#f7f7f7}.novo-text.text-color-backgroundDark{color:#e2e2e2}.novo-text.text-color-presentation{color:#5b6770}.novo-text.text-color-bullhorn{color:#ff6900}.novo-text.text-color-pulse{color:#3bafda}.novo-text.text-color-company{color:#39d}.novo-text.text-color-candidate{color:#4b7}.novo-text.text-color-lead{color:#a69}.novo-text.text-color-contact,.novo-text.text-color-clientcontact{color:#fa4}.novo-text.text-color-opportunity{color:#625}.novo-text.text-color-job,.novo-text.text-color-joborder{color:#b56}.novo-text.text-color-submission{color:#a9adbb}.novo-text.text-color-sendout{color:#747884}.novo-text.text-color-placement{color:#0b344f}.novo-text.text-color-note{color:#747884}.novo-text.text-color-contract{color:#454ea0}.novo-text.text-color-task{color:#4f5361}.novo-text.text-color-jobCode,.novo-text.text-color-earnCode,.novo-text.text-color-invoiceStatement,.novo-text.text-color-billableCharge,.novo-text.text-color-payableCharge,.novo-text.text-color-user,.novo-text.text-color-corporateUser,.novo-text.text-color-distributionList,.novo-text.text-color-credential,.novo-text.text-color-person{color:#696d79}.novo-text.margin-before{margin-top:.4rem}.novo-text.margin-after{margin-bottom:.8rem}.novo-text.text-length-small{max-width:40ch}.novo-text.text-length-medium{max-width:55ch}.novo-text.text-length-large{max-width:70ch}.novo-text.text-weight-hairline{font-weight:100}.novo-text.text-weight-thin{font-weight:200}.novo-text.text-weight-light{font-weight:300}.novo-text.text-weight-normal{font-weight:400}.novo-text.text-weight-medium{font-weight:500}.novo-text.text-weight-semibold{font-weight:600}.novo-text.text-weight-bold{font-weight:700}.novo-text.text-weight-extrabold{font-weight:800}.novo-text.text-weight-heavy{font-weight:900}.novo-text.text-weight-lighter{font-weight:lighter}.novo-text.text-weight-bolder{font-weight:bolder}.novo-text.text-block{display:block;line-height:1.375em;min-width:55ch;max-width:75ch}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoText.prototype, "block", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoText, decorators: [{
            type: Component,
            args: [{ selector: 'novo-text,[novo-text]', template: ` <ng-content></ng-content> `, encapsulation: ViewEncapsulation.None, host: {
                        class: 'novo-text',
                    }, standalone: false, styles: [".novo-text{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}.novo-text.text-capitalize{text-transform:capitalize}.novo-text.text-uppercase{text-transform:uppercase}.novo-text.text-nowrap{white-space:nowrap}.novo-text.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-text.text-size-default{font-size:inherit}.novo-text.text-size-body{font-size:1.3rem}.novo-text.text-size-xs{font-size:1rem}.novo-text.text-size-sm{font-size:1.2rem}.novo-text.text-size-md{font-size:1.3rem}.novo-text.text-size-lg{font-size:1.6rem}.novo-text.text-size-xl{font-size:2rem}.novo-text.text-size-2xl{font-size:2.6rem}.novo-text.text-size-3xl{font-size:3.2rem}.novo-text.text-size-smaller{font-size:.8em}.novo-text.text-size-larger{font-size:1.2em}.novo-text.text-color-black{color:#000}.novo-text.text-color-white{color:#fff}.novo-text.text-color-gray,.novo-text.text-color-grey{color:#9e9e9e}.novo-text.text-color-offWhite,.novo-text.text-color-bright{color:#f7f7f7}.novo-text.text-color-light{color:#dbdbdb}.novo-text.text-color-neutral{color:#4f5361}.novo-text.text-color-dark{color:#3d464d}.novo-text.text-color-orange{color:#ff6900}.novo-text.text-color-navigation{color:#202945}.novo-text.text-color-skyBlue{color:#009bdf}.novo-text.text-color-steel{color:#5b6770}.novo-text.text-color-metal{color:#637893}.novo-text.text-color-sand{color:#f4f4f4}.novo-text.text-color-silver{color:#e2e2e2}.novo-text.text-color-stone{color:#bebebe}.novo-text.text-color-ash{color:#a0a0a0}.novo-text.text-color-slate{color:#707070}.novo-text.text-color-onyx{color:#526980}.novo-text.text-color-charcoal{color:#282828}.novo-text.text-color-moonlight{color:#1a242f}.novo-text.text-color-midnight{color:#202945}.novo-text.text-color-darkness{color:#161f27}.novo-text.text-color-navy{color:#0d2d42}.novo-text.text-color-aqua{color:#3bafda}.novo-text.text-color-ocean{color:#4a89dc}.novo-text.text-color-mint{color:#37bc9b}.novo-text.text-color-grass{color:#8cc152}.novo-text.text-color-sunflower{color:#f6b042}.novo-text.text-color-bittersweet{color:#eb6845}.novo-text.text-color-grapefruit{color:#da4453}.novo-text.text-color-carnation{color:#d770ad}.novo-text.text-color-lavender{color:#967adc}.novo-text.text-color-mountain{color:#9678b6}.novo-text.text-color-info,.novo-text.text-color-positive{color:#4a89dc}.novo-text.text-color-success{color:#8cc152}.novo-text.text-color-negative,.novo-text.text-color-danger,.novo-text.text-color-error{color:#da4453}.novo-text.text-color-warning{color:#f6b042}.novo-text.text-color-empty{color:#cccdcc}.novo-text.text-color-disabled{color:#bebebe}.novo-text.text-color-background{color:#f7f7f7}.novo-text.text-color-backgroundDark{color:#e2e2e2}.novo-text.text-color-presentation{color:#5b6770}.novo-text.text-color-bullhorn{color:#ff6900}.novo-text.text-color-pulse{color:#3bafda}.novo-text.text-color-company{color:#39d}.novo-text.text-color-candidate{color:#4b7}.novo-text.text-color-lead{color:#a69}.novo-text.text-color-contact,.novo-text.text-color-clientcontact{color:#fa4}.novo-text.text-color-opportunity{color:#625}.novo-text.text-color-job,.novo-text.text-color-joborder{color:#b56}.novo-text.text-color-submission{color:#a9adbb}.novo-text.text-color-sendout{color:#747884}.novo-text.text-color-placement{color:#0b344f}.novo-text.text-color-note{color:#747884}.novo-text.text-color-contract{color:#454ea0}.novo-text.text-color-task{color:#4f5361}.novo-text.text-color-jobCode,.novo-text.text-color-earnCode,.novo-text.text-color-invoiceStatement,.novo-text.text-color-billableCharge,.novo-text.text-color-payableCharge,.novo-text.text-color-user,.novo-text.text-color-corporateUser,.novo-text.text-color-distributionList,.novo-text.text-color-credential,.novo-text.text-color-person{color:#696d79}.novo-text.margin-before{margin-top:.4rem}.novo-text.margin-after{margin-bottom:.8rem}.novo-text.text-length-small{max-width:40ch}.novo-text.text-length-medium{max-width:55ch}.novo-text.text-length-large{max-width:70ch}.novo-text.text-weight-hairline{font-weight:100}.novo-text.text-weight-thin{font-weight:200}.novo-text.text-weight-light{font-weight:300}.novo-text.text-weight-normal{font-weight:400}.novo-text.text-weight-medium{font-weight:500}.novo-text.text-weight-semibold{font-weight:600}.novo-text.text-weight-bold{font-weight:700}.novo-text.text-weight-extrabold{font-weight:800}.novo-text.text-weight-heavy{font-weight:900}.novo-text.text-weight-lighter{font-weight:lighter}.novo-text.text-weight-bolder{font-weight:bolder}.novo-text.text-block{display:block;line-height:1.375em;min-width:55ch;max-width:75ch}\n"] }]
        }], propDecorators: { block: [{
                type: HostBinding,
                args: ['class.text-block']
            }, {
                type: Input
            }] } });

// NG2
/**
 * Tag Example
 * <novo-title size="sm" disabled>Label</novo-title
 * <novo-title small disabled>Label</novo-title>
 * <novo-title large disabled>Label</novo-title>
 * <novo-title error>Label</novo-title>
 * <novo-title muted>Label</novo-title>
 * <novo-title class="tc-grapefruit">Label</novo-title>
 * <novo-title color="grapefruit">Label</novo-title>
 */
class NovoTitle extends NovoBaseTextElement {
    constructor() {
        super(...arguments);
        this.weight = 'medium';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTitle, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoTitle, isStandalone: false, selector: "novo-title,[novo-title]", host: { classAttribute: "novo-title" }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:block;font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.3rem}:host.text-size-xs{font-size:1rem}:host.text-size-sm{font-size:1.2rem}:host.text-size-md{font-size:1.3rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray{color:#9e9e9e}:host.text-color-grey{color:#9e9e9e}:host.text-color-offWhite{color:#f7f7f7}:host.text-color-bright{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info{color:#4a89dc}:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-negative{color:#da4453}:host.text-color-danger{color:#da4453}:host.text-color-error{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-clientcontact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-joborder{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-task{color:#4f5361}:host.text-color-jobCode{color:#696d79}:host.text-color-earnCode{color:#696d79}:host.text-color-invoiceStatement{color:#696d79}:host.text-color-billableCharge{color:#696d79}:host.text-color-payableCharge{color:#696d79}:host.text-color-user{color:#696d79}:host.text-color-corporateUser{color:#696d79}:host.text-color-distributionList{color:#696d79}:host.text-color-credential{color:#696d79}:host.text-color-person{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTitle, decorators: [{
            type: Component,
            args: [{ selector: 'novo-title,[novo-title]', template: ` <ng-content></ng-content> `, host: {
                        class: 'novo-title',
                    }, standalone: false, styles: [":host{display:block;font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.3rem}:host.text-size-xs{font-size:1rem}:host.text-size-sm{font-size:1.2rem}:host.text-size-md{font-size:1.3rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray{color:#9e9e9e}:host.text-color-grey{color:#9e9e9e}:host.text-color-offWhite{color:#f7f7f7}:host.text-color-bright{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info{color:#4a89dc}:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-negative{color:#da4453}:host.text-color-danger{color:#da4453}:host.text-color-error{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-clientcontact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-joborder{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-task{color:#4f5361}:host.text-color-jobCode{color:#696d79}:host.text-color-earnCode{color:#696d79}:host.text-color-invoiceStatement{color:#696d79}:host.text-color-billableCharge{color:#696d79}:host.text-color-payableCharge{color:#696d79}:host.text-color-user{color:#696d79}:host.text-color-corporateUser{color:#696d79}:host.text-color-distributionList{color:#696d79}:host.text-color-credential{color:#696d79}:host.text-color-person{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }]
        }] });

class NovoCommonModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoCommonModule, declarations: [NovoTemplate,
            NovoText,
            NovoTitle,
            NovoCaption,
            NovoLabel,
            NovoLink,
            MarginDirective,
            PaddingDirective,
            BackgroundColorDirective,
            TextColorDirective,
            BorderDirective,
            GapDirective,
            AccentColorDirective,
            FillColorDirective,
            FlexDirective,
            ThemeColorDirective,
            SwitchCasesDirective,
            VisibleDirective], imports: [CommonModule, NovoOptionModule], exports: [NovoTemplate,
            NovoText,
            NovoTitle,
            NovoCaption,
            NovoLabel,
            NovoLink,
            MarginDirective,
            PaddingDirective,
            BackgroundColorDirective,
            TextColorDirective,
            BorderDirective,
            GapDirective,
            AccentColorDirective,
            FillColorDirective,
            FlexDirective,
            ThemeColorDirective,
            SwitchCasesDirective,
            VisibleDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCommonModule, imports: [CommonModule, NovoOptionModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoOptionModule],
                    exports: [
                        NovoTemplate,
                        NovoText,
                        NovoTitle,
                        NovoCaption,
                        NovoLabel,
                        NovoLink,
                        MarginDirective,
                        PaddingDirective,
                        BackgroundColorDirective,
                        TextColorDirective,
                        BorderDirective,
                        GapDirective,
                        AccentColorDirective,
                        FillColorDirective,
                        FlexDirective,
                        ThemeColorDirective,
                        SwitchCasesDirective,
                        VisibleDirective,
                    ],
                    declarations: [
                        NovoTemplate,
                        NovoText,
                        NovoTitle,
                        NovoCaption,
                        NovoLabel,
                        NovoLink,
                        MarginDirective,
                        PaddingDirective,
                        BackgroundColorDirective,
                        TextColorDirective,
                        BorderDirective,
                        GapDirective,
                        AccentColorDirective,
                        FillColorDirective,
                        FlexDirective,
                        ThemeColorDirective,
                        SwitchCasesDirective,
                        VisibleDirective,
                    ],
                }]
        }] });

/** Error state matcher that matches when a control is invalid and dirty. */
class ShowOnDirtyErrorStateMatcher {
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ShowOnDirtyErrorStateMatcher, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ShowOnDirtyErrorStateMatcher }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ShowOnDirtyErrorStateMatcher, decorators: [{
            type: Injectable
        }] });
/** Provider that defines how form controls behave with regards to displaying error messages. */
class ErrorStateMatcher {
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.touched || (form && form.submitted)));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ErrorStateMatcher, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ErrorStateMatcher, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ErrorStateMatcher, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/** Mixin to augment a directive with a `color` property. */
function mixinColor(base, defaultColor) {
    return class extends base {
        get color() {
            return this._color;
        }
        set color(value) {
            const colorPalette = value || this.defaultColor;
            if (colorPalette !== this._color) {
                if (this._color) {
                    this._elementRef.nativeElement.classList.remove(`novo-color-${this._color}`);
                }
                if (colorPalette) {
                    this._elementRef.nativeElement.classList.add(`novo-color-${colorPalette}`);
                }
                this._color = colorPalette;
            }
        }
        constructor(...args) {
            super(...args);
            this.defaultColor = defaultColor;
            // Set the default color that can be specified from the mixin.
            this.color = defaultColor;
        }
    };
}

/**
 * Mixin to augment a directive with updateErrorState method.
 * For component with `errorState` and need to update `errorState`.
 */
function mixinErrorState(base) {
    return class extends base {
        updateErrorState() {
            const oldState = this.errorState;
            const parent = this._parentFormGroup || this._parentForm;
            const matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
            const control = this.ngControl ? this.ngControl.control : null;
            const newState = matcher.isErrorState(control, parent);
            if (newState !== oldState) {
                this.errorState = newState;
                this.stateChanges.next();
            }
        }
        constructor(...args) {
            super(...args);
            /** Whether the component is in an error state. */
            this.errorState = false;
            /**
             * Stream that emits whenever the state of the input changes such that the wrapping
             * `MatFormField` needs to run change detection.
             */
            this.stateChanges = new Subject();
        }
    };
}

const NOVO_OVERLAY_CONTAINER = new InjectionToken('NovoOverlayContainer');
/** Mixin to augment a directive with a `overlay` property. */
function mixinOverlay(base) {
    // Note: We cast `base` to `unknown` and then `Constructor`. It could be an abstract class,
    // but given we `extend` it from another class, we can assume a constructor being accessible.
    class Mixin extends base {
        constructor(...args) {
            super(...args);
        }
        openPanel() {
            if (!this.disabled) {
                this.overlay.openPanel();
            }
        }
        closePanel() {
            this.overlay.closePanel();
        }
        togglePanel() {
            if (this.panelOpen) {
                this.closePanel();
            }
            else {
                this.openPanel();
            }
        }
        get panelOpen() {
            return this.overlay && this.overlay.panelOpen;
        }
    }
    // Since we don't directly extend from `base` with it's original types, and we instruct
    // TypeScript that `T` actually is instantiatable through `new`, the types don't overlap.
    // This is a limitation in TS as abstract classes cannot be typed properly dynamically.
    return Mixin;
}

/** Mixin to augment a directive with a `required` property. */
function mixinRequired(base) {
    return class extends base {
        get required() {
            return this._required;
        }
        set required(value) {
            this._required = coerceBooleanProperty(value);
        }
        constructor(...args) {
            super(...args);
            this._required = false;
        }
    };
}

/** Mixin to augment a directive with a `size` property. */
function mixinSize(base, defaultSize) {
    return class extends base {
        get size() {
            return this._size;
        }
        set size(value) {
            const size = value || this.defaultSize;
            if (size !== this._size) {
                if (this._size) {
                    this._elementRef.nativeElement.classList.remove(`novo-size-${this._size}`);
                }
                if (size) {
                    this._elementRef.nativeElement.classList.add(`novo-size-${size}`);
                }
                this._size = size;
            }
        }
        constructor(...args) {
            super(...args);
            this.defaultSize = defaultSize;
            // Set the default size that can be specified from the mixin.
            this.size = defaultSize;
        }
    };
}

/** Mixin to augment a directive with a `tabIndex` property. */
function mixinTabIndex(base, defaultTabIndex = 0) {
    // Note: We cast `base` to `unknown` and then `Constructor`. It could be an abstract class,
    // but given we `extend` it from another class, we can assume a constructor being accessible.
    class Mixin extends base {
        get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
        }
        set tabIndex(value) {
            // If the specified tabIndex value is null or undefined, fall back to the default value.
            this._tabIndex = value != null ? coerceNumberProperty(value) : this.defaultTabIndex;
        }
        constructor(...args) {
            super(...args);
            this._tabIndex = defaultTabIndex;
            this.defaultTabIndex = defaultTabIndex;
        }
    }
    // Since we don't directly extend from `base` with it's original types, and we instruct
    // TypeScript that `T` actually is instantiatable through `new`, the types don't overlap.
    // This is a limitation in TS as abstract classes cannot be typed properly dynamically.
    return Mixin;
}

// Angular
class NovoOverlayTemplateComponent {
    constructor(overlay, viewContainerRef, zone, changeDetectorRef, document) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.zone = zone;
        this.changeDetectorRef = changeDetectorRef;
        this.document = document;
        this.id = `novo-overlay-${Date.now()}`;
        this.position = 'default';
        this.scrollStrategy = 'reposition';
        this.closeOnSelect = true;
        this.hasBackdrop = false;
        this.select = new EventEmitter();
        this.opening = new EventEmitter();
        this.closing = new EventEmitter();
        this.backDropClicked = new EventEmitter();
        this.overlayContainer = inject(OverlayContainer);
    }
    ngOnDestroy() {
        this.destroyOverlay();
    }
    get panelOpen() {
        return this.overlayRef?.hasAttached();
    }
    set parent(value) {
        this._parent = value;
        this.checkSizes();
    }
    get parent() {
        return this._parent;
    }
    openPanel() {
        if (!this.overlayRef) {
            this.createOverlay(this.template);
        }
        else {
            this.checkSizes();
        }
        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portal);
            this.closingActionsSubscription = this.subscribeToClosingActions();
        }
        this.changeDetectorRef.markForCheck();
        setTimeout(() => {
            if (this.overlayRef) {
                if (this.overlayContainer.getContainerElement()?.attributes.getNamedItem('novoContext')) {
                    this.overlayContext = this.overlayContainer.getContainerElement().attributes.getNamedItem('novoContext').value;
                }
                this.overlayRef.updatePosition();
                this.opening.emit(true);
                setTimeout(() => {
                    // TODO: @charlesabarnes Remove this once we remove table
                    if (this.overlayRef) {
                        this.overlayRef.updatePosition();
                    }
                });
            }
        });
    }
    closePanel() {
        this.zone.run(() => {
            if (this.overlayRef?.hasAttached()) {
                this.overlayRef.detach();
                this.closingActionsSubscription.unsubscribe();
            }
            this.closing.emit(false);
            if (this.panelOpen) {
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    onClosingAction(event) {
        this.closePanel();
    }
    /**
     * A stream of actions that should close the panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions() {
        return merge(this.outsideClickStream);
    }
    /** Stream of clicks outside of the panel. */
    get outsideClickStream() {
        if (!this.document) {
            return of();
        }
        return merge(fromEvent(this.document, 'mouseup'), fromEvent(this.document, 'touchend')).pipe(filter((event) => {
            const clickTarget = event.target;
            const clickedOutside = this.panelOpen &&
                clickTarget !== this.getConnectedElement().nativeElement &&
                this.isInDocument(clickTarget) &&
                !this.getConnectedElement().nativeElement.contains(clickTarget) &&
                (!!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget)) &&
                this.elementIsInContext(clickTarget) &&
                !this.elementIsInNestedOverlay(clickTarget);
            if (this.panelOpen && !!this.overlayRef && this.overlayRef.overlayElement.contains(clickTarget) && this.closeOnSelect) {
                this.select.emit(event);
            }
            return clickedOutside;
        }));
    }
    isInDocument(node) {
        return node.getRootNode().nodeType === Node.DOCUMENT_NODE;
    }
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    subscribeToClosingActions() {
        const firstStable = this.zone.onStable.asObservable().pipe(first());
        // When the zone is stable initially, and when the option list changes...
        return (merge(firstStable)
            .pipe(
        // create a new stream of panelClosingActions, replacing any previous streams
        // that were created, and flatten it so our stream only emits closing events...
        switchMap(() => {
            return this.panelClosingActions;
        }), 
        // when the first closing event occurs...
        first())
            // set the value, close the panel, and complete.
            .subscribe((event) => this.onClosingAction(event)));
    }
    createOverlay(template) {
        this.portal = new TemplatePortal(template, this.viewContainerRef);
        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        this.overlayRef.backdropClick().subscribe(() => {
            this.backDropClicked.emit(true);
            this.closePanel();
        });
    }
    destroyOverlay() {
        if (this.overlayRef) {
            this.closePanel();
            this.overlayRef.dispose();
            this.overlayRef = undefined;
        }
    }
    getOverlayConfig() {
        const config = new OverlayConfig();
        if (!this.width) {
            config.width = this.getHostWidth();
        }
        else {
            config.width = this.width;
        }
        if (this.minWidth) {
            config.minWidth = this.minWidth;
        }
        if (this.height) {
            config.height = this.height;
        }
        config.positionStrategy = this.getPosition();
        config.hasBackdrop = this.hasBackdrop;
        config.direction = 'ltr';
        config.scrollStrategy = this.getScrollStrategy();
        return config;
    }
    /**
     * Supports the following position strategies:
     * 'default', 'right', 'bottom', 'center', 'bottom-left', 'bottom-right', 'top-left', 'top-right'
     */
    getPosition() {
        if (this.position === 'center') {
            return this.overlay
                .position()
                .flexibleConnectedTo(this.getConnectedElement())
                .withFlexibleDimensions(false)
                .withPositions([
                { originX: 'start', originY: 'center', overlayX: 'start', overlayY: 'center' },
                { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
                { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
            ]);
        }
        const [originX, fallbackX] = this.position.includes('right') ? ['end', 'start'] : ['start', 'end'];
        const [originY, overlayY] = this.position.includes('top') ? ['top', 'bottom'] : ['bottom', 'top'];
        const defaultPosition = { originX, originY, overlayX: originX, overlayY };
        let strategy = this.overlay
            .position()
            .flexibleConnectedTo(this.getConnectedElement())
            .withFlexibleDimensions(false)
            .withPositions([defaultPosition]);
        if (this.position === 'bottom') {
            strategy = strategy.withPositions([defaultPosition, { originX: fallbackX, originY: 'bottom', overlayX: fallbackX, overlayY: 'top' }]);
        }
        else if (this.position === 'right' || this.position === 'default' || this.position.includes('above-below')) {
            strategy = strategy.withPositions([
                defaultPosition,
                { originX, originY: 'top', overlayX: originX, overlayY: 'bottom' },
                { originX: fallbackX, originY: 'bottom', overlayX: fallbackX, overlayY: 'top' },
                { originX: fallbackX, originY: 'top', overlayX: fallbackX, overlayY: 'bottom' },
            ]);
            if (!this.position.includes('above-below')) {
                strategy = strategy.withPositions([
                    defaultPosition,
                    { originX, originY: 'center', overlayX: originX, overlayY: 'center' },
                    { originX: fallbackX, originY: 'center', overlayX: fallbackX, overlayY: 'center' },
                ]);
            }
        }
        return strategy;
    }
    getScrollStrategy() {
        switch (this.scrollStrategy) {
            case 'block':
                return this.overlay.scrollStrategies.block();
            case 'reposition':
                return this.overlay.scrollStrategies.reposition();
            default:
                return this.overlay.scrollStrategies.close();
        }
    }
    checkSizes() {
        if (this.overlayRef) {
            if (!this.width) {
                this.overlayRef.getConfig().width = this.getHostWidth();
            }
            if (this.minWidth) {
                this.overlayRef.getConfig().minWidth = this.minWidth;
            }
            if (this.height) {
                this.overlayRef.getConfig().height = this.height;
            }
            this.overlayRef.updateSize(this.overlayRef.getConfig());
            this.overlayRef.updatePosition();
            this.changeDetectorRef.markForCheck();
        }
    }
    getConnectedElement() {
        return this.parent;
    }
    elementIsInContext(el) {
        // this is to support multiple overlay contexts
        if (this.overlayContext) {
            while (el.parentNode) {
                if (el.localName === this.overlayContext) {
                    return true;
                }
                el = el.parentNode;
            }
            return false;
        }
        return true;
    }
    elementIsInNestedOverlay(el) {
        while (el.parentNode) {
            if (Helpers.isString(el.id) &&
                (el.id?.includes('novo-overlay-') || el.id?.includes('modal-container-'))) {
                // checking to see if the current overlay is newer (in front of the parent overlay)
                // example text novo-overlay-1666291728835
                return this.id.split('-')[2] < el.id.split('-')[2];
            }
            el = el.parentNode;
        }
        return false;
    }
    getHostWidth() {
        return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
    }
    isBlurRecipient(event) {
        if (!this.overlayRef || !event.relatedTarget) {
            return false;
        }
        return this.overlayRef.overlayElement.contains(event.relatedTarget);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOverlayTemplateComponent, deps: [{ token: i1$1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoOverlayTemplateComponent, isStandalone: false, selector: "novo-overlay-template", inputs: { position: "position", scrollStrategy: "scrollStrategy", width: "width", minWidth: "minWidth", height: "height", closeOnSelect: "closeOnSelect", hasBackdrop: "hasBackdrop", parent: "parent" }, outputs: { select: "select", opening: "opening", closing: "closing", backDropClicked: "backDropClicked" }, viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }], ngImport: i0, template: `
    <ng-template>
      <div class="novo-overlay-panel" role="listbox" [id]="id" #panel><ng-content></ng-content></div>
    </ng-template>
  `, isInline: true, styles: ["div.novo-overlay-panel{width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOverlayTemplateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-overlay-template', template: `
    <ng-template>
      <div class="novo-overlay-panel" role="listbox" [id]="id" #panel><ng-content></ng-content></div>
    </ng-template>
  `, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, styles: ["div.novo-overlay-panel{width:100%}\n"] }]
        }], ctorParameters: () => [{ type: i1$1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }], propDecorators: { template: [{
                type: ViewChild,
                args: [TemplateRef]
            }], panel: [{
                type: ViewChild,
                args: ['panel']
            }], position: [{
                type: Input
            }], scrollStrategy: [{
                type: Input
            }], width: [{
                type: Input
            }], minWidth: [{
                type: Input
            }], height: [{
                type: Input
            }], closeOnSelect: [{
                type: Input
            }], hasBackdrop: [{
                type: Input
            }], select: [{
                type: Output
            }], opening: [{
                type: Output
            }], closing: [{
                type: Output
            }], backDropClicked: [{
                type: Output
            }], parent: [{
                type: Input
            }] } });

// NG2
class NovoOverlayModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOverlayModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoOverlayModule, declarations: [NovoOverlayTemplateComponent], imports: [CommonModule, FormsModule, OverlayModule, ScrollingModule], exports: [NovoOverlayTemplateComponent, ScrollingModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOverlayModule, imports: [CommonModule, FormsModule, OverlayModule, ScrollingModule, ScrollingModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoOverlayModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, OverlayModule, ScrollingModule],
                    declarations: [NovoOverlayTemplateComponent],
                    exports: [NovoOverlayTemplateComponent, ScrollingModule],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AccentColorDirective, BackgroundColorDirective, BorderDirective, ErrorStateMatcher, FillColorDirective, FlexDirective, GapDirective, MarginDirective, NOVO_OPTGROUP, NOVO_OPTION_PARENT_COMPONENT, NOVO_OVERLAY_CONTAINER, NovoBaseTextElement, NovoCaption, NovoCommonModule, NovoLabel, NovoLink, NovoOptgroup, NovoOptgroupBase, NovoOptgroupMixinBase, NovoOption, NovoOptionBase, NovoOptionModule, NovoOptionSelectionChange, NovoOverlayModule, NovoOverlayTemplateComponent, NovoPseudoCheckbox, NovoPseudoCheckboxModule, NovoTemplate, NovoText, NovoTheme, NovoThemeOptions, NovoTitle, PaddingDirective, ShowOnDirtyErrorStateMatcher, SwitchCasesDirective, TextColorDirective, ThemeColorDirective, VisibleDirective, _countGroupLabelsBeforeOption, _getOptionScrollPosition, getSpacingToken, mixinColor, mixinDisabled, mixinErrorState, mixinOverlay, mixinRequired, mixinSize, mixinTabIndex };
//# sourceMappingURL=novo-elements-elements-common.mjs.map
