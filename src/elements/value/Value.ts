// NG2
import { Component, Input, OnInit, HostBinding } from '@angular/core';

export enum NOVO_VALUE_TYPE { DEFAULT, EMAIL, PHONE };
export enum NOVO_VALUE_THEME { DEFAULT, MOBILE };


@Component({
    selector: 'item-right',
    template: `
        <ng-content></ng-content>
    `
})
export class NovoValueItemRightElement {
}


@Component({
    selector: 'novo-value',
    template:`
        <ng-container>
            <div class="value" *ngIf="isDefault">{{ data | render: meta }}</div>
            <ng-content select="item-right"></ng-content>
        </ng-container>
    `
})
export class ValueElement implements OnInit {
    @Input() data: any; //user interface
    @Input() meta: any; //use interface
    @Input() theme: NOVO_VALUE_THEME = NOVO_VALUE_THEME.DEFAULT;

    type: NOVO_VALUE_TYPE;
    NOVO_VALUE_TYPE = NOVO_VALUE_TYPE;
    NOVO_VALUE_THEME = NOVO_VALUE_THEME;
    
    ngOnInit() {
    }

    @HostBinding('class.mobile')
    public get isMobile(): boolean {
        return this.theme === NOVO_VALUE_THEME.MOBILE;
    }

    public get isDefault(): boolean {
        return true;
    }
}
