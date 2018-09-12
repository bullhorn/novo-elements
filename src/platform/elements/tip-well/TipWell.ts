// NG2
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// APP
import { NovoLabelService } from '../../services/novo-label-service';

@Component({
  selector: 'novo-tip-well',
  template: `
        <div *ngIf="isActive">
            <div>
                <i class="bhi-{{ icon }}" *ngIf="icon" [attr.data-automation-id]="'novo-tip-well-icon-' + name"></i>
                <p *ngIf="sanitize" [attr.data-automation-id]="'novo-tip-well-tip-' + name">{{ tip }}</p>
                <p *ngIf="!sanitize" [attr.data-automation-id]="'novo-tip-well-tip-' + name" [innerHTML]="tip"></p>
            </div>
            <button theme="dialogue" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">{{ buttonText }}</button>
        </div>
    `,
  host: {
    '[class.active]': 'isActive',
  },
})
export class NovoTipWellElement implements OnInit {
  @Input()
  name: string | number;
  @Input()
  tip: string;
  @Input()
  buttonText: string;
  @Input()
  button: boolean = true;
  @Input()
  icon: string;
  @Input()
  sanitize: boolean = true;
  @Output()
  confirmed = new EventEmitter();

  isActive: boolean = true;
  isLocalStorageEnabled: any;
  localStorageKey: string;

  constructor(private labels: NovoLabelService) {
    this.isActive = true;
    // Check if localStorage is enabled
    this.isLocalStorageEnabled = (() => {
      let isEnabled = false;
      if (typeof localStorage === 'object') {
        try {
          localStorage.setItem('lsTest', '1');
          localStorage.removeItem('lsTest');
          isEnabled = true;
        } catch (e) {
          console.warn(
            'This web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.',
          );
        }
      }
      return isEnabled;
    })();
  }

  ngOnInit() {
    this.tip = this.tip || '';
    this.buttonText = this.buttonText || this.labels.okGotIt;
    this.button = typeof this.button === 'string' ? this.button === 'true' : this.button;
    this.icon = this.icon || null;
    // Set a (semi) unique name for the tip-well
    this.name = this.name || Math.round(Math.random() * 100);
    this.localStorageKey = `novo-tw_${this.name}`;
    // Check localStorage for state
    if (this.isLocalStorageEnabled) {
      let storedValue = JSON.parse(localStorage.getItem(this.localStorageKey));
      this.isActive = storedValue !== false;
    }
  }

  /**
   * @name hideTip
   */
  hideTip() {
    if (this.isLocalStorageEnabled) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(false));
    }
    this.isActive = false;
    this.confirmed.emit();
  }
}
