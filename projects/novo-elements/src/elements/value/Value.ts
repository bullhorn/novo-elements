// NG2
import { Component, Input, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
// APP
import { Helpers } from '../../utils/Helpers';
export enum NOVO_VALUE_TYPE {
  DEFAULT,
  ENTITY_LIST,
  LINK,
  INTERNAL_LINK,
}
export enum NOVO_VALUE_THEME {
  DEFAULT,
  MOBILE,
}

@Component({
  selector: 'novo-value',
  template: `
        <ng-container [ngSwitch]="type">
            <div class="value-outer" *ngIf="showLabel">
                <label class="skeleton">{{ label }}</label>
                <a *ngSwitchCase="NOVO_VALUE_TYPE.INTERNAL_LINK" class="value" (click)="openLink()" [innerHTML]="data | render : meta"></a>
                <a *ngSwitchCase="NOVO_VALUE_TYPE.LINK" class="value" [href]="url" target="_blank" [innerHTML]="data | render : meta"></a>
                <novo-entity-list *ngSwitchCase="NOVO_VALUE_TYPE.ENTITY_LIST" [data]='data' [meta]="meta"></novo-entity-list>
            </div>
            <div *ngSwitchDefault class="value-outer" [ngClass]="customClass">
                <label class="skeleton">{{ label }}</label>
                <div *ngIf="isDefault" class="value skeleton" [innerHTML]="data | render : meta"></div>
            </div>
            <div class="actions" *ngIf="showIcon">
                <i *ngFor="let icon of meta.icons" [class]="iconClass(icon)" (click)="onValueClick(icon)"></i>
            </div>
        </ng-container>
    `,
})
export class NovoValueElement implements OnInit, OnChanges {
  @Input()
  data: any; // TODO use interface
  @Input()
  meta: any = { type: 'SCALAR', label: '' }; // TODO use interface
  @Input()
  theme: NOVO_VALUE_THEME = NOVO_VALUE_THEME.DEFAULT;

  private _type: NOVO_VALUE_TYPE;
  NOVO_VALUE_TYPE = NOVO_VALUE_TYPE;
  NOVO_VALUE_THEME = NOVO_VALUE_THEME;
  url: string;
  customClass: string = '';

  @Input()
  set label(lbl: string) {
    this.meta.label = lbl;
  }
  get label(): string {
    return this.meta.label;
  }

  @Input()
  set type(typ: string) {
    this.meta.type = typ;
  }
  get type(): string {
    return this.meta.type;
  }

  ngOnInit() {
    if (Helpers.isEmpty(this.meta)) {
      this.meta = {
        label: '',
      };
    }
  }

  @HostBinding('class.mobile')
  public get isMobile(): boolean {
    return this.theme === NOVO_VALUE_THEME.MOBILE;
  }

  iconClass(icon): string {
    let iconClass = '';
    if (icon && icon.iconCls) {
      iconClass = `bhi-${icon.iconCls} actions`;
      if (icon.onIconClick) {
        iconClass = `${iconClass} clickable`;
      }
      return iconClass;
    }
    return iconClass;
  }

  public get isDefault(): boolean {
    return true;
  }

  public get showLabel(): boolean {
    return (
      this._type === NOVO_VALUE_TYPE.INTERNAL_LINK || this._type === NOVO_VALUE_TYPE.LINK || this._type === NOVO_VALUE_TYPE.ENTITY_LIST
    );
  }

  public get showIcon(): boolean {
    return this.meta && this.meta.icons && this.meta.icons.length && !Helpers.isEmpty(this.data);
  }

  onValueClick(icon): void {
    if (icon.onIconClick && typeof icon.onIconClick === 'function') {
      icon.onIconClick(this.data, this.meta);
    }
  }
  openLink(): void {
    if (this.meta && this.meta.openLink && typeof this.meta.openLink === 'function') {
      this.meta.openLink(this.data, this.meta);
    }
  }

  ngOnChanges(changes?: SimpleChanges): any {
    if (this.meta && this.isLinkField(this.meta, this.data)) {
      this._type = NOVO_VALUE_TYPE.LINK;
      // Make sure the value has a protocol, otherwise the URL will be relative
      let hasProtocol: any = new RegExp('^(http|https)://', 'i');
      if (!hasProtocol.test(this.data)) {
        this.url = `http://${this.data}`;
      } else {
        this.url = this.data;
      }
    } else if (this.isEntityList(this.meta.type)) {
      this._type = NOVO_VALUE_TYPE.ENTITY_LIST;
    } else if (this.isHTMLField(this.meta)) {
      this.customClass = this.meta.customClass ? this.meta.customClass : '';
      if (this.meta.stripHTML && this.data && this.data.replace) {
        this.data = this.data.replace(/<(?!style|\/style).+?>/gi, '').trim();
      }
    } else if (this.meta && this.meta.associatedEntity) {
      switch (this.meta.associatedEntity.entity) {
        case 'ClientCorporation':
        case 'ClientContact':
        case 'Candidate':
        case 'Opportunity':
        case 'JobOrder':
        case 'Placement':
          this._type = NOVO_VALUE_TYPE.INTERNAL_LINK;
          break;
        default:
          break;
      }
    }
  }

  isLinkField(field: { name?: string; type?: NOVO_VALUE_TYPE }, data: any): boolean {
    let linkFields: any = ['companyURL', 'clientCorporationCompanyURL'];
    let regex: any = new RegExp('^(https?://(?:www.|(?!www))[^s.]+.[^s]{2,}|www.[^s]+.[^s]{2,})$', 'gi');
    let isURL: any = Helpers.isString(data) && regex.exec(data.trim());
    return linkFields.indexOf(field.name) > -1 || !!isURL || field.type === NOVO_VALUE_TYPE.LINK;
  }

  isEntityList(type: string): boolean {
    return type === 'TO_MANY';
  }

  isHTMLField(meta: any): boolean {
    return meta.dataSpecialization === 'HTML' || meta.inputType === 'TEXTAREA';
  }
}
