// NG2
import { Component, EventEmitter } from '@angular/core';

@Component({
    selector: 'novo-card',
    inputs: [
        'loading',
        'title',
        'icon',
        'config',
        'message',
        'messageIcon',
        'refresh',
        'close',
        'move',
        'padding'
    ],
    outputs: [
        'onClose',
        'onRefresh'
    ],
    template: `
        <div class="novo-card" [attr.data-automation-id]="cardAutomationId" [ngClass]="{'no-padding': !padding}">
            <!--Card Header-->
            <header>
                <div class="title">
                    <!--Grabber Icon-->
                    <i *ngIf="move || config.move" class="bhi-move" [attr.data-automation-id]="cardAutomationId + '-move'"></i>
                    <!--Card Title-->
                    <h3 [attr.data-automation-id]="cardAutomationId + '-title'"><i *ngIf="icon" [ngClass]="iconClass"></i> {{title || config.title}}</h3>
                </div>
                <!--Card Actions-->
                <div class="actions" [attr.data-automation-id]="cardAutomationId + '-actions'">
                    <button theme="icon" icon="refresh-o"  (click)="toggleRefresh()" *ngIf="refresh || config.refresh" [attr.data-automation-id]="cardAutomationId + '-refresh'"></button>
                    <button theme="icon" icon="close-o" (click)="toggleClose()" *ngIf="close || config.close" [attr.data-automation-id]="cardAutomationId + '-close'"></button>
                </div>
            </header>
            <!--Card Main-->
            <main>
                <!--Content (transcluded)-->
                <ng-content *ngIf="!(loading || config.loading) && !(message || config.message)"></ng-content>
                <!--Error/Empty Message-->
                <p class="card-message" *ngIf="!(loading || config.loading) && (message || config.message)" [attr.data-automation-id]="cardAutomationId + '-message'"><i *ngIf="messageIconClass" [ngClass]="messageIconClass"></i> <span [innerHtml]="message || config.message"></span></p>
                <!--Loading-->
                <novo-loading *ngIf="loading || config.loading" theme="line"  [attr.data-automation-id]="cardAutomationId + '-loading'"></novo-loading>
            </main>
            <!--Card Footer-->
            <ng-content *ngIf="!(loading || config.loading) && !(message || config.message)" select="footer"></ng-content>
        </div>
    `
})
export class CardElement {
    config:any = {};
    onClose:EventEmitter = new EventEmitter();
    onRefresh:EventEmitter = new EventEmitter();
    padding:boolean = true;

    constructor() {
    }

    ngOnInit() {
        this.config = this.config || {};
    }

    ngOnChanges() {
        this.config = this.config || {};
        this.cardAutomationId = `${(this.title || this.config.title || 'no-title').toLowerCase().replace(/\s/g, '-')}-card`;

        let newIcon = this.icon || this.config.icon;
        let newMessageIcon = this.messageIcon || this.config.messageIcon;
        this.iconClass = newIcon ? `bhi-${newIcon}` : null;
        this.messageIconClass = newMessageIcon ? `bhi-${newMessageIcon}` : null;
    }

    toggleClose() {
        if (!this.config.onClose) {
            this.onClose.next();
        } else {
            this.config.onClose();
        }
    }

    toggleRefresh() {
        if (!this.config.onRefresh) {
            this.onRefresh.next();
        } else {
            this.config.onRefresh();
        }
    }
}
