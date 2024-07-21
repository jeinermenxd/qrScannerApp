import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'qr-scanner',
    loadComponent: () => import('./qr-scanner/qr-scanner.page').then( m => m.QrScannerPage)
  },
  {
    path: 'product-detail/:id',
    loadComponent: () => import('./product-detail/product-detail.page').then( m => m.ProductDetailPage)
  },
];
