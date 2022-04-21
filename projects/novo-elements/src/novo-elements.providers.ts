// NG2
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NovoAsideService } from './elements/aside/aside.service';
import { NovoDragulaService } from './elements/dragula/DragulaService';
import { FieldInteractionApi } from './elements/form/FieldInteractionApi';
import { MENU_OPTIONS } from './elements/menu/menu.tokens';
import { IMenuOptions } from './elements/menu/menu.types';
// import { NovoAsideRef } from './elements/aside/aside-ref';
import { NovoModalService } from './elements/modal/modal.service';
// APP
import { GooglePlacesService } from './elements/places/places.service';
import { NovoToastService } from './elements/toast/ToastService';
import { DateFormatService } from './services/date-format/DateFormat';
import { BrowserGlobalRef, GlobalRef } from './services/global/global.service';
import { OptionsService } from './services/options/OptionsService';
import { LocalStorageService } from './services/storage/storage.service';
import { NovoTemplateService } from './services/template/NovoTemplateService';
import { ComponentUtils } from './utils/component-utils/ComponentUtils';

const NOVO_ELEMENTS_PROVIDERS = [
  { provide: NovoDragulaService, useClass: NovoDragulaService },
  // { provide: NovoAsideRef, useClass: NovoAsideRef },
  { provide: NovoAsideService, useClass: NovoAsideService },
  // { provide: NovoModalRef, useClass: NovoModalRef },
  { provide: NovoModalService, useClass: NovoModalService },
  { provide: GooglePlacesService, useClass: GooglePlacesService },
  { provide: NovoToastService, useClass: NovoToastService },
  { provide: ComponentUtils, useClass: ComponentUtils },
  { provide: GlobalRef, useClass: BrowserGlobalRef },
  { provide: LocalStorageService, useClass: LocalStorageService },
  { provide: OptionsService, useClass: OptionsService },
  FieldInteractionApi,
  DateFormatService,
  NovoTemplateService,
];

@NgModule({
  imports: [],
})
export class NovoElementProviders {
  static forRoot(options?: { menu: IMenuOptions }): ModuleWithProviders<NovoElementProviders> {
    return {
      ngModule: NovoElementProviders,
      providers: [
        ...NOVO_ELEMENTS_PROVIDERS,
        {
          provide: MENU_OPTIONS,
          useValue: options && options.menu,
        },
      ],
    };
  }

  static forChild(): ModuleWithProviders<NovoElementProviders> {
    return {
      ngModule: NovoElementProviders,
    };
  }
}
