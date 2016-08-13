// NG2
import { Routes, RouterModule } from '@angular/router';
// APP
import { Home } from './../pages/home/Home';
import { ColorComponent, TypographyComponent, CompositionComponent, IconographyComponent } from './../pages/design/all';
import {
    ButtonDemoComponent,
    LoadingDemoComponent,
    CardDemoComponent,
    ToastDemoComponent,
    TooltipDemoComponent,
    HeaderDemoComponent,
    TabsDemoComponent,
    TilesDemoComponent
} from './../pages/elements/all';

export const routes:Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },

    // Make sure you match the component type string to the require in asyncRoutes
    // Base Pages (design system)
    { path: 'color', component: ColorComponent },
    { path: 'composition', component: CompositionComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconographyComponent },

    // Element/Component/Service/etc.. Demos
    { path: 'button', component: ButtonDemoComponent },
    // { path: 'radio', component: 'RadioDemo' },
    // { path: 'quick-note', component: 'QuickNoteDemo' },
    // { path: 'modal', component: 'ModalDemo' },
    // { path: 'form', component: 'FormDemo' },
    { path: 'toast', component: ToastDemoComponent },
    { path: 'tooltip', component: TooltipDemoComponent },
    { path: 'cards', component: CardDemoComponent },
    { path: 'loading', component: LoadingDemoComponent },
    // { path: 'dropdown', component: 'DropdownDemo' },
    // { path: 'picker', component: 'PickerDemo' },
    // { path: 'chips', component: 'ChipsDemo' },
    // { path: 'select', component: 'SelectDemo' },
    { path: 'tabs', component: TabsDemoComponent },
    // { path: 'table', component: 'TableDemo' },
    // { path: 'list', component: 'ListDemo' },
    { path: 'header', component: HeaderDemoComponent },
    // { path: 'switch', component: 'SwitchDemo' },
    // { path: 'drawer', component: 'DrawerDemo' },
    // { path: 'calendar', component: 'CalendarDemo' },
    // { path: 'dragula', component: 'DragulaDemo' },
    { path: 'tiles', component: TilesDemoComponent },
    // { path: 'slides', component: 'SlidesDemo' },

    // Utils
    // { path: 'utils', component: 'UtilsDemo' },
    // { path: 'pipes', component: 'PipesDemo' },

    // Catch All
    { path: '**', redirectTo: '/' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
