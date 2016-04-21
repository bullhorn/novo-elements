import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

@Component({
    selector: 'button[theme]',
    inputs: ['theme', 'icon', 'side', 'color'],
    host: {
        '[attr.theme]': 'theme',
        '[attr.color]': 'color',
        '[attr.icon]': 'icon'
    },
    template: `
        <div [class]="flex">
          <i *ngIf="icon && iconClass && leftSide" [ngClass]="iconClass"></i>
          <ng-content></ng-content>
          <i *ngIf="icon && iconClass && (rightSide || !leftSide)" [ngClass]="iconClass"></i>
        </div>
    `,
    directives: [CORE_DIRECTIVES]
})
export class Button {
    ngOnInit() {
        this.iconClass = this.icon ? `bhi-${this.icon}` : '';
        this.flex = this.theme ? 'flex-wrapper' : '';
        if (this.side !== null) {
            this.leftSide = this.side === 'left' && this.theme !== 'primary';
            this.rightSide = this.side === 'right' || this.theme === 'primary';
        }
    }
}

export const NOVO_BUTTON_ELEMENTS = [Button];
