import { Component, OnInit } from '@angular/core';
import { Product } from './services/product';
import { ProductType } from './services/product-type';

import { ShopService } from './services/shop.service';

@Component({
  selector: 'bp-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  turntables: Product[];
  mixers: Product[];
  headphones: Product[];
  cartStyli: Product[];
  microphones: Product[];
  dvs: Product[];
  vinylCare: Product[];
  audioInterfaces: Product[];

  constructor(
    private readonly shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.turntables = this.shopService.getProductsByType(ProductType.Turntable);
    this.mixers = this.shopService.getProductsByType(ProductType.Mixer);
    this.headphones = this.shopService.getProductsByType(ProductType.Headphones);
    this.cartStyli = this.shopService.getProductsByType(ProductType.CartStylus);
    this.microphones = this.shopService.getProductsByType(ProductType.Microphone);
    this.dvs = this.shopService.getProductsByType(ProductType.Dvs);
    this.vinylCare = this.shopService.getProductsByType(ProductType.VinylCare);
    this.audioInterfaces = this.shopService.getProductsByType(ProductType.AudioInterface);
  }

}
