import { OnInit } from '@angular/core';
import { FormUtils, NovoModalRef, NovoModalService } from 'novo-elements';
import * as i0 from "@angular/core";
export declare class ModalEditFormDemo implements OnInit {
    private modalRef;
    private formUtils;
    textControl: any;
    emailControl: any;
    numberControl: any;
    pickerControl: any;
    textForm: any;
    constructor(modalRef: NovoModalRef, formUtils: FormUtils);
    ngOnInit(): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalEditFormDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalEditFormDemo, "modal-edit-form-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Modal Edit Form Example
 */
export declare class ModalEditFormExample {
    private modalService;
    constructor(modalService: NovoModalService);
    showModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalEditFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalEditFormExample, "modal-edit-form-example", never, {}, {}, never, never, false, never>;
}
