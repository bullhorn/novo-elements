import { IDataTableColumn, NovoModalParams, NovoModalRef } from 'novo-elements';
import { MockData } from './mock-data';
import * as i0 from "@angular/core";
/**
 * @title Configure Columns Modal Example
 */
export declare class ConfigureColumnsModal {
    private modalRef;
    private params;
    columns: IDataTableColumn<MockData>;
    constructor(modalRef: NovoModalRef, params: NovoModalParams);
    close(): void;
    save(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigureColumnsModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfigureColumnsModal, "configure-columns-modal-example", never, {}, {}, never, never, false, never>;
}
