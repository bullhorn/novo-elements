import { ChangeDetectionStrategy, Component, Directive, Input, HostBinding } from '@angular/core';
import { CdkHeaderRow, CdkRow, CDK_ROW_TEMPLATE, CdkRowDef, CdkHeaderRowDef } from '@angular/cdk/table';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoHeaderRowDef = CdkHeaderRowDef;
export const _NovoCdkRowDef = CdkRowDef;
export const _NovoHeaderRow = CdkHeaderRow;
export const _NovoRow = CdkRow;

@Directive({
    selector: '[novoHeaderRowDef]',
    providers: [{ provide: CdkHeaderRowDef, useExisting: NovoHeaderRowDef }],
})
export class NovoHeaderRowDef extends _NovoHeaderRowDef {
    @Input('novoHeaderRowDef') columns;
}

@Directive({
    selector: '[novoRowDef]',
    providers: [{ provide: CdkRowDef, useExisting: NovoRowDef }]
})
export class NovoRowDef extends _NovoCdkRowDef {
    @Input('novoRowDefColumns') columns;
}

@Component({
    selector: 'novo-header-row',
    template: CDK_ROW_TEMPLATE,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NovoHeaderRow extends _NovoHeaderRow {
    @HostBinding('class') public rowClass = 'novo-header-row';
    @HostBinding('attr.role') public role = 'row';
}

@Component({
    selector: 'novo-row',
    template: CDK_ROW_TEMPLATE,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoRow extends _NovoRow {
    @HostBinding('class') public rowClass = 'novo-row';
    @HostBinding('attr.role') public role = 'row';
}
