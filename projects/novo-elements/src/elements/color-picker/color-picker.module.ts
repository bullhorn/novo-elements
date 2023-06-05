// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoColorInputElement } from './color-input.component';
import { NovoColorPickerComponent } from './color-picker.component';
import { NovoColorSwatchComponent } from './color-swatch.component';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule],
  declarations: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
  exports: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
})
export class NovoColorPickerModule {}
