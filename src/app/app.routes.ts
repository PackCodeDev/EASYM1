import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Products } from './products/products';
import { Promotion } from './promotion/promotion';
import { Brand } from './brand/brand';
import { Essay } from './essay/essay';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: Products },
  { path: 'promotion', component: Promotion },
  { path: 'brand', component: Brand },
  { path: 'essay', component: Essay }
];


