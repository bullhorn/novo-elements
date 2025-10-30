import { NovoModalRef, NovoModalService } from 'novo-elements';
import * as i0 from "@angular/core";
export declare class ModalWarningDemo {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalWarningDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalWarningDemo, "modal-warning-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Warning Modal Example
 */
export declare class WarningModalExample {
    private modalService;
    constructor(modalService: NovoModalService);
    showModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WarningModalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WarningModalExample, "warning-modal-example", never, {}, {}, never, never, false, never>;
}
