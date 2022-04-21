// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoPipesModule } from '../../pipes/Pipes.module';
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoFieldModule } from '../field/field.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoColorInputElement } from './color-input.component';
import { NovoColorPickerComponent } from './color-picker.component';
import { NovoColorSwatchComponent } from './color-swatch.component';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPipesModule, NovoFieldModule, NovoOverlayModule, NovoIconModule],
  declarations: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
  exports: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
})
export class NovoColorPickerModule {}
