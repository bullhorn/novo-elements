import { ChangeDetectionStrategy, Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoTable = CdkTable;

@Component({
    moduleId: module.id,
    selector: 'novo-simple-table',
    template: CDK_TABLE_TEMPLATE,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoTable<T> extends _NovoTable<T> {
    @HostBinding('class') public tableClass = 'novo-table';
}
