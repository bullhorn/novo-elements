import { NovoModalParams, NovoModalRef } from 'novo-elements/elements/modal';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class ControlConfirmModal {
    private modalRef;
    params: NovoModalParams;
    labels: NovoLabelService;
    constructor(modalRef: NovoModalRef, params: NovoModalParams, labels: NovoLabelService);
    close(result: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlConfirmModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlConfirmModal, "control-confirm-modal", never, {}, {}, never, never, false, never>;
}
export declare class ControlPromptModal {
    private modalRef;
    params: NovoModalParams;
    labels: NovoLabelService;
    constructor(modalRef: NovoModalRef, params: NovoModalParams, labels: NovoLabelService);
    close(result: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlPromptModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlPromptModal, "control-prompt-modal", never, {}, {}, never, never, false, never>;
}
