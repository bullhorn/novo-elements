import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PreloadSelectModulesStrategy } from './services';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'docs',
    data: { preload: false },
    loadChildren: './pages/docs/docs.module#DocsModule',
  },
  {
    path: 'components',
    data: { preload: false },
    loadChildren: './pages/components/components.module#ComponentsModule',
  },
  {
    path: 'style-guide',
    data: { preload: false },
    loadChildren: './pages/style-guide/style-guide.module#StyleGuideModule',
  },
  { path: '**', redirectTo: '/' },
];

export const appRoutingModule: any = RouterModule.forRoot(routes, {
  useHash: true,
  preloadingStrategy: PreloadSelectModulesStrategy,
});
