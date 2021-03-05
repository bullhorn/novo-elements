import { Component, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../utils';

@Component({
  selector: 'header-spacer',
  template: `<ng-content></ng-content>`,
})
export class NovoHeaderSpacer {}

@Component({
  selector: 'utils',
  template: `<ng-content></ng-content>`,
})
export class NovoUtilsComponent {}

@Component({
  selector: 'util-action, novo-action',
  template: `
    <button theme="icon" [icon]="icon" [attr.inverse]="inverse" [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
})
export class NovoUtilActionComponent {
  @Input()
  public icon: string;
  @Input()
  public inverse: boolean;
  @Input()
  public disabled: boolean;
}

@Component({
  selector: 'novo-header,header[theme]',
  template: `
    <section>
      <div class="header-title">
        <ng-content select="[prefix]"></ng-content>
        <ng-container *ngIf="title">
          <novo-icon class="header-icon" *ngIf="icon">{{ icon }}</novo-icon>
          <div class="header-titles">
            <novo-title size="large">{{ title }}</novo-title>
            <novo-title size="small">{{ subTitle }}</novo-title>
          </div>
        </ng-container>
        <ng-container *ngIf="!title">
          <ng-content select="novo-icon, [novo-icon]"></ng-content>
          <div class="header-titles">
            <ng-content select="h1, h2, h3, h4, h5, h6, small, novo-title, [novo-title], [novo-subtitle]"></ng-content>
          </div>
        </ng-container>
      </div>
      <ng-content select="section"></ng-content>
      <span class="spacer"></span>
      <ng-content select="utils"></ng-content>
      <ng-content select="[suffix]"></ng-content>
      <div class="header-actions">
        <ng-content select="novo-action,[novo-action]"></ng-content>
      </div>
    </section>
    <ng-content></ng-content>
  `,
})
export class NovoHeaderComponent {
  @HostBinding('class')
  public headerClass: string = 'novo-header';
  @HostBinding('class.condensed')
  @Input()
  @BooleanInput()
  public condensed: boolean = false;
  @Input()
  public title: string;
  @Input()
  public subTitle: string;
  public inverse: string = 'inverse';

  @Input()
  public size: 'small' | 'medium' | 'large';

  @HostBinding('class.header-size-small')
  get hb_isSizeSmall(): boolean {
    return this.size === 'small';
  }

  @HostBinding('class.header-size-large')
  get hb_isSizeLarge(): boolean {
    return this.size === 'large';
  }

  @HostBinding('class.header-size-default')
  get hb_isSizeDefault(): boolean {
    return !['small', 'large'].includes(this.size);
  }

  @HostBinding('attr.theme')
  @Input()
  set theme(theme: string) {
    this._theme = theme;
    this.inverse = theme === 'white' || theme === 'off-white' || theme === 'light' ? undefined : 'inverse';
  }

  get theme(): string {
    return this._theme;
  }

  @Input()
  set icon(icon: string) {
    this._icon = `bhi-${icon}`;
  }

  get icon(): string {
    return this._icon;
  }

  private _theme: string;
  private _icon: string;
}
