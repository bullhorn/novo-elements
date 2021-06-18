/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED VIA GULP 'build-examples-module' */
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { NovoElementsModule } from 'novo-elements';
import { CodeExampleComponent } from './code-example.component';
import { CodeSnippetComponent } from './code-snippet.component';
import { DefaultLayout } from './default-layout';
import { FigureExample } from './figure';
import { HighlightJS } from './highlight.service';
import { PropsTableComponent } from './props-table';
import { StackblitzButtonModule } from './stackblitz';
import { TabsLayout } from './tabs-layout';
import { TypedefContent, TypedefExample, TypedefSnippet, TypedefSpec } from './typedef';
@NgModule({
  declarations: [
    CodeSnippetComponent,
    CodeExampleComponent,
    TypedefContent,
    TypedefExample,
    TypedefSnippet,
    TypedefSpec,
    FigureExample,
    TabsLayout,
    DefaultLayout,
    PropsTableComponent,
  ],
  exports: [
    CodeSnippetComponent,
    CodeExampleComponent,
    TypedefContent,
    TypedefExample,
    TypedefSnippet,
    TypedefSpec,
    FigureExample,
    TabsLayout,
    DefaultLayout,
    PropsTableComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularSplitModule,
    NovoElementsModule,
    StackblitzButtonModule,
    PortalModule,
  ],
  providers: [HighlightJS],
})
export class NovoExamplesSharedModule {}
