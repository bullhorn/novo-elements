// APP
import { NovoLabelService } from './src/services/novo-label-service';
import { NovoDragulaService } from './src/elements/dragula/DragulaService';
import { ComponentUtils } from './src/utils/component-utils/ComponentUtils';
import { NovoModalService } from './src/elements/modal/ModalService';
import { NovoModalRef } from './src/elements/modal/Modal';
import { NovoToastService } from './src/elements/toast/ToastService';

export const NOVO_ELEMENTS_PROVIDERS = [
    { provide: ComponentUtils, useClass: ComponentUtils },
    { provide: NovoLabelService, useClass: NovoLabelService },
    { provide: NovoDragulaService, useClass: NovoDragulaService },
    { provide: NovoModalService, useClass: NovoModalService },
    { provide: NovoToastService, useClass: NovoToastService },
    { provide: NovoModalRef, useClass: NovoModalRef }
];
