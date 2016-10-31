// APP
import { NovoLabelService } from './services/novo-label-service';
import { NovoDragulaService } from './elements/dragula/DragulaService';
import { ComponentUtils } from './utils/component-utils/ComponentUtils';
import { NovoModalService } from './elements/modal/ModalService';
import { NovoModalRef } from './elements/modal/Modal';
import { NovoToastService } from './elements/toast/ToastService';

export const NOVO_ELEMENTS_PROVIDERS = [
    { provide: ComponentUtils, useClass: ComponentUtils },
    { provide: NovoLabelService, useClass: NovoLabelService },
    { provide: NovoDragulaService, useClass: NovoDragulaService },
    { provide: NovoModalService, useClass: NovoModalService },
    { provide: NovoToastService, useClass: NovoToastService },
    { provide: NovoModalRef, useClass: NovoModalRef }
];
