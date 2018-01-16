import { NgModule } from '@angular/core';

import { NovoButtonModule } from './components/button';
import { NovoHeaderModule } from './components/header';
import { NovoLoadingModule } from './components/loading';
import { NovoListModule } from './components/list';
import { NovoSlidesModule } from './components/slides';
import { NovoLabelService } from './services';
import { NovoTilesModule } from './components/tiles';
import { NovoIconModule } from './components/icon';
import { NovoOverlayModule } from './components/overlay';
import { NovoMenuModule } from './components/menu';
import { NovoCardModule } from './components/card';
import { NovoDialogModule } from './components/dialog';
import { NovoTabsModule } from './components/tabs';
import { NovoValueModule } from './components/value';
import { NovoSwitchModule } from './components/switch';
import { NovoSearchModule } from './components/search';
import { GooglePlacesModule } from './components/places';
import { NovoAutocompleteModule } from './components/autocomplete';
import { NovoSelectModule } from './components/select';
import { NovoOptionModule } from './components/option';
import { NovoRadioModule } from './components/radio';

import { GroupByPipe, DecodeURIPipe } from './pipes';

import { GlobalRef, BrowserGlobalRef } from './services/global/global.service';
import { LocalStorageService } from './services/storage/local-storage.service';

@NgModule({
  declarations: [
    GroupByPipe,
    DecodeURIPipe,
  ],
  exports: [
    // Modules
    NovoButtonModule,
    NovoHeaderModule,
    NovoLoadingModule,
    NovoListModule,
    NovoSlidesModule,
    NovoTilesModule,
    NovoIconModule,
    NovoOverlayModule,
    NovoMenuModule,
    NovoCardModule,
    NovoDialogModule,
    NovoTabsModule,
    NovoValueModule,
    NovoSwitchModule,
    NovoSearchModule,
    NovoAutocompleteModule,
    GooglePlacesModule,
    NovoSelectModule,
    NovoOptionModule,
    NovoRadioModule,
    // Pipes
    GroupByPipe,
    DecodeURIPipe,
  ],
  providers: [
    NovoLabelService,
    LocalStorageService,
    { provide: GlobalRef, useClass: BrowserGlobalRef },
  ],
})
export class NovoElementsModule { }
