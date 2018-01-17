import { Routes, RouterModule } from '@angular/router';

import { DocsComponent } from './docs.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { AngularComponent } from './angular/angular.component';
import { CustomizingComponent } from './customizing/customizing.component';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
    children: [
      { path: '', component: GettingStartedComponent },
      { path: 'angular', component: AngularComponent },
      { path: 'customize', component: CustomizingComponent },
    ],
  },
];

export const docsRoutes: any = RouterModule.forChild(routes);
