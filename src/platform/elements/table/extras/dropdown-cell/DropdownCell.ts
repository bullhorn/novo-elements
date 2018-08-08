// NG2
import { Component, Input, OnInit } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';

export interface INovoDropdownCellConfig {
  category?: string;
  callback?: Function;
  options: ({ label?: string; value?: string; callback?: Function } | string)[];
}

@Component({
  selector: 'novo-dropdown-cell',
  template: `
    <novo-dropdown parentScrollSelector=".table-container" containerClass="novo-table-dropdown-cell">
      <button type="button" theme="secondary" icon="collapse" inverse>
        <span data-automation-id="novo-dropdown-cell-value">{{ value }}</span>
      </button>
      <list>
        <ng-container *ngFor="let config of meta.dropdownCellConfig; let i = index">
          <dropdown-item-header *ngIf="config.category">{{ config.category }}</dropdown-item-header>
          <item *ngFor="let option of config.options" (action)="onClick(config, option, option.value)"
                [class.active]="(option || option.value) === value">
            <span [attr.data-automation-id]="option.label || option">{{ option.label || option }}</span>
            <i *ngIf="(option || option.value) === value" class="bhi-check"></i>
          </item>
          <hr *ngIf="i < meta.dropdownCellConfig.length - 1"/>
        </ng-container>
      </list>
    </novo-dropdown>
  `,
})
export class NovoDropdownCell extends BaseRenderer implements OnInit {
  @Input() meta: any;
  @Input() value: any;

  public ngOnInit(): void {
    // Check for and fix bad config
    if (!this.meta.dropdownCellConfig) {
      throw new Error('Missing "dropdownCellConfig" on the column setup');
    }
  }

  public onClick(config, option, value): void {
    let callback = option.callback || config.callback;
    callback(this.data, value || option);
  }
}
