/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED VIA GULP 'build-examples-module' */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { NovoElementsModule } from 'novo-elements';
import { CodeSnippetComponent } from './code-snippet.component';
import { CodeExampleComponent } from './code-example.component';
import { StackblitzButtonModule } from './stackblitz';
import { HighlightJS } from './highlight.service';

@NgModule({
  declarations: [CodeSnippetComponent, CodeExampleComponent],
  exports: [CodeSnippetComponent, CodeExampleComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NovoElementsModule, StackblitzButtonModule, PortalModule],
  providers: [HighlightJS],
})
export class NovoExamplesSharedModule {}
