// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoColorSwatchComponent } from './color-swatch.component';
import { NovoColorPickerComponent } from './color-picker.component';
import { NovoColorInputElement } from './color-input.component';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoFieldModule } from 'novo-elements/components/field';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoPipesModule } from 'novo-elements/pipes';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule],
  declarations: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
  exports: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
})
export class NovoColorPickerModule {}
