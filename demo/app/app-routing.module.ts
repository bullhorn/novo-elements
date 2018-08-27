// NG2
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// APP
import { Home } from './pages/home/Home';
import { ColorComponent, TypographyComponent, CompositionComponent, IconographyComponent } from './pages/design';
import { PipesDemoComponent, UtilsDemoComponent, AppBridgeDemoComponent, SecurityDemoComponent } from './pages/utils';
import {
  AceEditorDemoComponent,
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
  DragulaDemoComponent,
  SlidesDemoComponent,
  PickerDemoComponent,
  ChipsDemoComponent,
  CalendarDemoComponent,
  DatePickerDemoComponent,
  EditorDemoComponent,
  TipWellDemoComponent,
  TableDemoComponent,
  FormDemoComponent,
  CategoryDropdownDemoComponent,
  MultiPickerDemoComponent,
  PopOverDemoComponent,
  FieldInteractionsDemoComponent,
  DataTableDemoComponent,
  SearchDemoComponent,
  FormGroupedDemoComponent,
  ValueDemoComponent,
  ExpansionDemoComponent,
  StepperDemoComponent,
} from './pages/elements';

const routes: Routes = [
  { path: '', component: Home, data: {} },
  { path: 'home', component: Home, data: {} },

  // Base Pages (design system)
  { path: 'color', component: ColorComponent, data: { title: 'Color', section: 'design' } },
  { path: 'composition', component: CompositionComponent, data: { title: 'Composition', section: 'design' } },
  { path: 'typography', component: TypographyComponent, data: { title: 'Typography', section: 'design' } },
  { path: 'icons', component: IconographyComponent, data: { title: 'Iconography', section: 'design' } },

  // Element/Component/Service/etc.. Demos
  { path: 'ace-editor', component: AceEditorDemoComponent, data: { title: 'Ace Editor', section: 'components' } },
  { path: 'button', component: ButtonDemoComponent, data: { title: 'Buttons', section: 'components' } },
  { path: 'radio', component: RadioDemoComponent, data: { title: 'Radio', section: 'components' } },
  { path: 'quick-note', component: QuickNoteDemoComponent, data: { title: 'Quick Note', section: 'components' } },
  { path: 'modal', component: ModalDemoComponent, data: { title: 'Modal', section: 'components' } },
  { path: 'form', component: FormDemoComponent, data: { title: 'Form', section: 'components' } },
  { path: 'form-grouped', component: FormGroupedDemoComponent, data: { title: 'Form Groups', section: 'components' } },
  { path: 'toast', component: ToastDemoComponent, data: { title: 'Toast', section: 'components' } },
  { path: 'tooltip', component: TooltipDemoComponent, data: { title: 'Tooltip', section: 'components' } },
  { path: 'cards', component: CardDemoComponent, data: { title: 'Cards', section: 'components' } },
  { path: 'loading', component: LoadingDemoComponent, data: { title: 'Loading', section: 'components' } },
  { path: 'dropdown', component: DropdownDemoComponent, data: { title: 'Dropdown', section: 'components' } },
  { path: 'picker', component: PickerDemoComponent, data: { title: 'Picker', section: 'components' } },
  { path: 'multi-picker', component: MultiPickerDemoComponent, data: { title: 'MultiPicker', section: 'components' } },
  { path: 'chips', component: ChipsDemoComponent, data: { title: 'Chips', section: 'components' } },
  { path: 'select', component: SelectDemoComponent, data: { title: 'Select', section: 'components' } },
  { path: 'tabs', component: TabsDemoComponent, data: { title: 'Tabs', section: 'components' } },
  { path: 'table', component: TableDemoComponent, data: { title: 'Table', section: 'components' } },
  { path: 'data-table', component: DataTableDemoComponent, data: { title: 'Data Table', section: 'components' } },
  { path: 'list', component: ListDemoComponent, data: { title: 'List', section: 'components' } },
  { path: 'header', component: HeaderDemoComponent, data: { title: 'Header', section: 'components' } },
  { path: 'switch', component: SwitchDemoComponent, data: { title: 'Switch', section: 'components' } },
  { path: 'search', component: SearchDemoComponent, data: { title: 'Search', section: 'components' } },
  { path: 'calendar', component: CalendarDemoComponent, data: { title: 'Calendar', section: 'components' } },
  { path: 'date-picker', component: DatePickerDemoComponent, data: { title: 'Date Picker', section: 'components' } },
  { path: 'dragula', component: DragulaDemoComponent, data: { title: 'Dragula', section: 'components' } },
  { path: 'tiles', component: TilesDemoComponent, data: { title: 'Tiles', section: 'components' } },
  { path: 'slides', component: SlidesDemoComponent, data: { title: 'Slides', section: 'components' } },
  { path: 'stepper', component: StepperDemoComponent, data: { title: 'Stepper', section: 'components' } },
  { path: 'editor', component: EditorDemoComponent, data: { title: 'Editor', section: 'components' } },
  { path: 'tipwell', component: TipWellDemoComponent, data: { title: 'Tip Well', section: 'components' } },
  { path: 'category-dropdown', component: CategoryDropdownDemoComponent, data: { title: 'Category Dropdown', section: 'components' } },
  { path: 'popover', component: PopOverDemoComponent, data: { title: 'PopOver', section: 'components' } },
  { path: 'value', component: ValueDemoComponent, data: { title: 'Value', section: 'components' } },
  { path: 'expansion', component: ExpansionDemoComponent, data: { title: 'Expansion', section: 'components' } },

  // Utils
  { path: 'utils', component: UtilsDemoComponent, data: { title: 'Utils', section: 'utils' } },
  { path: 'pipes', component: PipesDemoComponent, data: { title: 'Pipes', section: 'utils' } },
  { path: 'app-bridge', component: AppBridgeDemoComponent, data: { title: 'App Bridge', section: 'utils' } },
  { path: 'field-interactions', component: FieldInteractionsDemoComponent, data: { title: 'Field Interactions', section: 'utils' } },
  { path: 'security', component: SecurityDemoComponent, data: { title: 'Security', section: 'utils' } },
  // Catch All
  { path: '**', redirectTo: '/', data: {} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
