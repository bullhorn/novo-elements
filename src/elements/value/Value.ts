// NG2
import { Component, Input, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
//APP
import { Helpers } from '../../utils/Helpers';
export enum NOVO_VALUE_TYPE { DEFAULT, EMAIL, PHONE, ENTITY_LIST, LINK, INTERNAL_LINK };
export enum NOVO_VALUE_THEME { DEFAULT, MOBILE };


@Component({
    selector: 'novo-value-phone',
    template: `
        <div class="value-outer">
            <label>{{ meta.label }}</label>
            <a *ngIf="!isMobile" class="value" href="tel:{{data}}" target="_parent">
                {{ data }}
            </a>
            <div *ngIf="isMobile" class="value">{{ data }}</div>
        </div>
        <div class="actions" *ngIf="data !== ''">
            <a href="tel:{{data}}"><i class="bhi-phone"></i></a>
            <a href="sms:{{data}}"><i class="bhi-sms"></i></a>
        </div>
    `
})
export class NovoValuePhone {
    @Input() data: any; //TODO use interface
    @Input() meta: any; //use interface
    @Input() theme: NOVO_VALUE_THEME;

    @HostBinding('class.mobile')
    public get isMobile(): boolean {
        return this.theme === NOVO_VALUE_THEME.MOBILE;
    }
}

@Component({
    selector: 'novo-value-email',
    template: `
        <div class="value-outer">
            <label>{{ meta.label }}</label>
            <a *ngIf="!isMobile"  class="value" (click)="openEmail(data)"> {{ email }}</a>
            <div *ngIf="isMobile" class="value">{{ data }}</div>
        </div>
        <i class="bhi-email actions" *ngIf="data !== ''" (click)="openEmail(data)"></i>
    `
})
export class NovoValueEmail {
    @Input() data: any; //use interface
    @Input() meta: any; //use interface
    @Input() theme: NOVO_VALUE_THEME;
    @HostBinding('class.mobile')
    public get isMobile(): boolean {
        return this.theme === NOVO_VALUE_THEME.MOBILE;
    }

    openEmail(data: any): void {
        if (this.meta && this.meta.openEmail && typeof this.meta.openEmail === 'function') {
            this.meta.openEmail(data);
        } else {
            let newTab: any = window.open('', '_blank', '', true);
            if (newTab) {
                newTab.location.replace(`mailto:${encodeURIComponent(data.email)}`);
                // Self close for desktop clients
                setTimeout(() => {
                    try {
                        if (newTab.location.href === 'about:blank') {
                            newTab.close();
                        }
                    } catch (error) {
                        // No op, browser handled the mailto link
                    }
                });
            }
        }
        if (Helpers.isEmpty(this.theme)) {
             this.theme = NOVO_VALUE_THEME.DEFAULT;
        }
    }
}


@Component({
    selector: 'novo-value',
    template:`
        <ng-container [ngSwitch]="type">
            <div class="value-outer" *ngIf="showLabel">
                <label>{{ meta.label }}</label>
                <a *ngSwitchCase="NOVO_VALUE_TYPE.INTERNAL_LINK" class="value" (click)="openLink()" [innerHTML]="data | render : meta"></a>
                <a *ngSwitchCase="NOVO_VALUE_TYPE.LINK" class="value" [href]="url" target="_blank" [innerHTML]="data | render : meta"></a>
            </div>

            <novo-value-phone *ngSwitchCase="NOVO_VALUE_TYPE.PHONE" [data]="data" [theme]="theme" [meta]="meta"></novo-value-phone>
            <novo-value-email *ngSwitchCase="NOVO_VALUE_TYPE.EMAIL" [data]="data" [theme]="theme" [meta]="meta"></novo-value-email>

            <div *ngSwitchDefault class="value-outer">
                <label>{{ meta.label }}</label>
                <div *ngIf="isDefault" class="value" [innerHTML]="data | render : meta"></div>
            </div>
            <i *ngIf="showIcon" [class]="iconClass" (click)="onValueClick()"></i>
        </ng-container>
    `
})
export class NovoValueElement implements OnInit, OnChanges {
    @Input() data: any; // TODO use interface
    @Input() meta: any; // TODO use interface
    @Input() theme: NOVO_VALUE_THEME = NOVO_VALUE_THEME.DEFAULT;

    type: NOVO_VALUE_TYPE;
    NOVO_VALUE_TYPE = NOVO_VALUE_TYPE;
    NOVO_VALUE_THEME = NOVO_VALUE_THEME;
    url: string;

    ngOnInit() {
        if (Helpers.isEmpty(this.meta)) {
            this.meta = {
                label: ''
            };
        }
    }

    @HostBinding('class.mobile')
    public get isMobile(): boolean {
        return this.theme === NOVO_VALUE_THEME.MOBILE;
    }

    public get iconClass(): string {
        if (this.meta && this.meta.icon) {
            return `bhi-${this.meta.icon} actions`;
        }
        return '';
    }

    public get isDefault(): boolean {
        return true;
    }

    public get showLabel(): boolean {
        return this.type === NOVO_VALUE_TYPE.INTERNAL_LINK || this.type === NOVO_VALUE_TYPE.LINK;
    }

    public get showIcon(): boolean {
        return this.meta && this.meta.icon && !Helpers.isEmpty(this.data);
    }

    onValueClick(): void {
        if (this.meta && this.meta.onIconClick && typeof this.meta.onIconClick === 'function' ) {
            this.meta.onIconClick(this.data, this.meta);
        }
    }
    openLink(): void {
        if (this.meta && this.meta.openLink && typeof this.meta.openLink === 'function') {
            this.meta.openLink(this.data, this.meta);
        }
    }

    ngOnChanges(changes?: SimpleChanges): any {
        if (this.meta && this.isEmailField(this.meta)) {
            if (!this.data || typeof this.data === 'string') {
                this.data = {
                    email: this.data,
                };
            }
            this.type = NOVO_VALUE_TYPE.EMAIL;
        } else if (this.meta && this.isPhoneField(this.meta)) {
            this.type = NOVO_VALUE_TYPE.PHONE;
        } else if (this.meta && this.isLinkField(this.meta, this.data)) {
            this.type = NOVO_VALUE_TYPE.LINK;
            // Make sure the value has a protocol, otherwise the URL will be relative
            let hasProtocol: any = new RegExp('^(http|https)://', 'i');
            if (!hasProtocol.test(this.data)) {
                this.url = `http://${this.data}`;
            } else {
                this.url = this.data;
            }
        } else if (this.meta && this.meta.associatedEntity) {
            switch (this.meta.associatedEntity.entity) {
                case 'ClientCorporation':
                case 'ClientContact':
                case 'Candidate':
                case 'JobOrder':
                case 'Placement':
                    this.type = NOVO_VALUE_TYPE.INTERNAL_LINK;
                    break;
                default:
                    break;
            }
        }
    }

    isEmailField(field: { name? : string, type?: NOVO_VALUE_TYPE }): boolean {
        const emailFields: any = ['email', 'email2', 'email3'];
        return emailFields.indexOf(field.name) > -1 || field.type === NOVO_VALUE_TYPE.EMAIL;
    }

    isPhoneField(field: { name? : string, type?: NOVO_VALUE_TYPE }): boolean {
        let phoneFields: any = ['phone', 'phone2', 'phone3', 'pager', 'mobile', 'workPhone', 'billingPhone'];
        return phoneFields.indexOf(field.name) > -1 || field.type === NOVO_VALUE_TYPE.PHONE;
    }

    isLinkField(field: { name? : string, type?: NOVO_VALUE_TYPE }, data: any): boolean {
        let linkFields: any = ['companyURL', 'clientCorporationCompanyURL'];
        let regex: any = new RegExp('^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$', 'gi');
        let isURL: any = Helpers.isString(data) && regex.exec(data.trim());
        return (linkFields.indexOf(field.name) > -1) || !!isURL || field.type === NOVO_VALUE_TYPE.LINK;
    }
}
