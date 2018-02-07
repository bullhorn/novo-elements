import { Component, Input, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'header-spacer',
    template: `
        <ng-content></ng-content>
    `,
})
export class NovoHeaderSpacer { }

@Component({
    selector: 'utils',
    template: `
        <ng-content></ng-content>
    `,
})
export class NovoUtilsComponent { }

@Component({
    selector: 'util-action, novo-action',
    template: `
        <button theme="icon" [icon]="icon" [attr.inverse]="inverse" [disabled]="disabled"><ng-content></ng-content></button>
    `,
})
export class NovoUtilActionComponent {
    @Input() public icon: string;
    @Input() public inverse: boolean;
    @Input() public disabled: boolean;
}

@Component({
    selector: 'header[theme]',
    template: `
        <section>
            <div class="header-title">
                <ng-container *ngIf="title">
                    <i *ngIf="icon" class="header-icon" [ngClass]="iconClass"></i>
                    <div class="header-titles">
                        <h1>{{ title }}</h1>
                        <small *ngIf="subTitle">{{ subTitle }}</small>
                    </div>
                </ng-container>
                <ng-container *ngIf="!title">
                    <ng-content select="novo-icon, [novo-icon]"></ng-content>
                    <div class="header-titles">
                        <ng-content select="h1, h2, h3, h4, h5, h6, small, [novo-title], [novo-subtitle]"></ng-content>
                    </div>
                </ng-container>
            </div>
            <ng-content select="section"></ng-content>
            <span flex></span>
            <ng-content select="utils"></ng-content>
            <!--<div class="novo-actions"><ng-content select="novo-action,[novo-action]"></ng-content></div>-->
        </section>
        <ng-content></ng-content>
    `,
})
export class NovoHeaderComponent implements OnInit {
    @Input() public title: string;
    @Input() public subTitle: string;
    @HostBinding('class') public headerClass: string = 'novo-header';
    @HostBinding('attr.theme')
    @Input()
    public theme: string;
    @Input() public icon: string;
    @HostBinding('class.condensed') @Input() public condensed: boolean = false;

    public inverse: string = 'inverse';
    public iconClass: string;

    public ngOnInit(): void {
        this.iconClass = `bhi-${this.icon}`;
        this.inverse =
            this.theme === 'white' ||
                this.theme === 'off-white' ||
                this.theme === 'light'
                ? undefined
                : 'inverse';
    }
}
