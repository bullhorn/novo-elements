import { Routes, RouterModule } from '@angular/router';

import { StyleGuideComponent } from './style-guide.component';
import { ColorComponent } from './color/color.component';
import { CompositionComponent } from './composition/composition.component';
import { IconographyComponent } from './iconography/iconography.component';
import { TypographyComponent } from './typography/typography.component';

const routes: Routes = [
  {
    path: '',
    component: StyleGuideComponent,
    children: [
      { path: '', component: ColorComponent },
      { path: 'composition', component: CompositionComponent },
      { path: 'iconography', component: IconographyComponent },
      { path: 'typography', component: TypographyComponent },
    ],
  },
];

export const styleGuideRoutes: any = RouterModule.forChild(routes);
