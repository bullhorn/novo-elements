// NG2
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// APP
import { DemoComponent } from './app/App';
import { routing } from './app/App.routes';
import { CodeSnippet } from './elements/codesnippet/CodeSnippet';
import { MultiCodeSnippet } from './elements/codesnippet/MultiCodeSnippet';
import { Home } from './pages/home/Home';
import { ColorComponent, CompositionComponent, TypographyComponent, IconographyComponent } from './pages/design/all';
import {
    ButtonDemoComponent,
    RadioDemoComponent,
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
    DrawerDemoComponent,
    CalendarDemoComponent,
    DragulaDemoComponent,
    TilesDemoComponent,
    SlidesDemoComponent,
    EditorDemoComponent,
    TipWellDemoComponent,
    CategoryDropdownDemoComponent,
    MultiPickerDemoComponent
} from './pages/elements/all';
import { UtilsDemoComponent } from './pages/utils/utils/UtilsDemo';
import { PipesDemoComponent } from './pages/utils/pipes/PipesDemo';
import { ModalSuccessDemo, ModalWarningDemo, ModalErrorDemo, ModalCustomDemo, ModalAddDemo, ModalEditDemo } from './pages/elements/modal/ModalDemo';
import { StatusCell, ExtraDetails } from './pages/elements/table/TableDemo';
import { CustomPickerResults } from './pages/elements/picker/PickerDemo';
import './demo.scss';
// Vendor
import { NovoElementsModule, FormUtils } from './../src/novo-elements';

@NgModule({
    declarations: [
        DemoComponent,
        CodeSnippet,
        MultiCodeSnippet,
        Home,
        ColorComponent,
        CompositionComponent,
        TypographyComponent,
        IconographyComponent,
        ButtonDemoComponent,
        RadioDemoComponent,
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
        DrawerDemoComponent,
        CalendarDemoComponent,
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
        ExtraDetails,
        CustomPickerResults,
        CategoryDropdownDemoComponent,
        MultiPickerDemoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        routing,
        NovoElementsModule
    ],
    providers: [
        FormUtils
    ],
    entryComponents: [
        DemoComponent,
        ModalSuccessDemo,
        ModalWarningDemo,
        ModalErrorDemo,
        ModalCustomDemo,
        ModalAddDemo,
        ModalEditDemo,
        StatusCell,
        ExtraDetails,
        CustomPickerResults
    ],
    bootstrap: [DemoComponent]
})
export class NovoElementsDemoModule {
}

