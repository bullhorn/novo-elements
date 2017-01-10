// NG2
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Vendor
import { NovoElementsModule, NovoElementProviders, FormUtils, NovoLabelService } from './../index';
// APP
import { CodeSnippet } from './elements/codesnippet/CodeSnippet';
import { MultiCodeSnippet } from './elements/codesnippet/MultiCodeSnippet';
import { Home } from './pages/home/Home';
import { ColorComponent, CompositionComponent, TypographyComponent, IconographyComponent } from './pages/design';
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
    MultiPickerDemoComponent,
    PopOverDemoComponent
} from './pages/elements';
import { UtilsDemoComponent } from './pages/utils/utils/UtilsDemo';
import { PipesDemoComponent } from './pages/utils/pipes/PipesDemo';
import { ModalSuccessDemo, ModalWarningDemo, ModalErrorDemo, ModalCustomDemo, ModalAddDemo, ModalEditDemo } from './pages/elements/modal/ModalDemo';
import { StatusCell, ExtraDetails, ImageCell, ActionsCell } from './pages/elements/table/TableDemo';
import { CustomPickerResults } from './pages/elements/picker/PickerDemo';
import { DemoComponent } from './app/App';
import { routing } from './app/App.routes';
import './demo.scss';

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
        ActionsCell,
        ExtraDetails,
        ImageCell,
        CustomPickerResults,
        CategoryDropdownDemoComponent,
        MultiPickerDemoComponent,
        PopOverDemoComponent
    ],
    imports: [
        // NG2
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        // Vendor
        NovoElementsModule,
        NovoElementProviders.forRoot(),
        // APP
        routing
    ],
    providers: [
        FormUtils,
        NovoLabelService
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
        ImageCell,
        ActionsCell,
        CustomPickerResults
    ],
    bootstrap: [DemoComponent]
})
export class MainModule {
}

