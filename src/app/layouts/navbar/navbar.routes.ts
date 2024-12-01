import { Route } from '@angular/router';

export const navbar_route: Route =
  {
   path: '',
   outlet: 'navbar',
   loadComponent: () => import('./navbar.component').then(m => m.NavbarComponent),
  }
