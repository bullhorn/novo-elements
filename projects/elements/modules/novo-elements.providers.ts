// NG2
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NovoDragulaService } from 'novo-elements/addons';
import {
  FieldInteractionApi,
  GooglePlacesService,
  IMenuOptions,
  MENU_OPTIONS,
  NovoAsideService,
  NovoModalService,
  NovoToastService,
} from 'novo-elements/components';
import {
  BrowserGlobalRef,
  ComponentUtils,
  DateFormatService,
  GlobalRef,
  LocalStorageService,
  NovoTemplateService,
  OptionsService,
} from 'novo-elements/services';

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
