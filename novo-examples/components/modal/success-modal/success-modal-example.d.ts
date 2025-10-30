import { NovoModalRef, NovoModalService } from 'novo-elements';
import * as i0 from "@angular/core";
export declare class ModalSuccessDemo {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalSuccessDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalSuccessDemo, "modal-success-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Success Modal Example
 */
export declare class SuccessModalExample {
    private modalService;
    constructor(modalService: NovoModalService);
    showModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SuccessModalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SuccessModalExample, "success-modal-example", never, {}, {}, never, never, false, never>;
}
