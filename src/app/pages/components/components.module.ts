import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NovoElementsModule } from '../../../platform';

import { SharedModule } from '../../shared';
import { componentsRoutes } from './components.routes';

import { ComponentsComponent } from './components.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { HeadersComponent } from './headers/headers.component';

import { LoadingComponent } from './loading/loading.component';
import { ListsComponent } from './lists/lists.component';
import { SlidesComponent } from './slides/slides.component';
import { TilesComponent } from './tiles/tiles.component';
import { MenusComponent } from './menus/menus.component';
import { CardsComponent } from './cards/cards.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { TabsComponent } from './tabs/tabs.component';
import { ValuesComponent } from './values/values.component';
import { SwitchesComponent } from './switches/switches.component';
import { SearchesComponent } from './searches/searches.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { SelectComponent } from './select/select.component';
import { RadioComponent } from './radio/radio.component';

import { BUTTON_DEMO_COMPONENTS } from './buttons/demos';
import { HEADER_DEMO_COMPONENTS } from './headers/demos';
import { LOADING_DEMO_COMPONENTS } from './loading/demos';
import { SLIDES_DEMO_COMPONENTS } from './slides/demos';
import { TILES_DEMO_COMPONENTS } from './tiles/demos';
import { LISTS_DEMO_COMPONENTS } from './lists/demos';
import { MENUS_DEMO_COMPONENTS } from './menus/demos';
import { CARDS_DEMO_COMPONENTS } from './cards/demos';
import {
  DIALOGS_DEMO_COMPONENTS,
  DIALOGS_DEMO_ENTRY_COMPONENTS,
} from './dialogs/demos';
import { TABS_DEMO_COMPONENTS } from './tabs/demos';
import { VALUES_DEMO_COMPONENTS } from './values/demos';
import { SWITCH_DEMO_COMPONENTS } from './switches/demos';
import { SEARCH_DEMO_COMPONENTS } from './searches/demos';
import { AUTOCOMPLETE_DEMO_COMPONENTS } from './autocomplete/demos';
import { SELECT_DEMO_COMPONENTS } from './select/demos';
import { RADIO_DEMO_COMPONENTS } from './radio/demos';

@NgModule({
  declarations: [
    ComponentsComponent,
    ButtonsComponent,
    HeadersComponent,
    LoadingComponent,
    ListsComponent,
    SlidesComponent,
    TilesComponent,
    MenusComponent,
    CardsComponent,
    DialogsComponent,
    TabsComponent,
    ValuesComponent,
    SwitchesComponent,
    SearchesComponent,
    AutocompleteComponent,
    SelectComponent,
    RadioComponent,
    ...BUTTON_DEMO_COMPONENTS,
    ...HEADER_DEMO_COMPONENTS,
    ...LOADING_DEMO_COMPONENTS,
    ...SLIDES_DEMO_COMPONENTS,
    ...TILES_DEMO_COMPONENTS,
    ...LISTS_DEMO_COMPONENTS,
    ...MENUS_DEMO_COMPONENTS,
    ...CARDS_DEMO_COMPONENTS,
    ...DIALOGS_DEMO_COMPONENTS,
    ...TABS_DEMO_COMPONENTS,
    ...VALUES_DEMO_COMPONENTS,
    ...SWITCH_DEMO_COMPONENTS,
    ...SEARCH_DEMO_COMPONENTS,
    ...AUTOCOMPLETE_DEMO_COMPONENTS,
    ...SELECT_DEMO_COMPONENTS,
    ...RADIO_DEMO_COMPONENTS,
  ],
  entryComponents: [...DIALOGS_DEMO_ENTRY_COMPONENTS],
  imports: [
    // NG2
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NovoElements
    NovoElementsModule,
    // APP
    componentsRoutes,
    SharedModule,
  ],
})
export class ComponentsModule {}
