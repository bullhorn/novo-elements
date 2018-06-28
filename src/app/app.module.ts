// NG2
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
// Vendor
import {
  NovoElementsModule,
  NovoElementProviders,
  FormUtils,
  NovoLabelService,
  FieldInteractionApi,
  NovoToastService,
  NovoModalService,
  AppBridgeService,
  DevAppBridgeService,
} from './../platform/index';
// APP
import { CodeSnippet } from './elements/codesnippet/CodeSnippet';
import { MultiCodeSnippet } from './elements/codesnippet/MultiCodeSnippet';
import { Home } from './pages/home/Home';
import { ColorComponent, CompositionComponent, TypographyComponent, IconographyComponent } from './pages/design';
import {
  ButtonDemoComponent,
  RadioDemoComponent,
  CustomQuickNoteResults,
  QuickNoteDemoComponent,
  ModalDemoComponent,
  FormDemoComponent,
  ToastDemoComponent,
  TooltipDemoComponent,
  CardDemoComponent,
  LoadingDemoComponent,
  DropdownDemoComponent,
  PickerDemoComponent,
  ChipsDemoComponent,
  SelectDemoComponent,
  TabsDemoComponent,
  TableDemoComponent,
  ListDemoComponent,
  HeaderDemoComponent,
  SwitchDemoComponent,
  SearchDemoComponent,
  CalendarDemoComponent,
  DragulaDemoComponent,
  TilesDemoComponent,
  SlidesDemoComponent,
  EditorDemoComponent,
  TipWellDemoComponent,
  CategoryDropdownDemoComponent,
  MultiPickerDemoComponent,
  PopOverDemoComponent,
  CustomDemoComponent,
  DatePickerDemoComponent,
  DateLocaleDemoComponent,
  FieldInteractionsDemoComponent,
  DataTableDemoComponent,
  FormGroupedDemoComponent,
  ValueDemoComponent,
  AceEditorDemoComponent,
  ConfigureColumnsModal,
  ExpansionDemoComponent,
  StepperDemoComponent,
} from './pages/elements';
import { PipesDemoComponent, UtilsDemoComponent, AppBridgeDemoComponent, SecurityDemoComponent } from './pages/utils';
import {
  ModalSuccessDemo,
  ModalWarningDemo,
  ModalErrorDemo,
  ModalCustomDemo,
  ModalAddDemo,
  ModalEditDemo,
} from './pages/elements/modal/ModalDemo';
import { StatusCell, ExtraDetails, ImageCell, ActionsCell } from './pages/elements/table/TableDemo';
import { CustomPickerResults } from './pages/elements/picker/PickerDemo';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

export function provideFieldInteractionAPI(toast, modal, formUtils, http, labels) {
  const fieldInteractionApi = new FieldInteractionApi(toast, modal, formUtils, http, labels);
  fieldInteractionApi.globals = {
    TEST: 'I AM A GLOBAL!',
  };
  return fieldInteractionApi;
}

export function provideAppBridgeService(http) {
  if (!environment.production) {
    return new DevAppBridgeService(http);
  }
  return new AppBridgeService();
}

@NgModule({
  declarations: [
    AppComponent,
    CodeSnippet,
    MultiCodeSnippet,
    Home,
    ColorComponent,
    CompositionComponent,
    TypographyComponent,
    IconographyComponent,
    ButtonDemoComponent,
    RadioDemoComponent,
    CustomQuickNoteResults,
    QuickNoteDemoComponent,
    ModalDemoComponent,
    FormDemoComponent,
    ToastDemoComponent,
    TooltipDemoComponent,
    CardDemoComponent,
    LoadingDemoComponent,
    DropdownDemoComponent,
    PickerDemoComponent,
    ChipsDemoComponent,
    SelectDemoComponent,
    TabsDemoComponent,
    TableDemoComponent,
    ListDemoComponent,
    HeaderDemoComponent,
    SwitchDemoComponent,
    SearchDemoComponent,
    CalendarDemoComponent,
    DatePickerDemoComponent,
    DateLocaleDemoComponent,
    DragulaDemoComponent,
    TilesDemoComponent,
    SlidesDemoComponent,
    EditorDemoComponent,
    TipWellDemoComponent,
    UtilsDemoComponent,
    PipesDemoComponent,
    ModalSuccessDemo,
    ModalWarningDemo,
    ModalErrorDemo,
    ModalCustomDemo,
    ModalAddDemo,
    ModalEditDemo,
    StatusCell,
    ActionsCell,
    ExtraDetails,
    ImageCell,
    CustomPickerResults,
    CategoryDropdownDemoComponent,
    MultiPickerDemoComponent,
    PopOverDemoComponent,
    CustomDemoComponent,
    AppBridgeDemoComponent,
    FieldInteractionsDemoComponent,
    DataTableDemoComponent,
    FormGroupedDemoComponent,
    ValueDemoComponent,
    AceEditorDemoComponent,
    SecurityDemoComponent,
    ConfigureColumnsModal,
    ExpansionDemoComponent,
    StepperDemoComponent,
  ],
  imports: [
    // NG2
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ScrollDispatchModule,
    // Vendor
    NovoElementsModule,
    NovoElementProviders.forRoot(),
    // APP
    AppRoutingModule,
  ],
  providers: [
    FormUtils,
    NovoLabelService,
    {
      provide: FieldInteractionApi,
      useFactory: provideFieldInteractionAPI,
      deps: [NovoToastService, NovoModalService, FormUtils, Http, NovoLabelService],
    },
    {
      provide: AppBridgeService,
      useFactory: provideAppBridgeService,
      deps: [Http],
    },
  ],
  entryComponents: [
    AppComponent,
    ModalSuccessDemo,
    ModalWarningDemo,
    ModalErrorDemo,
    ModalCustomDemo,
    ModalAddDemo,
    ModalEditDemo,
    StatusCell,
    ExtraDetails,
    ImageCell,
    ActionsCell,
    CustomPickerResults,
    CustomQuickNoteResults,
    CustomDemoComponent,
    ConfigureColumnsModal,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
