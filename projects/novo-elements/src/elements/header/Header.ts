import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'header-spacer',
  template: `
    <ng-content></ng-content>
  `,
})
export class NovoHeaderSpacer {}

@Component({
  selector: 'utils',
  template: `
    <ng-content></ng-content>
  `,
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
  selector: 'header[theme]',
  template: `
    <section>
      <div class="header-title">
        <ng-container *ngIf="title">
          <i *ngIf="movable" class="header-icon" class="bhi-move" id="dragger" (mouseenter)="dragModal()"></i>
          <i *ngIf="icon" class="header-icon" [ngClass]="icon"></i>
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
      <ng-content select="novo-action"></ng-content>
    </section>
    <ng-content></ng-content>
  `,
})
export class NovoHeaderComponent {
  @HostBinding('class')
  public headerClass: string = 'novo-header';
  @HostBinding('class.condensed')
  @Input()
  public condensed: boolean = false;
  @Input()
  public title: string;
  @Input()
  public subTitle: string;
  @Input()
  public movable: boolean = true;
  public inverse: string = 'inverse';

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

  dragModal() {
    let elmnt: HTMLElement = document.getElementsByTagName('novo-modal')[0] as HTMLElement;
    if (elmnt) {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      document.getElementById('dragger').onmousedown = dragMouseDown;
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
      }

      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  }
}
