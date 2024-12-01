import {Routes} from '@angular/router';
import {navbar_route} from './layouts/navbar/navbar.routes';
import {home_route} from './home/home.routes';

export const routes: Routes = [
  navbar_route,
  ...home_route
];
