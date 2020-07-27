// NG2
import { NgModule, ModuleWithProviders } from '@angular/core';
// APP
import { GooglePlacesService } from './elements/places/places.service';
import { NovoDragulaService } from './elements/dragula/DragulaService';
import { NovoAsideService } from './elements/aside/aside.service';
// import { NovoAsideRef } from './elements/aside/aside-ref';
import { NovoModalService } from './elements/modal/ModalService';
import { NovoModalRef } from './elements/modal/Modal';
import { NovoToastService } from './elements/toast/ToastService';
import { ComponentUtils } from './utils/component-utils/ComponentUtils';
import { FieldInteractionApi } from './elements/form/FieldInteractionApi';
import { DateFormatService } from './services/date-format/DateFormat';
import { GlobalRef, BrowserGlobalRef } from './services/global/global.service';
import { LocalStorageService } from './services/storage/storage.service';
import { Security } from './services/security/Security';
import { OptionsService } from './services/options/OptionsService';
import { NovoTemplateService } from './services/template/NovoTemplateService';

const NOVO_ELEMENTS_PROVIDERS = [
  { provide: NovoDragulaService, useClass: NovoDragulaService },
  // { provide: NovoAsideRef, useClass: NovoAsideRef },
  { provide: NovoAsideService, useClass: NovoAsideService },
  { provide: NovoModalRef, useClass: NovoModalRef },
  { provide: NovoModalService, useClass: NovoModalService },
  { provide: GooglePlacesService, useClass: GooglePlacesService },
  { provide: NovoToastService, useClass: NovoToastService },
  { provide: ComponentUtils, useClass: ComponentUtils },
  { provide: GlobalRef, useClass: BrowserGlobalRef },
  { provide: LocalStorageService, useClass: LocalStorageService },
  { provide: OptionsService, useClass: OptionsService },
  FieldInteractionApi,
  DateFormatService,
  Security,
  NovoTemplateService,
];

@NgModule({
  imports: [],
})
export class NovoElementProviders {
  static forRoot(): ModuleWithProviders<NovoElementProviders> {
    return {
      ngModule: NovoElementProviders,
      providers: [...NOVO_ELEMENTS_PROVIDERS],
    };
  }

  static forChild(): ModuleWithProviders<NovoElementProviders> {
    return {
      ngModule: NovoElementProviders,
    };
  }
}
