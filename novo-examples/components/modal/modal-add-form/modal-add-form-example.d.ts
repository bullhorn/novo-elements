import { OnInit } from '@angular/core';
import { FormUtils, NovoModalRef, NovoModalService } from 'novo-elements';
import * as i0 from "@angular/core";
export declare class ModalAddFormDemo implements OnInit {
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
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalAddFormDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalAddFormDemo, "modal-edit-form-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Modal Add Form Example
 */
export declare class ModalAddFormExample {
    private modalService;
    constructor(modalService: NovoModalService);
    showModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalAddFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalAddFormExample, "modal-add-form-example", never, {}, {}, never, never, false, never>;
}
