import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    children: [
      { path: 'buttons', component: ButtonsComponent },
      { path: 'headers', component: HeadersComponent },
      { path: 'loading', component: LoadingComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'slides', component: SlidesComponent },
      { path: 'tiles', component: TilesComponent },
      { path: 'menus', component: MenusComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'dialogs', component: DialogsComponent },
      { path: 'tabs', component: TabsComponent },
      { path: 'values', component: ValuesComponent },
      { path: 'switches', component: SwitchesComponent },
      { path: 'searches', component: SearchesComponent },
      { path: 'autocomplete', component: AutocompleteComponent },
      { path: 'select', component: SelectComponent },
      { path: 'radio', component: RadioComponent },
      { path: '', redirectTo: 'buttons', pathMatch: 'full' },
    ],
  },
];

export const componentsRoutes: any = RouterModule.forChild(routes);
