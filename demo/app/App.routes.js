// NG2
import { Routes, RouterModule } from '@angular/router';
// APP
import { Home } from './../pages/home/Home';
import { ColorComponent, TypographyComponent, CompositionComponent, IconographyComponent } from './../pages/design/all';
import { PipesDemoComponent, UtilsDemoComponent } from './../pages/utils/all';
import {
    ButtonDemoComponent,
    LoadingDemoComponent,
    CardDemoComponent,
    ToastDemoComponent,
    TooltipDemoComponent,
    HeaderDemoComponent,
    TabsDemoComponent,
    TilesDemoComponent,
    ModalDemoComponent,
    QuickNoteDemoComponent,
    RadioDemoComponent,
    DropdownDemoComponent,
    SelectDemoComponent,
    ListDemoComponent,
    SwitchDemoComponent,
    DrawerDemoComponent,
    DragulaDemoComponent,
    SlidesDemoComponent,
    PickerDemoComponent,
    ChipsDemoComponent,
    CalendarDemoComponent,
    EditorDemoComponent,
    TipWellDemoComponent,
    TableDemoComponent,
    FormDemoComponent
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
    { path: 'radio', component: RadioDemoComponent },
    { path: 'quick-note', component: QuickNoteDemoComponent },
    { path: 'modal', component: ModalDemoComponent },
    { path: 'form', component: FormDemoComponent },
    { path: 'toast', component: ToastDemoComponent },
    { path: 'tooltip', component: TooltipDemoComponent },
    { path: 'cards', component: CardDemoComponent },
    { path: 'loading', component: LoadingDemoComponent },
    { path: 'dropdown', component: DropdownDemoComponent },
    { path: 'picker', component: PickerDemoComponent },
    { path: 'chips', component: ChipsDemoComponent },
    { path: 'select', component: SelectDemoComponent },
    { path: 'tabs', component: TabsDemoComponent },
    { path: 'table', component: TableDemoComponent },
    { path: 'list', component: ListDemoComponent },
    { path: 'header', component: HeaderDemoComponent },
    { path: 'switch', component: SwitchDemoComponent },
    { path: 'drawer', component: DrawerDemoComponent },
    { path: 'calendar', component: CalendarDemoComponent },
    { path: 'dragula', component: DragulaDemoComponent },
    { path: 'tiles', component: TilesDemoComponent },
    { path: 'slides', component: SlidesDemoComponent },
    { path: 'editor', component: EditorDemoComponent },
    { path: 'tipwell', component: TipWellDemoComponent },

    // Utils
    { path: 'utils', component: UtilsDemoComponent },
    { path: 'pipes', component: PipesDemoComponent },

    // Catch All
    { path: '**', redirectTo: '/' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
