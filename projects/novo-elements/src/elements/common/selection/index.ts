import { NgModule } from '@angular/core';
import { NovoPseudoCheckbox } from './pseudo-checkbox/pseudo-checkbox.component';
// import {NovoCommonModule} from '../common-behaviors/common-module';

@NgModule({
  imports: [],
  exports: [NovoPseudoCheckbox],
  declarations: [NovoPseudoCheckbox],
})
export class NovoPseudoCheckboxModule {}

export * from './pseudo-checkbox/pseudo-checkbox.component';
