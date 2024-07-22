import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { QrScannerPage } from "../qr-scanner/qr-scanner.page";
import { ProductListPage } from '../product-list/product-list.page';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, QrScannerPage,ProductListPage,RouterLink],
})
export class HomePage {
  constructor() {}
}
