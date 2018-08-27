// NG2
import { Component, EventEmitter, Input, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// APP
import { NovoLabelService } from '../../services/novo-label-service';

@Component({
  selector: 'novo-card-actions',
  template: '<ng-content></ng-content>',
})
export class CardActionsElement {}

@Component({
  selector: 'novo-card',
  template: `
        <div class="novo-card" [attr.data-automation-id]="cardAutomationId" [ngClass]="{'no-padding': !padding}" [class.loading]="loading || config.loading">
            <!--Loading-->
            <div class="card-loading-container" *ngIf="loading || config.loading">
                <novo-loading theme="line" [attr.data-automation-id]="cardAutomationId + '-loading'"></novo-loading>
            </div>
            <!--Card Header-->
            <header>
                <div class="title">
                    <!--Grabber Icon-->
                    <span tooltip="{{ labels.move }}" tooltipPosition="bottom-right"><i *ngIf="move || config.move" class="bhi-move" [attr.data-automation-id]="cardAutomationId + '-move'"></i></span>
                    <!--Card Title-->
                    <h3 [attr.data-automation-id]="cardAutomationId + '-title'"><span [tooltip]="iconTooltip" tooltipPosition="right"><i *ngIf="icon" [ngClass]="iconClass"></i></span> {{title || config.title}}</h3>
                </div>
                <!--Card Actions-->
                <div class="actions" [attr.data-automation-id]="cardAutomationId + '-actions'">
                    <ng-content select="novo-card-actions"></ng-content>
                    <button theme="icon" icon="refresh"  (click)="toggleRefresh()" *ngIf="refresh || config.refresh" [attr.data-automation-id]="cardAutomationId + '-refresh'" tooltip="{{ labels.refresh }}" tooltipPosition="bottom-left"></button>
                    <button theme="icon" icon="close-o" (click)="toggleClose()" *ngIf="close || config.close" [attr.data-automation-id]="cardAutomationId + '-close'" tooltip="{{ labels.close }}" tooltipPosition="bottom-left"></button>
                </div>
            </header>
            <!--Card Main-->
            <main>
                <!--Content (transcluded)-->
                <ng-content *ngIf="!(loading || config.loading) && !(message || config.message)"></ng-content>
                <!--Error/Empty Message-->
                <p class="card-message" *ngIf="!(loading || config.loading) && (message || config.message)" [attr.data-automation-id]="cardAutomationId + '-message'"><i *ngIf="messageIconClass" [ngClass]="messageIconClass"></i> <span [innerHtml]="message || config.message"></span></p>
            </main>
            <!--Card Footer-->
            <ng-content *ngIf="!(loading || config.loading) && !(message || config.message)" select="footer"></ng-content>
        </div>
    `,
})
export class CardElement implements OnChanges, OnInit {
  @Input()
  padding: boolean = true;
  @Input()
  config: any = {};
  @Input()
  title: string;
  @Input()
  message: string;
  @Input()
  messageIcon: string;
  @Input()
  icon: string;
  @Input()
  iconTooltip: string;
  @Input()
  refresh: boolean;
  @Input()
  close: boolean;
  @Input()
  move: boolean;
  @Input()
  loading: boolean;

  @Output()
  onClose: EventEmitter<any> = new EventEmitter();
  @Output()
  onRefresh: EventEmitter<any> = new EventEmitter();

  cardAutomationId: string;
  labels: NovoLabelService;
  iconClass: string | null;
  messageIconClass: string;

  constructor(labels: NovoLabelService) {
    this.labels = labels;
  }

  ngOnInit() {
    this.config = this.config || {};
  }

  ngOnChanges(changes?: SimpleChanges) {
    this.config = this.config || {};
    this.cardAutomationId = `${(this.title || this.config.title || 'no-title').toLowerCase().replace(/\s/g, '-')}-card`;

    let newIcon: string = this.icon || this.config.icon;
    let newMessageIcon: string = this.messageIcon || this.config.messageIcon;
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
