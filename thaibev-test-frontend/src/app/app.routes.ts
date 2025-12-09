import { Routes } from '@angular/router';
import { ProductComponent } from './product/component/product.component';

export const routes: Routes = [
  { path: 'thaibev/test/product', component: ProductComponent },
  { path: '', redirectTo: 'thaibev/test/product', pathMatch: 'full' },
  { path: '**', redirectTo: 'thaibev/test/product' }
];