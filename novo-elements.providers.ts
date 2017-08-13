// NG2
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
// APP
import { NovoDragulaService } from './src/elements/dragula/DragulaService';
import { NovoModalService } from './src/elements/modal/ModalService';
import { NovoModalRef } from './src/elements/modal/Modal';
import { NovoToastService } from './src/elements/toast/ToastService';
import { ComponentUtils } from './src/utils/component-utils/ComponentUtils';
import { FormUtils } from './src/utils/form-utils/FormUtils';
import { DateFormatService } from './src/services/date-format/DateFormat';
import { FieldInteractionApi } from './src/elements/form/FieldInteractionApi';

export function provideFieldInteractionAPI(toast, formUtils, http) {
    const fieldInteractionApi = new FieldInteractionApi(toast, formUtils, http);
    fieldInteractionApi.globals = {
        TEST: 'I AM A GLOBAL!'
    };
    return fieldInteractionApi;
}

const NOVO_ELEMENTS_PROVIDERS = [
    { provide: NovoDragulaService, useClass: NovoDragulaService },
    { provide: NovoModalRef, useClass: NovoModalRef },
    { provide: NovoModalService, useClass: NovoModalService },
    { provide: NovoToastService, useClass: NovoToastService },
    { provide: ComponentUtils, useClass: ComponentUtils },
    {
        provide: FieldInteractionApi,
        useFactory: provideFieldInteractionAPI,
        deps: [NovoToastService, FormUtils, Http]
    },
    DateFormatService
];

@NgModule({
    imports: []
})
export class NovoElementProviders {
    static forRoot() {
        return {
            ngModule: NovoElementProviders,
            providers: [...NOVO_ELEMENTS_PROVIDERS]
        };
    }

    static forChild() {
        return {
            ngModule: NovoElementProviders
        };
    }
}
