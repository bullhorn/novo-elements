import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleGuideComponent } from './style-guide.component';
import { ColorComponent } from './color/color.component';
import { CompositionComponent } from './composition/composition.component';
import { IconographyComponent } from './iconography/iconography.component';
import { TypographyComponent } from './typography/typography.component';

import { styleGuideRoutes } from './style-guide.routes';

@NgModule({
  declarations: [
    StyleGuideComponent,
    ColorComponent,
    CompositionComponent,
    IconographyComponent,
    TypographyComponent,
  ],
  imports: [
    // NG2
    CommonModule,
    // APP
    styleGuideRoutes,
  ],
})
export class StyleGuideModule {}
