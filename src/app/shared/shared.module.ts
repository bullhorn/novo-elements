import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoBoxComponent } from './demo-box/demo-box.component';
import { DemoSectionComponent } from './demo-section/demo-section.component';

@NgModule({
  declarations: [
    DemoBoxComponent,
    DemoSectionComponent,
  ],
  imports: [
    // NG2
    CommonModule,
  ],
  exports: [
    DemoBoxComponent,
    DemoSectionComponent,
  ],
})
export class SharedModule {
}
