import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Camera } from '@capacitor/camera';
import { Capacitor, Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
const { Permissions } = Plugins;
@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,ZXingScannerModule]
})
export class QrScannerPage implements OnInit {
  public scannedResult: string | null = null;
  public isScannerActive: boolean = false;

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.checkCameraPermissions();
  }

  async checkCameraPermissions() {
    const status = await Permissions['query']({ name: 'camera' });

    if (status.state !== 'granted') {
      await Permissions['request']({ name: 'camera' });
    }
  }

  handleQrCodeResult(result: string) {
    this.scannedResult = result;
    this.isScannerActive = false; // Desactiva el escáner después de escanear un código QR

    // Navegar a la página de detalles del producto
    this.router.navigate(['/product-detail', result]);
  }

  toggleScanner() {
    this.isScannerActive = !this.isScannerActive;
  }

}
