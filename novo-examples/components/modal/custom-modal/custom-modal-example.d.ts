import { NovoModalRef, NovoModalService } from 'novo-elements';
import * as i0 from "@angular/core";
export declare class ModalCustomDemo {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalCustomDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalCustomDemo, "modal-custom-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Custom Modal Example
 */
export declare class CustomModalExample {
    private modalService;
    constructor(modalService: NovoModalService);
    showModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomModalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomModalExample, "custom-modal-example", never, {}, {}, never, never, false, never>;
}
