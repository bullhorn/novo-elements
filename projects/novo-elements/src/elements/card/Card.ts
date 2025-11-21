// NG2
import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { BooleanInput } from 'novo-elements/utils';

@Component({
  selector: 'novo-card-actions',
  template: '<ng-content></ng-content>',
  standalone: false
})
export class CardActionsElement {}

/**
 * Content of a card, needed as it's used as a selector in the API.
 */
@Component({
  selector: 'novo-card-content, [novo-card-content], [novoCardContent]',
  host: { class: 'novo-card-content', '[class.condensed]': 'condensed' },
  template: '<ng-content></ng-content>',
  styleUrls: ['./CardContent.scss'],
  standalone: false
})
export class CardContentElement {
  @Input() @BooleanInput() condensed: boolean = false;
}

/**
 * Content of a card, needed as it's used as a selector in the API.
 */
@Component({
  selector: 'novo-card-header, [novo-card-header], [novoCardHeader]',
  host: { class: 'novo-card-header' },
  template: `
    <ng-content select="novo-avatar, [novo-avatar], novo-icon"></ng-content>
    <div class="novo-card-header-text">
      <ng-content select="novo-title, [novo-title], novo-text, novo-label, novo-caption"></ng-content>
    </div>
    <ng-content></ng-content>
    <div class="novo-card-header-actions">
      <ng-content select="novo-action"></ng-content>
    </div>
  `,
  styleUrls: ['./CardHeader.scss'],
  standalone: false
})
export class CardHeaderElement {}

@Component({
    selector: 'novo-card-footer, [novo-card-footer], [novoCardFooter]',
    host: { class: 'novo-card-footer' },
    template: '<ng-content></ng-content>',
    styleUrls: ['./CardFooter.scss'],
    standalone: false
})
export class CardFooterElement {}

@Component({
  selector: 'novo-card',
  host: {
    class: 'novo-card',
    '[attr.data-automation-id]': 'cardAutomationId',
    '[class.loading]': 'loading || config.loading',
  },
  template: `
    <!--Loading-->
    @if (loading || config.loading) {
      <div class="card-loading-container">
        <novo-loading theme="line" [attr.data-automation-id]="cardAutomationId + '-loading'"></novo-loading>
      </div>
    }
    <!--Card Header-->
    @if (title || config.title) {
      <header>
        <div class="title">
          <!--Grabber Icon-->
          @if (move || config.move) {
            <novo-icon
              tooltip="{{ labels.move }}"
              tooltipPosition="bottom-right"
              [attr.data-automation-id]="cardAutomationId + '-move'">move</novo-icon>
            }
            <!--Card Title-->
            <h3 [attr.data-automation-id]="cardAutomationId + '-title'">
              <span [tooltip]="iconTooltip" tooltipPosition="right">
                @if (icon) {
                  <i [ngClass]="iconClass"></i>
                }
              </span>
              {{ title || config.title }}
            </h3>
          </div>
          <!--Card Actions-->
          <div class="actions" [attr.data-automation-id]="cardAutomationId + '-actions'">
            <ng-content select="novo-card-actions"></ng-content>
            @if (refresh || config.refresh) {
              <novo-button
                theme="icon"
                icon="refresh"
                (click)="toggleRefresh()"
                [attr.data-automation-id]="cardAutomationId + '-refresh'"
                tooltip="{{ labels.refresh }}"
                tooltipPosition="bottom-left"
              ></novo-button>
            }
            @if (close || config.close) {
              <novo-button
                theme="icon"
                icon="close-o"
                (click)="toggleClose()"
                [attr.data-automation-id]="cardAutomationId + '-close'"
                tooltip="{{ labels.close }}"
                tooltipPosition="bottom-left"
              ></novo-button>
            }
          </div>
        </header>
      }
      <!--Content (transcluded)-->
      @if (!(loading || config.loading) && !(message || config.message)) {
        <ng-content></ng-content>
      }
      <!--Error/Empty Message-->
      @if (!(loading || config.loading) && (message || config.message)) {
        <p class="card-message"
          [attr.data-automation-id]="cardAutomationId + '-message'">
          @if (messageIconClass) {
            <i [ngClass]="messageIconClass"></i>
          }
          <span [innerHtml]="message || config.message"></span>
        </p>
      }
      <!--Card Footer-->
      @if (!(loading || config.loading) && !(message || config.message)) {
        <ng-content select="footer,novo-card-footer,[novo-card-footer],[novoCardFooter]"></ng-content>
      }
  `,
  styleUrls: ['./Card.scss'],
  standalone: false
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

  @Input()
  @BooleanInput()
  @HostBinding('class.novo-card-inline')
  inline: boolean;

  @Input()
  inset: string = 'none';
  @HostBinding('class')
  get hbInset() {
    return `novo-card-inset-${this.inset}`;
  }

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();
  @Output()
  onRefresh: EventEmitter<void> = new EventEmitter();

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
    this.cardAutomationId = `${(this.title || this.config.title || 'no-title').trim().toLowerCase().replace(/\s/g, '-')}-card`;

    const newIcon: string = this.icon || this.config.icon;
    const newMessageIcon: string = this.messageIcon || this.config.messageIcon;
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
