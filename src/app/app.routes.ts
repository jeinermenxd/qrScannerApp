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
    path: 'product-detail/:codUnico',
    loadComponent: () => import('./product-detail/product-detail.page').then( m => m.ProductDetailPage)
  },
  {
    path: 'product-list',
    loadComponent: () => import('./product-list/product-list.page').then( m => m.ProductListPage)
  },
];
