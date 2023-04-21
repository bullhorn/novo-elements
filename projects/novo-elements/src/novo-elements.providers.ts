import { ModuleWithProviders, NgModule } from '@angular/core';
import { NovoAsideService } from './elements/aside/aside.service';
import { NovoDragulaService } from './elements/dragula/DragulaService';
import { FieldInteractionApi } from './elements/form/FieldInteractionApi';
import { MENU_OPTIONS } from './elements/menu/menu.tokens';
import { IMenuOptions } from './elements/menu/menu.types';
import { NovoModalService } from './elements/modal/modal.service';
import { GooglePlacesService } from './elements/places/places.service';
import { NovoToastService } from './elements/toast/ToastService';
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
