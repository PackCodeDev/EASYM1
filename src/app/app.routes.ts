import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Products } from './products/products';
import { Promotion } from './promotion/promotion';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: Products },
  { path: 'promotion', component: Promotion }
];
