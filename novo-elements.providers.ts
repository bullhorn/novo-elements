// NG2
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
// APP
import { GooglePlacesService } from './src/elements/places/places.service';
import { NovoDragulaService } from './src/elements/dragula/DragulaService';
import { NovoModalService } from './src/elements/modal/ModalService';
import { NovoModalRef } from './src/elements/modal/Modal';
import { NovoToastService } from './src/elements/toast/ToastService';
import { ComponentUtils } from './src/utils/component-utils/ComponentUtils';
import { FormUtils } from './src/utils/form-utils/FormUtils';
import { FieldInteractionApi } from './src/elements/form/FieldInteractionApi';
import { DateFormatService } from './src/services/date-format/DateFormat';
import { GlobalRef, BrowserGlobalRef } from './src/services/global/global.service';
import { LocalStorageService } from './src/services/storage/storage.service';

const NOVO_ELEMENTS_PROVIDERS = [
    { provide: NovoDragulaService, useClass: NovoDragulaService },
    { provide: NovoModalRef, useClass: NovoModalRef },
    { provide: NovoModalService, useClass: NovoModalService },
    { provide: GooglePlacesService, useClass: GooglePlacesService },
    { provide: NovoToastService, useClass: NovoToastService },
    { provide: ComponentUtils, useClass: ComponentUtils },
    { provide: GlobalRef, useClass: BrowserGlobalRef },
    { provide: LocalStorageService, useClass: LocalStorageService },
    FieldInteractionApi,
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
