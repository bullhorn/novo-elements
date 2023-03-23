// NG2
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// APP
import { NovoLabelService } from '../../services/novo-label-service';

@Component({
  selector: 'novo-tip-well',
  template: `
    <div *ngIf="isActive">
      <div>
        <i class="bhi-{{ icon }}" *ngIf="icon" [attr.data-automation-id]="'novo-tip-well-icon-' + name"></i>
        <ng-content select="novo-icon"></ng-content>
        <p *ngIf="sanitize && tip.length" [attr.data-automation-id]="'novo-tip-well-tip-' + name">{{ tip }}</p>
        <p *ngIf="!sanitize && tipWithStyles" [attr.data-automation-id]="'novo-tip-well-tip-' + name" [innerHTML]="tipWithStyles"></p>
        <p [attr.data-automation-id]="'novo-tip-well-tip-' + name"><ng-content></ng-content></p>
      </div>
      <button theme="dialogue" size="small" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">
        {{ buttonText }}
      </button>
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

  private _tipWithStyles: SafeHtml;
  private _lastTipStyled: string;

  constructor(private labels: NovoLabelService, private sanitizer: DomSanitizer) {
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

  // Trusts the HTML in order to show CSS styles
  get tipWithStyles(): SafeHtml {
    if (!this._tipWithStyles || this._lastTipStyled !== this.tip) {
      this._tipWithStyles = this.sanitizer.bypassSecurityTrustHtml(this.tip);
      this._lastTipStyled = this.tip;
    }
    return this._tipWithStyles;
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
      const storedValue = JSON.parse(localStorage.getItem(this.localStorageKey));
      this.isActive = storedValue !== false;
    }
  }

  hideTip() {
    if (this.isLocalStorageEnabled) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(false));
    }
    this.isActive = false;
    this.confirmed.emit();
  }
}
