// NG2
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// APP
import { DemoComponent } from './app/App';
import { routing } from './app/App.routes';
import { CodeSnippet } from './elements/codesnippet/CodeSnippet';
import './demo.scss';
// Vendor
import { NovoElementsModule, FormUtils } from './../src/novo-elements';

@NgModule({
    declarations: [
        DemoComponent,
        CodeSnippet
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        NovoElementsModule
    ],
    providers: [
        FormUtils
    ],
    entryComponents: [DemoComponent],
    bootstrap: [DemoComponent]
})
export class NovoElementsDemoModule {
}
