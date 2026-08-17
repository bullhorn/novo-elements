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
        if (!this.image && !this.source.profileImage) {
            return;
        }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAvatarElement, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoAvatarElement, isStandalone: false, selector: "novo-avatar", inputs: { source: "source", label: "label", theme: "theme", image: "image", size: "size", shape: "shape", color: "color" }, host: { properties: { "class": "this.hb_classBinding", "style.backgroundImage": "this.background" } }, ngImport: i0, template: '<img *ngIf="src" [src]="src"/>', isInline: true, styles: [":host{display:inline-block;width:30px;height:30px;background-size:cover;background-position:center;overflow:hidden;position:relative;background-color:var(--background-muted)}:host img{width:inherit;height:inherit;border-radius:inherit}:host.avatar-size-small{width:20px;height:20px}:host.avatar-size-large{width:40px;height:40px}:host.avatar-shape-round{border-radius:2em}:host.avatar-shape-square{border-radius:var(--border-radius-round)}:host.avatar-color-border-default{background-color:var(--color-border-default)}:host.avatar-color-black{color:var(--color-contrast-black);background-color:var(--color-black)}:host.avatar-color-white{color:var(--color-contrast-white);background-color:var(--color-white)}:host.avatar-color-gray{color:var(--color-contrast-gray);background-color:var(--color-gray)}:host.avatar-color-grey{color:var(--color-contrast-grey);background-color:var(--color-grey)}:host.avatar-color-offWhite{color:var(--color-contrast-off-white);background-color:var(--color-offWhite)}:host.avatar-color-bright{color:var(--color-contrast-bright);background-color:var(--color-bright)}:host.avatar-color-light{color:var(--color-contrast-light);background-color:var(--color-light)}:host.avatar-color-neutral{color:var(--color-contrast-neutral);background-color:var(--color-neutral)}:host.avatar-color-dark{color:var(--color-contrast-dark);background-color:var(--color-dark)}:host.avatar-color-orange{color:var(--color-contrast-orange);background-color:var(--color-orange)}:host.avatar-color-navigation{color:var(--color-contrast-navigation);background-color:var(--color-navigation)}:host.avatar-color-skyBlue{color:var(--color-contrast-sky-blue);background-color:var(--color-skyBlue)}:host.avatar-color-steel{color:var(--color-contrast-steel);background-color:var(--color-steel)}:host.avatar-color-metal{color:var(--color-contrast-metal);background-color:var(--color-metal)}:host.avatar-color-sand{color:var(--color-contrast-sand);background-color:var(--color-sand)}:host.avatar-color-silver{color:var(--color-contrast-silver);background-color:var(--color-silver)}:host.avatar-color-stone{color:var(--color-contrast-stone);background-color:var(--color-stone)}:host.avatar-color-ash{color:var(--color-contrast-ash);background-color:var(--color-ash)}:host.avatar-color-anonymous{color:var(--color-contrast-anonymous);background-color:var(--color-anonymous)}:host.avatar-color-slate{color:var(--color-contrast-slate);background-color:var(--color-slate)}:host.avatar-color-onyx{color:var(--color-contrast-onyx);background-color:var(--color-onyx)}:host.avatar-color-charcoal{color:var(--color-contrast-charcoal);background-color:var(--color-charcoal)}:host.avatar-color-moonlight{color:var(--color-contrast-moonlight);background-color:var(--color-moonlight)}:host.avatar-color-midnight{color:var(--color-contrast-midnight);background-color:var(--color-midnight)}:host.avatar-color-darkness{color:var(--color-contrast-darkness);background-color:var(--color-darkness)}:host.avatar-color-navy{color:var(--color-contrast-navy);background-color:var(--color-navy)}:host.avatar-color-aqua{color:var(--color-contrast-aqua);background-color:var(--color-aqua)}:host.avatar-color-ocean{color:var(--color-contrast-ocean);background-color:var(--color-ocean)}:host.avatar-color-mint{color:var(--color-contrast-mint);background-color:var(--color-mint)}:host.avatar-color-grass{color:var(--color-contrast-grass);background-color:var(--color-grass)}:host.avatar-color-sunflower{color:var(--color-contrast-sunflower);background-color:var(--color-sunflower)}:host.avatar-color-bittersweet{color:var(--color-contrast-bittersweet);background-color:var(--color-bittersweet)}:host.avatar-color-grapefruit{color:var(--color-contrast-grapefruit);background-color:var(--color-grapefruit)}:host.avatar-color-carnation{color:var(--color-contrast-carnation);background-color:var(--color-carnation)}:host.avatar-color-lavender{color:var(--color-contrast-lavender);background-color:var(--color-lavender)}:host.avatar-color-mountain{color:var(--color-contrast-mountain);background-color:var(--color-mountain)}:host.avatar-color-info{color:var(--color-contrast-info);background-color:var(--color-info)}:host.avatar-color-positive{color:var(--color-contrast-positive);background-color:var(--color-positive)}:host.avatar-color-success{color:var(--color-contrast-success);background-color:var(--color-success)}:host.avatar-color-negative{color:var(--color-contrast-negative);background-color:var(--color-negative)}:host.avatar-color-danger{color:var(--color-contrast-danger);background-color:var(--color-danger)}:host.avatar-color-error{color:var(--color-contrast-error);background-color:var(--color-error)}:host.avatar-color-warning{color:var(--color-contrast-warning);background-color:var(--color-warning)}:host.avatar-color-empty{color:var(--color-contrast-empty);background-color:var(--color-empty)}:host.avatar-color-disabled{color:var(--color-contrast-disabled);background-color:var(--color-disabled)}:host.avatar-color-background{color:var(--color-contrast-background);background-color:var(--color-background)}:host.avatar-color-backgroundDark{color:var(--color-contrast-background-dark);background-color:var(--color-backgroundDark)}:host.avatar-color-border{color:var(--color-contrast-border);background-color:var(--color-border)}:host.avatar-color-border2{color:var(--color-contrast-border2);background-color:var(--color-border2)}:host.avatar-color-text{color:var(--color-contrast-text);background-color:var(--color-text)}:host.avatar-color-presentation{color:var(--color-contrast-presentation);background-color:var(--color-presentation)}:host.avatar-color-bullhorn{color:var(--color-contrast-bullhorn);background-color:var(--color-bullhorn)}:host.avatar-color-pulse{color:var(--color-contrast-pulse);background-color:var(--color-pulse)}:host.avatar-color-fastFind{color:var(--color-contrast-fast-find);background-color:var(--color-fastFind)}:host.avatar-color-toast{color:var(--color-contrast-toast);background-color:var(--color-toast)}:host.avatar-color-company{color:var(--color-contrast-company);background-color:var(--color-company)}:host.avatar-color-candidate{color:var(--color-contrast-candidate);background-color:var(--color-candidate)}:host.avatar-color-lead{color:var(--color-contrast-lead);background-color:var(--color-lead)}:host.avatar-color-contact{color:var(--color-contrast-contact);background-color:var(--color-contact)}:host.avatar-color-clientcontact{color:var(--color-contrast-clientcontact);background-color:var(--color-clientcontact)}:host.avatar-color-opportunity{color:var(--color-contrast-opportunity);background-color:var(--color-opportunity)}:host.avatar-color-job{color:var(--color-contrast-job);background-color:var(--color-job)}:host.avatar-color-joborder{color:var(--color-contrast-joborder);background-color:var(--color-joborder)}:host.avatar-color-submission{color:var(--color-contrast-submission);background-color:var(--color-submission)}:host.avatar-color-sendout{color:var(--color-contrast-sendout);background-color:var(--color-sendout)}:host.avatar-color-placement{color:var(--color-contrast-placement);background-color:var(--color-placement)}:host.avatar-color-note{color:var(--color-contrast-note);background-color:var(--color-note)}:host.avatar-color-contract{color:var(--color-contrast-contract);background-color:var(--color-contract)}:host.avatar-color-task{color:var(--color-contrast-task);background-color:var(--color-task)}:host.avatar-color-jobCode{color:var(--color-contrast-job-code);background-color:var(--color-jobCode)}:host.avatar-color-earnCode{color:var(--color-contrast-earn-code);background-color:var(--color-earnCode)}:host.avatar-color-invoiceStatement{color:var(--color-contrast-invoice-statement);background-color:var(--color-invoiceStatement)}:host.avatar-color-billableCharge{color:var(--color-contrast-billable-charge);background-color:var(--color-billableCharge)}:host.avatar-color-payableCharge{color:var(--color-contrast-payable-charge);background-color:var(--color-payableCharge)}:host.avatar-color-user{color:var(--color-contrast-user);background-color:var(--color-user)}:host.avatar-color-corporateUser{color:var(--color-contrast-corporate-user);background-color:var(--color-corporateUser)}:host.avatar-color-distributionList{color:var(--color-contrast-distribution-list);background-color:var(--color-distributionList)}:host.avatar-color-credential{color:var(--color-contrast-credential);background-color:var(--color-credential)}:host.avatar-color-person{color:var(--color-contrast-person);background-color:var(--color-person)}:host(.menu-active){box-shadow:0 0 4px 1px var(--selection)}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAvatarElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-avatar', template: '<img *ngIf="src" [src]="src"/>', standalone: false, styles: [":host{display:inline-block;width:30px;height:30px;background-size:cover;background-position:center;overflow:hidden;position:relative;background-color:var(--background-muted)}:host img{width:inherit;height:inherit;border-radius:inherit}:host.avatar-size-small{width:20px;height:20px}:host.avatar-size-large{width:40px;height:40px}:host.avatar-shape-round{border-radius:2em}:host.avatar-shape-square{border-radius:var(--border-radius-round)}:host.avatar-color-border-default{background-color:var(--color-border-default)}:host.avatar-color-black{color:var(--color-contrast-black);background-color:var(--color-black)}:host.avatar-color-white{color:var(--color-contrast-white);background-color:var(--color-white)}:host.avatar-color-gray{color:var(--color-contrast-gray);background-color:var(--color-gray)}:host.avatar-color-grey{color:var(--color-contrast-grey);background-color:var(--color-grey)}:host.avatar-color-offWhite{color:var(--color-contrast-off-white);background-color:var(--color-offWhite)}:host.avatar-color-bright{color:var(--color-contrast-bright);background-color:var(--color-bright)}:host.avatar-color-light{color:var(--color-contrast-light);background-color:var(--color-light)}:host.avatar-color-neutral{color:var(--color-contrast-neutral);background-color:var(--color-neutral)}:host.avatar-color-dark{color:var(--color-contrast-dark);background-color:var(--color-dark)}:host.avatar-color-orange{color:var(--color-contrast-orange);background-color:var(--color-orange)}:host.avatar-color-navigation{color:var(--color-contrast-navigation);background-color:var(--color-navigation)}:host.avatar-color-skyBlue{color:var(--color-contrast-sky-blue);background-color:var(--color-skyBlue)}:host.avatar-color-steel{color:var(--color-contrast-steel);background-color:var(--color-steel)}:host.avatar-color-metal{color:var(--color-contrast-metal);background-color:var(--color-metal)}:host.avatar-color-sand{color:var(--color-contrast-sand);background-color:var(--color-sand)}:host.avatar-color-silver{color:var(--color-contrast-silver);background-color:var(--color-silver)}:host.avatar-color-stone{color:var(--color-contrast-stone);background-color:var(--color-stone)}:host.avatar-color-ash{color:var(--color-contrast-ash);background-color:var(--color-ash)}:host.avatar-color-anonymous{color:var(--color-contrast-anonymous);background-color:var(--color-anonymous)}:host.avatar-color-slate{color:var(--color-contrast-slate);background-color:var(--color-slate)}:host.avatar-color-onyx{color:var(--color-contrast-onyx);background-color:var(--color-onyx)}:host.avatar-color-charcoal{color:var(--color-contrast-charcoal);background-color:var(--color-charcoal)}:host.avatar-color-moonlight{color:var(--color-contrast-moonlight);background-color:var(--color-moonlight)}:host.avatar-color-midnight{color:var(--color-contrast-midnight);background-color:var(--color-midnight)}:host.avatar-color-darkness{color:var(--color-contrast-darkness);background-color:var(--color-darkness)}:host.avatar-color-navy{color:var(--color-contrast-navy);background-color:var(--color-navy)}:host.avatar-color-aqua{color:var(--color-contrast-aqua);background-color:var(--color-aqua)}:host.avatar-color-ocean{color:var(--color-contrast-ocean);background-color:var(--color-ocean)}:host.avatar-color-mint{color:var(--color-contrast-mint);background-color:var(--color-mint)}:host.avatar-color-grass{color:var(--color-contrast-grass);background-color:var(--color-grass)}:host.avatar-color-sunflower{color:var(--color-contrast-sunflower);background-color:var(--color-sunflower)}:host.avatar-color-bittersweet{color:var(--color-contrast-bittersweet);background-color:var(--color-bittersweet)}:host.avatar-color-grapefruit{color:var(--color-contrast-grapefruit);background-color:var(--color-grapefruit)}:host.avatar-color-carnation{color:var(--color-contrast-carnation);background-color:var(--color-carnation)}:host.avatar-color-lavender{color:var(--color-contrast-lavender);background-color:var(--color-lavender)}:host.avatar-color-mountain{color:var(--color-contrast-mountain);background-color:var(--color-mountain)}:host.avatar-color-info{color:var(--color-contrast-info);background-color:var(--color-info)}:host.avatar-color-positive{color:var(--color-contrast-positive);background-color:var(--color-positive)}:host.avatar-color-success{color:var(--color-contrast-success);background-color:var(--color-success)}:host.avatar-color-negative{color:var(--color-contrast-negative);background-color:var(--color-negative)}:host.avatar-color-danger{color:var(--color-contrast-danger);background-color:var(--color-danger)}:host.avatar-color-error{color:var(--color-contrast-error);background-color:var(--color-error)}:host.avatar-color-warning{color:var(--color-contrast-warning);background-color:var(--color-warning)}:host.avatar-color-empty{color:var(--color-contrast-empty);background-color:var(--color-empty)}:host.avatar-color-disabled{color:var(--color-contrast-disabled);background-color:var(--color-disabled)}:host.avatar-color-background{color:var(--color-contrast-background);background-color:var(--color-background)}:host.avatar-color-backgroundDark{color:var(--color-contrast-background-dark);background-color:var(--color-backgroundDark)}:host.avatar-color-border{color:var(--color-contrast-border);background-color:var(--color-border)}:host.avatar-color-border2{color:var(--color-contrast-border2);background-color:var(--color-border2)}:host.avatar-color-text{color:var(--color-contrast-text);background-color:var(--color-text)}:host.avatar-color-presentation{color:var(--color-contrast-presentation);background-color:var(--color-presentation)}:host.avatar-color-bullhorn{color:var(--color-contrast-bullhorn);background-color:var(--color-bullhorn)}:host.avatar-color-pulse{color:var(--color-contrast-pulse);background-color:var(--color-pulse)}:host.avatar-color-fastFind{color:var(--color-contrast-fast-find);background-color:var(--color-fastFind)}:host.avatar-color-toast{color:var(--color-contrast-toast);background-color:var(--color-toast)}:host.avatar-color-company{color:var(--color-contrast-company);background-color:var(--color-company)}:host.avatar-color-candidate{color:var(--color-contrast-candidate);background-color:var(--color-candidate)}:host.avatar-color-lead{color:var(--color-contrast-lead);background-color:var(--color-lead)}:host.avatar-color-contact{color:var(--color-contrast-contact);background-color:var(--color-contact)}:host.avatar-color-clientcontact{color:var(--color-contrast-clientcontact);background-color:var(--color-clientcontact)}:host.avatar-color-opportunity{color:var(--color-contrast-opportunity);background-color:var(--color-opportunity)}:host.avatar-color-job{color:var(--color-contrast-job);background-color:var(--color-job)}:host.avatar-color-joborder{color:var(--color-contrast-joborder);background-color:var(--color-joborder)}:host.avatar-color-submission{color:var(--color-contrast-submission);background-color:var(--color-submission)}:host.avatar-color-sendout{color:var(--color-contrast-sendout);background-color:var(--color-sendout)}:host.avatar-color-placement{color:var(--color-contrast-placement);background-color:var(--color-placement)}:host.avatar-color-note{color:var(--color-contrast-note);background-color:var(--color-note)}:host.avatar-color-contract{color:var(--color-contrast-contract);background-color:var(--color-contract)}:host.avatar-color-task{color:var(--color-contrast-task);background-color:var(--color-task)}:host.avatar-color-jobCode{color:var(--color-contrast-job-code);background-color:var(--color-jobCode)}:host.avatar-color-earnCode{color:var(--color-contrast-earn-code);background-color:var(--color-earnCode)}:host.avatar-color-invoiceStatement{color:var(--color-contrast-invoice-statement);background-color:var(--color-invoiceStatement)}:host.avatar-color-billableCharge{color:var(--color-contrast-billable-charge);background-color:var(--color-billableCharge)}:host.avatar-color-payableCharge{color:var(--color-contrast-payable-charge);background-color:var(--color-payableCharge)}:host.avatar-color-user{color:var(--color-contrast-user);background-color:var(--color-user)}:host.avatar-color-corporateUser{color:var(--color-contrast-corporate-user);background-color:var(--color-corporateUser)}:host.avatar-color-distributionList{color:var(--color-contrast-distribution-list);background-color:var(--color-distributionList)}:host.avatar-color-credential{color:var(--color-contrast-credential);background-color:var(--color-credential)}:host.avatar-color-person{color:var(--color-contrast-person);background-color:var(--color-person)}:host(.menu-active){box-shadow:0 0 4px 1px var(--selection)}\n"] }]
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAvatarStackElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoAvatarStackElement, isStandalone: false, selector: "novo-avatar-stack", inputs: { total: "total" }, viewQueries: [{ propertyName: "viewChildren", predicate: NovoAvatarElement, descendants: true }], ngImport: i0, template: `
    <ng-content></ng-content>
    <novo-avatar *ngIf="showTotal" label="+5"></novo-avatar>
  `, isInline: true, styles: [":host{display:inline-flex;flex-flow:row nowrap}:host::ng-deep novo-avatar{transition:all .1s ease-in-out}:host::ng-deep novo-avatar img{border:1px solid #fff}:host::ng-deep novo-avatar+novo-avatar{margin-left:-15px}:host::ng-deep novo-avatar:first-child{z-index:5}:host::ng-deep novo-avatar:nth-child(2){z-index:4}:host::ng-deep novo-avatar:nth-child(3){z-index:3}:host::ng-deep novo-avatar:nth-child(4){z-index:2}:host::ng-deep novo-avatar:nth-child(5){z-index:1}:host::ng-deep novo-avatar:nth-child(n+6){z-index:0;margin-left:-15px;display:none;opacity:0}:host:hover::ng-deep novo-avatar{margin-left:0;margin-right:1px}:host:hover::ng-deep novo-avatar:nth-child(n+6){display:unset;opacity:1}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: NovoAvatarElement, selector: "novo-avatar", inputs: ["source", "label", "theme", "image", "size", "shape", "color"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAvatarStackElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-avatar-stack', template: `
    <ng-content></ng-content>
    <novo-avatar *ngIf="showTotal" label="+5"></novo-avatar>
  `, standalone: false, styles: [":host{display:inline-flex;flex-flow:row nowrap}:host::ng-deep novo-avatar{transition:all .1s ease-in-out}:host::ng-deep novo-avatar img{border:1px solid #fff}:host::ng-deep novo-avatar+novo-avatar{margin-left:-15px}:host::ng-deep novo-avatar:first-child{z-index:5}:host::ng-deep novo-avatar:nth-child(2){z-index:4}:host::ng-deep novo-avatar:nth-child(3){z-index:3}:host::ng-deep novo-avatar:nth-child(4){z-index:2}:host::ng-deep novo-avatar:nth-child(5){z-index:1}:host::ng-deep novo-avatar:nth-child(n+6){z-index:0;margin-left:-15px;display:none;opacity:0}:host:hover::ng-deep novo-avatar{margin-left:0;margin-right:1px}:host:hover::ng-deep novo-avatar:nth-child(n+6){display:unset;opacity:1}\n"] }]
        }], propDecorators: { total: [{
                type: Input
            }], viewChildren: [{
                type: ViewChildren,
                args: [NovoAvatarElement]
            }] } });

// NG2
class NovoAvatarModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAvatarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: NovoAvatarModule, declarations: [NovoAvatarElement, NovoAvatarStackElement], imports: [CommonModule], exports: [NovoAvatarElement, NovoAvatarStackElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAvatarModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoAvatarModule, decorators: [{
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
