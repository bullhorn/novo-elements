/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED VIA GULP 'build-examples-module' */
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { NovoElementsModule } from 'novo-elements';
import { CodeExampleComponent } from './code-example.component';
import { CodeSnippetComponent } from './code-snippet.component';
import { FigureExample } from './figure';
import { HighlightJS } from './highlight.service';
import { StackblitzButtonModule } from './stackblitz';
import { TypedefContent, TypedefExample, TypedefSnippet, TypedefSpec } from './typedef';
@NgModule({
  declarations: [CodeSnippetComponent, CodeExampleComponent, TypedefContent, TypedefExample, TypedefSnippet, TypedefSpec, FigureExample],
  exports: [CodeSnippetComponent, CodeExampleComponent, TypedefContent, TypedefExample, TypedefSnippet, TypedefSpec, FigureExample],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AngularSplitModule, NovoElementsModule, StackblitzButtonModule, PortalModule],
  providers: [HighlightJS],
})
export class NovoExamplesSharedModule {}
