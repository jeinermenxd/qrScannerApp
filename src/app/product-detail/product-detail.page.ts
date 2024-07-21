import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { Producto } from '../models/producto.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../service/producto/producto.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProductDetailPage implements OnInit {

  producto: Producto | null = null;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    const codUnico  = this.route.snapshot.paramMap.get('codUnico');
    if (codUnico ) {
      this.productoService.getProductoByCodUnico(codUnico ).subscribe((producto) => {
        this.producto = producto;
      });
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

}
