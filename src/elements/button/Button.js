// NG2
import { Component } from '@angular/core';

@Component({
    selector: 'button[theme]',
    inputs: ['theme', 'icon', 'side', 'color'],
    host: {
        '[attr.theme]': 'theme',
        '[attr.color]': 'color',
        '[attr.icon]': 'icon'
    },
    template: `
        <!--Flex wrapper for cross-browser support-->
        <div [class]="flex">
            <!--Left Icon-->
            <i *ngIf="icon && iconClass && leftSide" [ngClass]="iconClass"></i>
            <!--Transcluded Content-->
            <ng-content></ng-content>
            <!--Right Icon-->
            <i *ngIf="icon && iconClass && rightSide" [ngClass]="iconClass"></i>
        </div>
    `
})
export class NovoButtonElement {
    leftSide:boolean = false;
    rightSide:boolean = true;
    icon:string

    ngOnChanges() {
        this.iconClass = this.icon ? `bhi-${this.icon}` : '';
        this.flex = this.theme ? 'flex-wrapper' : '';
        if (this.side !== null && this.theme !== 'primary') {
            this.leftSide = (this.side === 'left');
            this.rightSide = !this.leftSide;
        }
    }
}
