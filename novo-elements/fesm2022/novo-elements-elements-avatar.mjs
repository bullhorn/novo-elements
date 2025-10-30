import * as i0 from '@angular/core';
import { HostBinding, Input, Component, ViewChildren, NgModule } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

// NG2
class NovoAvatarElement {
    get hb_classBinding() {
        return [`avatar-size-${this.size}`, `avatar-shape-${this.shape}`, `avatar-color-${this.color}`];
    }
    get background() {
        if (!this.image && !this.source.profileImage)
            return;
        return `url(${this.image || this.source.profileImage})`;
    }
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.size = 'medium';
        this.shape = 'round';
    }
    ngOnInit() {
        let src;
        if ((this.source && this.source !== '') || this.label) {
            if (this.source.profileImage) {
                // this.src = this.source.profileImage;
                return;
            }
            else if (this.source.logo) {
                src = this.source.logo;
            }
            else {
                const first = this.label || this.source.firstName
                    ? this.source.firstName.charAt(0)
                    : this.source.name
                        ? this.source.name.charAt(0)
                        : this.source.username
                            ? this.source.username.charAt(0)
                            : '';
                const last = this.source.lastName ? this.source.lastName.charAt(0) : '';
                // Defining Colors
                const colors = [
                    '#1abc9c',
                    '#16a085',
                    '#f1c40f',
                    '#f39c12',
                    '#2ecc71',
                    '#27ae60',
                    '#e67e22',
                    '#d35400',
                    '#3498db',
                    '#2980b9',
                    '#e74c3c',
                    '#c0392b',
                    '#9b59b6',
                    '#8e44ad',
                    '#bdc3c7',
                    '#34495e',
                    '#2c3e50',
                    '#95a5a6',
                    '#7f8c8d',
                    '#ec87bf',
                    '#d870ad',
                    '#f69785',
                    '#9ba37e',
                    '#b49255',
                    '#b49255',
                    '#a94136',
                ];
                const lighterColors = [
                    '#15D6B0',
                    '#16A069',
                    '#F1D60F',
                    '#F3AC12',
                    '#2ED85B',
                    '#28BC7F',
                    '#E66322',
                    '#D3002B',
                    '#6534DB',
                    '#29B2B9',
                    '#E73C63',
                    '#DB6D31',
                    '#CB48B5',
                    '#6944AD',
                    '#38536D',
                    '#3D6473',
                    '#394A6C',
                    '#92BCB7',
                    '#7D99A2',
                    '#F14F76',
                    '#CB5CDA',
                    '#FFB475',
                    '#B9CE6E',
                    '#DDAA4F',
                    '#CD6F45',
                    '#B9354A',
                ];
                const settings = {
                    // Default settings
                    textColor: '#ffffff',
                    height: 100,
                    width: 100,
                    fontSize: 50,
                    fontWeight: 400,
                    fontFamily: 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif',
                };
                // making the text object
                const colorIndex = Math.floor((first.charCodeAt(0) - 65) % colors.length);
                const cobj = document.createElement('text');
                cobj.setAttribute('text-anchor', 'middle');
                cobj.setAttribute('x', '50%');
                cobj.setAttribute('y', '50%');
                cobj.setAttribute('dy', '0.35em');
                cobj.setAttribute('pointer-events', 'auto');
                cobj.setAttribute('fill', settings.textColor);
                cobj.setAttribute('font-family', settings.fontFamily);
                cobj.style.fontWeight = settings.fontWeight;
                cobj.style.fontSize = `${settings.fontSize}px`;
                const ltrs = document.createTextNode(this.label || first + last);
                cobj.appendChild(ltrs);
                const svg = document.createElement('svg');
                svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                svg.setAttribute('pointer-events', 'none');
                svg.setAttribute('width', settings.width);
                svg.setAttribute('height', settings.height);
                // this.setPrefixedValue(svg, 'background', colors[colorIndex]);
                this.setPrefixedValue(svg, 'background', `linear-gradient(-45deg, ${colors[colorIndex]} 0%, ${lighterColors[colorIndex]} 100%)`);
                svg.style.width = `${settings.width}px`;
                svg.style.height = `${settings.height}px`;
                svg.appendChild(cobj);
                const top = document.createElement('div');
                top.appendChild(svg);
                const svgHtml = window.btoa(unescape(encodeURIComponent(top.innerHTML)));
                src = `data:image/svg+xml;base64, ${svgHtml}`;
            }
            this.src = this.sanitizer.bypassSecurityTrustUrl(src);
        }
    }
    setPrefixedValue(elm, prop, value) {
        const prefixes = ['-moz-', '-webkit-', '-o-', '-ms-', '-khtml-'];
        // Clear
        elm.style[prop] = '';
        const starting = elm.style[prop];
        // Try raw first
        try {
            elm.style[prop] = value;
            if (elm.style[prop] !== starting) {
                return;
            }
        }
        catch (e) {
            // no op
        }
        // Try prefixes
        for (let i = 0; i < prefixes.length; ++i) {
            const v = prefixes[i] + value;
            try {
                elm.style[prop] = v;
                if (elm.style[prop] !== starting) {
                    return;
                }
            }
            catch (e2) {
                // no op
            }
        }
    }
    _isValidURL(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoAvatarElement, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoAvatarElement, isStandalone: false, selector: "novo-avatar", inputs: { source: "source", label: "label", theme: "theme", image: "image", size: "size", shape: "shape", color: "color" }, host: { properties: { "class": "this.hb_classBinding", "style.backgroundImage": "this.background" } }, ngImport: i0, template: '<img *ngIf="src" [src]="src"/>', isInline: true, styles: [":host{display:inline-block;width:30px;height:30px;background-size:cover;background-position:center;overflow:hidden;position:relative;background-color:var(--background-muted)}:host img{width:inherit;height:inherit;border-radius:inherit}:host.avatar-size-small{width:20px;height:20px}:host.avatar-size-large{width:40px;height:40px}:host.avatar-shape-round{border-radius:2em}:host.avatar-shape-square{border-radius:.4em}:host.avatar-color-black{color:#fff;background-color:#000}:host.avatar-color-white{color:#3d464d;background-color:#fff}:host.avatar-color-gray{color:#3d464d;background-color:#9e9e9e}:host.avatar-color-grey{color:#3d464d;background-color:#9e9e9e}:host.avatar-color-offWhite{color:#3d464d;background-color:#f7f7f7}:host.avatar-color-bright{color:#3d464d;background-color:#f7f7f7}:host.avatar-color-light{color:#3d464d;background-color:#dbdbdb}:host.avatar-color-neutral{color:#fff;background-color:#4f5361}:host.avatar-color-dark{color:#fff;background-color:#3d464d}:host.avatar-color-orange{color:#3d464d;background-color:#ff6900}:host.avatar-color-navigation{color:#fff;background-color:#202945}:host.avatar-color-skyBlue{color:#fff;background-color:#009bdf}:host.avatar-color-steel{color:#fff;background-color:#5b6770}:host.avatar-color-metal{color:#fff;background-color:#637893}:host.avatar-color-sand{color:#3d464d;background-color:#f4f4f4}:host.avatar-color-silver{color:#3d464d;background-color:#e2e2e2}:host.avatar-color-stone{color:#3d464d;background-color:#bebebe}:host.avatar-color-ash{color:#3d464d;background-color:#a0a0a0}:host.avatar-color-slate{color:#fff;background-color:#707070}:host.avatar-color-onyx{color:#fff;background-color:#526980}:host.avatar-color-charcoal{color:#fff;background-color:#282828}:host.avatar-color-moonlight{color:#fff;background-color:#1a242f}:host.avatar-color-midnight{color:#fff;background-color:#202945}:host.avatar-color-darkness{color:#fff;background-color:#161f27}:host.avatar-color-navy{color:#fff;background-color:#0d2d42}:host.avatar-color-aqua{color:#3d464d;background-color:#3bafda}:host.avatar-color-ocean{color:#fff;background-color:#4a89dc}:host.avatar-color-mint{color:#3d464d;background-color:#37bc9b}:host.avatar-color-grass{color:#fff;background-color:#8cc152}:host.avatar-color-sunflower{color:#fff;background-color:#f6b042}:host.avatar-color-bittersweet{color:#fff;background-color:#eb6845}:host.avatar-color-grapefruit{color:#fff;background-color:#da4453}:host.avatar-color-carnation{color:#fff;background-color:#d770ad}:host.avatar-color-lavender{color:#fff;background-color:#967adc}:host.avatar-color-mountain{color:#fff;background-color:#9678b6}:host.avatar-color-info{color:#fff;background-color:#4a89dc}:host.avatar-color-positive{color:#fff;background-color:#4a89dc}:host.avatar-color-success{color:#fff;background-color:#8cc152}:host.avatar-color-negative{color:#fff;background-color:#da4453}:host.avatar-color-danger{color:#fff;background-color:#da4453}:host.avatar-color-error{color:#fff;background-color:#da4453}:host.avatar-color-warning{color:#fff;background-color:#f6b042}:host.avatar-color-empty{color:#3d464d;background-color:#cccdcc}:host.avatar-color-disabled{color:#3d464d;background-color:#bebebe}:host.avatar-color-background{color:#3d464d;background-color:#f7f7f7}:host.avatar-color-backgroundDark{color:#3d464d;background-color:#e2e2e2}:host.avatar-color-presentation{color:#fff;background-color:#5b6770}:host.avatar-color-bullhorn{color:#3d464d;background-color:#ff6900}:host.avatar-color-pulse{color:#3d464d;background-color:#3bafda}:host.avatar-color-company{color:#fff;background-color:#39d}:host.avatar-color-candidate{color:#fff;background-color:#4b7}:host.avatar-color-lead{color:#fff;background-color:#a69}:host.avatar-color-contact{color:#fff;background-color:#fa4}:host.avatar-color-clientcontact{color:#fff;background-color:#fa4}:host.avatar-color-opportunity{color:#fff;background-color:#625}:host.avatar-color-job{color:#fff;background-color:#b56}:host.avatar-color-joborder{color:#fff;background-color:#b56}:host.avatar-color-submission{color:#3d464d;background-color:#a9adbb}:host.avatar-color-sendout{color:#fff;background-color:#747884}:host.avatar-color-placement{color:#fff;background-color:#0b344f}:host.avatar-color-note{color:#fff;background-color:#747884}:host.avatar-color-contract{color:#fff;background-color:#454ea0}:host.avatar-color-task{color:#fff;background-color:#4f5361}:host.avatar-color-jobCode{color:#fff;background-color:#696d79}:host.avatar-color-earnCode{color:#fff;background-color:#696d79}:host.avatar-color-invoiceStatement{color:#fff;background-color:#696d79}:host.avatar-color-billableCharge{color:#fff;background-color:#696d79}:host.avatar-color-payableCharge{color:#fff;background-color:#696d79}:host.avatar-color-user{color:#fff;background-color:#696d79}:host.avatar-color-corporateUser{color:#fff;background-color:#696d79}:host.avatar-color-distributionList{color:#fff;background-color:#696d79}:host.avatar-color-credential{color:#fff;background-color:#696d79}:host.avatar-color-person{color:#fff;background-color:#696d79}:host(.menu-active){box-shadow:0 0 4px 1px var(--selection)}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoAvatarElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-avatar', template: '<img *ngIf="src" [src]="src"/>', standalone: false, styles: [":host{display:inline-block;width:30px;height:30px;background-size:cover;background-position:center;overflow:hidden;position:relative;background-color:var(--background-muted)}:host img{width:inherit;height:inherit;border-radius:inherit}:host.avatar-size-small{width:20px;height:20px}:host.avatar-size-large{width:40px;height:40px}:host.avatar-shape-round{border-radius:2em}:host.avatar-shape-square{border-radius:.4em}:host.avatar-color-black{color:#fff;background-color:#000}:host.avatar-color-white{color:#3d464d;background-color:#fff}:host.avatar-color-gray{color:#3d464d;background-color:#9e9e9e}:host.avatar-color-grey{color:#3d464d;background-color:#9e9e9e}:host.avatar-color-offWhite{color:#3d464d;background-color:#f7f7f7}:host.avatar-color-bright{color:#3d464d;background-color:#f7f7f7}:host.avatar-color-light{color:#3d464d;background-color:#dbdbdb}:host.avatar-color-neutral{color:#fff;background-color:#4f5361}:host.avatar-color-dark{color:#fff;background-color:#3d464d}:host.avatar-color-orange{color:#3d464d;background-color:#ff6900}:host.avatar-color-navigation{color:#fff;background-color:#202945}:host.avatar-color-skyBlue{color:#fff;background-color:#009bdf}:host.avatar-color-steel{color:#fff;background-color:#5b6770}:host.avatar-color-metal{color:#fff;background-color:#637893}:host.avatar-color-sand{color:#3d464d;background-color:#f4f4f4}:host.avatar-color-silver{color:#3d464d;background-color:#e2e2e2}:host.avatar-color-stone{color:#3d464d;background-color:#bebebe}:host.avatar-color-ash{color:#3d464d;background-color:#a0a0a0}:host.avatar-color-slate{color:#fff;background-color:#707070}:host.avatar-color-onyx{color:#fff;background-color:#526980}:host.avatar-color-charcoal{color:#fff;background-color:#282828}:host.avatar-color-moonlight{color:#fff;background-color:#1a242f}:host.avatar-color-midnight{color:#fff;background-color:#202945}:host.avatar-color-darkness{color:#fff;background-color:#161f27}:host.avatar-color-navy{color:#fff;background-color:#0d2d42}:host.avatar-color-aqua{color:#3d464d;background-color:#3bafda}:host.avatar-color-ocean{color:#fff;background-color:#4a89dc}:host.avatar-color-mint{color:#3d464d;background-color:#37bc9b}:host.avatar-color-grass{color:#fff;background-color:#8cc152}:host.avatar-color-sunflower{color:#fff;background-color:#f6b042}:host.avatar-color-bittersweet{color:#fff;background-color:#eb6845}:host.avatar-color-grapefruit{color:#fff;background-color:#da4453}:host.avatar-color-carnation{color:#fff;background-color:#d770ad}:host.avatar-color-lavender{color:#fff;background-color:#967adc}:host.avatar-color-mountain{color:#fff;background-color:#9678b6}:host.avatar-color-info{color:#fff;background-color:#4a89dc}:host.avatar-color-positive{color:#fff;background-color:#4a89dc}:host.avatar-color-success{color:#fff;background-color:#8cc152}:host.avatar-color-negative{color:#fff;background-color:#da4453}:host.avatar-color-danger{color:#fff;background-color:#da4453}:host.avatar-color-error{color:#fff;background-color:#da4453}:host.avatar-color-warning{color:#fff;background-color:#f6b042}:host.avatar-color-empty{color:#3d464d;background-color:#cccdcc}:host.avatar-color-disabled{color:#3d464d;background-color:#bebebe}:host.avatar-color-background{color:#3d464d;background-color:#f7f7f7}:host.avatar-color-backgroundDark{color:#3d464d;background-color:#e2e2e2}:host.avatar-color-presentation{color:#fff;background-color:#5b6770}:host.avatar-color-bullhorn{color:#3d464d;background-color:#ff6900}:host.avatar-color-pulse{color:#3d464d;background-color:#3bafda}:host.avatar-color-company{color:#fff;background-color:#39d}:host.avatar-color-candidate{color:#fff;background-color:#4b7}:host.avatar-color-lead{color:#fff;background-color:#a69}:host.avatar-color-contact{color:#fff;background-color:#fa4}:host.avatar-color-clientcontact{color:#fff;background-color:#fa4}:host.avatar-color-opportunity{color:#fff;background-color:#625}:host.avatar-color-job{color:#fff;background-color:#b56}:host.avatar-color-joborder{color:#fff;background-color:#b56}:host.avatar-color-submission{color:#3d464d;background-color:#a9adbb}:host.avatar-color-sendout{color:#fff;background-color:#747884}:host.avatar-color-placement{color:#fff;background-color:#0b344f}:host.avatar-color-note{color:#fff;background-color:#747884}:host.avatar-color-contract{color:#fff;background-color:#454ea0}:host.avatar-color-task{color:#fff;background-color:#4f5361}:host.avatar-color-jobCode{color:#fff;background-color:#696d79}:host.avatar-color-earnCode{color:#fff;background-color:#696d79}:host.avatar-color-invoiceStatement{color:#fff;background-color:#696d79}:host.avatar-color-billableCharge{color:#fff;background-color:#696d79}:host.avatar-color-payableCharge{color:#fff;background-color:#696d79}:host.avatar-color-user{color:#fff;background-color:#696d79}:host.avatar-color-corporateUser{color:#fff;background-color:#696d79}:host.avatar-color-distributionList{color:#fff;background-color:#696d79}:host.avatar-color-credential{color:#fff;background-color:#696d79}:host.avatar-color-person{color:#fff;background-color:#696d79}:host(.menu-active){box-shadow:0 0 4px 1px var(--selection)}\n"] }]
        }], ctorParameters: () => [{ type: i1.DomSanitizer }], propDecorators: { source: [{
                type: Input
            }], label: [{
                type: Input
            }], theme: [{
                type: Input
            }], image: [{
                type: Input
            }], size: [{
                type: Input
            }], shape: [{
                type: Input
            }], color: [{
                type: Input
            }], hb_classBinding: [{
                type: HostBinding,
                args: ['class']
            }], background: [{
                type: HostBinding,
                args: ['style.backgroundImage']
            }] } });

