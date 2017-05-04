// NG2
import { Component, Input } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';

@Component({
    selector: 'novo-dropdown-cell',
    template: `
        <novo-dropdown appendToBody="true" parentScrollSelector=".table-container" containerClass="novo-table-dropdown-cell">
            <button type="button" theme="secondary" icon="collapse" inverse>{{ value }}</button>
            <list>
                <ng-container *ngFor="let config of meta.dropdownCellConfig; let i = index">
                    <dropdown-item-header *ngIf="config.category">{{ config.category }}</dropdown-item-header>
                    <item *ngFor="let option of config.options" (click)="onClick(config, option, option.value)" [class.active]="option.value === value">
                        <span>{{ option.label }}</span> <i *ngIf="option.value === value" class="bhi-check"></i>
                    </item>
                    <hr *ngIf="i < meta.dropdownCellConfig.length - 1"/>
                </ng-container>
            </list>
        </novo-dropdown>
    `
})
export class NovoDropdownCell extends BaseRenderer {
    @Input() meta: any;
    @Input() value: any;

    public onClick(config, option, value): void {
        let callback = option.callback || config.callback;
        callback(this.data, value);
    }
}
