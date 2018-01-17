import { Component, Input, HostBinding } from '@angular/core';

export interface INovoValueMetaAction {
  icon: string;
  onClick: (event: Event, action: this, data: any, meta: any) => {};
}

export interface INovoValueMetaLink {
  icon: string;
  href: (arg: any) => {};
}

export interface INovoValueMeta {
  label: string;
  links?: INovoValueMetaLink[];
  actions?: INovoValueMetaAction[];
  onClick?: (event: Event, data: any, meta: any) => {};
}

@Component({
  selector: 'novo-value',
  template: `
    <div class="value-outer" flex>
        <label>{{ meta.label }}</label>
        <div *ngIf="!meta.onClick" class="value" [innerHTML]="data | render : meta"></div>
        <a *ngIf="meta.onClick" class="value" [innerHTML]="data | render : meta" (click)="meta.onClick($event, data, meta)"></a>
    </div>
    <div class="novo-actions">
        <novo-action *ngFor="let action of meta?.actions" icon="{{action.icon}}" (click)="action.onClick($event, action, data, meta)"></novo-action>
        <a *ngFor="let link of meta?.links" href="{{link.href(data)}}"><novo-icon>{{ link.icon }}</novo-icon></a>
        <ng-content select="novo-action,[novo-action]"></ng-content>
    </div>
    `,
})
export class NovoValueComponent {
  @Input() public data: any; // TODO use interface
  @Input() public meta: INovoValueMeta = { label: '' }; // TODO use interface

  @HostBinding('attr.layout')
  @Input()
  public layout: string = 'row';
  @HostBinding('attr.layout-align')
  @Input()
  public layoutAlign: string = 'start center';
}
