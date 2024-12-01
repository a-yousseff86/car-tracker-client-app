import {Routes} from '@angular/router';

export const home_route: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then(m => m.HomeComponent),
  }
];
