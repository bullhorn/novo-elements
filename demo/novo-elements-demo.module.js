// NG2
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// APP
import { DemoComponent } from './app/App';
import { routing } from './app/App.routes';
import { CodeSnippet } from './elements/codesnippet/CodeSnippet';
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
    TipWellDemoComponent
} from './pages/elements/all';
import { UtilsDemoComponent } from './pages/utils/utils/UtilsDemo';
import { PipesDemoComponent } from './pages/utils/pipes/PipesDemo';
import { ModalSuccessDemo, M } from './pages/elements/modal/ModalDemo';

import './demo.scss';
// Vendor
import { NovoElementsModule, FormUtils } from './../src/novo-elements';

@NgModule({
    declarations: [
        DemoComponent,
        CodeSnippet,
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
        ModalSuccessDemo
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
        ModalSuccessDemo
    ],
    bootstrap: [DemoComponent]
})
export class NovoElementsDemoModule {
}