// NG2
class NovoAvatarStackElement {
    constructor() {
        this.total = 0;
        this.showTotal = false;
        this.remainingCount = 0;
    }
    ngAfterViewInit() {
        // viewChildren is set
        if (this.total - this.viewChildren.length > 0) {
            this.remainingCount = this.total - this.viewChildren.length;
            this.showTotal = true;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoAvatarStackElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoAvatarStackElement, isStandalone: false, selector: "novo-avatar-stack", inputs: { total: "total" }, viewQueries: [{ propertyName: "viewChildren", predicate: NovoAvatarElement, descendants: true }], ngImport: i0, template: `
    <ng-content></ng-content>
    <novo-avatar *ngIf="showTotal" label="+5"></novo-avatar>
  `, isInline: true, styles: [":host{display:inline-flex;flex-flow:row nowrap}:host::ng-deep novo-avatar{transition:all .1s ease-in-out}:host::ng-deep novo-avatar img{border:1px solid #ffffff}:host::ng-deep novo-avatar+novo-avatar{margin-left:-15px}:host::ng-deep novo-avatar:first-child{z-index:5}:host::ng-deep novo-avatar:nth-child(2){z-index:4}:host::ng-deep novo-avatar:nth-child(3){z-index:3}:host::ng-deep novo-avatar:nth-child(4){z-index:2}:host::ng-deep novo-avatar:nth-child(5){z-index:1}:host::ng-deep novo-avatar:nth-child(n+6){z-index:0;margin-left:-15px;display:none;opacity:0}:host:hover::ng-deep novo-avatar{margin-left:0;margin-right:1px}:host:hover::ng-deep novo-avatar:nth-child(n+6){display:unset;opacity:1}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: NovoAvatarElement, selector: "novo-avatar", inputs: ["source", "label", "theme", "image", "size", "shape", "color"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoAvatarStackElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-avatar-stack', template: `
    <ng-content></ng-content>
    <novo-avatar *ngIf="showTotal" label="+5"></novo-avatar>
  `, standalone: false, styles: [":host{display:inline-flex;flex-flow:row nowrap}:host::ng-deep novo-avatar{transition:all .1s ease-in-out}:host::ng-deep novo-avatar img{border:1px solid #ffffff}:host::ng-deep novo-avatar+novo-avatar{margin-left:-15px}:host::ng-deep novo-avatar:first-child{z-index:5}:host::ng-deep novo-avatar:nth-child(2){z-index:4}:host::ng-deep novo-avatar:nth-child(3){z-index:3}:host::ng-deep novo-avatar:nth-child(4){z-index:2}:host::ng-deep novo-avatar:nth-child(5){z-index:1}:host::ng-deep novo-avatar:nth-child(n+6){z-index:0;margin-left:-15px;display:none;opacity:0}:host:hover::ng-deep novo-avatar{margin-left:0;margin-right:1px}:host:hover::ng-deep novo-avatar:nth-child(n+6){display:unset;opacity:1}\n"] }]
        }], propDecorators: { total: [{
                type: Input
            }], viewChildren: [{
                type: ViewChildren,
                args: [NovoAvatarElement]
            }] } });

// NG2
class NovoAvatarModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoAvatarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoAvatarModule, declarations: [NovoAvatarElement, NovoAvatarStackElement], imports: [CommonModule], exports: [NovoAvatarElement, NovoAvatarStackElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoAvatarModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoAvatarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NovoAvatarElement, NovoAvatarStackElement],
                    exports: [NovoAvatarElement, NovoAvatarStackElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoAvatarElement, NovoAvatarModule, NovoAvatarStackElement };
//# sourceMappingURL=novo-elements-elements-avatar.mjs.map
