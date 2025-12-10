import { Routes } from '@angular/router';
import { ProductComponent } from './product/component/product.component';
import { QrProductDetailComponent } from './qr-product-detail/qr-product-detail.component';

export const routes: Routes = [
  { path: 'thaibev/test/product', component: ProductComponent },
  { path: 'product-detail', component: QrProductDetailComponent },
  { path: '', redirectTo: 'thaibev/test/product', pathMatch: 'full' },
  { path: '**', redirectTo: 'thaibev/test/product' }
];