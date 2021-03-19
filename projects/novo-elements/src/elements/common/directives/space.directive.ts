// tslint:disable: directive-selector
import { Directive, HostBinding, Input } from '@angular/core';

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

@Directive({
  // tslint:disable-next-line: max-line-length
  selector: '[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]',
})
export class MarginDirective {
  // Margin
  @Input() margin: string;
  @Input() m: string;
  @Input() marginLeft: string;
  @Input() ml: string;
  @Input() marginRight: string;
  @Input() mr: string;
  @Input() marginTop: string;
  @Input() mt: string;
  @Input() marginBottom: string;
  @Input() mb: string;
  @Input() marginX: string;
  @Input() mx: string;
  @Input() marginY: string;
  @Input() my: string;

  @HostBinding('style.margin') get hb_margin() {
    return this.margin || this.m;
  }
  @HostBinding('style.margin-left') get hb_margin_left() {
    return this.marginLeft || this.ml || this.mx || this.marginX;
  }
  @HostBinding('style.margin-right') get hb_margin_right() {
    return this.marginRight || this.mr || this.mx || this.marginX;
  }
  @HostBinding('style.margin-top') get hb_margin_top() {
    return this.marginTop || this.mt || this.my || this.marginY;
  }
  @HostBinding('style.margin-bottom') get hb_margin_bottom() {
    return this.marginBottom || this.mb || this.my || this.marginY;
  }
}

@Directive({
  // tslint:disable-next-line: max-line-length
  selector: '[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]',
})
export class PaddingDirective {
  // Padding
  @Input() padding: string;
  @Input() p: string;
  @Input() paddingLeft: string;
  @Input() pl: string;
  @Input() paddingRight: string;
  @Input() pr: string;
  @Input() paddingTop: string;
  @Input() pt: string;
  @Input() paddingBottom: string;
  @Input() pb: string;
  @Input() paddingX: string;
  @Input() px: string;
  @Input() paddingY: string;
  @Input() py: string;

  @HostBinding('style.padding') get hb_padding() {
    return this.padding || this.p;
  }
  @HostBinding('style.padding-left') get hb_padding_left() {
    return this.paddingLeft || this.pl || this.px || this.paddingX;
  }
  @HostBinding('style.padding-right') get hb_padding_right() {
    return this.paddingRight || this.pr || this.px || this.paddingX;
  }
  @HostBinding('style.padding-top') get hb_padding_top() {
    return this.paddingTop || this.pt || this.py || this.paddingY;
  }
  @HostBinding('style.padding-bottom') get hb_padding_bottom() {
    return this.paddingBottom || this.pb || this.py || this.paddingY;
  }
}
