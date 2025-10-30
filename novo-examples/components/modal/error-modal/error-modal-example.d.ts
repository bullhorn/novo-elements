import { NovoModalRef, NovoModalService } from 'novo-elements';
import * as i0 from "@angular/core";
export declare class ModalErrorDemo {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalErrorDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalErrorDemo, "modal-error-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Error Modal Example
 */
export declare class ErrorModalExample {
    private modalService;
    constructor(modalService: NovoModalService);
    showModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ErrorModalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ErrorModalExample, "error-modal-example", never, {}, {}, never, never, false, never>;
}
