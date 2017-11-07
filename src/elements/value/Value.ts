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
            <label>{{ meta.label }}</label>
            <div>
                <div class="value" *ngIf="isDefault">{{ data | render: meta }}</div>
                <i *ngIf="meta.icon" [class]="iconClass" (click)="onValueClick()"></i>
            </div>
        </ng-container>
    `
})
export class ValueElement implements OnInit {
    @Input() data: any; //use interface
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

    public get iconClass(): string {
        if (this.meta.icon) {
            return `bhi-${this.meta.icon}`;
        }
        return '';
    }

    public get isDefault(): boolean {
        return true;
    }

    onValueClick(): void {
        if (this.meta.onIconClick) {
            this.meta.onIconClick(this.data, this.meta);
        }
    }
}
