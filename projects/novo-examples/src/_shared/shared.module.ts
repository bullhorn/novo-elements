/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED VIA GULP 'build-examples-module' */
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoElementsModule } from 'novo-elements';
import { CodeExampleComponent } from './code-example.component';
import { CodeSnippetComponent } from './code-snippet.component';
import { HighlightJS } from './highlight.service';
import { StackblitzButtonModule } from './stackblitz';

@NgModule({
  declarations: [CodeSnippetComponent, CodeExampleComponent],
  exports: [CodeSnippetComponent, CodeExampleComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NovoElementsModule, StackblitzButtonModule, PortalModule],
  providers: [HighlightJS],
})
export class NovoExamplesSharedModule {}
