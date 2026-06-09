import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  FieldInteractionApi,
  GooglePlacesService,
  IMenuOptions, MENU_OPTIONS,
  NOVO_ADDRESS_CONFIG,
  NovoAsideService,
  NovoModalService,
  NovoToastService,
  PlacesSettings,
} from 'novo-elements/elements';
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
  { provide: NovoAsideService, useClass: NovoAsideService },
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
  static forRoot(options?: { menu?: IMenuOptions; address?: PlacesSettings }): ModuleWithProviders<NovoElementProviders> {
    return {
      ngModule: NovoElementProviders,
      providers: [
        ...NOVO_ELEMENTS_PROVIDERS,
        {
          provide: MENU_OPTIONS,
          useValue: options && options.menu,
        },
        // Only register when supplied, so a bare forRoot() doesn't shadow a root provider with undefined.
        ...(options?.address ? [{ provide: NOVO_ADDRESS_CONFIG, useValue: options.address }] : []),
      ],
    };
  }

  static forChild(): ModuleWithProviders<NovoElementProviders> {
    return {
      ngModule: NovoElementProviders,
      providers: [],
    };
  }
}
