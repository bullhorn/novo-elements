// NG2
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'novo-toast',
  host: {
    '[class]': 'alertTheme',
    '[class.show]': 'show',
    '[class.animate]': 'animate',
    '[class.embedded]': 'embedded',
    '(click)': '!isCloseable && clickHandler($event)',
  },
  template: `
        <div class="toast-icon">
            <i [ngClass]="iconClass"></i>
        </div>
        <div class="toast-content">
            <h5 *ngIf="title">{{title}}</h5>
            <p *ngIf="_message" [class.message-only]="!title" [innerHtml]="_message"></p>
            <div *ngIf="link" class="link-generated">
                <input type="text" [value]="link" onfocus="this.select();"/>
            </div>
            <div class="dialogue">
                <ng-content></ng-content>
            </div>
        </div>
        <div class="close-icon" *ngIf="isCloseable" (click)="close($event)">
            <i class="bhi-times"></i>
        </div>
    `,
})
export class NovoToastElement implements OnInit, OnChanges {
  @Input() theme: string = 'danger';
  @Input() icon: string = 'caution';
  @Input() title: string;
  @Input() hasDialogue: boolean = false;
  @Input() link: string;
  @Input() isCloseable: boolean = false;
  @Input()
  set message(m: string) {
    this._message = this.sanitizer.bypassSecurityTrustHtml(m);
  }
  @Output() closed: EventEmitter<any> = new EventEmitter();

  _message: SafeHtml;
  show: boolean = false;
  animate: boolean = false;
  parent: any = null;
  launched: boolean = false;
  position: any;
  time: any;
  iconClass: string;
  alertTheme: string;
  embedded: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (!this.launched) {
      // clear position and time
      this.position = null;
      this.time = null;

      // set icon and styling
      this.iconClass = `bhi-${this.icon}`;
      this.alertTheme = `${this.theme} toast-container embedded`;
      if (this.hasDialogue) {
        this.alertTheme += ' dialogue';
      }
    }
  }

  ngOnChanges(changes?: SimpleChanges) {
    // set icon and styling
    this.iconClass = `bhi-${this.icon}`;
    this.alertTheme = `${this.theme} toast-container embedded`;
    if (this.hasDialogue) {
      this.alertTheme += ' dialogue';
    }
  }

  clickHandler(event) {
    if (!this.isCloseable) {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      if (this.parent) {
        this.parent.hide(this);
      } else {
        this.closed.emit({ closed: true });
      }
    }
  }

  close(event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (this.parent) {
      this.parent.hide(this);
    } else {
      this.closed.emit({ closed: true });
    }
  }
}
